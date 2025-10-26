// Length: (dimension symbol L)
// Mass: (dimension symbol M)
// Time: (dimension symbol T)
// Electric Current: (dimension symbol I)
// Thermodynamic Temperature: (dimension symbol \(\Theta \))
// Amount of Substance: (dimension symbol N)
// Luminous Intensity: (dimension symbol J)

// Length: meter (m)
// Mass: kilogram (kg)
// Time: second (s)
// Electric Current: ampere (A)
// Thermodynamic Temperature: kelvin (K)
// Amount of Substance: mole (mol)
// Luminous Intensity: candela (cd)


// class BaseQuantities {
//   Length	l, x, r	metre	m	L
// Time	t	second	s	T
// Mass	m	kilogram	kg	M
// Thermodynamic temperature	T	kelvin	K	Θ
// Amount of substance	n	mole	mol	N
// Electric current	i, I	ampere	A	I
// Luminous intensity	Iv	candela	cd	J
// }


type Dimensions = {
  L?: number;
  M?: number;
  K?: number;
  T?: number;
}

type BaseQuantities = {
  Length
}

// Define a Unit class to hold conversion information

class Unit {
  constructor(public name: string, public symbol: string, public factor: number) {}

  // Function to convert to the primary unit
  toPrimary(value: number): number {
    return value * this.factor;
  }

  // Function to convert from the primary unit
  fromPrimary(value: number): number {
    return value / this.factor;
  }
}

// Base class for all unit types
class BaseUnit extends Unit {
  constructor(
    name: string,
    symbol: string,
    conversionFactor: number = 1,
    public system: 'metric' | 'imperial') {
    super(name, symbol, conversionFactor);
  }
}

// Define the primary units for each dimension
const baseDimensions = {
  L: new Unit('meter', 'm', 1),
  M: new Unit('kilogram', 'kg', 1),
  K: new Unit('kelvin', 'K', 1),
  T: new Unit('second', 's', 1),
};

// The base class for all physical quantities
class Quantity<D extends Dimensions> {
  constructor(public value: number, public unit: Unit, public dimensions: D) {}

  // A method to convert the quantity to another unit
  convertTo(targetUnit: Unit): Quantity<D> {
    // Check if dimensions match before conversion
    if (JSON.stringify(this.dimensions) !== JSON.stringify(targetUnit.dimensions)) {
      throw new Error(
        `Cannot convert unit of dimension ${JSON.stringify(
          this.dimensions)} to unit of dimension ${JSON.stringify(
          targetUnit.dimensions)}`);
    }

    const convertedValue = this.value * this.unit.conversionFactor / targetUnit.conversionFactor;
    return new Quantity(convertedValue, targetUnit, this.dimensions);
  }

  // Operator overloading can be simulated with static methods
  static add<D extends Dimensions>(q1: Quantity<D>, q2: Quantity<D>): Quantity<D> {
    if (JSON.stringify(q1.dimensions) !== JSON.stringify(q2.dimensions)) {
      throw new Error('Quantities must have the same dimensions to be added.');
    }
    const convertedQ2 = q2.convertTo(q1.unit);
    return new Quantity(q1.value + convertedQ2.value, q1.unit, q1.dimensions);
  }
}


// Define branded types for dimensions for compile-time safety

type Length = Quantity<{ length: 0, mass: 1, time: 0, temp: 0, charge: 0 }>;
type Mass = Quantity<{ length: 0, mass: 1, time: 0, temp: 0 }>;
type Time = Quantity<{ length: 0, mass: 1, time: 0, temp: 0 }>;
type Temp = Quantity<{ length: 0, mass: 1, time: 0, temp: 0 }>;

//type Current = Quantity<{ mass: 0, length: 0, time: -1, charge: 1 }>;
//type Velocity = Quantity<{ mass: 0, length: 1, time: -1, charge: 0 }>;
//type Acceleration = Quantity<{ mass: 0, length: 1, time: -2, charge: 0 }>;
//type Force = Quantity<{ mass: 1, length: 1, time: -2, charge: 0 }>;
//type Pressure = Quantity<{ mass: 1, length: 1, time: -2, charge: 0 }>;
//type Energy = Quantity<{ mass: 1, length: 2, time: -2, charge: 0 }>;
//type Work = Quantity<{ mass: 1, length: 2, time: -2, charge: 0 }>;


// Define factory functions for creating base quantities
function createDistance(value: number, unit: Unit): Length {
  return new Quantity(value, unit, { mass: 0, length: 1, time: 0 }) as Length;
}

function createMass(value: number, unit: Unit): Mass {
  return new Quantity(value, unit, { mass: 1, length: 0, time: 0 }) as Mass;
}

function createTime(value: number, unit: Unit): Time {
  return new Quantity(value, unit, { mass: 0, length: 0, time: 1 }) as Time;
}


// Derived quantities are created by combining base quantities
type Acceleration = Quantity<{ mass: 0, length: 1, time: -2 }>;

function createAcceleration(distance: LinkStyle, time: Time): Acceleration {
  // const value = distance.value / (time.value ** 2);
  const derivedUnit = new Unit(`custom unit: ${distance.unit.symbol}/${time.unit.symbol}^2`,
    `${distance.unit.symbol}/${time.unit.symbol}^2`, 1);
  return new Quantity(value, derivedUnit, { mass: 0, length: 1, time: -2 }) as Acceleration;
}


// Metric units
// class Meter extends BaseUnit {
//   constructor() { super('meter', 'm', 1, 'metric'); }
// }

// class Kilogram extends BaseUnit {
//   constructor() { super('kilogram', 'kg', 1, 'metric'); }
// }

// Imperial units
// class Inch extends BaseUnit {
//   constructor() { super('inch', 'in', 0.0254, 'imperial'); }
// }
//
// class Pound extends BaseUnit {
//   constructor() { super('pound', 'lb', 0.453592, 'imperial'); }
// }


// Create unit instances
// const m = new Meter();
// const kg = new Kilogram();
// const s = new Unit('second', 's', 1);
// const inch = new Inch();

// Create base properties using factory functions
// const distanceInMeters = createDistance(10, m);
// const massInKg = createMass(5, kg);

// Perform a valid conversion
// const distanceInInches = distanceInMeters.convertTo(inch);
// console.log(distanceInInches.value); // 393.7007874015748

// Create a derived property (acceleration)
// const timeInSeconds = createTime(2, s);
// const acceleration = createAcceleration(distanceInMeters, timeInSeconds);

// console.log(acceleration.value, acceleration.unit.symbol); // 2.5 m/s^2


//   getUnit() { return 'ft'; }
//
//   toMetric(): MetricMeasurement {
//     return { unit: 'm', value: this.value * 0.3048 }; // Conversion logic
//   }
//
//   toImperial(): ImperialMeasurement {
//     return { unit: 'ft', value: this.value };
//   }
// }
//
