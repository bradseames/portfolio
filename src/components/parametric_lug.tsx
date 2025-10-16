import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Container, Fieldset, Flex, NumberInput, SegmentedControl, ScrollArea, Text } from '@mantine/core';

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
    const W = dim.width + dim.width * margin * 4;
    const H = dim.height + dim.height * margin * 3;
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
  params, allow, L, showDims = false, showLoads = true, showWarnings = true, showPanels = true, style,
}) => {
  const p = validate(params);
  const A = { ...DEFAULT_ALLOW, ...(allow ?? {}) } as Allowables;
  const R = calc(p, A);

  // Nominal overall length
  // const lengthX = L ?? (p.e * 2 + p.D * 2);
  const maxWidth = Math.max(params.w1, params.w2);
  const totalThk = params.mode === LugMode.double ? (params.t1 * 2 + params.g * 2 + params.t2) : params.t1 + params.t2;
  const maxHeight = Math.max(maxWidth, params.e * 2) * 1.4;
  const vb = useFit({ width: (maxWidth + totalThk), height: maxHeight });

  // Hole center
  const cx = vb.offsetX + maxWidth / 2;
  const cx2 = vb.W - vb.offsetX - totalThk / 2;

  const cy = vb.H / 2;

  // const plateLen = lengthX;

  // y positions
  // const yOuterTop = cy - (params.mode === LugMode.double ? (params.g / 2 + params.t1) : params.t1 / 2);
  // const yOuterBot = cy + (params.mode === LugMode.double ? (params.g / 2) : 0);
  // const yCenterTop = cy - params.t2 / 2;

  const yOuterTop = cy - params.w1 / 2;
  const yOuterBot = vb.H - vb.offsetY;

  const yCenterTop = vb.offsetY;
  const yCenterBot = cy + params.w2 / 2;

  // Refs (optional for D3)
  const refHole = useRef<SVGCircleElement>(null);
  const refPin = useRef<SVGCircleElement>(null);

  useEffect(() => { (window as any)._lugRefs = { hole: refHole.current, pin: refPin.current }; }, []);

  // Visual helpers
  const warn = showWarnings && R.warnings.length > 0;
  const warnStroke = warn ? '#c1121f' : '#222';
  const warnFill = warn ? 'cyan' : 'teal';


  return (
    <svg id="lug-svg"
         width="100%"
         style={style}
         viewBox={vb.viewBox}
         strokeWidth={.01}
         xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="lug_1_hole" clipPathUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={params.D / 2} />
        </clipPath>

        <clipPath id="lug_2_hole" clipPathUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={params.D / 2} />
        </clipPath>
      </defs>

      <mask id="remove1" maskContentUnits="objectBoundingBox">
        <rect x="0" y="0" width="100%" height="100%" fill="white" stroke="black" />
        <circle cx={cx} cy={cy} r={params.D / 2} />
      </mask>
      <mask id="remove2" maskContentUnits="userSpaceOnUse ">
        <rect x="0" y="0" width="100%" height="100%" fill="white" stroke="black" />
        <circle cx={cx} cy={cy} r={params.D / 2} />
      </mask>

      <path id="lug1" stroke="black"
            d={`M ${cx - params.w1 / 2} ${yOuterBot} 
            V ${cy} 
            A ${params.w1 / 2} ${params.w1 / 2} 0 0 1 ${cx + params.w1 / 2} ${cy} 
            V ${yOuterBot} S`}>
      </path>

      <path id="lug2" stroke="black"
            d={`M ${cx - params.w2 / 2} ${yCenterTop} 
            V ${cy} 
            A ${params.w2 / 2} ${params.w2 / 2} 1 0 0 ${cx + params.w2 / 2} ${cy} 
            V ${yCenterTop} S`}>
      </path>

      <use mask="url(#remove1)" href="#lug1" fill="grey" />
      <use clip-path="url(#lug_1_hole)" href="#lug1" fill="white" />

      <use mask="url(#remove2" href="#lug2" fill="blue" />
      <use clip-path="url(#lug_2_hole)" href="#lug2" fill="white" />


      {/*<rect id="lugTop"*/}
      {/*      x={cx - params.w1 / 2}*/}
      {/*      y={yOuterTop}*/}
      {/*      width={params.w1}*/}
      {/*      height={yOuterBot - yOuterTop}*/}
      {/*      fill={warnFill}*/}
      {/*      stroke={warnStroke} />*/}

      {/*<rect id="lugCenter"*/}
      {/*      x={cx - params.w2 / 2}*/}
      {/*      y={yCenterTop}*/}
      {/*      width={params.w2}*/}
      {/*      height={yCenterBot - yCenterTop}*/}
      {/*      fill="cyan"*/}
      {/*      stroke={warnStroke} />*/}

      <rect id="lugTopSide"
            x={vb.offsetX * 2 + params.w1}
            y={yOuterTop}
            width={params.t1}
            height={yOuterBot - yOuterTop}
            fill={warnFill}
            stroke={warnStroke} />

      <rect id="lugCenterSide"
            x={vb.offsetX * 2 + params.w1 + params.t1 + params.g}
            y={yCenterTop}
            width={params.t2}
            height={yCenterBot - yCenterTop}
            fill="#e8e8e8"
            stroke={warnStroke} />

      <rect id="lugBottom"
            x={vb.offsetX * 2 + params.w1 + params.t1 + params.t2 + params.g * 2}
            y={yOuterTop}
            width={params.t1}
            height={yOuterBot - yOuterTop}
            fill={warnFill}
            stroke={warnStroke} />

      {/* hole & pin */}
      <circle id="hole"
              ref={refHole}
              cx={cx}
              cy={cy}
              r={params.D / 2}
              fill="red"
              stroke={warnStroke}
              strokeWidth={.01} />

      <circle id="pin"
              ref={refPin}
              cx={cx}
              cy={cy}
              r={params.Dp / 2}
              fill="#bdbdbd"
              stroke="#222"
              strokeWidth={.01} />

      <rect id="hole_side"
            x={vb.offsetX * 2 + params.w1}
            y={cy - params.D / 2}
            width={params.t1 * 2 + params.t2 + params.g * 2}
            height={params.D}
            fill={'red'}
            stroke={warnStroke} />

      <rect id="pin_side"
            x={vb.offsetX * 2 + params.w1}
            y={cy - params.Dp / 2}
            width={params.t1 * 2 + params.t2 + params.g * 2}
            height={params.Dp}
            fill={'#bdbdbd'}
            stroke={'#222'} />

      <line x1={vb.offsetX / 2}
            x2={vb.W - vb.offsetX / 2}
            y1={cy}
            y2={cy}
            stroke="black"
            strokeDasharray="6 4" />

      {/* dimension layer (minimal) */}
      {
        showDims && (
          <g id="dims"
             fontFamily="system-ui, sans-serif"
             fontSize={.2}
             fontWeight={700}
             fill="black"
             strokeWidth={.025}
          >

            {/* edge distance e */}
            <line x1={cx}
                  y1={cy}
                  x2={cx - Math.min(params.w1, params.w2) / 2 * Math.cos(Math.PI / 4)}
                  y2={cy + Math.min(params.w1, params.w2) / 2 * Math.sin(Math.PI / 4)}
                  stroke="black"
                  markerStart="url(#arrow)"
                  markerEnd="url(#arrow)" />
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
                  markerStart="url(#arrow)"
                  markerEnd="url(#arrow)" />
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
                  markerStart="url(#arrow)"
                  markerEnd="url(#arrow)"
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
                  markerStart="url(#arrow)"
                  markerEnd="url(#arrow)" />
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
                  markerStart="url(#arrow)"
                  markerEnd="url(#arrow)" />
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
              x1={vb.offsetX}
              y1={vb.offsetY * .8}
              x2={vb.offsetX + params.w1}
              y2={vb.offsetY * .8}
              stroke="black"
              markerStart="url(#arrow)"
              markerEnd="url(#arrow)" />
            <text
              x={cx}
              y={vb.offsetY * .5}
              textAnchor="middle"
            >w1
            </text>

            {params.mode === LugMode.double && (
              <>
                <line x1={vb.offsetX}
                      y1={vb.H - vb.offsetY * .8}
                      x2={vb.offsetX + params.w1}
                      y2={vb.H - vb.offsetY * .8}
                      stroke="black"
                      markerStart="url(#arrow)"
                      markerEnd="url(#arrow)" />
                <text x={cx}
                      y={vb.H - vb.offsetY * .5}
                      textAnchor="middle"
                >w2
                </text>
              </>
            )}
          </g>
        )
      }

      {/* load visualization */}
      {
        showLoads && (
          <g id="loads" stroke="red" fill="red" fontFamily="system-ui, sans-serif" fontSize={.2}>
            {/* Apply tensile P arrows at both ends for symmetry */}

            <Arrow
              x1={cx + maxWidth / 2 + vb.offsetX + totalThk / 2}
              y1={vb.offsetY}
              x2={cx + maxWidth / 2 + vb.offsetX + totalThk / 2}
              y2={0}
              labelAnchor="end"
              label="P" />
            <Arrow
              x1={cx + maxWidth / 2 + vb.offsetX + totalThk / 2 - (params.t1 + params.t2 + params.g) / 2}
              y1={vb.H - vb.offsetY}
              x2={cx + maxWidth / 2 + vb.offsetX + totalThk / 2 - (params.t1 + params.t2 + params.g) / 2}
              y2={vb.H}
              labelAnchor="end"
              label="P/2" />
            <Arrow
              x1={cx + maxWidth / 2 + vb.offsetX + totalThk / 2 + (params.t1 + params.t2 + params.g) / 2}
              y1={vb.H - vb.offsetY}
              x2={cx + maxWidth / 2 + vb.offsetX + totalThk / 2 + (params.t1 + params.t2 + params.g) / 2}
              y2={vb.H}
              labelAnchor="end"
              label="P/2" />
          </g>
        )
      }

      {/* optional in-SVG panels (off by default in the demo) */}
      {
        showPanels && (
          <g id="calc" fontFamily="system-ui, sans-serif" fontSize={.5} fill="#111">
            <rect x={vb.W - 210} y={vb.offsetY} width={190} height={120} fill="#fff" stroke="#ccc" />
            <text x={vb.W - 200} y={vb.offsetY + 16} fontWeight={600}>Derived Areas</text>
            <text x={vb.W - 200} y={vb.offsetY + 34}>A_net = {R.Anet.toFixed(2)}</text>
            <text x={vb.W - 200} y={vb.offsetY + 50}>A_bear (each) = {R.Abearing_each.toFixed(2)}</text>
            <text x={vb.W - 200} y={vb.offsetY + 66}>A_bear (total) = {R.Abearing_total.toFixed(2)}</text>
            <text x={vb.W - 200} y={vb.offsetY + 82}>A_pin(shear) = {R.Apin_shear.toFixed(2)}</text>
          </g>
        )
      }

      {
        showPanels && (
          <g id="capacity" fontFamily="system-ui, sans-serif" fontSize={.5} fill="#111">
            <rect x={vb.W - 210} y={vb.offsetY + 130} width={190} height={120} fill="#fff" stroke="#ccc" />
            <text x={vb.W - 200} y={vb.offsetY + 146} fontWeight={600}>Capacities (illustrative)</text>
            <text x={vb.W - 200} y={vb.offsetY + 164}>P_net = {R.P_net_tension.toFixed(1)}</text>
            <text x={vb.W - 200} y={vb.offsetY + 180}>P_bearing = {R.P_bearing_lug.toFixed(1)}</text>
            <text x={vb.W - 200} y={vb.offsetY + 196}>P_pin(shear) = {R.P_shear_pin.toFixed(1)}</text>
            <text x={vb.W - 200} y={vb.offsetY + 214} fontWeight={700}>P_governing = {R.P_governing.toFixed(1)}</text>
          </g>
        )
      }

      {/* warnings */}
      {
        showWarnings && (
          <g
            id="warnings"
            fontFamily="system-ui, sans-serif"
            fontSize={.2}>
            {R.warnings.map((w, i) => (
              <text
                key={i}
                x={vb.offsetX}
                y={vb.H - 0.1 * (R.warnings.length - i)}
                fill="FF6505"
                stroke="black"
              >⚠ {w}</text>
            ))}
          </g>
        )
      }

      {/*defs for dimension arrows */}
      <defs>
        {/*markerWidth="8" markerHeight="6" refX="7" refY="3" */}
        <marker
          id="arrow"
          markerWidth="1"
          markerHeight="1"
          refX=".5"
          refY=".5"
          orient="auto"
          markerUnits="strokeWidth">

          <path
            d="M0,0 L5,2 L0,5 .5"
            fill="black" />
        </marker>
      </defs>
    </svg>
  );

};

// Small arrow helper for load vectors
function Arrow({ x1, y1, x2, y2, label, labelAnchor }: {
  x1: number; y1: number; x2: number; y2: number; label?: string; labelAnchor?: 'start' | 'middle' | 'end'
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
      <line x1={x1} y1={y1} x2={hx} y2={hy} strokeWidth={.05} />
      <polygon
        points={`
        ${x2},${y2} 
        ${x2 - ux * 0.2 - uy * 0.1},${y2 - uy * 0.2 + ux * 0.1} 
        ${x2 - ux * 0.2 + uy * 0.1},${y2 - uy * 0.2 - ux * 0.1}`} />
      {label && (
        <text
          x={(x1 + x2) / 2 + .4}
          y={(y1 + y2) / 2}
          textAnchor={labelAnchor ?? 'start'}
        >{label}
        </text>
      )}

    </g>
  )
    ;
}

// ---------- Tiny self-tests for calc() ----------
// We run these at render-time and show the status in the Results panel below.
// NEVER change existing tests unless clearly wrong; add more if needed.
interface CalcTestCase {
  name: string;
  params: LugParams;
  allow: Allowables;
  expect: Partial<Result> & { P_governing?: number };
}

function approx(a: number, b: number, tolAbs = 1e-6, tolRel = 1e-4) {
  const diff = Math.abs(a - b);
  if (diff <= tolAbs) return true;
  const rel = diff / (Math.abs(b) + 1e-12);
  return rel <= tolRel;
}

function runCalcTests(): { passCount: number; total: number; details: string[] } {
  const A = DEFAULT_ALLOW;
  const tests: CalcTestCase[] = [
    {
      name: 'single: basic geometry',
      params: {
        mode: LugMode.single, units: UnitMode.english, D: 20, Dp: 10, t1: 10, t2: 0, w1: 50, w2: 0, e: 30, g: 0,
      },
      allow: A,
      expect: {
        Anet: 300,                         // 10 * (50 - 20)
        Abearing_each: 100,                // 10 * 10
        Abearing_total: 100,               // single interface
        Apin_shear: Math.PI * 100 / 4,     // ~78.5398
        P_governing: 300 * (Math.PI * 100 / 4), // tau_pin * Apin_shear ≈ 23561.9
      },
    },
    {
      name: 'double: areas/checks',
      params: {
        mode: LugMode.double, units: UnitMode.english, D: 20, Dp: 10, t1: 10, t2: 8, w1: 50, w2: 50, e: 30, g: 10,
      },
      allow: A,
      expect: {
        Anet: 300,
        Abearing_each: 100,
        Abearing_total: 200,               // two interfaces
        Apin_shear: 2 * (Math.PI * 100 / 4), // ~157.0796
        P_governing: 300 * (2 * (Math.PI * 100 / 4)), // ~47123.9
      },
    },
  ];

  let pass = 0;
  const details: string[] = [];
  for (const t of tests)
    {
      const R = calc(t.params, t.allow);
      const checks: [keyof Result, number | undefined][] = [
        ['Anet', t.expect.Anet],
        ['Abearing_each', t.expect.Abearing_each],
        ['Abearing_total', t.expect.Abearing_total],
        ['Apin_shear', t.expect.Apin_shear],
        ['P_governing', t.expect.P_governing],
      ];
      let ok = true;
      for (const [k, v] of checks)
        {
          if (typeof v === 'number')
            {
              if (!approx((R as any)[k], v))
                {
                  ok = false;
                  details.push(
                    `${t.name}: ${String(k)} expected ${v.toFixed(4)} got ${((R as any)[k] as number).toFixed(4)}`);
                }
            }
        }
      if (ok) pass++;
    }
  return { passCount: pass, total: tests.length, details };
}

// ---------- Dashboard Demo ----------
export default function LugCalculatorDemo() {
  const [mode, setMode] = useState<LugMode | string>(LugMode.double);
  const [units, setUnits] = useState<UnitMode | string>(UnitMode.english);
  const [conversion, setConversion] = useState<number>(1);
  const [Dp, setPinD] = useState<number | string>(0.99);
  const [D, setHoleD] = useState<number | string>(1.10);
  const [g, setGap] = useState<number | string>(0.01);
  const [t1, setT1] = useState<number | string>(0.50);
  const [t2, setT2] = useState<number | string>(0.250);
  const [w1, setW1] = useState<number | string>(2.0);
  const [w2, setW2] = useState<number | string>(1.7);
  const [e, setEd] = useState<number | string>(0.25);


  const [params, setParams] = useState<LugParams>({
    mode: LugMode.double,
    units: UnitMode.english,
    Dp: 0.99,
    D: 1.1,
    g: 0.01,
    t1: 0.5,
    t2: 0.25,
    w1: 2.0,
    w2: 1.7,
    e: .25,
  });

  const [allow, setAllow] = useState<Allowables>(DEFAULT_ALLOW);

  // Compute with the current mode merged into params to keep panels in sync
  const R = calc({ ...params, mode }, allow);
  const testStatus = runCalcTests();

  const upd = (k: keyof LugParams) => (e: React.ChangeEvent<HTMLInputElement>) => setParams(
    p => ({ ...p, [k]: Number(e.target.value) }));
  const updA = (k: keyof Allowables) => (e: React.ChangeEvent<HTMLInputElement>) => setAllow(
    a => ({ ...a, [k]: Number(e.target.value) }));

  function lengthUnits() {
    return (units === UnitMode.english ? 'in' : 'mm');
  };

  function lengthStress() {
    return (units === UnitMode.english ? 'psi' : 'Pa');
  };
  return (

    <Container strategy="grid">      {/* Inputs */}
      <Flex bg="grape" direction="row" wrap="nowrap" justify="flex-start" align="flex-start">

        <Flex p={0} bg="teal" miw={250} mah="calc(100dvh - var(--app-shell-header-height))" direction="column"
              justify="flex-start" align="flex-start">

          {/*<h3 className="font-semibold">Geometry</h3>*/}

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
                           onChange={setHoleD} />
            </Fieldset>
            <Fieldset>


              <NumberInput label="Lug 1 Thick [t1]"
                           value={t1}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={2}
                           step={0.01}
                           fixedDecimalScale
                           onChange={setT1} />

              <NumberInput label="Lug  Width [w1]"
                           min={Number(D)}
                           value={w1}
                           allowNegative={false}
                           suffix={' ' + lengthUnits()}
                           decimalScale={2}
                           step={0.1}
                           fixedDecimalScale
                           onChange={setW1} />

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
                           onChange={setW2} />
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
                           step={0.001}
                           fixedDecimalScale
                           value={g}
                           onChange={setGap} />

            </Fieldset>
          </Container>
        </Flex>

        {/* Allowables */}

        {/*<Flex bg="cyan" direction="column" justify="flex-start" align="flex-start">*/}
        {/*  /!*<div className="space-y-3 lg:col-span-3">*!/*/}

        {/*  <h3 className="font-semibold">Allowables (illustrative)</h3>*/}
        {/*  /!*<div className="grid grid-cols-2 md:grid-cols-4 gap-3">*!/*/}
        {/*  <Num label="σ_t,lug" value={allow.sigma_t_lug} onChange={updA('sigma_t_lug')} />*/}
        {/*  <Num label="σ_b,lug" value={allow.sigma_b_lug} onChange={updA('sigma_b_lug')} />*/}
        {/*  <Num label="τ_pin" value={allow.tau_pin} onChange={updA('tau_pin')} />*/}
        {/*  <Num label="σ_b,pin" value={allow.sigma_b_pin} onChange={updA('sigma_b_pin')} />*/}
        {/*  /!*</div>*!/*/}
        {/*  /!*<p className="text-sm text-gray-600">Units must be consistent with geometry (e.g., mm + MPa → N). Replace*!/*/}
        {/*  /!*  with*!/*/}
        {/*  /!*  spec values for real work.</p>*!/*/}

        {/*  /!*</div>*!/*/}
        {/*</Flex>*/}


        {/* Sketch */}
        {/*<div className="lg:col-span-2 border rounded-xl overflow-hidden shadow-sm min-h-[360px]">*/}

        <Container
          w="100%"
          mah="calc(100dvh - var(--app-shell-header-height))"
          bg="lime">
          <Card mah="calc(100dvh - var(--app-shell-header-height))">
            <LugSketch params={{ ...params, mode }}
                       allow={allow}
                       showDims={true}
                       showLoads={true}
                       showWarnings={true}
                       showPanels={true}
                       style={{ backgroundColor: 'purple', borderRadius: 20 }}
            />

          </Card>
        </Container>
      </Flex>


      {/*</div>*/}
      {/*</Flex>*/}
      {/* Results + Equations */}
      <div className="lg:col-span-1 space-y-3 overflow-auto">
        <div className="border rounded-xl p-3">
          <h3 className="font-semibold mb-1">Results</h3>
          <div className="text-sm">A_net = {R.Anet.toFixed(2)}</div>
          <div className="text-sm">A_bear(each) = {R.Abearing_each.toFixed(2)}</div>
          <div className="text-sm">A_bear(total) = {R.Abearing_total.toFixed(2)}</div>
          <div className="text-sm">A_pin(shear) = {R.Apin_shear.toFixed(2)}</div>
          <div className="mt-2 text-sm">P_net = {R.P_net_tension.toFixed(1)}</div>
          <div className="text-sm">P_bearing = {R.P_bearing_lug.toFixed(1)}</div>
          <div className="text-sm">P_pin(shear) = {R.P_shear_pin.toFixed(1)}</div>
          <div className="font-semibold">P_governing = {R.P_governing.toFixed(1)}</div>
          {R.warnings.length > 0 && (
            <div className="mt-2 text-sm text-red-700">
              {R.warnings.map((w, i) => <div key={i}>⚠ {w}</div>)}
            </div>
          )}
          <div className="mt-3 text-xs text-gray-600">
            Self-tests: {testStatus.passCount}/{testStatus.total} passed
            {testStatus.details.length > 0 && (
              <details className="mt-1">
                <summary>Details</summary>
                <ul className="list-disc pl-4">{testStatus.details.map((d, i) => (<li key={i}>{d}</li>))}</ul>
              </details>
            )}
          </div>
        </div>
        <div className="border rounded-xl p-3">
          <h3 className="font-semibold mb-2">Equations</h3>
          {/* Render with MathJax if present; otherwise show TeX as code */}
          <Eq tex={'A_{net} = t_{crit}\\,(w_{crit}-D)'} />
          <Eq tex={'A_{b,\\,each} = t_{crit}\\, D_p'} />
          <Eq tex={'A_{b,\\,total} = n_{if}\\, t_{crit}\\, D_p'} />
          <Eq tex={'A_{pin} = n_{s}\\, \\frac{\\pi D_p^2}{4}'} />
          <Eq tex={'P_{net} = \\sigma_{t,\\,lug} \\; A_{net}'} />
          <Eq tex={'P_{bearing} = \\sigma_{b,\\,lug} \\; A_{b,\\,total}'} />
          <Eq tex={'P_{pin} = \\tau_{pin} \\; A_{pin}'} />
          <Eq tex={'P_{governing} = \\min\\{P_{net},\\, P_{bearing},\\, P_{pin}\\}'} />
          <p className="text-xs text-gray-600 mt-2">If MathJax is available, equations are typeset automatically;
            otherwise TeX is shown as code (no external loads).</p>
        </div>
      </div>
    </Container>
  );
}


function Num({ label, value, onChange }: {
  label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block text-sm">
      <div className="text-gray-700 mb-1">{label}</div>
      <input type="number" step={1} value={value} onChange={onChange} className="w-full border rounded px-2 py-1" />
    </label>
  );
}
