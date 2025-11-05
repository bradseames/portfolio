type KnEntry = {
  Fty_Ftu: number;
  Dw: number;
  [key: string]: number; // keys like "Fty_E_eu_00", "Fty_E_eu_01", etc.
};

// Known discrete Fty_E_eu values and corresponding key suffixes in data
const knownFty_E_eu = [0, 0.1, 0.2, 0.6, 0.8, 1];

// Linear interpolation helper
function lerp(x: number, x0: number, y0: number, x1: number, y1: number): number {
  if (x1 === x0) return y0;
  return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
}

// Find the bounding Fty_Ftu values for a target
function findBoundingFtyFtu(data: KnEntry[], target: number): [number, number] {
  const unique = Array.from(new Set(data.map((d) => d.Fty_Ftu))).sort((a, b) => a - b);
  let low = unique[0];
  let high = unique[unique.length - 1];
  for (let i = 0; i < unique.length - 1; i++) {
    if (target >= unique[i] && target <= unique[i + 1]) {
      low = unique[i];
      high = unique[i + 1];
      break;
    }
  }
  return [low, high];
}

// Find the bounding Dw values for a target inside a subset where Fty_Ftu is fixed
function findBoundingDw(subset: KnEntry[], target: number): [KnEntry, KnEntry] {
  const sorted = subset.slice().sort((a, b) => a.Dw - b.Dw);
  if (target <= sorted[0].Dw) return [sorted[0], sorted[0]];
  if (target >= sorted[sorted.length - 1].Dw)
    return [sorted[sorted.length - 1], sorted[sorted.length - 1]];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (target >= sorted[i].Dw && target <= sorted[i + 1].Dw) {
      return [sorted[i], sorted[i + 1]];
    }
  }
  return [sorted[0], sorted[0]]; // fallback, should not happen
}

// Interpolate K at a single fixed Fty_E_eu key given Fty_Ftu and Dw
function interpolateAtFty_E_eu(
  data: KnEntry[],
  Fty_Ftu_val: number,
  Dw_val: number,
  Fty_E_eu_key: string,
): number | null {
  const [Fty_low, Fty_high] = findBoundingFtyFtu(data, Fty_Ftu_val);

  const lowFtySubset = data.filter((d) => d.Fty_Ftu === Fty_low);
  const highFtySubset = data.filter((d) => d.Fty_Ftu === Fty_high);

  const [lowDwEntry0, lowDwEntry1] = findBoundingDw(lowFtySubset, Dw_val);
  const [highDwEntry0, highDwEntry1] = findBoundingDw(highFtySubset, Dw_val);

  // Interpolate along Dw at low Fty_Ftu
  const lowK = lerp(
    Dw_val,
    lowDwEntry0.Dw,
    lowDwEntry0[Fty_E_eu_key],
    lowDwEntry1.Dw,
    lowDwEntry1[Fty_E_eu_key],
  );

  // Interpolate along Dw at high Fty_Ftu
  const highK = lerp(
    Dw_val,
    highDwEntry0.Dw,
    highDwEntry0[Fty_E_eu_key],
    highDwEntry1.Dw,
    highDwEntry1[Fty_E_eu_key],
  );

  // Interpolate along Fty_Ftu between low and high
  const K = lerp(Fty_Ftu_val, Fty_low, lowK, Fty_high, highK);

  return K;
}

// Interpolate final K over the decimal Fty_E_eu input between discrete keys
function interpolateAlongFty_E_eu(
  Fty_E_eu_val: number,
  KMap: Record<number, number>,
): number | null {
  if (Fty_E_eu_val <= knownFty_E_eu[0]) return KMap[knownFty_E_eu[0]];
  if (Fty_E_eu_val >= knownFty_E_eu[knownFty_E_eu.length - 1])
    return KMap[knownFty_E_eu[knownFty_E_eu.length - 1]];

  for (let i = 0; i < knownFty_E_eu.length - 1; i++) {
    const low = knownFty_E_eu[i];
    const high = knownFty_E_eu[i + 1];
    if (Fty_E_eu_val >= low && Fty_E_eu_val <= high) {
      const t = (Fty_E_eu_val - low) / (high - low);
      const lowK = KMap[low];
      const highK = KMap[high];
      if (lowK === undefined || highK === undefined) return null;
      return lowK + t * (highK - lowK);
    }
  }
  return null; // fallback
}

// Main function: interpolate K given inputs
function interpolateKFull(
  data: KnEntry[],
  Fty_Ftu_val: number,
  Dw_val: number,
  Fty_E_eu_val: number,
): number | null {
  // Build map K vs known discrete Fty_E_eu keys
  const KMap: Record<number, number> = {};

  for (const val of knownFty_E_eu) {
    // Convert to key suffix format, e.g. 0.1 -> "Fty_E_eu_01"
    const suffix = (val * 10).toFixed(0).padStart(2, "0"); // works since increments 0.1
    const key = `Fty_E_eu_${suffix}`;
    const K = interpolateAtFty_E_eu(data, Fty_Ftu_val, Dw_val, key);
    if (K === null) {
      return null;
    }
    KMap[val] = K;
  }

  // Final interpolation for decimal Fty_E_eu input
  return interpolateAlongFty_E_eu(Fty_E_eu_val, KMap);
}
