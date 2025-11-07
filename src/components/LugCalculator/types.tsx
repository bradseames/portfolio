export enum LugMode {
  single = "single",
  double = "double",
}

export enum UnitSystem {
  imperial = "imperial",
  metric = "metric",
}

export enum LengthUnit {
  m = "m",
  in = "in",
  mm = "mm",
}

export enum StressUnit {
  psi = "psi",
  Pa = "Pa",
}

export interface LugParams {
  //mode: LugMode | string; // single or double shear
  lengthUnit?: LengthUnit;

  Dp: number; // Pin diameter
  D: number; // Lug hole diameter

  w1: number; // Outer plate width (each side)
  e1: number; // Edge distance (hole center to free end)
  t1: number; // Outer plate thickness (single: the plate)

  w2: number; // Center plate width (double only)
  e2: number;
  t2: number; // Center plate thickness (double shear only)

  gap: number; // Gap between outer plates (double shear)
}

export interface Allowables {
  units: string;
  F_tux_1: number;
  F_tyx_1: number;
  E_1: number; // Modulus of elasticity, psi
  e_u_1: number; // Strain, inches/inch
  F_tux_2: number;
  F_tyx_2: number;
  E_2: number; // Modulus of elasticity, psi
  e_u_2: number; // Strain, inches/inch
  F_tu_bush: number;
  F_ty_bush: number; // Allowable bearing yield stress for bushings
  F_cy_bush: number; // Bushing compressive yield, stress
  F_tu_pin: number; // Pin ultimate tensile stress
  F_ty_pin: number;
  F_su_pin: number; // Ultimate shear stress of the pin material
  E_pin: number;
}

export interface SketchProps {
  params: LugParams;
  allow?: Partial<Allowables>;
  // Optional overall drawing length of the lug in the axial direction
  //L?: number; // if not given, computed from e + 2*D
  //showDims?: boolean;    // show dimension graphics
  //showLoads?: boolean;   // show P arrows
  //showWarnings?: boolean;// highlight rule violations
  //showPanels?: boolean;  // draw calc panels inside SVG (default true)
  //style?: React.CSSProperties;
}


// interface NumberSlideProps {
//   label: string;
//   value: number;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   min?: number;
//   max?: number;
//   step: number;
//   suffix: string;
//   decimalScale: number;
//   allowNegative: boolean;
//   fixedDecimalScale: boolean;
// }

