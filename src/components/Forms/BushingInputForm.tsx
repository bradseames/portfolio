import React, { useState } from "react";
import {
  Divider,
  type ComboboxItem,
  Group,
  TextInput,
  NumberInput,
  Select,
  Stack,
  Fieldset,
  Paper,
  Title,
} from "@mantine/core";
import { useForm } from "react-hook-form";

//import { useForm, type UseFormReturnType } from "@mantine/form";

export interface BushingInputs {
  ID: number;
  OD: number;
  W: number;
  Ftu: number;
  Fty: number;
  Fcy: number;
}

export interface BushingFormProps {
  onCalculate: (data: BushingInputs) => void;
  isLoading: boolean;
}

//function DiaInnerInput({ form }: { form: UseFormReturnType<BushingInputs> }) {
//  return <NumberInput key={form.key("DiaInner")} {...form.getInputProps("DiaInner")} />;
//}
//
//function DiaOuterInput({ form }: { form: UseFormReturnType<BushingInputs> }) {
//  return <NumberInput key={form.key("DiaOuter")} {...form.getInputProps("DiaOuter")} />;
//}
//
//function WidthInput({ form }: { form: UseFormReturnType<BushingInputs> }) {
//  return <NumberInput key={form.key("Width")} {...form.getInputProps("Width")} />;
//}
//
//function FtuInput({ form }: { form: UseFormReturnType<BushingInputs> }) {
//  return <NumberInput key={form.key("Ftu")} {...form.getInputProps("Ftu")} />;
//}
//
//function FtyInput({ form }: { form: UseFormReturnType<BushingInputs> }) {
//  return <NumberInput key={form.key("Fty")} {...form.getInputProps("Fty")} />;
//}
//
//function FcyInput({ form }: { form: UseFormReturnType<BushingInputs> }) {
//  return <NumberInput key={form.key("Fcy")} {...form.getInputProps("Fcy")} />;
//}

//function Demo() {
//  const form = useForm<BushingInputs>({
//    mode: "uncontrolled",
//    initialValues: { DiaInner: 1, DiaOuter: 1.1, Width: 1, Ftu: 30000, Fty: 30000, Fcy: 20000 },
//  });
//  return (
//    <form onSubmit={form.onSubmit((values) => console.log(values))}>
//      <DiaInnerInput form={form} />
//      <DiaOuterInput form={form} />
//      <WidthInput form={form} />
//
//      <FtuInput form={form} />
//      <FtyInput form={form} />
//      <FcyInput form={form} />
//    </form>
//  );
//}

export const BushingInputForm: React.FC<BushingFormProps> = ({ onCalculate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BushingInputs>();
  const [material, setMaterial] = useState<ComboboxItem | null>(null);

  const onSubmit = (data: BushingInputs) => {
    const numericData: BushingInputs = {
      ID: parseFloat(String(data.ID)),
      OD: parseFloat(String(data.OD)),
      W: parseFloat(String(data.W)),
      Ftu: parseFloat(String(data.Ftu)),
      Fty: parseFloat(String(data.Fty)),
      Fcy: parseFloat(String(data.Fcy)),
    };
    onCalculate(numericData);
  };

  return (
    //<Paper shadow="lg" p="md" withBorder>
    //  <Title order={4}>Bushing Inputs</Title>
    //  <Divider my={"sm"} />

    <form onSubmit={handleSubmit(onSubmit)}>
      <Group align="flex-start">
        <Stack gap="md">
          <Fieldset legend="Geometry">
            <TextInput
              label={
                <span>
                  ID<sub>B</sub> Inner Diameter
                </span>
              }
              //onChange={(e) => {
              //  useForm({ ...form.getValues(), ID = Number(e) });
              //}}
              placeholder="e.g., 50"
              type="number"
            />
            <TextInput
              label={
                <span>
                  OD<sub>B</sub> Outer Diameter
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("OD", { required: "OD is required", valueAsNumber: true })}
              error={errors.ID && errors.ID.message}
            />
            <TextInput
              label={
                <span>
                  W<sub>B</sub> Width
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("W", { required: "Width is required", valueAsNumber: true })}
              error={errors.W && errors.W.message}
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
                  F<sub>tuB</sub> Tensile Ultimate Stress
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("Ftu", { required: "Ftu is required", valueAsNumber: true })}
              error={errors.Ftu && errors.Ftu.message}
            />

            <TextInput
              label={
                <span>
                  F<sub>tyB</sub> Tensile Yield Stress
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("Fty", { required: "Fty is required", valueAsNumber: true })}
              error={errors.Fty && errors.Fty.message}
            />
            <TextInput
              label={
                <span>
                  F<sub>cyB</sub> Compressive Yield Stress
                </span>
              }
              placeholder="e.g., 50"
              type="number"
              {...register("Fcy", { required: "Fcy is required", valueAsNumber: true })}
              error={errors.Fcy && errors.Fcy.message}
            />
          </Fieldset>
        </Stack>
      </Group>
    </form>
    //</Paper>
  );
};

export default BushingInputForm;
