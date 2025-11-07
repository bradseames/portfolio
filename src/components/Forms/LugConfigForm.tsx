import React, { useState } from "react";
import {
  Group,
  Button,
  Divider,
  Stack,
  Paper,
  Title,
  SegmentedControl,
  Fieldset,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { NumberSlideSet } from "./Inputs/NumberSlideSet";
import { useField } from "@mantine/form";
import type { Allowables, LugParams } from "../LugCalculator/types";
import { LugMode, Unit } from "../LugCalculator/types";

export interface LugConfigInputs {
  mode: LugMode;
  units: Unit;
  //gap: number;
}

export interface LugConfigFormProps {
  onCalculate: (data: LugConfigInputs) => void;
  isLoading: boolean;
  vals: LugConfigInputs;
}

export const LugConfigForm: React.FC<LugConfigFormProps> = ({ onCalculate, isLoading, vals }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LugConfigInputs>();
  const [mode, setMode] = useState(vals.mode);
  const [units, setUnits] = useState(vals.units);
  //const [gap, setGap] = useState(vals.gap);

  const onSubmit = (data: LugConfigInputs) => {
    console.log("onsubmit");
    console.log(data);
    const numericData: LugConfigInputs = {
      mode: mode,
      units: units,
      //gap: parseFloat(String(data.gap)),
    };
    onCalculate(numericData);
  };
  const field = useField({
    initialValue: "in",
    //validate: (value) => (value.trim().length < 2 ? "Value is too short" : null),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group align="flex-start">
        <Stack gap="md">
          <Fieldset legend="Units">
            <SegmentedControl
              value={units}
              onChange={setUnits}
              fullWidth
              //onChange={(value,) => field.setValue(value)}
              //onChange={(e) => {
              //  setParams({ ...params, mode: e });
              //}}
              data={[
                { value: Unit.m, label: "Meter" },
                { value: Unit.in, label: "Inch" },
                { value: Unit.mm, label: "Millimeter" },
              ]}
            />
          </Fieldset>
          <Button type="submit" fullWidth mt="md" loading={isLoading} disabled={isLoading}>
            Calculate Dimensions
          </Button>
        </Stack>
        <Stack gap="md">
          <Fieldset legend="Lug Shear Type">
            <SegmentedControl
              value={mode}
              fullWidth
              onChange={setMode}
              //onChange={(e) => {
              //  setParams({ ...params, mode: e });
              //}}
              data={[
                { value: "single", label: "Single" },
                { value: "double", label: "Double" },
              ]}
            />
          </Fieldset>
          {/*{para.ms.mode == "double" ? (*/}
          {/*/<NumberSlideSet*/}
          {/*//label={"g, gap"}*/}
          {/*//fixedDecimalScale={true}*/}
          {/*//decimalScale={3}*/}
          {/*//step={0.001}*/}
          {/*//min={0}*/}
          {/*//max={params.t1 * 0.1}*/}
          {/*//value={params.gap}*/}
          {/*//suffix={" " + params.unit}*/}
          {/*//onChange={(e) => {*/}
          {/*//  setParams({ ...params, gap: Number(e) });*/}
          {/*//}*/}
          {/*// }*/}
          {/*/>*/}
        </Stack>
      </Group>
    </form>
  );
};

export default LugConfigForm;
