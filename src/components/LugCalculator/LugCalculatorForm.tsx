import { NumberInput, Group, Button } from '@mantine/core';
import { useState } from 'react';

interface CalculationResult {
  FnuL: number;
  FnyL: number;
  PnuL: number;
}

export default function LugCalculatorForm({ onCalculate }: {
  onCalculate: (result: CalculationResult) => void
}) {
  const [Ftu, setFtu] = useState(0);
  const [Fty, setFty] = useState(0);
  const [Kn, setKn] = useState(1);
  const [w, setW] = useState(0);
  const [D, setD] = useState(0);
  const [t, setT] = useState(0);

  const handleSubmit = () => {
    const FnuL = Kn * Ftu;
    const FnyL = Kn * Fty;
    const PnuL = Ftu <= 1.304 * Fty
        ? FnuL * (w - D) * t
        : 1.304 * FnyL * (w - D) * t;
    onCalculate({ FnuL, FnyL, PnuL });
  };

  return (
      <Group>
        <NumberInput label="Ftu" value={Ftu}
                     onChange={(value) => setFtu(typeof value === 'number' ? value : 0)} />
        <NumberInput label="Fty" value={Fty}
                     onChange={(value) => setFty(typeof value === 'number' ? value : 0)} />
        <NumberInput label="Kn" value={Kn}
                     onChange={(value) => setKn(typeof value === 'number' ? value : 1)} />
        <NumberInput label="w" value={w}
                     onChange={(value) => setW(typeof value === 'number' ? value : 0)} />
        <NumberInput label="D" value={D}
                     onChange={(value) => setD(typeof value === 'number' ? value : 0)} />
        <NumberInput label="t" value={t}
                     onChange={(value) => setT(typeof value === 'number' ? value : 0)} />
        <Button onClick={handleSubmit}>Calculate</Button>
      </Group>
  );
}
