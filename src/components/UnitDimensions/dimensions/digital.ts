// https://en.wikipedia.org/wiki/Bit

import { type Dimension, dimension, quantity, type Quantity } from '../core';
import { type Divide, divide } from './helpers';
import { type Time, time } from './physics';

// Basic digital dimensions
export type Information = Dimension<'Information'>;
export const information: Information = dimension('Information');

export type DigitalDimension = Information;

// Composed digital dimensions
export type Bandwidth = Quantity<'Bandwidth', Divide<Information, Time>>;
export const bandwidth: Bandwidth = quantity(
  'Bandwidth',
  divide(information, time),
);