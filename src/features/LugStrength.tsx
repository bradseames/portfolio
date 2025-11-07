import {
  Card,
  Fieldset,
  Group,
  NumberInput,
  Paper,
  SegmentedControl,
  Title,
  Text,
  Combobox,
  Select,
  Stack,
  Tabs,
} from "@mantine/core";
import { useState } from "react";
import { LugDrawing } from "../components/LugCalculator/LugDrawing";
import {
  type Allowables,
  LengthUnit,
  LugMode,
  type LugParams,
  StressUnit,
} from "../components/LugCalculator/types";
import convert from "convert";
import { useElementSize } from "@mantine/hooks";
import classes from "./LugStrength.module.css";

let METERS_PER_INCH = 1;

export const DEFAULT_PARAMS: LugParams = {
  //mode: "double",
  //lengthUnit: LengthUnit.in,
  Dp: Number(1.0) * METERS_PER_INCH,
  D: Number(1.0) * METERS_PER_INCH,
  w1: Number(3.0) * METERS_PER_INCH,
  w2: Number(3.5) * METERS_PER_INCH,
  e1: Number(1.5) * METERS_PER_INCH,
  e2: Number(1.75) * METERS_PER_INCH,
  t1: Number(0.5) * METERS_PER_INCH,
  t2: Number(0.75) * METERS_PER_INCH,
  gap: Number(0.05) * METERS_PER_INCH,
};

export const DEFAULT_ALLOW: Allowables = {
  // Female Lugs, 1 (Outer)   | Al 2024-T351 Plate
  units: "psi",
  F_tux_1: 64000, // psi
  F_tyx_1: 40000, // psi
  E_1: 10500000, // psi
  e_u_1: 0.12, // in/in
  // Male Lug, 2 (Inner)      | Al 7075-T651 Plate
  F_tux_2: 77000, // psi
  F_tyx_2: 66000, // psi
  E_2: 10300000, // psi
  e_u_2: 0.06, // in/in
  // Bushings, 1 and 2        | Al Bronze
  F_tu_bush: 110000, // psi
  F_ty_bush: 60000, // psi
  F_cy_bush: 60000, // psi
  // Pin                      | 4130 Steel
  F_tu_pin: 125000, // psi
  F_ty_pin: 103000, // psi
  F_su_pin: 82000, // psi
  E_pin: 29000000, // psi
};

const MaterialProps = {
  "Al2024-T351 Plate": {
    Ftu: 64000,
    Fty: 40000,
    E: 10500000,
    strainUlt: 0.12,
  },
  "Al7075-T651 Plate": {
    Ftu: 77000,
    Fty: 66000,
    E: 10300000,
    strainUlt: 0.06,
  },
  "Al Bronze": {
    Ftu: 110000,
    Fty: 60000,
    Fcy: 60000,
  },
  "4130 Steel": {
    Ftu: 125000,
    Fty: 103000,
    Fsu: 82000,
    E: 29000000,
  },
};

export default function LugStrength() {
  const [params, setParams] = useState<LugParams>(DEFAULT_PARAMS);
  const [allow, setAllow] = useState<Allowables>(DEFAULT_ALLOW);

  const [mode, setMode] = useState<LugMode>(LugMode.double);
  const [unitL, setUnitL] = useState<LengthUnit>(LengthUnit.in);
  const [unitStress, setUnitStress] = useState<StressUnit>(StressUnit.psi);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  console.log(params);
  console.log(unitL);
  const [value, setValue] = useState<ComboboxItem | null>(null);

  function handleUnitChange(unit: LengthUnit) {
    setParams({
      ...params,
      D: convert(Number(params.D), unitL).to(unit),
      Dp: convert(Number(params.Dp), unitL).to(unit),
      w1: convert(Number(params.w1), unitL).to(unit),
      t1: convert(Number(params.t1), unitL).to(unit),
      e1: convert(Number(params.e1), unitL).to(unit),
      w2: convert(Number(params.w2), unitL).to(unit),
      t2: convert(Number(params.t2), unitL).to(unit),
      e2: convert(Number(params.e2), unitL).to(unit),
      gap: convert(Number(params.gap), unitL).to(unit),
    });

    const stressUnit: StressUnit = unit === LengthUnit.in ? StressUnit.psi : StressUnit.Pa;

    setAllow({
      ...allow,
      F_tux_1: convert(Number(allow.F_tux_1), unitStress).to(stressUnit),
      F_tyx_1: convert(Number(allow.F_tyx_1), unitStress).to(stressUnit),
      E_1: convert(Number(allow.E_1), unitStress).to(stressUnit),
      F_tux_2: convert(Number(allow.F_tux_2), unitStress).to(stressUnit),
      F_tyx_2: convert(Number(allow.F_tyx_2), unitStress).to(stressUnit),
      E_2: convert(Number(allow.E_2), unitStress).to(stressUnit),
      F_tu_bush: convert(Number(allow.F_tu_bush), unitStress).to(stressUnit),
      F_ty_bush: convert(Number(allow.F_ty_bush), unitStress).to(stressUnit),
      F_cy_bush: convert(Number(allow.F_cy_bush), unitStress).to(stressUnit),
      F_tu_pin: convert(Number(allow.F_tu_pin), unitStress).to(stressUnit),
      F_ty_pin: convert(Number(allow.F_ty_pin), unitStress).to(stressUnit),
      F_su_pin: convert(Number(allow.F_su_pin), unitStress).to(stressUnit),
      E_pin: convert(Number(allow.E_pin), unitStress).to(stressUnit),
    });

    setUnitL(unit);
    setUnitStress(stressUnit);
  }

  const [hoveredDimension, setHoveredDimension] = useState<string | null>(null);

  //// Handle input changes
  function handleParamChange<K extends keyof LugParams>(key: K, value: number | LugParams | Unit) {
    setParams((prev) => ({ ...prev, [key]: value }));
  }

  function formUpdate(data: LugParams) {
    console.log("params======");
    console.log(params);
  }

  const { ref, width, height } = useElementSize();
  return (
    <Group w="100%" p={0} style={{ alignItems: "flex-start" }}>
      <Tabs
        bg="black"
        w="50%"
        pt={0}
        ml={"sm"}
        variant="pills"
        //h="100%"
        value={activeTab}
        onChange={setActiveTab}
        classNames={classes}
        defaultValue="Config"
      >
        <Tabs.List>
          <Tabs.Tab value="Config">Config</Tabs.Tab>
          <Tabs.Tab value="Pin">Pin</Tabs.Tab>
          <Tabs.Tab value="Bushing">Bushing</Tabs.Tab>
          <Tabs.Tab value="Lug1">Lug 1</Tabs.Tab>
          <Tabs.Tab value="Lug2">Lug 2</Tabs.Tab>
        </Tabs.List>

        <Paper w="100%" shadow="lg" p="md" withBorder>
          <Group align="stretch" style={{ minHeight: height }}>
            <Tabs.Panel value="Config">
              <Stack gap="md">
                <Fieldset legend="Units">
                  <SegmentedControl
                    value={unitL}
                    onChange={(value) => handleUnitChange(value as LengthUnit)}
                    fullWidth
                    data={[
                      { value: LengthUnit.in, label: "Inch" },
                      { value: LengthUnit.m, label: "Meter" },
                      { value: LengthUnit.mm, label: "Millimeter" },
                    ]}
                  />
                </Fieldset>
              </Stack>

              <Stack gap="md">
                <Fieldset legend="Lug Shear Type">
                  <SegmentedControl
                    value={mode}
                    fullWidth
                    onChange={(value) => setMode(value as LugMode)}
                    data={[
                      { value: LugMode.single, label: "Single" },
                      { value: LugMode.double, label: "Double" },
                    ]}
                  />
                </Fieldset>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel h="100%" value="Bushing">
              <Group align="flex-start">
                <Stack gap="md">
                  <Fieldset legend="Geometry">
                    <NumberInput
                      label={
                        <span>
                          OD<sub>{"bush"}</sub>, Hole Diameter
                        </span>
                      }
                      value={Number(params.D)}
                      onChange={(value) => {
                        setParams({ ...params, D: Number(value) });
                      }}
                      suffix={" " + unitL}
                      step={unitL == LengthUnit.in ? 0.01 : 1}
                      decimalScale={unitL == LengthUnit.in ? 3 : 2}
                      stepHoldDelay={500}
                      stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                      placeholder={" (" + unitL + ")"}
                    />
                    <NumberInput
                      label={
                        <span>
                          ID<sub>{"bush"}</sub>, Hole Diameter
                        </span>
                      }
                      value={Number(params.D)}
                      onChange={(value) => {
                        setParams({ ...params, D: Number(value) });
                      }}
                      suffix={" " + unitL}
                      step={unitL == LengthUnit.in ? 0.01 : 1}
                      decimalScale={unitL == LengthUnit.in ? 3 : 2}
                      stepHoldDelay={500}
                      stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                      placeholder={" (" + unitL + ")"}
                    />
                  </Fieldset>
                </Stack>

                <Stack gap="md">
                  <Fieldset legend="Material">
                    <Select
                      label="Material Name"
                      //data={[{ value: "al-6061-t6", label: "Al 6061-T6" }]}
                      data={Object.keys(MaterialProps)}
                      value={value ? value.value : null}
                      onChange={(_value, option) => setValue(option)}

                      //value={material ? material.value : null}
                      //onChange={(_value, option) => setMaterial(option)}
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
                          F<sub>tu{"b"}</sub> Tensile Ultimate Stress
                        </span>
                      }
                      value={Number(allow.F_tu_bush)}
                      onChange={(value) => {
                        setAllow({ ...allow, F_tu_bush: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000 : 10000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000 : 1000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          F<sub>ty{"b"}</sub> Tensile Yield Stress
                        </span>
                      }
                      value={Number(allow.F_ty_bush)}
                      onChange={(value) => {
                        setAllow({ ...allow, F_ty_bush: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000 : 10000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000 : 1000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          F<sub>cy{"b"}</sub> Compressive Yield Stress
                        </span>
                      }
                      value={Number(allow.F_cy_bush)}
                      onChange={(value) => {
                        setAllow({ ...allow, F_cy_bush: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000 : 10000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000 : 1000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                  </Fieldset>
                </Stack>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel h="100%" value="Pin">
              <Group align="flex-start">
                {/*<Stack gap="md">*/}
                <Fieldset legend="Geometry">
                  <NumberInput
                    label={
                      <span>
                        D<sub>p</sub>, Pin Diameter
                      </span>
                    }
                    value={Number(params.Dp)}
                    onChange={(value) => {
                      setParams({ ...params, Dp: Number(value) });
                    }}
                    suffix={" " + unitL}
                    step={unitL == LengthUnit.in ? 0.01 : 1}
                    decimalScale={unitL == LengthUnit.in ? 3 : 2}
                    stepHoldDelay={500}
                    stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                    placeholder={" (" + unitL + ")"}
                  />
                </Fieldset>
                {/*</Stack>*/}

                <Stack gap="md">
                  <Fieldset legend="Material">
                    <Select
                      label="Material Name"
                      data={[{ value: "al-6061-t6", label: "Al 6061-T6" }]}
                      //value={material ? material.value : null}
                      //onChange={(_value, option) => setMaterial(option)}
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
                      value={Number(allow.E_pin)}
                      onChange={(value) => {
                        setAllow({ ...allow, E_pin: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000000 : 10000000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000000 : 1000000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          F<sub>tuP</sub> Tensile Ultimate Stress
                        </span>
                      }
                      value={Number(allow.F_tu_pin)}
                      onChange={(value) => {
                        setAllow({ ...allow, F_tu_pin: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000 : 10000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000 : 1000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          F<sub>tyP</sub> Tensile Yield Stress
                        </span>
                      }
                      value={Number(allow.F_ty_pin)}
                      onChange={(value) => {
                        setAllow({ ...allow, F_ty_pin: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000 : 10000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000 : 1000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          F<sub>suP</sub> Shear Ultimate Stress
                        </span>
                      }
                      value={Number(allow.F_su_pin)}
                      onChange={(value) => {
                        setAllow({ ...allow, F_su_pin: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000 : 10000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000 : 1000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                  </Fieldset>
                </Stack>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="Lug1">
              <Group align="flex-start">
                <Stack gap="md">
                  <Fieldset legend="Geometry">
                    <NumberInput
                      label={
                        <span>
                          D<sub>{1}</sub>, Hole Diameter
                        </span>
                      }
                      value={Number(params.D)}
                      onChange={(value) => {
                        setParams({ ...params, D: Number(value) });
                      }}
                      suffix={" " + unitL}
                      step={unitL == LengthUnit.in ? 0.01 : 1}
                      decimalScale={unitL == LengthUnit.in ? 3 : 2}
                      stepHoldDelay={500}
                      stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                      placeholder={" (" + unitL + ")"}
                    />

                    <NumberInput
                      label={
                        <span>
                          t<sub>{1}</sub>, Thickness
                        </span>
                      }
                      value={params.t1}
                      onChange={(value) => {
                        setParams({ ...params, t1: Number(value) });
                      }}
                      suffix={" " + unitL}
                      step={unitL == LengthUnit.in ? 0.01 : 1}
                      decimalScale={unitL == LengthUnit.in ? 3 : 2}
                      stepHoldDelay={500}
                      stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                      placeholder={" (" + unitL + ")"}
                    />

                    <NumberInput
                      label={
                        <span>
                          e<sub>{1}</sub>, Edge to Hole Center
                        </span>
                      }
                      value={params.e1}
                      onChange={(value) => {
                        setParams({ ...params, e1: Number(value) });
                      }}
                      suffix={" " + unitL}
                      step={unitL == LengthUnit.in ? 0.01 : 1}
                      decimalScale={unitL == LengthUnit.in ? 3 : 2}
                      stepHoldDelay={500}
                      stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                      placeholder={" (" + unitL + ")"}
                    />

                    <NumberInput
                      label={
                        <span>
                          w<sub>{1}</sub>, Width at Hole
                        </span>
                      }
                      value={params.w1}
                      onChange={(value) => {
                        setParams({ ...params, w1: Number(value) });
                      }}
                      suffix={" " + unitL}
                      step={unitL == LengthUnit.in ? 0.01 : 1}
                      decimalScale={unitL == LengthUnit.in ? 3 : 2}
                      stepHoldDelay={500}
                      stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                      placeholder={" (" + unitL + ")"}
                    />

                    <NumberInput
                      label={
                        <span>
                          w<sub>T{1}</sub>, Width at Tang
                        </span>
                      }
                      placeholder="e.g., 50"
                    />
                  </Fieldset>
                </Stack>

                <Stack gap="md">
                  <Fieldset legend="Material">
                    <Select
                      label="Material Name"
                      data={[{ value: "al-6061-t6", label: "Al 6061-T6" }]}
                      //value={material ? material.value : null}
                      //onChange={(_value, option) => setMaterial(option)}
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
                          E<sub>{1}</sub> Elastic Modulus
                        </span>
                      }
                      value={Number(allow.E_1)}
                      onChange={(value) => {
                        setAllow({ ...allow, E_1: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000000 : 10000000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000000 : 1000000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          F<sub>tu{1}</sub> Tensile Ultimate Stress
                        </span>
                      }
                      value={Number(allow.F_tux_1)}
                      onChange={(value) => {
                        setAllow({ ...allow, F_tux_1: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000 : 10000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000 : 1000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          F<sub>ty{1}</sub> Tensile Yield Stress
                        </span>
                      }
                      value={Number(allow.F_tyx_1)}
                      onChange={(value) => {
                        setAllow({ ...allow, F_tyx_1: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000 : 10000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000 : 1000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          ɛ<sub>u{1}</sub> Ultimate Strain
                        </span>
                      }
                      value={Number(allow.e_u_1)}
                      onChange={(value) => {
                        setAllow({ ...allow, e_u_1: Number(value) });
                      }}
                      suffix={" " + unitL + " / " + unitL}
                      step={0.001}
                      decimalScale={3}
                      stepHoldDelay={500}
                      stepHoldInterval={0.001}
                      placeholder={" (strain)"}
                      thousandSeparator=","
                    />
                  </Fieldset>
                </Stack>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="Lug2">
              <Group align="flex-start">
                <Stack gap="md">
                  <Fieldset legend="Geometry">
                    <NumberInput
                      label={
                        <span>
                          D<sub>{2}</sub>, Hole Diameter
                        </span>
                      }
                      value={Number(params.D)}
                      onChange={(value) => {
                        setParams({ ...params, D: Number(value) });
                      }}
                      suffix={" " + unitL}
                      step={unitL == LengthUnit.in ? 0.01 : 1}
                      decimalScale={unitL == LengthUnit.in ? 3 : 2}
                      stepHoldDelay={500}
                      stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                      placeholder={" (" + unitL + ")"}
                    />

                    <NumberInput
                      label={
                        <span>
                          t<sub>{2}</sub>, Thickness
                        </span>
                      }
                      value={params.t2}
                      onChange={(value) => {
                        setParams({ ...params, t2: Number(value) });
                      }}
                      suffix={" " + unitL}
                      step={unitL == LengthUnit.in ? 0.01 : 1}
                      decimalScale={unitL == LengthUnit.in ? 3 : 2}
                      stepHoldDelay={500}
                      stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                      placeholder={" (" + unitL + ")"}
                    />

                    <NumberInput
                      label={
                        <span>
                          e<sub>{2}</sub>, Edge to Hole Center
                        </span>
                      }
                      value={params.e2}
                      onChange={(value) => {
                        setParams({ ...params, e2: Number(value) });
                      }}
                      suffix={" " + unitL}
                      step={unitL == LengthUnit.in ? 0.01 : 1}
                      decimalScale={unitL == LengthUnit.in ? 3 : 2}
                      stepHoldDelay={500}
                      stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                      placeholder={" (" + unitL + ")"}
                    />

                    <NumberInput
                      label={
                        <span>
                          w<sub>{2}</sub>, Width at Hole
                        </span>
                      }
                      value={params.w2}
                      onChange={(value) => {
                        setParams({ ...params, w2: Number(value) });
                      }}
                      suffix={" " + unitL}
                      step={unitL == LengthUnit.in ? 0.01 : 1}
                      decimalScale={unitL == LengthUnit.in ? 3 : 2}
                      stepHoldDelay={500}
                      stepHoldInterval={unitL == LengthUnit.in ? 0.01 : 1}
                      placeholder={" (" + unitL + ")"}
                    />

                    <NumberInput
                      label={
                        <span>
                          w<sub>T{2}</sub>, Width at Tang
                        </span>
                      }
                      placeholder="e.g., 50"
                    />
                  </Fieldset>
                </Stack>

                <Stack gap="md">
                  <Fieldset legend="Material">
                    <Select
                      label="Material Name"
                      data={[{ value: "al-6061-t6", label: "Al 6061-T6" }]}
                      //value={material ? material.value : null}
                      //onChange={(_value, option) => setMaterial(option)}
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
                          E<sub>{2}</sub> Elastic Modulus
                        </span>
                      }
                      value={Number(allow.E_2)}
                      onChange={(value) => {
                        setAllow({ ...allow, E_2: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000000 : 10000000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000000 : 1000000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          F<sub>tu{2}</sub> Tensile Ultimate Stress
                        </span>
                      }
                      value={Number(allow.F_tux_2)}
                      onChange={(value) => {
                        setAllow({ ...allow, F_tux_2: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000 : 10000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000 : 1000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          F<sub>ty{2}</sub> Tensile Yield Stress
                        </span>
                      }
                      value={Number(allow.F_tyx_2)}
                      onChange={(value) => {
                        setAllow({ ...allow, F_tyx_2: Number(value) });
                      }}
                      suffix={" " + unitStress}
                      step={unitStress == StressUnit.psi ? 10000 : 10000000}
                      decimalScale={unitStress == StressUnit.psi ? 0 : 0}
                      stepHoldDelay={500}
                      stepHoldInterval={unitStress == StressUnit.psi ? 10000 : 1000000}
                      placeholder={" (" + unitStress + ")"}
                      thousandSeparator=","
                    />
                    <NumberInput
                      label={
                        <span>
                          ɛ<sub>u{2}</sub> Ultimate Strain
                        </span>
                      }
                      value={Number(allow.e_u_2)}
                      onChange={(value) => {
                        setAllow({ ...allow, e_u_2: Number(value) });
                      }}
                      suffix={" " + unitL + " / " + unitL}
                      step={0.001}
                      decimalScale={3}
                      stepHoldDelay={500}
                      stepHoldInterval={0.001}
                      placeholder={" (strain)"}
                      thousandSeparator=","
                    />
                  </Fieldset>
                </Stack>
              </Group>
            </Tabs.Panel>
          </Group>
        </Paper>
      </Tabs>

      <Stack p={0} m={0} w="40%" pt="lg">
        {/*<Text size="md" pb={0} pl={"md"} mb={0}>*/}
        {/*  Lug Stress Analysis Double & Single Shear  (Airforce Method)*/}
        {/*</Text>*/}
        <Card p={"sm"} m={"md"} mx={"xs"}>
          <Paper bg="silver" shadow="xl" p={0} m={0} ref={ref} withBorder>
            <LugDrawing
              params={{ ...params }}
              mode={mode}
              unit={unitL}
              parentW={width}
              parentH={height}
            />
          </Paper>
        </Card>
      </Stack>
    </Group>
  );
}
