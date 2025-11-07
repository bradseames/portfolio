import React, { useState } from "react";
import {
  Button,
  type ComboboxItem,
  Divider,
  Fieldset,
  Group,
  TextInput,
  NumberInput,
  Input,
  Select,
  Stack,
  Paper,
  Title,
} from "@mantine/core";
import { useForm } from "react-hook-form";

export interface PinInputs {
  Dp: number;
  E: number;
  Ftu: number;
  Fty: number;
  Fsu: number;
}

export interface PinFormProps {
  onCalculate: (data: PinInputs) => void;
  isLoading: boolean;
}

export const PinInputForm: React.FC<PinFormProps> = ({ onCalculate, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PinInputs>();

  const [Dp, setDp] = useState(30000000);
  const [material, setMaterial] = useState<ComboboxItem | null>(null);
  const [modE, setModE] = useState(30000000);

  const onSubmit = (data: PinInputs) => {
    const numericData: PinInputs = {
      Dp: parseFloat(String(data.Dp)),
      E: parseFloat(String(data.E)),
      Ftu: parseFloat(String(data.Ftu)),
      Fty: parseFloat(String(data.Fty)),
      Fsu: parseFloat(String(data.Fsu)),
    };
    onCalculate(numericData);
  };

  return (
    //<Paper shadow="lg" p="md" withBorder>
    //  <Title order={4}>Lug Pin Inputs</Title>
    //  <Divider my={"sm"} />

    <form onSubmit={handleSubmit(onSubmit)}>
      <Group align="flex-start">
        <Stack gap="md">
          <Fieldset legend="Geometry">
            <NumberInput
              label={
                <span>
                  D<sub>p</sub>, Pin Diameter
                </span>
              }
              value={Dp}
              onChange={setDp}
              placeholder="e.g., 50"
            />
          </Fieldset>
        </Stack>

        <Stack gap="md">
          <Fieldset legend="Material">
            <Select
              label="Material Name"
              data={[{ value: "al-6061-t6", label: "Al 6061-T6" }]}
              value={material ? material.value : null}
              onChange={(_value, option) => setMaterial(option)}
            />
            <hr
              style={{
                borderColor: "var(--mantine-color-dark-4)",
                marginTop: "1rem",
                borderWidth: "calc(0.0625rem * var(--mantine-scale))",
                borderTop: "none",
                borderLeftColor: "none",
              }}
            />

            <NumberInput
              label={
                <span>
                  E<sub>P</sub> Elastic Modulus
                </span>
              }
              placeholder="e.g., 50"
              value={modE}
              onChange={setModE}
              //onChange={(val) => {
              //  setmodE(val);
              //}}
              //onChange={(e)=>{setmodE({Number(e)})}}
              //onChange={(val) => setmodE(Number(val))}
              //onChange={(val) => modE(event.currentTarget.value)}
              thousandSeparator={true}
              step={1000000}
              //{...register("E", { required: "Length is required", valueAsNumber: true })}
              //error={errors.E && errors.E.message}
            />
            <TextInput
              label={
                <span>
                  F<sub>tuP</sub> Tensile Ultimate Stress
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("Ftu", { required: "Length is required", valueAsNumber: true })}
              error={errors.Ftu && errors.Ftu.message}
            />
            <TextInput
              label={
                <span>
                  F<sub>tyP</sub> Tensile Yield Stress
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("Fty", { required: "Length is required", valueAsNumber: true })}
              error={errors.Fty && errors.Fty.message}
            />
            <TextInput
              label={
                <span>
                  F<sub>suP</sub> Shear Ultimate Stress
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("Fsu", { required: "Length is required", valueAsNumber: true })}
              error={errors.Fsu && errors.Fsu.message}
            />
          </Fieldset>
        </Stack>
      </Group>
    </form>
    //</Paper>
  );
};

export default PinInputForm;
