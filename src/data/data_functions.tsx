/**
 * Performs linear interpolation to find a y-value for a given x-value.
 *
 * @param {Array<Array<number>>} data An array of [x, y] data points, sorted by x-value.
 * @param {number} x The x-value for which to interpolate the corresponding y-value.
 * @returns {number|null} The interpolated y-value, or null if x is outside the data range.
 */
//import { type DataPoint } from './types';
import * as d3 from 'd3';

export function linearInterpolate(x1: number, y1: number, x2: number, y2: number,
    x_target: number): number {
  if (x1 === x2) {
    return y1; // Avoid division by zero if x values are identical
  }
  return y1 + ((x_target - x1) * (y2 - y1)) / (x2 - x1);
}

export function linearInterpolateArray(data: Array<Array<number>>,
    x_target: number): number | null {
  // Handle edge cases where x is outside the data range
  if (x_target < data[0][0] || x_target > data[data.length - 1][0]) {
    console.warn('Input x-value is outside the range of the provided data.');
    return null;
  }

  // Find the interval where x lies
  for (let i = 0; i < data.length - 1; i++) {
    const x0 = data[i][0];
    const x1 = data[i + 1][0];

    if (x_target >= x0 && x_target <= x1) {
      const y0 = data[i][1];
      const y1 = data[i + 1][1];
      return linearInterpolate(x0, y0, x1, y1, x_target);
    }
  }
  // This should theoretically not be reached if x is within bounds
  return null;
}

export function findBoundingNumbers(data: Array<number>, x_target: number): Array<number> | null {
  // Handle edge cases where x is outside the data range
  if (x_target < data[0] || x_target > data[data.length - 1]) {
    console.warn('Input x-value is outside the range of the provided data.');
    return null;
  }

  // Find the interval where x lies
  for (let i = 0; i < data.length - 1; i++) {
    const x0 = data[i];
    const x1 = data[i + 1];

    if (x_target >= x0 && x_target <= x1) {
      return [x0, x1];
    }
  }
  // This should theoretically not be reached if x is within bounds
  return null;
}

export function linearInterpolatedObject(data: Array<{ [key: string]: number }>, x_key: string,
    y_key: string,
    x_target: number): number {
  // Handle edge cases where x_target is outside the data range

  if (x_target <= data[0][x_key]) {
    return data[0][y_key];
  }
  if (x_target >= data[data.length - 1][x_key]) {
    return data[data.length - 1][y_key];
  }

  for (let i = 0; i < data.length - 1; i++) {
    const p1 = data[i];
    const p2 = data[i + 1];

    if (x_target >= p1[x_key] && x_target <= p2[x_key]) {
      console.log(p1[x_key]);
      console.log(p1[y_key]);
      console.log(p2[x_key]);
      console.log(p2[y_key]);
      console.log(x_target);

      return linearInterpolate(p1[x_key], p1[y_key], p2[x_key], p2[y_key], x_target);
    }
  }
  return 0; // Should not be reached if edge cases are handled and data is sorted
}
