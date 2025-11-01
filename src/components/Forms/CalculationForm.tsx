import React from 'react';
import { Button, TextInput, Stack, Paper, Title } from '@mantine/core';
import { useForm } from 'react-hook-form';

// Define the shape of your form data (inputs for your lug calculation)
export interface LugInputs {
  lugLength: number;
  lugAngle: number;
  density: number;
  // Add other necessary inputs here
}

export interface CalculationFormProps {
  // Function to call with validated data when the form is submitted
  onCalculate: (data: LugInputs) => void;
  isLoading: boolean;
}

const CalculationForm: React.FC<CalculationFormProps> = ({ onCalculate, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LugInputs>();

  // Handler for form submission (called by handleSubmit)
  const onSubmit = (data: LugInputs) => {
    // Convert string inputs to numbers before passing them up
    const numericData: LugInputs = {
      lugLength: parseFloat(String(data.lugLength)),
      lugAngle: parseFloat(String(data.lugAngle)),
      density: parseFloat(String(data.density)),
    };
    onCalculate(numericData);
  };

  return (
      <Paper shadow="lg" p="xl" withBorder>
        <Title order={4} mb="lg">Lug Calculation Inputs</Title>

        {/* handleSubmit is provided by React Hook Form. It handles validation before calling onSubmit. */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="md">

            <TextInput
                label="Lug Length (mm)"
                placeholder="e.g., 50"
                type="number"
                {...register('lugLength', { required: 'Length is required', valueAsNumber: true })}
                error={errors.lugLength && errors.lugLength.message}
            />

            <TextInput
                label="Lug Angle (°)"
                placeholder="e.g., 45"
                type="number"
                {...register('lugAngle', { required: 'Angle is required', valueAsNumber: true })}
                error={errors.lugAngle && errors.lugAngle.message}
            />

            <TextInput
                label="Material Density (g/cm³)"
                placeholder="e.g., 7.85"
                type="number"
                {...register('density', { required: 'Density is required', valueAsNumber: true })}
                error={errors.density && errors.density.message}
            />

            <Button
                type="submit"
                fullWidth
                mt="md"
                loading={isLoading}
                disabled={isLoading}
            >
              Calculate Dimensions
            </Button>

          </Stack>
        </form>
      </Paper>
  );
};

export default CalculationForm;
