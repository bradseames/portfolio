import { type LugParams, type Allowables, LugMode, UnitMode } from './types';
// ---------- Defaults ----------
export const DEFAULT_ALLOW: Allowables = {

  // Female Lugs, 1 (Outer)   | Al 2024-T351 Plate
  F_tux_1: 64,                  // ksi
  F_tyx_1: 40,                  // ksi
  E_1: 10500,                   // ksi
  e_u_1: 0.12,                  // in/in

  // Male Lug, 2 (Inner)      | Al 7075-T651 Plate
  F_tux_2: 77,                   // ksi
  F_tyx_2: 66,                   // ksi
  E_2: 10300,                    // ksi
  e_u_2: 0.06,

  // Bushings, 1 and 2        | Al Bronze
  F_tu_bush: 110,                 // ksi
  F_ty_bush: 60,                // ksi
  F_cy_bush: 60,                // ksi

  // Pin                      | 4130 Steel
  F_tu_pin: 125,                // ksi
  F_ty_pin: 103,                // ksi
  F_su_pin: 82,                 // ksi
  E_pin: 29000,                 // ksi
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
  P_us_p: number;
  P_governing: number;    // min of the above
  warnings: string[];
}


function AreaNetSection(w: number, t: number, d: number) {
  return t * (w - d);
}

function AreaBearing(t: number, d: number) {
  return t * d;
}

function AreaPinShear(d: number) {
  return (Math.PI * (d ** 2)) / 4;
}

// function Kn(Fty: number, Ftu: number, E: number, eps_u: number, D: number, w: number) {
//   const r_y_u = Fty / Ftu;
//
//   const r_u_Eeps = Ftu / (E * eps_u);
//   const Dw = D / w;
//
//   return (Math.PI * (d ** 2)) / 4;
// }


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
  const P_net_tension = allow.F_tux_1 * Anet;
  const P_bearing_lug = allow.F_tux_1 * Abearing_total;

  const P_us_p = allow.F_su_pin * Apin_shear;

  // Simple geometric checks (illustrative thresholds)
  if (p.e1 < 1.5 * p.D) warnings.push(`Edge distance e < 1.5D (e=${p.e1.toFixed(1)}, D=${p.D.toFixed(1)})`);
  if (p.Dp >= p.D) warnings.push('Pin >= hole (Dp >= D)');
  if (p.t1 <= 0) warnings.push('t1 <= 0');
  if (p.mode === LugMode.double && p.t2 <= 0) warnings.push('t2 <= 0');

  const P_governing = Math.min(P_net_tension, P_bearing_lug, P_us_p);

  return {
    Anet, Abearing_each, Abearing_total, Apin_shear, P_net_tension, P_bearing_lug, P_us_p, P_governing, warnings,
  };
}


// 9.3 Lug and Bushing Strength Under Uniform Axial Load
// FruL= K a/D Ftux (e/D < 1. 5)
//FbruL = K Ftux, (e/D >= 1. 5)

// FryL= K a/D Ftyx (e/D < 1. 5)
//FbryL = K Ftyx, (e/D >= 1. 5)
// D/t <=5
//Figure 9-2. Allowable Uniform Axial Load Coefficient


//  9.3. 2 Lug Net-Section Strength Under Uniform Axial Load.
// FnuL = KUFtu
//The allowable lug net-section tensile yield stress (Fn7 1 ) is
// F YL = K.Fty
// The allowable lug net-section ultimate load (PU L) is
// PAUL = FuL (w-D)t, (if Ftu - 1. 304 Fty)
//PAUL = 1. 304 FUYL (w-D)t, (if FtU > 1. 304 Fty)

// 9. 3.3 Lug Design Strength Under Uniform Axial Load

// Bushing Bearing Strength Under Uniform Axial Load

//Lug-Bushing Design Strength for Double Shear Joints Under
// Uniform Axial Load

//Pin Shear Strength for Double Shear Joints Under Uniform
// Axial Load

//Pin Bending Strength for Double Shear Joints Under Uniform
// Axial Load