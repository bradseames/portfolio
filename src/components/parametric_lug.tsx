import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Card,
  Container,
  Fieldset,
  Flex,
  NumberInput,
  Switch,
  SegmentedControl,
  ScrollArea,
  Text,
} from '@mantine/core';
// import Arrow from './arrow';
import classes from './lug.module.css';

export enum LugMode {single = 'single', double = 'double'}

export enum UnitMode {english = 'english', metric = 'metric'}

export interface LugParams {
  mode: LugMode | string;      // single or double shear
  units: UnitMode | string;

  // Diameters
  D: number;          // Lug hole diameter
  Dp: number;         // Pin diameter
  // Plate thicknesses
  t1: number;         // Outer plate thickness (single: the plate)
  t2: number;         // Center plate thickness (double shear only)
  // Widths
  w1: number;         // Outer plate width (each side)
  w2: number;         // Center plate width (double only)
  // Edge/gap
  e1: number;          // Edge distance (hole center to free end)
  e2: number;
  g: number;          // Gap between outer plates (double shear)
}

export interface Allowables {
  // Allowable stresses (units consistent w/ geometry)
  sigma_t_lug: number;      // lug net-tension allowable
  sigma_b_lug: number;      // lug bearing allowable
  tau_pin: number;          // pin shear allowable
  sigma_b_pin: number;      // pin bearing allowable (reserved)
}

export interface SketchProps {
  params: LugParams;
  allow?: Partial<Allowables>;
  // Optional overall drawing length of the lug in the axial direction
  L?: number; // if not given, computed from e + 2*D
  showDims?: boolean;    // show dimension graphics
  showLoads?: boolean;   // show P arrows
  showWarnings?: boolean;// highlight rule violations
  showPanels?: boolean;  // draw calc panels inside SVG (default true)
  style?: React.CSSProperties;
}

// ---------- Defaults ----------
const DEFAULT_ALLOW: Allowables = {
  sigma_t_lug: 240,  // MPa (placeholder)
  sigma_b_lug: 550,  // MPa (placeholder)
  tau_pin: 300,      // MPa (placeholder)
  sigma_b_pin: 550,  // MPa (placeholder)
};


// ---------- Helpers ----------
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

function validate(p: LugParams): LugParams {
  const minThk = 0.1;
  const minDia = 0.5;

  let D = Math.max(p.D, minDia);
  let Dp = clamp(p.Dp, minDia, D - 0.2);

  let t1 = Math.max(p.t1, minThk);
  let t2 = p.mode === LugMode.double ? Math.max(p.t2, minThk) : 0;

  let w1 = Math.max(p.w1, D + 2);
  let w2 = p.mode === LugMode.double ? Math.max(p.w2, D + 2) : 0;

  let e1 = Math.max(p.e1, D * 0.6); // simplistic floor; adjust to your rule
  let g = p.mode === LugMode.double ? Math.max(p.g, Dp * 0.1) : 0;

  return { ...p, D, Dp, t1, t2, w1, w2, e1, g };
}

// ---------- Calculation core — lightweight, swappable ----------
export interface Result {
  Anet: number;           // net-tension area of the critical plate
  Abearing_each: number;  // projected bearing area per interface (t * Dp)
  Abearing_total: number; // sum over interfaces (depends on mode)
  Apin_shear: number;     // pin shear area (single or double shear)
  P_net_tension: number;
  P_bearing_lug: number;
  P_shear_pin: number;
  P_governing: number;    // min of the above
  warnings: string[];
}

export function calc(params: LugParams, allow: Allowables): Result {
  const p = validate(params);
  const warnings: string[] = [];

  // Critical plate (outer plate used for net tension in double-shear lug)
  const tcrit = p.t1;
  const wcrit = p.w1;

  const Anet = tcrit * (wcrit - p.D); // simple subtract-through-hole
  if (Anet <= 0) warnings.push('Net area <= 0 (w <= D)');

  // Bearing area
  const nInterfaces = p.mode === LugMode.double ? 2 : 1; // lug-to-pin interfaces in outer plates
  const Abearing_each = tcrit * p.Dp;
  const Abearing_total = Abearing_each * nInterfaces;

  // Pin shear area
  const nShearPlanes = p.mode === LugMode.double ? 2 : 1;
  const Apin_shear = nShearPlanes * (Math.PI * (p.Dp ** 2)) / 4;

  // Nominal capacities (illustrative)
  const P_net_tension = allow.sigma_t_lug * Anet;
  const P_bearing_lug = allow.sigma_b_lug * Abearing_total;
  const P_shear_pin = allow.tau_pin * Apin_shear;

  // Simple geometric checks (illustrative thresholds)
  if (p.e1 < 1.5 * p.D) warnings.push(`Edge distance e < 1.5D (e=${p.e1.toFixed(1)}, D=${p.D.toFixed(1)})`);
  if (p.Dp >= p.D) warnings.push('Pin >= hole (Dp >= D)');
  if (p.t1 <= 0) warnings.push('t1 <= 0');
  if (p.mode === LugMode.double && p.t2 <= 0) warnings.push('t2 <= 0');

  const P_governing = Math.min(P_net_tension, P_bearing_lug, P_shear_pin);

  return {
    Anet, Abearing_each, Abearing_total, Apin_shear, P_net_tension, P_bearing_lug, P_shear_pin, P_governing, warnings,
  };
}

// ---------- Fit into viewBox ----------
function useFit(dim: { width: number; height: number }) {
  const marginH = dim.width * .75;
  const marginV = dim.height * .5;
  const vb = useMemo(() => {
    const W = dim.width + marginH;
    const H = dim.height + marginV;
    return { viewBox: `0 0 ${W} ${H}`, offsetX: marginH / 4, offsetY: marginV / 2, W, H };
  }, [dim.width, dim.height]);
  return vb;
}

// ---------- Equation block (safe: no external loads) ----------
function Eq({ tex }: { tex: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMJ, setHasMJ] = useState(false);

  useEffect(() => {
    const MJ = (window as any).MathJax;
    if (MJ && typeof MJ.typesetPromise === 'function')
      {
        setHasMJ(true);
        MJ.typesetPromise([ref.current]).catch(() => {/* swallow typeset errors */});
      }
  }, [tex]);

  // Fallback: show raw TeX if MathJax is not present.
  return hasMJ ? <div ref={ref}>{`$$${tex}$$`}</div> :
    <code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>{tex}</code>;
}

// ---------- SVG Sketch ----------
export const LugSketch: React.FC<SketchProps> = ({
  params, allow, showDims = false, showLoads = true, showWarnings = true, showPanels = true, style,
}) => {
  const p = params;
  // const A = { ...DEFAULT_ALLOW, ...(allow ?? {}) } as Allowables;
  // const R = calc(p, A);

  const maxWidth = Math.max(params.w1, params.w2);
  const totalThk = params.mode === LugMode.double ? (params.t1 * 2 + params.g * 2 + params.t2) :
    (params.t1 * 2 + params.g * 2 + params.t2);
  const maxHeight = Math.max(maxWidth, params.e1 * 2) * 1.5;
  const vb = useFit({ width: (maxWidth + totalThk), height: maxHeight });

  // Hole center
  const xFrontLeft = vb.offsetX;
  const xFrontRight = xFrontLeft + maxWidth;
  const xFrontCenter = (xFrontLeft + xFrontRight) / 2;

  const xSideRight = vb.W - vb.offsetX;
  const xSideLeft = xSideRight - totalThk;
  const xSideCenter = (xSideLeft + xSideRight) / 2;

  const yTop = vb.offsetY;
  const yBottom = vb.H - vb.offsetY;
  const yCenter = (yTop + yBottom) / 2;

  const refHole = useRef<SVGCircleElement>(null);
  const refPin = useRef<SVGCircleElement>(null);

  useEffect(() => { (window as any)._lugRefs = { hole: refHole.current, pin: refPin.current }; }, []);

  // Visual helpers
  const warn = false;
  const warnStroke = warn ? '#c1121f' : '#222';
  const warnFill = warn ? 'cyan' : 'teal';

  const color = {
    hole: 'white',
    pin: 'teal',
    lug1: 'grey',
    lug2: 'blue',
    dim: 'black',
  };

  return (
    <svg id="lug-svg"
         width="100%"
         viewBox={vb.viewBox}
         strokeWidth=".25%"
         xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrow-start"
          markerWidth="20"
          markerHeight="10"
          refX="0"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth">
          <path
            d="M0,5 L20,0 L20,10 S"
            fill="black" />
        </marker>

        <marker
          id="arrow-end"
          markerWidth="20"
          markerHeight="10"
          refX="20"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth">
          <path
            d="M0,10 L20,5 L0,0, S"
            fill="black" />
        </marker>
        <marker
          id="arrow-force"
          markerWidth="10"
          markerHeight="5"
          refX="2.5"
          refY="2.5"
          orient="auto"
          markerUnits="strokeWidth">
          <path
            d="M0,2.5 10,0 10,5 S"
            fill="red" />
        </marker>
      </defs>

      <g id="front_view" transform={'translate(' + xFrontCenter + ', 0)'}>
        <path
          id="lug2"
          d={`M ${-params.w2 / 2} ${yTop} 
            V ${yCenter} 
            A ${params.w2 / 2} ${params.e2} 1 0 0 ${params.w2 / 2} ${yCenter} 
            V ${yTop} H ${-params.w2 / 2}`}
          fill={color.lug2}
          stroke={color.dim}></path>

        <path
          id="lug1"
          d={`M ${-params.w1 / 2} ${yBottom} 
            V ${yCenter} 
            A ${params.w1 / 2} ${params.e1} 0 0 1 ${params.w1 / 2} ${yCenter} 
            V ${yBottom} H ${-params.w1 / 2}`}
          fill={color.lug1}
          stroke={color.dim}></path>

        <path id="lug2_outline"
              d={`M ${-params.w2 / 2} ${yTop} 
            V ${yCenter} 
            A ${params.w2 / 2} ${params.e2} 1 0 0 ${params.w2 / 2} ${yCenter} 
            V ${yTop} H ${-params.w2 / 2}`}
              stroke={color.dim}
              fill="none"
              strokeDasharray={vb.W / 50 + ' ' + vb.W / 50}></path>

        <circle id="hole"
                ref={refHole}
                cx={0}
                cy={yCenter}
                r={params.D / 2}
                stroke={color.dim}
                fill={color.hole} />

        <circle id="pin"
                ref={refPin}
                cx={0}
                cy={yCenter}
                r={params.Dp / 2}
                stroke={color.dim}
                fill={color.pin} />
      </g>

      <g id="side_view"
         transform={'translate(' + xSideLeft + ', 0)'}
         stroke={color.dim}
      >

        <rect id="lug1_side_left"
              x={0}
              y={yCenter - params.e1}
              width={params.t1}
              height={yBottom - yCenter + params.e1}
              fill={color.lug1} />

        <rect id="lug1_hole_side_left"
              x={0}
              y={yCenter - params.D / 2}
              width={params.t1}
              height={params.D}
              fill={color.hole} />

        <rect id="lug2_side"
              x={params.t1 + params.g}
              y={yTop}
              width={params.t2}
              height={yCenter + params.e2 - yTop}
              fill={color.lug2} />

        <rect id="lug2_hole_side"
              x={params.t1 + params.g}
              y={yCenter - params.D / 2}
              width={params.t2}
              height={params.D}
              fill={color.hole} />

        <rect id="lug1_side_right"
              x={params.t1 + params.t2 + params.g * 2}
              y={yCenter - params.e1}
              width={params.t1}
              height={yBottom - yCenter + params.e1}
              fill={color.lug1} />

        <rect id="lug1_hole_side_right"
              x={params.t1 + params.t2 + params.g * 2}
              y={yCenter - params.D / 2}
              width={params.t1}
              height={params.D}
              fill={color.hole} />

        <rect id="pin_side"
              x={0}
              y={yCenter - params.Dp / 2}
              width={params.t1 * 2 + params.t2 + params.g * 2}
              height={params.Dp}
              fill={color.pin} />
      </g>

      <g id="center_lines"
         stroke={color.dim}
         strokeWidth=".25%"
         strokeDasharray={vb.W / 25 + ' ' + vb.W / 25}>

        <line transform={'translate(' + xFrontLeft + ', 0)'}
              x1={0}
              x2={maxWidth}
              y1={yCenter}
              y2={yCenter} />
        <line transform={'translate(' + xFrontCenter + ', 0)'}
              x1={0}
              x2={0}
              y1={yTop}
              y2={yBottom} />

        <line transform={'translate(' + (xSideLeft) + ', 0)'}
              x1={0}
              x2={totalThk}
              y1={yCenter}
              y2={yCenter} />
        <line transform={'translate(' + xSideCenter + ', 0)'}
              x1={0}
              x2={0}
              y1={yTop}
              y2={yBottom} />
      </g>

      <g id="dims"
         fontFamily="system-ui, sans-serif"
         fontSize={.2}
         fontWeight={700}
         fill="black"
         strokeWidth={.01}
      >
        <g transform={'translate(' + xFrontCenter + ', ' + (yBottom + vb.offsetY / 2) + ')'}>
          <line
            x1={-params.w1 / 2}
            y1={-vb.offsetY * 3 / 8}
            x2={-params.w1 / 2}
            y2={vb.offsetY / 4}
            stroke="black"
          />
          <line
            x1={params.w1 / 2}
            y1={-vb.offsetY * 3 / 8}
            x2={params.w1 / 2}
            y2={vb.offsetY / 4}
            stroke="black"
          />
          <line
            x1={-params.w1 / 2}
            y1={0}
            x2={params.w1 / 2}
            y2={0}
            stroke="black"
            markerStart="url(#arrow-start)"
            markerEnd="url(#arrow-end)"
          />
          <text
            x={0}
            y={0}
            textAnchor="middle"
          >w1
          </text>
        </g>
        <g transform={'translate(' + xFrontCenter + ', ' + (yTop - vb.offsetY / 2) + ')'}>
          <line
            x1={-params.w2 / 2}
            y1={vb.offsetY * 3 / 8}
            x2={-params.w2 / 2}
            y2={-vb.offsetY / 4}
            stroke="black"
          />
          <line
            x1={params.w2 / 2}
            y1={vb.offsetY * 3 / 8}
            x2={params.w2 / 2}
            y2={-vb.offsetY / 4}
            stroke="black"
          />

          <line x1={-params.w2 / 2}
                y1={0}
                x2={params.w2 / 2}
                y2={0}
                stroke="black"
                markerStart="url(#arrow-start)"
                markerEnd="url(#arrow-end)"
          />
          <text x={0}
                y={0}
                textAnchor="middle"
          >w2
          </text>
        </g>
        <g transform={'translate(' + xFrontCenter + ', ' + (yCenter) + ')'}>
          <line x1={0}
                y1={0}
                x2={-Math.min(params.w1 / 2) * Math.cos(Math.PI / 4)}
                y2={-Math.min(params.w1 / 2) * Math.sin(Math.PI / 4)}
                stroke="black"
                markerStart="url(#arrow-start)"
                markerEnd="url(#arrow-end)"
          />
          <text x={-Math.min(params.w1 / 2) * 1.1 * Math.cos(Math.PI / 4)}
                y={-Math.min(params.w1 / 2) * 1.1 * Math.cos(Math.PI / 4)}
                textAnchor="middle"
          >e1
          </text>
        </g>
        <g transform={'translate(' + xSideLeft + ', ' + yCenter + ')'}>

          <line
            x1={-vb.offsetX / 2}
            y1={-params.Dp / 2}
            x2={-vb.offsetX / 8}
            y2={-params.Dp / 2}
            stroke="black"
          />
          <line
            x1={-vb.offsetX / 2}
            y1={params.Dp / 2}
            x2={-vb.offsetX / 8}
            y2={params.Dp / 2}
            stroke="black"
          />
          <line
            x1={-vb.offsetX * 7 / 8}
            y1={-params.D / 2}
            x2={-vb.offsetX / 8}
            y2={-params.D / 2}
            stroke="black"
          />
          <line
            x1={-vb.offsetX * 7 / 8}
            y1={params.D / 2}
            x2={-vb.offsetX / 8}
            y2={params.D / 2}
            stroke="black"
          />
          <line
            x1={-vb.offsetX / 4}
            y1={-params.Dp / 2}
            x2={-vb.offsetX / 4}
            y2={params.Dp / 2}
            stroke="black"
            markerStart="url(#arrow-start)"
            markerEnd="url(#arrow-end)"
          />
          <text
            x={-vb.offsetX / 4}
            y={0}
            textAnchor="middle"
            markerStart="url(#arrow-start)"
            markerEnd="url(#arrow-end)"
          >Dp
          </text>

          <line
            x1={-vb.offsetX * 3 / 4}
            y1={-params.D / 2}
            x2={-vb.offsetX * 3 / 4}
            y2={params.D / 2}
            stroke="black"
            markerStart="url(#arrow-start)"
            markerEnd="url(#arrow-end)"
          />
          <text
            x={-vb.offsetX * 3 / 4}
            y={0}
            textAnchor="middle"
          >D
          </text>
        </g>
        <g transform={'translate(' + xSideLeft + ', 0)'}>

          {/* thickness labels */}
          {params.mode === LugMode.double ? (
            <g>
              <line
                x1={0}
                y1={yTop + vb.offsetY * .3}
                x2={0}
                y2={yCenter - params.e1 - .1}
                stroke="black"
              />
              <line
                x1={params.t1}
                y1={yTop + vb.offsetY * .3}
                x2={params.t1}
                y2={yCenter - params.e1 - .1}
                stroke="black"
              />
              <line
                x1={0}
                y1={yTop + vb.offsetY * .5}
                x2={params.t1}
                y2={yTop + vb.offsetY * .5}
                stroke="black"
                markerStart="url(#arrow-start)"
                markerEnd="url(#arrow-end)"
              />


              <text
                x={-.1}
                y={yTop + vb.offsetY * .6}
                textAnchor="end"
              >t1
              </text>

              <line
                x1={params.t1 + params.g}
                y1={yTop + vb.offsetY}
                x2={params.t1 + params.g}
                y2={yTop}
                stroke="black"
              />
              <line
                x1={params.t1 + params.g + params.t2}
                y1={yTop + vb.offsetY / 4}
                x2={params.t1 + params.g + params.t2}
                y2={yTop}
                stroke="black"
              />
              <line
                x1={params.t1 + params.g}
                y1={yTop + vb.offsetY * .25}
                x2={params.t1 + params.g + params.t2}
                y2={yTop + vb.offsetY * .25}
                stroke="black"
                markerStart="url(#arrow-end)"
                markerEnd="url(#arrow-start)"
              />
              <text
                x={params.t1 + params.g - .3}
                y={yTop + vb.offsetY * .3}
                textAnchor="end"
              >t2
              </text>


              <line
                x1={params.t1 + params.t2 + params.g}
                y1={yTop + vb.offsetY / 4}
                x2={params.t1 + params.t2 + params.g}
                y2={yTop}
                stroke="black"
              />
              <line
                x1={params.t1 + params.t2 + params.g * 2}
                y1={yTop + vb.offsetY / 4}
                x2={params.t1 + params.t2 + params.g * 2}
                y2={yCenter - params.w2 / 2}
                stroke="black"
              />
              <line
                x1={params.t1 + params.t2 + params.g}
                y1={yTop + vb.offsetY * .75}
                x2={params.t1 + params.t2 + params.g * 2}
                y2={yTop + vb.offsetY * .75}
                stroke="black"
                markerStart="url(#arrow-end)"
                markerEnd="url(#arrow-start)"
              />

              <text
                x={params.t1 + params.t2 + params.g * 2 + .3}
                y={yTop + vb.offsetY * .75}
                textAnchor="middle"
              >g
              </text>
            </g>
          ) : (
            <g>
              <line
                x1={0}
                y1={yTop}
                x2={params.t1}
                y2={yTop}
                stroke="black"
              />
              <text
                x={params.t1 / 2}
                y={yTop}
                textAnchor="end"
              >t1
              </text>
              <line
                x1={params.t1}
                y1={yTop - vb.offsetY * .5}
                x2={params.t1 + params.t2}
                y2={yTop - vb.offsetY * .5}
                stroke="black"
              />
              <text
                x={params.t1 + params.t2 / 2}
                y={yTop - vb.offsetY * .5}
                textAnchor="end"
              >t2
              </text>
            </g>
          )}
        </g>
      </g>

      <g id="forces" fontFamily="system-ui, sans-serif"
         fontSize={.35}
         fontWeight={700}>
        <g transform={'translate(' + xSideCenter + ', ' + yTop + ')'}>
          <line strokeWidth={.04}
                x1={0}
                x2={0}
                y1={-vb.offsetY * 3 / 4}
                y2={0}
                stroke={'red'}
                markerStart="url(#arrow-force)"
          ></line>
          <text x={-.2} y={-vb.offsetY * .5} fill="red" textAnchor="middle">F</text>

        </g>
        <g transform={'translate(' + (xSideCenter + params.t2 / 2 + params.t1 / 2 + params.g) + ', ' + yBottom + ')'}>
          <line strokeWidth={.04}
                x1={0}
                x2={0}
                y1={vb.offsetY * 3 / 4}
                y2={0}
                stroke={'red'}
                markerStart="url(#arrow-force)"
          ></line>
          <text x={.2} y={vb.offsetY * .75} fill="red" textAnchor="start">F/2</text>
        </g>
        <g transform={'translate(' + (xSideCenter - params.t2 / 2 - params.t1 / 2 - params.g) + ', ' + yBottom + ')'}>
          <line strokeWidth={.04}
                x1={0}
                x2={0}
                y1={vb.offsetY * 3 / 4}
                y2={0}
                stroke={'red'}
                markerStart="url(#arrow-force)"
          ></line>
          <text x={-.2} y={vb.offsetY * .75} fill="red" textAnchor="end">F/2</text>
        </g>
      </g>
    </svg>
  );

};

export default function LugCalculatorDemo() {
  const [mode, setMode] = useState<LugMode | string>(LugMode.double);
  const [units, setUnits] = useState<UnitMode | string>(UnitMode.english);
  const [conversion, setConversion] = useState<number>(1);
  const [Dp, setPinD] = useState<number | string>(0.99);
  const [D, setHoleD] = useState<number | string>(1.10);
  const [g, setGap] = useState<number | string>(0.01);
  const [t1, setT1] = useState<number | string>(0.50);
  const [t2, setT2] = useState<number | string>(0.250);
  const [w1, setW1] = useState<number | string>(1.7);
  const [w2, setW2] = useState<number | string>(2.0);
  const [e1, setEd1] = useState<number | string>(Number(w1) / 2);
  const [e2, setEd2] = useState<number | string>(Number(w2) / 2);

  const [params, setParams] = useState<LugParams>({
    mode: mode,
    units: units,
    Dp: Number(Dp),
    D: Number(D),
    g: Number(g),
    t1: Number(t1),
    t2: Number(t2),
    w1: Number(w1),
    w2: Number(w2),
    e1: Number(e1),
    e2: Number(e2),

  });
  const [allow, setAllow] = useState<Allowables>(DEFAULT_ALLOW);

  function lengthUnits() {
    return (units === UnitMode.english ? 'in' : 'mm');
  };

  return (
    <Container strategy="grid">
      <Flex bg="grape" direction="row" wrap="nowrap" justify="stretch" align="flex-start">

        <Flex p={0} bg="teal" miw={250} mah="calc(100dvh - var(--app-shell-header-height))" direction="column"
              justify="stretch" align="flex-start">

          <Container w="100%" fluid p="xs">
            <SegmentedControl
              value={mode}
              onChange={setMode}
              fullWidth
              data={[
                {
                  value: 'single',
                  label: 'Single',
                },
                {
                  value: 'double',
                  label: 'Double',
                },
              ]}
            />
          </Container>

          <Container w="100%" fluid p="xs">
            <SegmentedControl
              value={units}
              onChange={setUnits}
              fullWidth
              data={[
                {
                  value: 'english',
                  label: 'English',
                },
                {
                  value: 'metric',
                  label: 'Metric',
                },
              ]}
            />
          </Container>

          <Container w="100%" p={0} fluid size="xs" m={0} style={{ overflow: 'auto' }}>
            <Fieldset>
              <NumberInput label="Pin Diameter [Dp]"
                           min={0.1}
                           max={Number(D)}
                           value={Dp}
                           onChange={setPinD}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={3}
                           step={0.05}
                           fixedDecimalScale
              />
              <NumberInput label="Hole Diameter [D]"
                           min={Number(Dp)}
                           max={Math.min(Number(w1), Number(w2))}
                           value={D}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={3}
                           step={0.05}
                           fixedDecimalScale
                           onChange={setHoleD}
              />


              <NumberInput label="Lug 1 Width [w1]"
                           min={Number(D)}
                           value={w1}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={3}
                           step={0.1}
                           fixedDecimalScale
                           onChange={setW1}
              />
              <Fieldset>
                <Switch label="half width"
                        defaultChecked={true}></Switch>

                <NumberInput label="e1 (edge distance)"
                             allowNegative={false}
                             min={Number(D) / 2}
                             suffix={' ' + lengthUnits()}
                             decimalScale={3}
                             step={0.05}
                             fixedDecimalScale
                             value={Number(w1) / 2}
                             onChange={setEd1} />

              </Fieldset>
              <NumberInput label="Lug 2 Width [w2]"
                           min={Number(D)}
                           value={w2}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={3}
                           step={0.05}
                           fixedDecimalScale
                           onChange={setW2}
              />
              <Fieldset>
                <Switch label="half width"
                        defaultChecked={true}></Switch>
                <NumberInput label="e2 (edge distance)"
                             allowNegative={false}
                             min={Number(D) / 2}
                             suffix={' ' + lengthUnits()}
                             decimalScale={3}
                             step={0.05}
                             fixedDecimalScale
                             value={Number(w2) / 2}
                             onChange={setEd2} />

              </Fieldset>
            </Fieldset>


            <Fieldset>
              <NumberInput label="Lug 1 Thick [t1]"
                           value={t1}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={2}
                           step={0.05}
                           fixedDecimalScale
                           onChange={setT1}
              />
              <NumberInput label="Lug 2 Thick [t2]"
                           value={t2}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={3}
                           step={0.05}
                           fixedDecimalScale
                           onChange={setT2} />
              <NumberInput label="g (gap)"
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={3}
                           step={0.01}
                           fixedDecimalScale
                           value={g}
                           onChange={setGap}
              />
            </Fieldset>

          </Container>

        </Flex>
        <Container
          w="100%"
          mah="calc(100dvh - var(--app-shell-header-height))"
          bg="lime">

          <Card bg="white" mah="calc(100dvh - var(--app-shell-header-height))">
            <LugSketch params={{
              mode: mode,
              units: units,
              Dp: Number(Dp),
              D: Number(D),
              g: Number(g),
              t1: Number(t1),
              t2: Number(t2),
              w1: Number(w1),
              w2: Number(w2),
              e1: (Number(w1) / 2),
              e2: (Number(w2) / 2),

            }} />

          </Card>
        </Container>
      </Flex>
    </Container>
  );
}


function Arrow({ x1, y1, x2, y2, label, labelAnchor, strokeWidth }: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  strokeWidth: number;
  labelAnchor?: 'start' | 'middle' | 'end';
}) {

  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.hypot(dx, dy);
  const ux = dx / L;
  const uy = dy / L;
  const hx = x2 - ux * .2;
  const hy = y2 - uy * .2;

  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} />
      <polygon
        points={`
            ${x2},${y2} 
            ${x2 - ux * 0.2 - uy * 0.1},${y2 - uy * 0.2 + ux * 0.1} 
            ${x2 - ux * 0.2 + uy * 0.1},${y2 - uy * 0.2 - ux * 0.1}`} />
      <text
        x={(x1 + x2) / 2 + .4}
        y={(y1 + y2) / 2}
        textAnchor={labelAnchor ?? 'start'}
      >{label}
      </text>

    </g>
  );
}