import { useState } from "react";
import { Slider, NumberInput, Group, Stack, Title } from "@mantine/core";
import StressContour from "./StressContour";

export default function InteractiveStressContour() {
  const [load, setLoad] = useState(100); // Applied load in kN
  const [width, setWidth] = useState(0.5); // Lug width in meters
  const [height, setHeight] = useState(0.3); // Lug height in meters

  function loadUpdate(val: number | string) {
    setLoad(Number(val));
  }

  // Generate synthetic stress data based on inputs
  const generateStressData = () => {
    const points = [];
    for (let x = 0; x <= 1; x += 0.2) {
      for (let y = 0; y <= 1; y += 0.2) {
        const stress = load * (1 - Math.abs(x - 0.5)) * (1 - Math.abs(y - 0.5)) * 10;
        points.push({ x, y, stress });
      }
    }
    return points;
  };

  return (
    <Stack>
      <Title order={3}>Stress Contour Diagram</Title>
      <Group grow>
        <NumberInput
          label="Applied Load (kN)"
          value={load}
          onChange={loadUpdate}
          min={0}
          max={500}
        />
        <Slider
          label="Lug Width (m)"
          value={width}
          onChange={setWidth}
          min={0.1}
          max={1}
          step={0.05}
        />
        <Slider
          label="Lug Height (m)"
          value={height}
          onChange={setHeight}
          min={0.1}
          max={1}
          step={0.05}
        />
      </Group>
      <StressContour width={300} height={200} data={generateStressData()} />
    </Stack>
  );
}
