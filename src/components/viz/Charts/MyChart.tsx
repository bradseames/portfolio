import { Card } from '@mantine/core';
import { RadarChart } from '@mantine/charts';

const data = [
  {
    product: 'Apples',
    'Sales January': 120,
    'Sales February': 100,
  },
  {
    product: 'Oranges',
    'Sales January': 98,
    'Sales February': 90,
  },
  {
    product: 'Tomatoes',
    'Sales January': 86,
    'Sales February': 70,
  },
  {
    product: 'Grapes',
    'Sales January': 99,
    'Sales February': 80,
  },
  {
    product: 'Bananas',
    'Sales January': 85,
    'Sales February': 120,
  },
  {
    product: 'Lemons',
    'Sales January': 65,
    'Sales February': 150,
  },
];

export default function MyChart() {
  return (
      <Card>
        <RadarChart
            h={300}
            data={data}
            dataKey="product"
            withTooltip
            withDots
            series={[
              { name: 'Sales January', color: 'lime.4', opacity: 0.1 },
              { name: 'Sales February', color: 'cyan.4', opacity: 0.1 },
            ]}
            // radarChartProps={{  }}
        />
      </Card>
  );
}


export const matProps = {
  units: {
    F: 'ksi',
    E: 'ksi',
    e: 'in/in',
  },

  F_tux_1: 64,                  // ksi
  F_tyx_1: 40,                  // ksi
  E_1: 10500,                   // ksi
  e_u_1: 0.12,                  // in/in
  // Male Lug, 2 (Inner)      | Al 7075-T651 Plate
  F_tux_2: 77,                   // ksi
  F_tyx_2: 66,                   // ksi
  E_2: 10300,                    // ksi
  e_u_2: 0.06,                  // in/in
  // Bushings, 1 and 2        | Al Bronze
  F_tu_bush: 110,               // ksi
  F_ty_bush: 60,                // ksi
  F_cy_bush: 60,                // ksi
  // Pin                      | 4130 Steel
  F_tu_pin: 125,                // ksi
  F_ty_pin: 103,                // ksi
  F_su_pin: 82,                 // ksi
  E_pin: 29000,                 // ksi
};


export interface Allowables {
  // Allowable stresses (units consistent w/ geometry)
  E: number;      // Modulus of elasticity, psi
  e_u: number;    // Ultimate strain, inches/inch
  F_tu: number;   // Ultimate tensile stress
  F_ty: number;   // Yield tensile stress
  F_su: number;   // Ultimate shear stress
  F_cy: number;   // Bushing compressive yield, stress
  F_tux: number;  // Cross-grain tensile ultimate stress
  F_tyx: number;  // Cross-grain tensile yield stress
  F_bru: number;  // Cross-grain tensile yield stress

}

