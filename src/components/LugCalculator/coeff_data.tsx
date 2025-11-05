import { LineChart } from "@mantine/charts";
import React from "react";

export const K_data = [
  { eD: 0.5, K: 2.0 },
  { eD: 0.6, K: 1.9 },
  { eD: 0.7, K: 1.8 },
  { eD: 0.8, K: 1.72 },
  { eD: 0.9, K: 1.65 },
  { eD: 1.0, K: 1.6 },
  { eD: 1.1, K: 1.54 },
  { eD: 1.2, K: 1.48 },
  { eD: 1.3, K: 1.42 },
  { eD: 1.4, K: 1.38 },
  { eD: 1.5, K: 1.33 },
  { eD: 1.6, K: 1.4 },
  { eD: 1.7, K: 1.48 },
  { eD: 1.8, K: 1.56 },
  { eD: 1.9, K: 1.63 },
  { eD: 2.0, K: 1.7 },
  { eD: 2.1, K: 1.77 },
  { eD: 2.2, K: 1.82 },
  { eD: 2.3, K: 1.88 },
  { eD: 2.4, K: 1.93 },
];

export const Kb_data = [
  {
    a_D: 0.5,
    Dt_02: 0.0,
    Dt_03: 0.0,
    Dt_04: 0.0,
    Dt_05: 0.0,
    Dt_06: 0.0,
    Dt_07: 0.0,
    Dt_08: 0.0,
    Dt_09: 0.0,
    Dt_10: 0.0,
    Dt_15: 0.0,
    Dt_20: 0.0,
    Dt_25: 0.0,
    Dt_30: 0.0,
  },
  {
    a_D: 0.6,
    Dt_02: 0.2,
    Dt_03: 0.2,
    Dt_04: 0.2,
    Dt_05: 0.2,
    Dt_06: 0.2,
    Dt_07: 0.2,
    Dt_08: 0.2,
    Dt_09: 0.2,
    Dt_10: 0.2,
    Dt_15: 0.2,
    Dt_20: 0.16,
    Dt_25: 0.12,
    Dt_30: 0.08,
  },
  {
    a_D: 0.8,
    Dt_02: 0.54,
    Dt_03: 0.54,
    Dt_04: 0.54,
    Dt_05: 0.54,
    Dt_06: 0.54,
    Dt_07: 0.54,
    Dt_08: 0.54,
    Dt_09: 0.54,
    Dt_10: 0.54,
    Dt_15: 0.43,
    Dt_20: 0.33,
    Dt_25: 0.25,
    Dt_30: 0.2,
  },
  {
    a_D: 1.0,
    Dt_02: 0.88,
    Dt_03: 0.88,
    Dt_04: 0.88,
    Dt_05: 0.88,
    Dt_06: 0.88,
    Dt_07: 0.87,
    Dt_08: 0.87,
    Dt_09: 0.87,
    Dt_10: 0.84,
    Dt_15: 0.58,
    Dt_20: 0.44,
    Dt_25: 0.35,
    Dt_30: 0.28,
  },
  {
    a_D: 1.2,
    Dt_02: 1.13,
    Dt_03: 1.13,
    Dt_04: 1.13,
    Dt_05: 1.13,
    Dt_06: 1.13,
    Dt_07: 1.11,
    Dt_08: 1.1,
    Dt_09: 1.05,
    Dt_10: 0.99,
    Dt_15: 0.67,
    Dt_20: 0.51,
    Dt_25: 0.4,
    Dt_30: 0.33,
  },
  {
    a_D: 1.4,
    Dt_02: 1.39,
    Dt_03: 1.38,
    Dt_04: 1.38,
    Dt_05: 1.38,
    Dt_06: 1.36,
    Dt_07: 1.3,
    Dt_08: 1.26,
    Dt_09: 1.18,
    Dt_10: 1.1,
    Dt_15: 0.74,
    Dt_20: 0.56,
    Dt_25: 0.44,
    Dt_30: 0.36,
  },
  {
    a_D: 1.6,
    Dt_02: 1.58,
    Dt_03: 1.57,
    Dt_04: 1.57,
    Dt_05: 1.57,
    Dt_06: 1.5,
    Dt_07: 1.43,
    Dt_08: 1.36,
    Dt_09: 1.26,
    Dt_10: 1.16,
    Dt_15: 0.78,
    Dt_20: 0.59,
    Dt_25: 0.47,
    Dt_30: 0.38,
  },
  {
    a_D: 1.8,
    Dt_02: 1.77,
    Dt_03: 1.77,
    Dt_04: 1.77,
    Dt_05: 1.72,
    Dt_06: 1.63,
    Dt_07: 1.53,
    Dt_08: 1.43,
    Dt_09: 1.33,
    Dt_10: 1.21,
    Dt_15: 0.82,
    Dt_20: 0.61,
    Dt_25: 0.49,
    Dt_30: 0.4,
  },
  {
    a_D: 2.0,
    Dt_02: 1.91,
    Dt_03: 1.91,
    Dt_04: 1.88,
    Dt_05: 1.82,
    Dt_06: 1.72,
    Dt_07: 1.61,
    Dt_08: 1.48,
    Dt_09: 1.38,
    Dt_10: 1.25,
    Dt_15: 0.84,
    Dt_20: 0.62,
    Dt_25: 0.49,
    Dt_30: 0.4,
  },
  {
    a_D: 2.2,
    Dt_02: 2.03,
    Dt_03: 2.03,
    Dt_04: 1.98,
    Dt_05: 1.9,
    Dt_06: 1.78,
    Dt_07: 1.67,
    Dt_08: 1.52,
    Dt_09: 1.4,
    Dt_10: 1.28,
    Dt_15: 0.85,
    Dt_20: 0.64,
    Dt_25: 0.5,
    Dt_30: 0.4,
  },
  {
    a_D: 2.4,
    Dt_02: 2.17,
    Dt_03: 2.17,
    Dt_04: 2.08,
    Dt_05: 1.98,
    Dt_06: 1.85,
    Dt_07: 1.72,
    Dt_08: 1.55,
    Dt_09: 1.42,
    Dt_10: 1.3,
    Dt_15: 0.85,
    Dt_20: 0.63,
    Dt_25: 0.49,
    Dt_30: 0.4,
  },
  {
    a_D: 2.6,
    Dt_02: 2.29,
    Dt_03: 2.26,
    Dt_04: 2.16,
    Dt_05: 2.04,
    Dt_06: 1.9,
    Dt_07: 1.74,
    Dt_08: 1.57,
    Dt_09: 1.43,
    Dt_10: 1.31,
    Dt_15: 0.85,
    Dt_20: 0.64,
    Dt_25: 0.5,
    Dt_30: 0.4,
  },
  {
    a_D: 2.8,
    Dt_02: 2.41,
    Dt_03: 2.36,
    Dt_04: 2.23,
    Dt_05: 2.09,
    Dt_06: 1.94,
    Dt_07: 1.77,
    Dt_08: 1.6,
    Dt_09: 1.45,
    Dt_10: 1.32,
    Dt_15: 0.86,
    Dt_20: 0.63,
    Dt_25: 0.5,
    Dt_30: 0.4,
  },
  {
    a_D: 3.0,
    Dt_02: 2.52,
    Dt_03: 2.45,
    Dt_04: 2.3,
    Dt_05: 2.15,
    Dt_06: 1.97,
    Dt_07: 1.79,
    Dt_08: 1.6,
    Dt_09: 1.45,
    Dt_10: 1.33,
    Dt_15: 0.85,
    Dt_20: 0.64,
    Dt_25: 0.5,
    Dt_30: 0.4,
  },
  {
    a_D: 3.2,
    Dt_02: 2.61,
    Dt_03: 2.52,
    Dt_04: 2.36,
    Dt_05: 2.19,
    Dt_06: 2.0,
    Dt_07: 1.81,
    Dt_08: 1.62,
    Dt_09: 1.46,
    Dt_10: 1.33,
    Dt_15: 0.85,
    Dt_20: 0.65,
    Dt_25: 0.51,
    Dt_30: 0.4,
  },
  {
    a_D: 3.4,
    Dt_02: 2.7,
    Dt_03: 2.6,
    Dt_04: 2.42,
    Dt_05: 2.22,
    Dt_06: 2.02,
    Dt_07: 1.82,
    Dt_08: 1.62,
    Dt_09: 1.45,
    Dt_10: 1.34,
    Dt_15: 0.85,
    Dt_20: 0.65,
    Dt_25: 0.5,
    Dt_30: 0.4,
  },
  {
    a_D: 3.6,
    Dt_02: 2.79,
    Dt_03: 2.67,
    Dt_04: 2.47,
    Dt_05: 2.26,
    Dt_06: 2.05,
    Dt_07: 1.82,
    Dt_08: 1.62,
    Dt_09: 1.45,
    Dt_10: 1.34,
    Dt_15: 0.85,
    Dt_20: 0.65,
    Dt_25: 0.5,
    Dt_30: 0.4,
  },
  {
    a_D: 3.8,
    Dt_02: 2.89,
    Dt_03: 2.75,
    Dt_04: 2.52,
    Dt_05: 2.3,
    Dt_06: 2.07,
    Dt_07: 1.84,
    Dt_08: 1.61,
    Dt_09: 1.44,
    Dt_10: 1.32,
    Dt_15: 0.85,
    Dt_20: 0.64,
    Dt_25: 0.49,
    Dt_30: 0.4,
  },
  {
    a_D: 4.0,
    Dt_02: 2.96,
    Dt_03: 2.81,
    Dt_04: 2.57,
    Dt_05: 2.32,
    Dt_06: 2.08,
    Dt_07: 1.83,
    Dt_08: 1.6,
    Dt_09: 1.44,
    Dt_10: 1.31,
    Dt_15: 0.85,
    Dt_20: 0.64,
    Dt_25: 0.5,
    Dt_30: 0.4,
  },
];

export const Kn_data = [
  {
    Fty_Ftu: 0.6,
    Dw: 0,
    Fty_E_eu_00: 0,
    Fty_E_eu_01: 0,
    Fty_E_eu_02: 0,
    Fty_E_eu_04: 0,
    Fty_E_eu_06: 0,
    Fty_E_eu_08: 0,
    Fty_E_eu_10: 0,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.05,
    Fty_E_eu_00: 0.33,
    Fty_E_eu_01: 0.33,
    Fty_E_eu_02: 0.26,
    Fty_E_eu_04: 0.15,
    Fty_E_eu_06: 0.09,
    Fty_E_eu_08: 0.07,
    Fty_E_eu_10: 0.06,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.1,
    Fty_E_eu_00: 0.5,
    Fty_E_eu_01: 0.49,
    Fty_E_eu_02: 0.41,
    Fty_E_eu_04: 0.24,
    Fty_E_eu_06: 0.16,
    Fty_E_eu_08: 0.12,
    Fty_E_eu_10: 0.1,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.15,
    Fty_E_eu_00: 0.61,
    Fty_E_eu_01: 0.58,
    Fty_E_eu_02: 0.52,
    Fty_E_eu_04: 0.32,
    Fty_E_eu_06: 0.22,
    Fty_E_eu_08: 0.18,
    Fty_E_eu_10: 0.15,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.2,
    Fty_E_eu_00: 0.67,
    Fty_E_eu_01: 0.65,
    Fty_E_eu_02: 0.59,
    Fty_E_eu_04: 0.4,
    Fty_E_eu_06: 0.3,
    Fty_E_eu_08: 0.24,
    Fty_E_eu_10: 0.19,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.25,
    Fty_E_eu_00: 0.7,
    Fty_E_eu_01: 0.68,
    Fty_E_eu_02: 0.63,
    Fty_E_eu_04: 0.47,
    Fty_E_eu_06: 0.36,
    Fty_E_eu_08: 0.29,
    Fty_E_eu_10: 0.24,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.3,
    Fty_E_eu_00: 0.71,
    Fty_E_eu_01: 0.69,
    Fty_E_eu_02: 0.66,
    Fty_E_eu_04: 0.53,
    Fty_E_eu_06: 0.41,
    Fty_E_eu_08: 0.33,
    Fty_E_eu_10: 0.27,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.35,
    Fty_E_eu_00: 0.72,
    Fty_E_eu_01: 0.7,
    Fty_E_eu_02: 0.68,
    Fty_E_eu_04: 0.57,
    Fty_E_eu_06: 0.45,
    Fty_E_eu_08: 0.37,
    Fty_E_eu_10: 0.31,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.4,
    Fty_E_eu_00: 0.73,
    Fty_E_eu_01: 0.71,
    Fty_E_eu_02: 0.69,
    Fty_E_eu_04: 0.61,
    Fty_E_eu_06: 0.49,
    Fty_E_eu_08: 0.4,
    Fty_E_eu_10: 0.34,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.45,
    Fty_E_eu_00: 0.74,
    Fty_E_eu_01: 0.72,
    Fty_E_eu_02: 0.7,
    Fty_E_eu_04: 0.63,
    Fty_E_eu_06: 0.53,
    Fty_E_eu_08: 0.43,
    Fty_E_eu_10: 0.36,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.5,
    Fty_E_eu_00: 0.76,
    Fty_E_eu_01: 0.74,
    Fty_E_eu_02: 0.72,
    Fty_E_eu_04: 0.64,
    Fty_E_eu_06: 0.56,
    Fty_E_eu_08: 0.46,
    Fty_E_eu_10: 0.4,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.55,
    Fty_E_eu_00: 0.77,
    Fty_E_eu_01: 0.76,
    Fty_E_eu_02: 0.73,
    Fty_E_eu_04: 0.66,
    Fty_E_eu_06: 0.59,
    Fty_E_eu_08: 0.5,
    Fty_E_eu_10: 0.43,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.6,
    Fty_E_eu_00: 0.78,
    Fty_E_eu_01: 0.77,
    Fty_E_eu_02: 0.74,
    Fty_E_eu_04: 0.68,
    Fty_E_eu_06: 0.62,
    Fty_E_eu_08: 0.53,
    Fty_E_eu_10: 0.45,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.65,
    Fty_E_eu_00: 0.8,
    Fty_E_eu_01: 0.79,
    Fty_E_eu_02: 0.77,
    Fty_E_eu_04: 0.7,
    Fty_E_eu_06: 0.64,
    Fty_E_eu_08: 0.57,
    Fty_E_eu_10: 0.49,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.7,
    Fty_E_eu_00: 0.82,
    Fty_E_eu_01: 0.81,
    Fty_E_eu_02: 0.78,
    Fty_E_eu_04: 0.73,
    Fty_E_eu_06: 0.68,
    Fty_E_eu_08: 0.61,
    Fty_E_eu_10: 0.53,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.75,
    Fty_E_eu_00: 0.84,
    Fty_E_eu_01: 0.82,
    Fty_E_eu_02: 0.81,
    Fty_E_eu_04: 0.77,
    Fty_E_eu_06: 0.72,
    Fty_E_eu_08: 0.66,
    Fty_E_eu_10: 0.58,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.8,
    Fty_E_eu_00: 0.86,
    Fty_E_eu_01: 0.84,
    Fty_E_eu_02: 0.84,
    Fty_E_eu_04: 0.8,
    Fty_E_eu_06: 0.76,
    Fty_E_eu_08: 0.71,
    Fty_E_eu_10: 0.64,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.85,
    Fty_E_eu_00: 0.88,
    Fty_E_eu_01: 0.87,
    Fty_E_eu_02: 0.87,
    Fty_E_eu_04: 0.84,
    Fty_E_eu_06: 0.81,
    Fty_E_eu_08: 0.77,
    Fty_E_eu_10: 0.71,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.9,
    Fty_E_eu_00: 0.91,
    Fty_E_eu_01: 0.9,
    Fty_E_eu_02: 0.9,
    Fty_E_eu_04: 0.88,
    Fty_E_eu_06: 0.86,
    Fty_E_eu_08: 0.83,
    Fty_E_eu_10: 0.79,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 0.95,
    Fty_E_eu_00: 0.95,
    Fty_E_eu_01: 0.95,
    Fty_E_eu_02: 0.95,
    Fty_E_eu_04: 0.94,
    Fty_E_eu_06: 0.94,
    Fty_E_eu_08: 0.92,
    Fty_E_eu_10: 0.89,
  },
  {
    Fty_Ftu: 0.6,
    Dw: 1,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 1,
    Fty_E_eu_04: 1,
    Fty_E_eu_06: 1,
    Fty_E_eu_08: 1,
    Fty_E_eu_10: 1,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0,
    Fty_E_eu_00: 0,
    Fty_E_eu_01: 0,
    Fty_E_eu_02: 0,
    Fty_E_eu_04: 0,
    Fty_E_eu_06: 0,
    Fty_E_eu_08: 0,
    Fty_E_eu_10: 0,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.05,
    Fty_E_eu_00: 0.4,
    Fty_E_eu_01: 0.38,
    Fty_E_eu_02: 0.24,
    Fty_E_eu_04: 0.14,
    Fty_E_eu_06: 0.08,
    Fty_E_eu_08: 0.07,
    Fty_E_eu_10: 0.05,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.1,
    Fty_E_eu_00: 0.66,
    Fty_E_eu_01: 0.59,
    Fty_E_eu_02: 0.42,
    Fty_E_eu_04: 0.25,
    Fty_E_eu_06: 0.15,
    Fty_E_eu_08: 0.12,
    Fty_E_eu_10: 0.1,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.15,
    Fty_E_eu_00: 0.79,
    Fty_E_eu_01: 0.73,
    Fty_E_eu_02: 0.56,
    Fty_E_eu_04: 0.35,
    Fty_E_eu_06: 0.22,
    Fty_E_eu_08: 0.18,
    Fty_E_eu_10: 0.15,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.2,
    Fty_E_eu_00: 0.83,
    Fty_E_eu_01: 0.81,
    Fty_E_eu_02: 0.67,
    Fty_E_eu_04: 0.43,
    Fty_E_eu_06: 0.29,
    Fty_E_eu_08: 0.23,
    Fty_E_eu_10: 0.19,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.25,
    Fty_E_eu_00: 0.84,
    Fty_E_eu_01: 0.83,
    Fty_E_eu_02: 0.74,
    Fty_E_eu_04: 0.5,
    Fty_E_eu_06: 0.36,
    Fty_E_eu_08: 0.28,
    Fty_E_eu_10: 0.24,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.3,
    Fty_E_eu_00: 0.85,
    Fty_E_eu_01: 0.84,
    Fty_E_eu_02: 0.77,
    Fty_E_eu_04: 0.56,
    Fty_E_eu_06: 0.42,
    Fty_E_eu_08: 0.33,
    Fty_E_eu_10: 0.28,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.35,
    Fty_E_eu_00: 0.85,
    Fty_E_eu_01: 0.85,
    Fty_E_eu_02: 0.8,
    Fty_E_eu_04: 0.62,
    Fty_E_eu_06: 0.48,
    Fty_E_eu_08: 0.37,
    Fty_E_eu_10: 0.31,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.4,
    Fty_E_eu_00: 0.86,
    Fty_E_eu_01: 0.86,
    Fty_E_eu_02: 0.81,
    Fty_E_eu_04: 0.66,
    Fty_E_eu_06: 0.52,
    Fty_E_eu_08: 0.41,
    Fty_E_eu_10: 0.34,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.45,
    Fty_E_eu_00: 0.86,
    Fty_E_eu_01: 0.86,
    Fty_E_eu_02: 0.83,
    Fty_E_eu_04: 0.69,
    Fty_E_eu_06: 0.56,
    Fty_E_eu_08: 0.44,
    Fty_E_eu_10: 0.37,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.5,
    Fty_E_eu_00: 0.87,
    Fty_E_eu_01: 0.87,
    Fty_E_eu_02: 0.84,
    Fty_E_eu_04: 0.72,
    Fty_E_eu_06: 0.59,
    Fty_E_eu_08: 0.47,
    Fty_E_eu_10: 0.4,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.55,
    Fty_E_eu_00: 0.88,
    Fty_E_eu_01: 0.88,
    Fty_E_eu_02: 0.84,
    Fty_E_eu_04: 0.74,
    Fty_E_eu_06: 0.62,
    Fty_E_eu_08: 0.51,
    Fty_E_eu_10: 0.44,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.6,
    Fty_E_eu_00: 0.89,
    Fty_E_eu_01: 0.89,
    Fty_E_eu_02: 0.85,
    Fty_E_eu_04: 0.76,
    Fty_E_eu_06: 0.65,
    Fty_E_eu_08: 0.55,
    Fty_E_eu_10: 0.47,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.65,
    Fty_E_eu_00: 0.9,
    Fty_E_eu_01: 0.9,
    Fty_E_eu_02: 0.86,
    Fty_E_eu_04: 0.79,
    Fty_E_eu_06: 0.68,
    Fty_E_eu_08: 0.58,
    Fty_E_eu_10: 0.5,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.7,
    Fty_E_eu_00: 0.9,
    Fty_E_eu_01: 0.9,
    Fty_E_eu_02: 0.87,
    Fty_E_eu_04: 0.82,
    Fty_E_eu_06: 0.72,
    Fty_E_eu_08: 0.63,
    Fty_E_eu_10: 0.53,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.75,
    Fty_E_eu_00: 0.91,
    Fty_E_eu_01: 0.91,
    Fty_E_eu_02: 0.89,
    Fty_E_eu_04: 0.84,
    Fty_E_eu_06: 0.77,
    Fty_E_eu_08: 0.69,
    Fty_E_eu_10: 0.58,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.8,
    Fty_E_eu_00: 0.92,
    Fty_E_eu_01: 0.92,
    Fty_E_eu_02: 0.92,
    Fty_E_eu_04: 0.88,
    Fty_E_eu_06: 0.83,
    Fty_E_eu_08: 0.74,
    Fty_E_eu_10: 0.64,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.85,
    Fty_E_eu_00: 0.94,
    Fty_E_eu_01: 0.94,
    Fty_E_eu_02: 0.94,
    Fty_E_eu_04: 0.91,
    Fty_E_eu_06: 0.87,
    Fty_E_eu_08: 0.79,
    Fty_E_eu_10: 0.71,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.9,
    Fty_E_eu_00: 0.96,
    Fty_E_eu_01: 0.96,
    Fty_E_eu_02: 0.96,
    Fty_E_eu_04: 0.94,
    Fty_E_eu_06: 0.91,
    Fty_E_eu_08: 0.85,
    Fty_E_eu_10: 0.79,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 0.95,
    Fty_E_eu_00: 0.97,
    Fty_E_eu_01: 0.97,
    Fty_E_eu_02: 0.97,
    Fty_E_eu_04: 0.97,
    Fty_E_eu_06: 0.95,
    Fty_E_eu_08: 0.92,
    Fty_E_eu_10: 0.88,
  },
  {
    Fty_Ftu: 0.8,
    Dw: 1,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 1,
    Fty_E_eu_04: 1,
    Fty_E_eu_06: 1,
    Fty_E_eu_08: 1,
    Fty_E_eu_10: 1,
  },
  {
    Fty_Ftu: 1,
    Dw: 0,
    Fty_E_eu_00: 0,
    Fty_E_eu_01: 0,
    Fty_E_eu_02: 0,
    Fty_E_eu_04: 0,
    Fty_E_eu_06: 0,
    Fty_E_eu_08: 0,
    Fty_E_eu_10: 0,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.05,
    Fty_E_eu_00: 0.54,
    Fty_E_eu_01: 0.44,
    Fty_E_eu_02: 0.26,
    Fty_E_eu_04: 0.13,
    Fty_E_eu_06: 0.09,
    Fty_E_eu_08: 0.07,
    Fty_E_eu_10: 0.06,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.1,
    Fty_E_eu_00: 0.78,
    Fty_E_eu_01: 0.69,
    Fty_E_eu_02: 0.44,
    Fty_E_eu_04: 0.22,
    Fty_E_eu_06: 0.16,
    Fty_E_eu_08: 0.13,
    Fty_E_eu_10: 0.12,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.15,
    Fty_E_eu_00: 0.93,
    Fty_E_eu_01: 0.86,
    Fty_E_eu_02: 0.58,
    Fty_E_eu_04: 0.31,
    Fty_E_eu_06: 0.23,
    Fty_E_eu_08: 0.18,
    Fty_E_eu_10: 0.16,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.2,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 0.96,
    Fty_E_eu_02: 0.71,
    Fty_E_eu_04: 0.42,
    Fty_E_eu_06: 0.3,
    Fty_E_eu_08: 0.23,
    Fty_E_eu_10: 0.2,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.25,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 0.98,
    Fty_E_eu_02: 0.8,
    Fty_E_eu_04: 0.5,
    Fty_E_eu_06: 0.36,
    Fty_E_eu_08: 0.28,
    Fty_E_eu_10: 0.24,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.3,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 0.99,
    Fty_E_eu_02: 0.87,
    Fty_E_eu_04: 0.6,
    Fty_E_eu_06: 0.42,
    Fty_E_eu_08: 0.33,
    Fty_E_eu_10: 0.28,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.35,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 0.99,
    Fty_E_eu_02: 0.93,
    Fty_E_eu_04: 0.66,
    Fty_E_eu_06: 0.48,
    Fty_E_eu_08: 0.37,
    Fty_E_eu_10: 0.31,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.4,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 0.96,
    Fty_E_eu_04: 0.71,
    Fty_E_eu_06: 0.53,
    Fty_E_eu_08: 0.41,
    Fty_E_eu_10: 0.34,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.45,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 0.97,
    Fty_E_eu_04: 0.75,
    Fty_E_eu_06: 0.58,
    Fty_E_eu_08: 0.45,
    Fty_E_eu_10: 0.37,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.5,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 0.96,
    Fty_E_eu_04: 0.78,
    Fty_E_eu_06: 0.62,
    Fty_E_eu_08: 0.49,
    Fty_E_eu_10: 0.4,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.55,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 0.96,
    Fty_E_eu_04: 0.8,
    Fty_E_eu_06: 0.66,
    Fty_E_eu_08: 0.53,
    Fty_E_eu_10: 0.43,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.6,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 0.96,
    Fty_E_eu_04: 0.83,
    Fty_E_eu_06: 0.69,
    Fty_E_eu_08: 0.56,
    Fty_E_eu_10: 0.46,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.65,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 0.96,
    Fty_E_eu_04: 0.87,
    Fty_E_eu_06: 0.73,
    Fty_E_eu_08: 0.6,
    Fty_E_eu_10: 0.5,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.7,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 0.97,
    Fty_E_eu_04: 0.9,
    Fty_E_eu_06: 0.78,
    Fty_E_eu_08: 0.64,
    Fty_E_eu_10: 0.53,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.75,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 0.99,
    Fty_E_eu_04: 0.93,
    Fty_E_eu_06: 0.84,
    Fty_E_eu_08: 0.7,
    Fty_E_eu_10: 0.57,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.8,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 1,
    Fty_E_eu_04: 0.97,
    Fty_E_eu_06: 0.91,
    Fty_E_eu_08: 0.76,
    Fty_E_eu_10: 0.63,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.85,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 0.99,
    Fty_E_eu_04: 0.99,
    Fty_E_eu_06: 0.94,
    Fty_E_eu_08: 0.81,
    Fty_E_eu_10: 0.69,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.9,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 1,
    Fty_E_eu_04: 1,
    Fty_E_eu_06: 0.97,
    Fty_E_eu_08: 0.86,
    Fty_E_eu_10: 0.78,
  },
  {
    Fty_Ftu: 1,
    Dw: 0.95,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 1,
    Fty_E_eu_04: 1,
    Fty_E_eu_06: 0.99,
    Fty_E_eu_08: 0.92,
    Fty_E_eu_10: 0.87,
  },
  {
    Fty_Ftu: 1,
    Dw: 1,
    Fty_E_eu_00: 1,
    Fty_E_eu_01: 1,
    Fty_E_eu_02: 1,
    Fty_E_eu_04: 1,
    Fty_E_eu_06: 1,
    Fty_E_eu_08: 1,
    Fty_E_eu_10: 1,
  },
];

export function KChart({
  h,
  w,
  style,
}: {
  h: number | string;
  w: number | string;
  style?: React.CSSProperties | undefined;
}) {
  return (
    <>
      <LineChart
        h={h}
        w={w}
        style={style}
        data={K_data}
        title="Allowable Uniform Axial Load Coefficient"
        dataKey="eD"
        xAxisLabel="e/D"
        yAxisLabel="K"
        tickLine="y"
        gridAxis="xy"
        xAxisProps={{ domain: [0.5, 2.4] }}
        yAxisProps={{ domain: [1.0, 2.0] }}
        curveType="linear"
        withDots={true}
        withLegend={true}
        legendProps={{
          align: "center",
          verticalAlign: "bottom",
          layout: "vertical",
          wrapperStyle: { margin: "auto" },
        }}
        valueFormatter={(value) => `${value.toFixed(2)}`}
        series={[
          {
            name: "K",
            label: "K Allowable Uniform Axial Load Coefficient",
            color: "blue.6",
          },
        ]}
      />
    </>
  );
}

export function KbChart({
  h,
  w,
  style,
}: {
  h: number | string;
  w: number | string;
  style?: React.CSSProperties | undefined;
}) {
  return (
    <>
      <LineChart
        h={h}
        w={w}
        style={style}
        data={Kb_data}
        dataKey="a_D"
        xAxisLabel="a/D"
        yAxisLabel="K_br"
        tickLine="xy"
        gridAxis="xy"
        xAxisProps={{ domain: [0.0, 1.0] }}
        yAxisProps={{ domain: [0.0, 1.0] }}
        curveType="linear"
        withDots={true}
        withLegend={true}
        legendProps={{
          align: "right",
          verticalAlign: "middle",
          layout: "vertical",
          width: 100,
          wrapperStyle: { paddingLeft: "20px" },
        }}
        valueFormatter={(value) => `${value.toFixed(2)}`}
        series={[
          { name: "Dt_02", label: "D/t= 2", color: "blue.2" },
          { name: "Dt_03", label: "D/t= 3", color: "blue.4" },
          { name: "Dt_04", label: "D/t= 4", color: "blue.6" },
          { name: "Dt_05", label: "D/t= 5", color: "blue.8" },
          { name: "Dt_06", label: "D/t= 6", color: "blue.9" },
          { name: "Dt_07", label: "D/t= 7", color: "green.9" },
          { name: "Dt_08", label: "D/t= 8", color: "green.8" },
          { name: "Dt_09", label: "D/t= 9", color: "green.6" },
          { name: "Dt_10", label: "D/t=10", color: "green.4" },
          { name: "Dt_15", label: "D/t=15", color: "red.4" },
          { name: "Dt_20", label: "D/t=20", color: "red.5" },
          { name: "Dt_25", label: "D/t=25", color: "red.7" },
          { name: "Dt_30", label: "D/t=30", color: "red.9" },
        ]}
      />
    </>
  );
}

export function KnChart({
  h,
  w,
  style,
}: {
  h: number | string;
  w: number | string;
  style?: React.CSSProperties | undefined;
}) {
  return (
    <>
      <LineChart
        h={h}
        w={w}
        style={style}
        data={Kn_data}
        dataKey="Dw"
        xAxisLabel="D/w"
        yAxisLabel="K_n"
        tickLine="xy"
        gridAxis="xy"
        xAxisProps={{ domain: [0.5, 4.0] }}
        yAxisProps={{ domain: [0.0, 1.0] }}
        curveType="linear"
        withDots={true}
        withLegend={true}
        legendProps={{
          align: "right",
          verticalAlign: "middle",
          layout: "vertical",
          width: 150,
          wrapperStyle: { paddingLeft: "20px" },
        }}
        valueFormatter={(value) => `${value.toFixed(2)}`}
        series={[
          { name: "Fty_E_eu_00", label: "Fty/Eε= 0.", yAxisId: "0.0", color: "blue.2" },
          { name: "Fty_E_eu_01", label: "Fty/Eε= 0.1", yAxisId: "0.1", color: "blue.4" },
          { name: "Fty_E_eu_02", label: "Fty/Eε= 0.2", yAxisId: "0.3", color: "blue.6" },
          { name: "Fty_E_eu_04", label: "Fty/Eε= 0.4", yAxisId: "0.4", color: "blue.8" },
          { name: "Fty_E_eu_06", label: "Fty/Eε= 0.6", yAxisId: "0.6", color: "blue.9" },
          { name: "Fty_E_eu_08", label: "Fty/Eε= 0.8", yAxisId: "0.8", color: "green.9" },
          { name: "Fty_E_eu_10", label: "Fty/Eε= 1.0", yAxisId: "1.0", color: "green.8" },
        ]}
      />
    </>
  );
}

type KnEntry = {
  Fty_Ftu: number;
  Dw: number;
  [key: string]: number; // for Fty_E_eu_xx keys
};

// Utility: linear interpolation between two points
function lerp(x: number, x0: number, y0: number, x1: number, y1: number): number {
  if (x1 === x0) return y0; // avoid div by zero
  return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
}

// Find entries in Kn_data that match the given Fty_Ftu (bracketing low and high)
function findBracketingFtyFtu(data: KnEntry[], target: number): [KnEntry[], KnEntry[]] {
  const allFtyFtu = Array.from(new Set(data.map((d) => d.Fty_Ftu))).sort((a, b) => a - b);
  let lowF = allFtyFtu[0];
  let highF = allFtyFtu[allFtyFtu.length - 1];

  for (let i = 0; i < allFtyFtu.length - 1; i++) {
    if (target >= allFtyFtu[i] && target <= allFtyFtu[i + 1]) {
      lowF = allFtyFtu[i];
      highF = allFtyFtu[i + 1];
      break;
    }
  }
  const lowEntries = data.filter((d) => d.Fty_Ftu === lowF);
  const highEntries = data.filter((d) => d.Fty_Ftu === highF);
  return [lowEntries, highEntries];
}

// Similarly find bracketing Dw entries in an array with same Fty_Ftu
function findBracketingDw(data: KnEntry[], target: number): [KnEntry, KnEntry] | null {
  const sorted = data.sort((a, b) => a.Dw - b.Dw);
  if (target <= sorted[0].Dw) return [sorted[0], sorted[0]];
  if (target >= sorted[sorted.length - 1].Dw)
    return [sorted[sorted.length - 1], sorted[sorted.length - 1]];

  for (let i = 0; i < sorted.length - 1; i++) {
    if (target >= sorted[i].Dw && target <= sorted[i + 1].Dw) {
      return [sorted[i], sorted[i + 1]];
    }
  }
  return null;
}

// Main interpolation function for given Fty_Ftu, Dw, Fty_E_key (like "Fty_E_eu_04")
function interpolateK(
  data: KnEntry[],
  Fty_Ftu_val: number,
  Dw_val: number,
  Fty_E_key: string,
): number | null {
  const [lowFtyEntries, highFtyEntries] = findBracketingFtyFtu(data, Fty_Ftu_val);

  // Interpolate at low Fty_Ftu
  const lowDwPair = findBracketingDw(lowFtyEntries, Dw_val);
  if (!lowDwPair) return null;
  const lowK = lerp(
    Dw_val,
    lowDwPair[0].Dw,
    lowDwPair[0][Fty_E_key],
    lowDwPair[1].Dw,
    lowDwPair[1][Fty_E_key],
  );

  // Interpolate at high Fty_Ftu
  const highDwPair = findBracketingDw(highFtyEntries, Dw_val);
  if (!highDwPair) return null;
  const highK = lerp(
    Dw_val,
    highDwPair[0].Dw,
    highDwPair[0][Fty_E_key],
    highDwPair[1].Dw,
    highDwPair[1][Fty_E_key],
  );

  // Interpolate between the two Fty_Ftu interpolated values
  const ftyLow = lowFtyEntries[0].Fty_Ftu;
  const ftyHigh = highFtyEntries[0].Fty_Ftu;
  const K = lerp(Fty_Ftu_val, ftyLow, lowK, ftyHigh, highK);

  return K;
}
