export * from './physics';
export * from './digital';

import type { DigitalDimension } from './digital';
import type { PhysicsDimension } from './physics';

export type SimpleDimension = PhysicsDimension | DigitalDimension;

export * from './helpers';