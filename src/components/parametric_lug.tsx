import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Container, Fieldset, Flex, NumberInput, SegmentedControl, ScrollArea, Text } from '@mantine/core';
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
  e: number;          // Edge distance (hole center to free end)
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

  let e = Math.max(p.e, D * 0.6); // simplistic floor; adjust to your rule
  let g = p.mode === LugMode.double ? Math.max(p.g, Dp * 0.1) : 0;

  return { ...p, D, Dp, t1, t2, w1, w2, e, g };
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
  if (p.e < 1.5 * p.D) warnings.push(`Edge distance e < 1.5D (e=${p.e.toFixed(1)}, D=${p.D.toFixed(1)})`);
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
  const margin = .1;
  const vb = useMemo(() => {
    const W = dim.width + dim.width * margin * 3;
    const H = dim.height + dim.height * margin * 2;
    return { viewBox: `0 0 ${W} ${H}`, offsetX: W * margin, offsetY: H * margin, W, H };
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
  const A = { ...DEFAULT_ALLOW, ...(allow ?? {}) } as Allowables;
  // const R = calc(p, A);

  const maxWidth = Math.max(params.w1, params.w2);
  const totalThk = params.mode === LugMode.double ? (params.t1 * 2 + params.g * 2 + params.t2) : params.t1 + params.t2;
  const maxHeight = Math.max(maxWidth, params.e * 2) * 1.5;
  const vb = useFit({ width: (maxWidth + totalThk), height: maxHeight });
  // Hole center
  const cx = vb.offsetX + maxWidth / 2;
  const cx2 = vb.W - vb.offsetX - totalThk / 2;

  const cy = vb.H / 2;

  const yOuterTop = cy - params.w1 / 2;
  const yOuterBot = vb.H - vb.offsetY;

  const yCenterTop = vb.offsetY;
  const yCenterBot = cy + params.w2 / 2;


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
         style={style}
         viewBox={vb.viewBox}
         strokeWidth=".25%"
         xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="lug_1_hole" clipPathUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={params.D / 2} />
        </clipPath>

        <clipPath id="lug_2_hole" clipPathUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={params.D / 2} />
        </clipPath>


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
      </defs>

      <mask id="remove1" maskContentUnits="objectBoundingBox">
        <rect x="0" y="0" width="100%" height="100%" fill="white" stroke="black" />
        <circle cx={cx} cy={cy} r={params.D / 2} />
      </mask>
      <mask id="remove2" maskContentUnits="userSpaceOnUse ">
        <rect x="0" y="0" width="100%" height="100%" fill="white" stroke="black" />
        <circle cx={cx} cy={cy} r={params.D / 2} />
      </mask>

      <path id="lug2"
            d={`M ${cx - params.w2 / 2} ${yOuterBot} 
            V ${cy} 
            A ${params.w2 / 2} ${params.w2 / 2} 0 0 1 ${cx + params.w2 / 2} ${cy} 
            V ${yOuterBot} S`}
            stroke={color.dim}

      >
      </path>

      <path id="lug1"
            d={`M ${cx - params.w1 / 2} ${yCenterTop} 
            V ${cy} 
            A ${params.w1 / 2} ${params.w1 / 2} 1 0 0 ${cx + params.w1 / 2} ${cy} 
            V ${yCenterTop} S`}
            stroke={color.dim}
      >
      </path>
      <use mask="url(#remove1)" href="#lug1" fill={color.lug1} />
      <use clip-path="url(#lug_1_hole)" href="#lug1" fill={color.hole} />

      <use mask="url(#remove2" href="#lug2" fill={color.lug2} />
      <use clip-path="url(#lug_2_hole)" href="#lug2" fill={color.hole} />

      <path id="lug1_outline"
            d={`M ${cx - params.w1 / 2} ${yCenterTop} 
            V ${cy} 
            A ${params.w1 / 2} ${params.w1 / 2} 1 0 0 ${cx + params.w1 / 2} ${cy} 
            V ${yCenterTop} S`}
            stroke={color.dim}
            fill="none"
            strokeDasharray={vb.W / 50 + ' ' + vb.W / 50}
      >
      </path>
      <rect id="lugTopSide"
            x={vb.offsetX * 2 + maxWidth}
            y={yOuterTop}
            width={params.t2}
            height={yOuterBot - yOuterTop}
            stroke={color.dim}
            fill={color.lug2} />

      <rect id="lugCenterSide"
            x={vb.offsetX * 2 + maxWidth + params.t2 + params.g}
            y={yCenterTop}
            width={params.t1}
            height={yCenterBot - yCenterTop}
            stroke={color.dim}
            fill={color.lug1} />

      <rect id="lugBottom"
            x={vb.offsetX * 2 + maxWidth + params.t1 + params.t2 + params.g * 2}
            y={yOuterTop}
            width={params.t2}
            height={yOuterBot - yOuterTop}
            stroke={color.dim}
            fill={color.lug2}
      />


      <circle id="hole"
              ref={refHole}
              cx={cx}
              cy={cy}
              r={params.D / 2}
              stroke={color.dim}
              fill={color.hole} />

      <circle id="pin"
              ref={refPin}
              cx={cx}
              cy={cy}
              r={params.Dp / 2}
              stroke={color.dim}
              fill={color.pin} />

      <rect id="hole_side"
            x={vb.offsetX * 2 + maxWidth}
            y={cy - params.D / 2}
            width={params.t1 + params.t2 * 2 + params.g * 2}
            height={params.D}
            stroke={color.dim}
            fill={color.hole} />

      <rect id="pin_side"
            x={vb.offsetX * 2 + maxWidth}
            y={cy - params.Dp / 2}
            width={params.t1 + params.t2 * 2 + params.g * 2}
            height={params.Dp}
            stroke={color.dim}
            fill={color.pin} />

      <line x1={vb.offsetX}
            x2={vb.offsetX + maxWidth}
            y1={cy}
            y2={cy}
            stroke={color.dim}
            strokeWidth=".25%"
            strokeDasharray={vb.W / 25 + ' ' + vb.W / 25} />

      <line x1={2 * vb.offsetX + maxWidth}
            x2={vb.W - vb.offsetY}
            y1={cy}
            y2={cy}
            stroke={color.dim}
            strokeWidth=".25%"
            strokeDasharray={vb.W / 25 + ' ' + vb.W / 25} />

      <line x1={cx}
            x2={cx}
            y1={vb.offsetY}
            y2={vb.H - vb.offsetY}
            stroke={color.dim}
            strokeWidth=".25%"
            strokeDasharray={vb.W / 25 + ' ' + vb.W / 25} />

      const left = {cx + maxWidth / 2 + vb.offsetX + params.t2}
      <line x1={params.mode == 'double' ? cx + maxWidth / 2 + vb.offsetX + params.t2 + params.g + params.t1 / 2 :
        cx + maxWidth / 2 + vb.offsetX + params.t2}
            x2={params.mode == 'double' ? cx + maxWidth / 2 + vb.offsetX + params.t2 + params.g + params.t1 / 2 :
              cx + maxWidth / 2 + vb.offsetX + params.t2}
            y1={vb.offsetY}
            y2={vb.H - vb.offsetY}
            stroke={color.dim}
            strokeWidth=".25%"
            strokeDasharray={vb.W / 25 + ' ' + vb.W / 25} />

      <g id="dims"
         fontFamily="system-ui, sans-serif"
         fontSize={.2}
         fontWeight={700}
         fill="black"
         strokeWidth={.01}
      >


        <line x1={cx}
              y1={cy}
              x2={cx - Math.min(params.w1, params.w2) / 2 * Math.cos(Math.PI / 4)}
              y2={cy + Math.min(params.w1, params.w2) / 2 * Math.sin(Math.PI / 4)}
              stroke="black"
              markerStart="url(#arrow-start)"
              markerEnd="url(#arrow-end)"
        />
        <text x={cx - Math.min(params.w1, params.w2) / 2}
              y={cy + Math.min(params.w1, params.w2) / 2}
              textAnchor="middle"
        >e
        </text>

        {/* diameters */}
        <line
          x1={cx}
          y1={cy - params.D / 2}
          x2={cx}
          y2={cy + params.D / 2}
          stroke="#555" />
        <text
          x={cx - params.Dp / 2}
          y={cy - params.Dp / 2}
          textAnchor="middle"
        >D
        </text>
        <text
          x={cx + params.Dp / 2}
          y={cy - params.Dp / 2}
          textAnchor="middle"
        >Dp
        </text>

        {/* thickness labels */}
        {params.mode === LugMode.double ? (
          <>
            <line
              x1={vb.offsetX - 14 * 0.1}
              y1={yOuterTop}
              x2={vb.offsetX - 14 * 0.1}
              y2={yOuterTop + params.t1}
              stroke="#555"
              markerStart="url(#arrow-start)"
              markerEnd="url(#arrow-end)" />
            <text
              x={vb.offsetX - 18 * 0.1}
              y={yOuterTop + params.t1 / 2}
              textAnchor="end"
            >t1
            </text>
            <line
              x1={vb.offsetX - 32 * 0.1}
              y1={yCenterTop} x2={vb.offsetX - 32 * 0.1}
              y2={yCenterTop + params.t2}
              stroke="#555"
              markerStart="url(#arrow-start)"
              markerEnd="url(#arrow-end)"
            />
            <text
              x={vb.offsetX - 36 * 0.1}
              y={yCenterTop + params.t2 / 2}
              textAnchor="end"
            >t2
            </text>
            <line
              x1={vb.offsetX - 8 * 0.1}
              y1={cy - params.g / 2}
              x2={vb.offsetX - 8 * .1}
              y2={cy + params.g / 2}
              stroke="#555"
              markerStart="url(#arrow-start)"
              markerEnd="url(#arrow-end)" />
            <text
              x={vb.offsetX - 12 * 0.1}
              y={cy}
              textAnchor="end"
            >g
            </text>
          </>
        ) : (
          <>
            <line
              x1={vb.offsetX - 14 * 0.1}
              y1={cy - params.t1 / 2}
              x2={vb.offsetX - 14 * 0.1}
              y2={cy + params.t1 / 2}
              stroke="#555"
              markerStart="url(#arrow-start)"
              markerEnd="url(#arrow-end)" />
            <text
              x={vb.offsetX - 18 * 0.1}
              y={cy}
              textAnchor="end"
            >t1
            </text>
          </>
        )}

        {/* widths (w1, w2) */}
        <line
          x1={cx - params.w1 / 2}
          y1={vb.offsetY * .8}
          x2={cx + params.w1 / 2}
          y2={vb.offsetY * .8}
          stroke="black"
          markerStart="url(#arrow-start)"
          markerEnd="url(#arrow-end)" />
        <text
          x={cx}
          y={vb.offsetY * .5}
          textAnchor="middle"
        >w1
        </text>

        <line x1={cx - params.w2 / 2}
              y1={vb.H - vb.offsetY * .8}
              x2={cx + params.w2 / 2}
              y2={vb.H - vb.offsetY * .8}
              stroke="black"
              markerStart="url(#arrow-start)"
              markerEnd="url(#arrow-end)" />
        <text x={cx}
              y={vb.H - vb.offsetY * .5}
              textAnchor="middle"
        >w2
        </text>


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
  const [e, setEd] = useState<number | string>(0.25);


  const [params, setParams] = useState<LugParams>({
    mode: LugMode.double,
    units: UnitMode.english,
    Dp: 0.99,
    D: 1.1,
    g: 0.01,
    t1: 0.5,
    t2: 0.25,
    w1: 1.7,
    w2: 2.0,
    e: .25,
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
                           step={0.01}
                           fixedDecimalScale
              />
              <NumberInput label="Hole Diameter [D]"
                           min={Number(Dp)}
                           max={Math.min(Number(w1), Number(w2))}
                           value={D}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={3}
                           step={0.01}
                           fixedDecimalScale
                           onChange={setHoleD}
              />
            </Fieldset>

            <Fieldset>
              <NumberInput label="Lug 1 Thick [t1]"
                           value={t1}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={2}
                           step={0.01}
                           fixedDecimalScale
                           onChange={setT1}
              />
              <NumberInput label="Lug  Width [w1]"
                           min={Number(D)}
                           value={w1}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={2}
                           step={0.1}
                           fixedDecimalScale
                           onChange={setW1}
              />
            </Fieldset>
            <Fieldset>
              <NumberInput label="Lug 2 Thick [t2]"
                           value={t2}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={2}
                           step={0.01}
                           fixedDecimalScale
                           onChange={setT2} />
              <NumberInput label="Lug 2 Width [w2]"
                           min={Number(D)}
                           value={w2}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={2}
                           step={0.1}
                           fixedDecimalScale
                           onChange={setW2}
              />
            </Fieldset>
            <Fieldset>
              <NumberInput label="e (edge distance)"
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={2}
                           step={0.1}
                           fixedDecimalScale
                           value={e}
                           onChange={setEd} />
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
          <Card mah="calc(100dvh - var(--app-shell-header-height))">
            <LugSketch params={{ ...params }} />

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