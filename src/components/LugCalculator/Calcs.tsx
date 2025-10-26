import { type LugParams, type Allowables, LugMode, UnitMode } from './types';
// ---------- Defaults ----------
export const DEFAULT_ALLOW: Allowables = {
  // Female Lugs, 1 (Outer)   | Al 2024-T351 Plate
  units: 'psi',
  F_tux_1: 64000,                  // ksi
  F_tyx_1: 40000,                  // ksi
  E_1: 10500000,                   // ksi
  e_u_1: 0.12,                  // in/in
  // Male Lug, 2 (Inner)      | Al 7075-T651 Plate
  F_tux_2: 77000,                   // psi
  F_tyx_2: 66000,                   // psi
  E_2: 10300000,                    // psi
  e_u_2: 0.06,                   // in/in
  // Bushings, 1 and 2        | Al Bronze
  F_tu_bush: 110000,                // psi
  F_ty_bush: 60000,                 // psi
  F_cy_bush: 60000,                 // psi
  // Pin                      | 4130 Steel
  F_tu_pin: 125000,                // psi
  F_ty_pin: 103000,                // psi
  F_su_pin: 82000,                 // psi
  E_pin: 29000000,                 // psi
};


//const vars={
//   FbruL:{
//     latex:`\\text{F}_{bru_L}`,
//     val:,
//     descrption:
//   }
//
//}
//
//{description: "",
//
//latex: "$\text{F}_{bru_L}$ = Lug ultimate bearing stress"},
//{description: "",
//
//latex: "$\text{F}_{bry_L}$ = Lug yield bearing stress"},
//{description: "",
//
//latex: "$\text{F}_{tux}$ = Cross-grain tensile ultimate stress of lug material
//
//          $\text{F}_{tyx}$ = Cross-grain tensile yield stress of lug material
//
//          $\text{F}_{bru}$ = Allowable ultimate bearing stress, MHB5
//
//          $\text{F}_{bry}$ = Allowable yield bearing stress, MHB5
//
//          $\text{F}_{tu}$ = Ultimate tensile stress
//
//          $\text{F}_{nu_L}$ = Allowable lug net-section tensile ultimate stress
//
//          $\text{F}_{ny_L}$ = Allowable lug net-section tensile yield stress
//
//          $\text{F}_{bry_B}$ = Allowable bearing yield stress for bushings
//
//          $\text{F}_{cy_B}$ = Bushing compressive yield stress
//
//          $\text{F}_{bru_B}$ = Allowable bearing ultimate stress for bushings
//
//          $\text{F}_{su_p}$ = Ultimate shear stress of the pin material
//
//          $\text{F}_{tu_p}$ = Pin ultimate tensile stress
//
//          $\text{F}_{tu_t}$ = Allowable ultimate tang stress
//
//          $\text{F}_{br\max_L}$ = Maximum lug bearing stress
//
//          $\text{F}_{br\max_B}$ = Maximum bushing bearing stress
//
//          $\text{F}_{s\max_p}$ = Maximum pin shear stress
//
//          $\text{F}_{b\max_p}$ = Maximum pin bending stress
//
//


//function validate(p: LugParams): LugParams {
//  const minThk = 0.1;
//  const minDia = 0.5;
//
//  let D = Math.max(p.D, minDia);
//  let Dp = clamp(p.Dp, minDia, D - 0.2);
//
//  let t1 = Math.max(p.t1, minThk);
//  let t2 = p.mode === LugMode.double ? Math.max(p.t2, minThk) : 0;
//
//  let w1 = Math.max(p.w1, D + 2);
//  let w2 = p.mode === LugMode.double ? Math.max(p.w2, D + 2) : 0;
//
//  let e1 = Math.max(p.e1, D * 0.6); // simplistic floor; adjust to your rule
//  let g = p.mode === LugMode.double ? Math.max(p.g, Dp * 0.1) : 0;
//
//  return { ...p, D, Dp, t1, t2, w1, w2, e1, g };
//}

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

const k_data = [
  [0.50, 2.00],
  [0.52, 1.98],
  [0.56, 1.94],
  [0.59, 1.91],
  [0.62, 1.88],
  [0.67, 1.85],
  [0.71, 1.81],
  [0.75, 1.78],
  [0.80, 1.75],
  [0.84, 1.72],
  [0.88, 1.68],
  [0.93, 1.65],
  [0.98, 1.61],
  [1.03, 1.58],
  [1.08, 1.55],
  [1.14, 1.52],
  [1.19, 1.48],
  [1.25, 1.45],
  [1.31, 1.42],
  [1.37, 1.39],
  [1.44, 1.36],
  [1.50, 1.33],
  [1.55, 1.37],
  [1.59, 1.40],
  [1.63, 1.43],
  [1.67, 1.47],
  [1.72, 1.50],
  [1.76, 1.53],
  [1.80, 1.56],
  [1.85, 1.60],
  [1.90, 1.63],
  [1.95, 1.67],
  [2.00, 1.70],
  [2.06, 1.73],
  [2.11, 1.77],
  [2.16, 1.80],
  [2.22, 1.83],
  [2.28, 1.87],
  [2.34, 1.90],
  [2.38, 1.93],
];

function lug_geometry(
  thick: number,
  diaHole: number,
  edgeDist: number,
  widthNet: number,
  widthTang: number,
  F_tu: number,
  F_ty: number,
  E: number,
  e_u: number,
  units: {
    length: string,
    F: string,
    E: string,
    P: string
  },
) {

  const e = edgeDist;
  const D = diaHole;
  const w = widthNet;
  const t = thick;
  const w_t = widthTang;

  const a = e - D / 2;
  const e_D_ratio = e / D;
  const D_t_ratio = D / t;
  const a_D_ratio = a / D;
  const D_w_ratio = D / w;


  const F_ty_Ftu_ratio = F_ty / F_tu;
  const Ftu_Ee_ratio = F_tu / (E * e_u);
  const F_ty_1_304 = F_ty * 1.304;

  let k_axial = 1.48;
  let F_bry = k_axial * F_ty;
  let F_bru = k_axial * F_tu;

  if (e_D_ratio > 1.5) {
    F_bry = k_axial * a / D * F_ty;
    F_bru = k_axial * a / D * F_tu;
  }
  let P_bru = F_bry * t * (w - D);
  if (F_ty_1_304 > F_tu) {
    P_bru = 1.304 * P_bru;
  }
  const area_net_section = (w - D) * t;
  const area_tang = w_t * t;
  const area_bearing = D * t;


  const unit_len = `\\text{${units.length}}`;
  const unit_stress = `\\text{${units.F}}`;

  let documentation = {
    e: `${e.toFixed(3)}`,
    D: `${D.toFixed(3)}`,
    w: `${w.toFixed(3)}`,
    t: `${t.toFixed(3)}`,
    a: `${a.toFixed(3)}`,
    e_D_ratio: `${e_D_ratio.toFixed(3)}`,
    D_t_ratio: `${D_t_ratio.toFixed(3)}`,
    a_D_ratio: `${a_D_ratio.toFixed(3)}`,
    D_w_ratio: `${D_w_ratio.toFixed(3)}`,

    k_axial: `${k_axial.toFixed(3)}`,

    Ftx: `${F_tu.toFixed(0)}`,
    Fty: `${F_ty.toFixed(0)}`,
    E: `${E.toFixed(0)}`,
    e_u: `${e_u.toFixed(3)}`,
    F_ty_Ftu_ratio: `${F_ty_Ftu_ratio.toFixed(3)}`,
    Ftu_Ee_ratio: `${Ftu_Ee_ratio.toFixed(3)}`,
    //Kn: `${Kn.toFixed(3)}`,

    F_bru: `${F_bru.toFixed(0)}`,
    F_bry: `${F_bry.toFixed(3)}`,
    P_bru: `${P_bru.toFixed(3)}`,

    //Fsu: `${Fsu.toFixed(3)}`,
    //Fnu: `${Fny.toFixed(3)}`,
    //Psu: `${Psu.toFixed(3)}`,
    //PuL: `${PuL.toFixed(3)}`,
  };


}


//export function calc(params: LugParams, allow: Allowables): Result {
//const p = validate(params);
//const warnings: string[] = [];

// Critical plate (outer plate used for net tension in double-shear lug)
//const tcrit = p.t1;
//const wcrit = p.w1;

//const Anet = tcrit * (wcrit - p.D); // simple subtract-through-hole
//if (Anet <= 0) warnings.push('Net area <= 0 (w <= D)');

// Bearing area
//const nInterfaces = p.mode === LugMode.double ? 2 : 1; // lug-to-pin interfaces in outer plates
//const Abearing_each = tcrit * p.Dp;
//const Abearing_total = Abearing_each * nInterfaces;

// Pin shear area
//const nShearPlanes = p.mode === LugMode.double ? 2 : 1;
//const Apin_shear = nShearPlanes * (Math.PI * (p.Dp ** 2)) / 4;

// Nominal capacities (illustrative)
//const P_net_tension = allow.F_tux_1 * Anet;
//const P_bearing_lug = allow.F_tux_1 * Abearing_total;

//const P_us_p = allow.F_su_pin * Apin_shear;

// Simple geometric checks (illustrative thresholds)
//if (p.e1 < 1.5 * p.D) warnings.push(`Edge distance e < 1.5D(e = $ {p.e1.toFixed(1);}, D = $
//{p.D.toFixed(1);}
//)
//  `);
//if (p.Dp >= p.D) warnings.push('Pin >= hole (Dp >= D)');
//if (p.t1 <= 0) warnings.push('t1 <= 0');
//if (p.mode === LugMode.double && p.t2 <= 0) warnings.push('t2 <= 0');

//const P_governing = Math.min(P_net_tension, P_bearing_lug, P_us_p);

//return {
//  Anet, Abearing_each, Abearing_total, Apin_shear, P_net_tension, P_bearing_lug, P_us_p, P_governing, warnings,
//};
//}


// 9.3 Lug and Bushing Strength Under Uniform Axial Load
//
// 9.3.1 Lug Bearing Strength Under Uniform Axial Load
// 9.3.2 Lug Net-Section Strength Under Uniform Axial Load.
// 9.3.3 Lug Design Strength Under Uniform Axial Load
// 9.3.4 Bushing Bearing Strength Under Uniform Axial Load
// 9.3.5 Combined Lug-Bushing Design Strength Under Uniform Axial Load
//
// 9.4 Double Shear Joint Strength Under Uniform Axial Load
// 9.4.1 Lug-Bushing Design Strength for Double Shear Joints Under Uniform Axial Load
// 9.4.2 Pin Shear Strength for Double Shear Joints Under Uniform Axial Load
// 9.4.3 Pin Bending Strength for Double Shear Joints Under Uniform Axial Load
// 9.4..4 Lug Tang Strength for Double Shear Joints Under Uniform Axial Load
// 9. 5 Single-Shear Joint Strength Under Uniform Axial Load
// 9. 5. 1 Lug Bearing Strength for Single Shear Joints Under Uniform Axial Loads
// 9. 5. Z Lug.Net-Section Strength for Single Shear Joints Under Uniform Axial Load
// 9. 5. 3 Bushing Strength for Single Shear Joints Under Uniform Axial Load
// 9.5.4 Pin Shear Strength for Single Shear Joints Under Uniform Axial Load
// 9. 5. 5 Pin Bending Strength for Single Shear Joints Under Uniform Axial Load
//
// 9. 6 Example of Uniform Axially Loaded Lug Analysis
//
// (1) Female Lugs and Bushings
// a) Lug Bearing Strength (Equations (9-2a) and (9-3b))
// b) Lug Net-Section Tension Strength (Equations (9-5) and (9-6b))
// c) Lug Design Strength (Equation (9-7))
// d) Bushing Bearing Strength (Equation (9-9))
// e) Combined Lug-Bushing Design Strength (Equation (9-10))
//
// (2) Male Lug and Bushing
// a) Lug Bearing Strength (Equations (9-1b) and (9-3a))
// b) Lug Net-Section Tension Strength (Equations (9-4) and (9-6a))
// c) Lug Design Strength (Equation (9-7))
// d) Bushing Bearing Strength (Equation (9-9))
// e) Combined Lug-Bushing Design Strength (Equation (9-10
//
// (3) Joint Analysis
// a) Lug-Bushing Strength (Equation (9-11))
// b) Pin Shear Strength (Equation (9-12))
// c) Pin Bending Strenigth (Equation (9-15))
// d) Joint Strength (Equation (9-19b))
//
// (4) Lug Tang Analysis
//
// 9.7 Lug and Bushing Strength Under Transverse Load
// 9. 7. 1 Lug Strength Under Transverse Load
// 9.7. 2 Bushing Strength Under Transverse Load
// 9.8 Double Shear Joints Under Transverse Load
// 9.9 Single Shear Joints Under Transverse Load
// 9. 10 Lug and Bushing Strength Under Oblique Load
// 9. 10. 1 Lug Strength Under Oblique Load
// 9.10. 2 Bushing Strength Under Oblique Load
// 9.11 Double Shear Joints Under Oblique Load
// 9. 12 Single Shear Joints Under Oblique Load
// 9. 13 Multiple Shear and Single Shear Connecti
//
//9. 14 Axially Loaded Lug Design


//              <MathBlock
//tex={'A_{pin} = n_{s}\\, \\frac{\\pi D_p^2}{4} = ' + R.Apin_shear.toFixed(2) + '\\ in^2'} />
//<MathBlock tex={'A_{net_1} = n_{s}\\, t_{1}\\,(w_{1}-D) = ' + R.Anet.toFixed(2)} />
//<MathBlock tex={'A_{net_2} = t_{2}\\,(w_{2}-D) = ' + R.Anet.toFixed(2)} />
//<MathBlock tex={'A_{b,\\,each} = t_{crit}\\, D_p = ' + R.Abearing_each.toFixed(2)} />
//<MathBlock tex={'A_{b,\\,total} = n_{if}\\, t_{crit}\\, D_p'} />
//<MathBlock tex={'A_{b_{total}} = n_{if}\\, t_{crit}\\, D_p'} />
//<div className="text-sm">A_bear(total) = {R.Abearing_total.toFixed(2)}</div>
//<div className="mt-2 text-sm">P_net = {R.P_net_tension.toFixed(1)}</div>
//<div className="text-sm">P_bearing = {R.P_bearing_lug.toFixed(1)}</div>
//<div className="text-sm">P_pin(shear) = {R.P_us_p.toFixed(1)}</div>
//<div className="font-semibold">P_governing = {R.P_governing.toFixed(1)}</div>
//
//    9. 6 Example of Uniform Axially Loaded Lug Analysis
//
//    (1) Female Lugs and Bushings
//    Equations (9-3a) a•nd (9-3b) apply only if the load is uniformly distributed across the lug thickness.
//    Ftux. = 64, 000 psi;
//    Ftux. = 40, 000 psi;
//
//
//  if Ftux, <= 1.304 Ftyx)
//  PbruL=FbruL*D*t
//  else
//  PbruL=1.304*FbryL*D*t
//
//  1.304 Ft, = 1.304 x 40000 = 52160 psi.
//
//  a) Lug Bearing Strength (Equations (9-2a) and (9-3b))
//  e1/D _ 1 25 /1.00= 1.25; therefore K 1 = 1.46 (from Figure 9-2)
//
//      Pbru = 1.304 x 1.46 x 0.75 x 40000 x 1.00 x 0. 50 = 28600 lbs
//
//  b) Lug Net-Section Tension Strength (.Equations (9-5) and (9-6b))
//  D _ 1.00 -040; -= 4 0.625
//  wI 2. 50 Ftu 64000




