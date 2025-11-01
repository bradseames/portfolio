import { useState } from 'react';
import { Grid, Container } from '@mantine/core';
import { type LugInputs } from '../Forms/CalculationForm';
import CalculationForm from '../Forms/CalculationForm';
import LugChart from '../viz/LugChart';

export const ParentCalculatorPage = () => {
  const [calculationData, setCalculationData] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculation = (inputs: LugInputs) => {
    setIsCalculating(true);
    // --- 1. Perform or fetch the calculation here ---
    // Example: simulate an API call
    setTimeout(() => {
      console.log('Calculating with inputs:', inputs);
      // Example output structure for your D3 chart:
      const newVizData = [
        {
          length: inputs.lugLength,
          angle: inputs.lugAngle,
        },
        // ... more calculated points
      ];
      setCalculationData(newVizData);
      setIsCalculating(false);
    }, 1000);
  };

  return (
      <Container size="lg" my="lg">
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <CalculationForm onCalculate={handleCalculation} isLoading={isCalculating} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8 }}>
            {/* The output of the form drives the input of the chart */}
            <LugChart lugData={calculationData} isLoading={isCalculating} />
          </Grid.Col>
        </Grid>
      </Container>
  );
};
