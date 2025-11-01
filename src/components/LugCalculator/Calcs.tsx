import { type LugParams, type Allowables } from './types';
//import { type DataPoint } from '../../data/types';
import {
  linearInterpolatedObject,
  linearInterpolate,
} from '../../data/data_functions';
import { Kb_data, K_data } from '../../components/LugCalculator/coeff_data';
import * as d3 from 'd3';

// ---------- Defaults ----------
interface LugProps {
  t: number,
  D: number,
  e: number,
  w: number,
  w_t: number,
  F_tu: number,
  F_ty: number,
  E: number,
  e_u: number
}

interface PinProps {
  Dp: number,
  t1: number,
  t2: number,
  E: number,
  Ftu: number,
  Fty: number,
  Fsu: number,
}


interface assemProps {
  pin: PinProps;
  lug1: LugProps;
  lug2: LugProps;
  double: boolean;
  g: number;
}

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

export const DEFAULT_PARAMS: LugParams = {
  mode: 'double',
  units: 'in',
  Dp: Number(1.00),
  D: Number(1.00),
  w1: Number(3.00),
  w2: Number(3.50),
  e1: Number(1.50),
  e2: Number(1.75),
  t1: Number(0.50),
  t2: Number(0.75),
  g: Number(0.010),
};

export const DEFAULT_ALLOW: Allowables = {
  // Female Lugs, 1 (Outer)   | Al 2024-T351 Plate
  units: 'psi',
  F_tux_1: 64000,                  // ksi
  F_tyx_1: 40000,                  // ksi
  E_1: 10500000,                   // ksi
  e_u_1: 0.12,                     // in/in
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

function Kn(D_w: number, F_ty_Ftu: number, Ftu_Eeu: number) {
}

function K(e_D: number, D_t: number, a_D: number) {
  e_D = Number(e_D);
  D_t = Number(D_t);
  a_D = Number(a_D);
  console.log(e_D, D_t, a_D);
  if (D_t <= 5) {
    let k = linearInterpolatedObject(K_data, 'eD', 'K', Number(e_D));
    console.log(k);
    return k;
  } else {
    let Kb_series = [
      { Dt: 2, series: 'Dt_2' },
      { Dt: 3, series: 'Dt_3' },
      { Dt: 4, series: 'Dt_4' },
      { Dt: 5, series: 'Dt_5' },
      { Dt: 6, series: 'Dt_6' },
      { Dt: 7, series: 'Dt_7' },
      { Dt: 8, series: 'Dt_8' },
      { Dt: 9, series: 'Dt_9' },
      { Dt: 10, series: 'Dt_10' },
      { Dt: 15, series: 'Dt_15' },
      { Dt: 20, series: 'Dt_20' },
      { Dt: 25, series: 'Dt_25' },
      { Dt: 30, series: 'Dt_30' },
    ];

    let bounding_data = [
      Kb_series[d3.bisectLeft(Kb_series.map((d) => d.Dt), D_t)],
      Kb_series[d3.bisectRight(Kb_series.map((d) => d.Dt), D_t)],
    ];

    console.log(bounding_data[0]);
    console.log(bounding_data[2]);

    let kb1 = linearInterpolatedObject(Kb_data, 'a_D', bounding_data[0]['series'], a_D);
    let kb2 = linearInterpolatedObject(Kb_data, 'a_D', bounding_data[1]['series'], a_D);
    console.log(kb1);
    console.log(kb2);
    return linearInterpolate(bounding_data[0]['Dt'], kb1, bounding_data[1]['Dt'], kb2, D_t);
  }
}

function bushing_calcs() {

}

function lug_calcs(props: LugProps) {

  const t = Number(props.t);
  const D = Number(props.D);
  const e = Number(props.e);
  const w = Number(props.w);
  const w_t = Number(props.w_t);

  const a = e - D / 2;
  const e_D_ratio = e / D;
  const D_t_ratio = D / t;
  const a_D_ratio = a / D;
  const D_w_ratio = D / w;

  const h1 = w / 2 - (D / 2) * (Math.sqrt(2) / 2);
  const h2 = w / 2 - D / 2;
  const h3 = a;
  const h4 = h1;

  const h_av = 6 / (3 / h1 + 1 / h2 + 1 / h3 + 1 / h4);
  const h_av_D = h_av / D;

  const area_net_section = (w - D) * t;
  const area_tang = w_t * t;
  const area_bearing = D * t;

  // Material strengths
  const F_tu = Number(props.F_tu);
  const F_ty = Number(props.F_ty);
  const E = Number(props.E);
  const e_u = Number(props.e_u);

  const Fty_Ftu_ratio = F_ty / F_tu;
  const Ftu_Eeu_ratio = F_tu / (E * e_u);

  const k = K(e_D_ratio, D_t_ratio, a_D_ratio);
  const k_n = 1.2;
  //Kn(D_w_ratio, Fty_Ftu_ratio, Ftu_Eeu_ratio);
  //const k_tru;
  //const k_try = linearInterpolatedObject();

  let F_br_small_eD = ((e_D_ratio < 1.5) ? (a / D) : 1);

  let F_bry_L = k * F_ty * F_br_small_eD;
  let F_bru_L = k * F_tu * F_br_small_eD;
  let F_ny_L = k_n * F_ty;
  let F_nu_L = k_n * F_tu;

  let P_bru_L;
  let P_nu_L;
  let P_T = F_tu * area_tang;

  if (F_tu > 1.304 * F_ty) {
    P_bru_L = 1.304 * F_bry_L * area_bearing;
    P_nu_L = 1.304 * F_ny_L * area_net_section;
  } else {
    P_bru_L = F_bru_L * area_bearing;
    P_nu_L = F_nu_L * area_net_section;
  }

  let P_u_L = Math.min(P_bru_L, P_nu_L);

  //const unit_len = `\\text{${units.length}}`;
  //const unit_stress = `\\text{${units.F}}`;

  return {
    t: t,
    D: D,
    w: w,
    w_t: w_t,
    e: e,
    a: a,
    e_D_ratio: e_D_ratio,
    D_t_ratio: D_t_ratio,
    a_D_ratio: a_D_ratio,
    D_w_ratio: D_w_ratio,
    k: k,
    k_n: k_n,
    Ftx: F_tu,
    Fty: F_ty,
    E: E,
    e_u: e_u,
    Fty_Ftu_ratio: Fty_Ftu_ratio,
    Ftu_Eeu_ratio: Ftu_Eeu_ratio,
    F_bru_L: F_bru_L,
    F_bry_L: F_bry_L,
    F_ny_L: F_ny_L,
    F_nu_L: F_nu_L,
    P_bru_L: P_bru_L,
    P_nu_L: P_nu_L,
    P_T_L: P_T,
    P_u_L: P_u_L,
  };
  //return {
  //  t: `${t.toFixed(3)}`,
  //  D: `${D.toFixed(3)}`,
  //  w: `${w.toFixed(3)}`,
  //  w_t: `${w_t.toFixed(3)}`,
  //  e: `${e.toFixed(3)}`,
  //  a: `${a.toFixed(3)}`,
  //  e_D_ratio: `${e_D_ratio.toFixed(3)}`,
  //  D_t_ratio: `${D_t_ratio.toFixed(3)}`,
  //  a_D_ratio: `${a_D_ratio.toFixed(3)}`,
  //  D_w_ratio: `${D_w_ratio.toFixed(3)}`,
  //  k: `${k}`,
  //  k_n: `${k_n.toFixed(2)}`,
  //  Ftx: `${F_tu.toFixed(0)}`,
  //  Fty: `${F_ty.toFixed(0)}`,
  //  E: `${E.toFixed(0)}`,
  //  e_u: `${e_u.toFixed(3)}`,
  //  Fty_Ftu_ratio: `${Fty_Ftu_ratio.toFixed(3)}`,
  //  Ftu_Eeu_ratio: `${Ftu_Eeu_ratio.toFixed(3)}`,
  //  F_bru_L: `${F_bru_L.toFixed(0)}`,
  //  F_bry_L: `${F_bry_L.toFixed(0)}`,
  //  F_ny_L: `${F_ny_L.toFixed(0)}`,
  //  F_nu_L: `${F_nu_L.toFixed(0)}`,
  //  P_bru_L: `${P_bru_L.toLocaleString('en-US').split('.', 1)}`,
  //  P_nu_L: `${P_nu_L.toLocaleString('en-US').split('.', 1)}`,
  //  P_T_L: `${P_T.toLocaleString('en-US').split('.', 1)}`,
  //  P_u_L: `${P_u_L.toLocaleString('en-US').split('.', 1)}`,
  //};
}

function pin_calcs(props: PinProps) {
  let Dp = props.Dp;
  //let type = props.type;
  let t1 = props.t1;
  let t2 = props.t2;
  //let g = props.g;
  let E = props.E;
  let Ftu = props.Ftu;
  let Fty = props.Fty;
  let Fsu = props.Fsu;

  let Psu = 1.571 * Dp ^ 2 * Fsu;
  let kbp = 1.5;
  let Mup = 0.0982 * kbp * Dp ^ 3 * Ftu;

  //let Marm = t1 / 2 + t2 / 4\\+ g;
  //let Pubp = (0.1963 * kbp * Dp ^ 3 * Ftu) / Marm;

}

export function calcs(params: LugParams, allow: Allowables) {
  let p = params;
  let all = allow;

  let lug1 = lug_calcs({
    t: Number(p.t1),
    D: Number(p.D),
    e: Number(p.e1),
    w: Number(p.w1),
    w_t: Number(p.w1),
    F_tu: Number(all.F_tux_1),
    F_ty: Number(all.F_tyx_1),
    E: Number(all.E_1),
    e_u: Number(all.e_u_1),
  });

  //let lug2 = lug_calcs({
  //  t: p.t2,
  //  D: p.D,
  //  e: p.e2,
  //  w: p.w2,
  //  w_t: p.w2,
  //  F_tu: all.F_tux_2,
  //  F_ty: all.F_tyx_2,
  //  E: all.E_2,
  //  e_u: all.e_u_2,
  //});
  //
  //let pin = pin_calcs({
  //  Dp: p.Dp,
  //  t1: p.t1,
  //  t2: p.t2,
  //  E: all.E_pin,
  //  Ftu: all.F_tu_pin,
  //  Fty: all.F_ty_pin,
  //  Fsu: all.F_su_pin,
  //});

  //const nInterfaces = p.mode === 'double' ? 2 : 1;
  //const warnings: string[] = [];
  //if (Anet <= 0) warnings.push('Net area <= 0 (w <= D)');
  //if (p.e1 < 1.5 * p.D) warnings.push(`Edge distance e < 1.5D(e = $ {p.e1.toFixed(1);}, D = $
  //if (p.Dp >= p.D) warnings.push('Pin >= hole (Dp >= D)');
  //if (p.t1 <= 0) warnings.push('t1 <= 0');
  //if (p.mode === LugMode.double && p.t2 <= 0) warnings.push('t2 <= 0')
  //P_governing = Math.min(P_net_tension, P_bearing_lug, P_us_p);
  return lug1;
}


