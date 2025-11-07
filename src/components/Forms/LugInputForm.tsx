import React, { useState } from "react";
import {
  Select,
  type ComboboxItem,
  Divider,
  Group,
  Fieldset,
  TextInput,
  Stack,
  Paper,
  Title,
} from "@mantine/core";
import { useForm } from "react-hook-form";

export interface LugInputs {
  t: number;
  D: number;
  e: number;
  w: number;
  w_t: number;
  Ftu: number;
  Fty: number;
  E: number;
  e_u: number;
}

export interface LugFormProps {
  onCalculate: (data: LugInputs) => void;
  isLoading: boolean;
  lugName?: string | number;
}

export const LugInputForm: React.FC<LugFormProps> = ({ onCalculate, isLoading, lugName = "" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LugInputs>();
  const [material, setMaterial] = useState<ComboboxItem | null>(null);
  const onSubmit = (data: LugInputs) => {
    const numericData: LugInputs = {
      t: parseFloat(String(data.t)),
      D: parseFloat(String(data.D)),
      e: parseFloat(String(data.e)),
      w: parseFloat(String(data.w)),
      w_t: parseFloat(String(data.w_t)),
      Ftu: parseFloat(String(data.Ftu)),
      Fty: parseFloat(String(data.Fty)),
      E: parseFloat(String(data.E)),
      e_u: parseFloat(String(data.e_u)),
    };
    onCalculate(numericData);
  };

  return (
    //<Paper p="md" withBorder>
    //  <Title order={4}>Lug {lugName} Inputs</Title>
    //  <Divider my={"sm"} />

    <form onSubmit={handleSubmit(onSubmit)}>
      <Group align="flex-start">
        <Stack gap="md">
          <Fieldset legend="Geometry">
            <TextInput
              label={
                <span>
                  D<sub>{lugName}</sub>, Hole Diameter
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("D", { required: "Length is required", valueAsNumber: true })}
              error={errors.D && errors.D.message}
            />
            <TextInput
              label={
                <span>
                  t<sub>{lugName}</sub>, Thickness
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("t", { required: "Length is required", valueAsNumber: true })}
              error={errors.t && errors.t.message}
            />
            <TextInput
              label={
                <span>
                  e<sub>{lugName}</sub>, Edge to Hole Center
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("e", { required: "Length is required", valueAsNumber: true })}
              error={errors.e && errors.e.message}
            />
            <TextInput
              label={
                <span>
                  w<sub>{lugName}</sub>, Width at Hole
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("w", { required: "Length is required", valueAsNumber: true })}
              error={errors.w && errors.w.message}
            />
            <TextInput
              label={
                <span>
                  w<sub>T{lugName}</sub>, Width at Tang
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("w_t", { required: "Length is required", valueAsNumber: true })}
              error={errors.w_t && errors.w_t.message}
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
            <TextInput
              label={
                <span>
                  E<sub>{lugName}</sub> Elastic Modulus
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("E", { required: "Length is required", valueAsNumber: true })}
              error={errors.E && errors.E.message}
            />
            <TextInput
              label={
                <span>
                  F<sub>tu{lugName}</sub> Tensile Ultimate Stress
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
                  F<sub>ty{lugName}</sub> Tensile Yield Stress
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
                  ɛ<sub>u{lugName}</sub> Ultimate Strain
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("e_u", { required: "Length is required", valueAsNumber: true })}
              error={errors.e_u && errors.e_u.message}
            />
          </Fieldset>
        </Stack>
      </Group>
    </form>
    //</Paper>
  );
};

export default LugInputForm;
