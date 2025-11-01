import React, { useState } from "react";
import { Accordion, Box, Card, Container, Fieldset } from "@mantine/core";
import { Flex, NumberInput, SegmentedControl, Slider, Text, Tabs } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { type Allowables, type LugParams } from "./types";
import { DEFAULT_ALLOW, DEFAULT_PARAMS } from "./Calcs";
import { LugSketch } from "./parametric_lug";
import classes from "./lug.module.css";
import { calcs } from "./Calcs";
import { MathLine } from "../Equations";
import { K_data } from "../LugCalculator/coeff_data";
import LinePlot from "../viz/Charts/LinePlot";

//import * as d3 from "d3";

interface NumberSlideSetProps {
  label?: string;
  value: number;
  onChange: (e: string | number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  fixedDecimalScale?: boolean;
}

function NumberSlideSet({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  decimalScale,
  allowNegative = false,
  fixedDecimalScale = false,
}: NumberSlideSetProps) {
  return (
    <Fieldset m={0} px={10}>
      <Flex direction="row" m={0} p={0} bg="gray" align="center">
        <Text p="xs" py={0} size="xs">
          {" "}
          <b>{label}</b>{" "}
        </Text>
        <Box m={0} p={0}>
          <NumberInput
            value={value}
            onChange={onChange}
            suffix={suffix}
            min={min}
            max={max}
            step={step}
            thousandSeparator=","
            allowNegative={allowNegative}
            fixedDecimalScale={fixedDecimalScale}
            decimalScale={decimalScale}
            size="xs"
          />
        </Box>
      </Flex>
      <Slider
        label={value}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        size="md"
        pt={10}
        m={0}
      />
    </Fieldset>
  );
}

export default function LugCalculator() {
  const [params, setParams] = useState<LugParams>(DEFAULT_PARAMS);
  const [allow, setAllow] = useState<Allowables>(DEFAULT_ALLOW);

  const { ref, width, height } = useElementSize();
  const results = calcs(params, allow);
  let kd = K_data;
  let res_data = { eD: Number(results.e_D_ratio), K1: Number(results.k) };

  return (
    <Flex bg="grape" direction="row" m={0} p={0} wrap="nowrap" justify="stretch" align="flex-start">
      <Flex
        w={400}
        m={0}
        p={0}
        bg="teal"
        h="calc(100dvh - var(--app-shell-header-height))"
        direction="column"
        justify="flex-start"
        align="flex-start"
        style={{ overflow: "auto" }}
      >
        <Accordion
          w="100%"
          h="calc(100dvh - var(--app-shell-header-height))"
          defaultValue="Configuration"
          mx={0}
          px={5}
          classNames={classes}
        >
          <Accordion.Item w="100%" m={0} p={0} key={"Configuration"} value={"Configuration"}>
            <Accordion.Control>{"Configuration"}</Accordion.Control>
            <Accordion.Panel m={0} p={0}>
              <SegmentedControl
                value={params.mode}
                fullWidth
                onChange={(e) => {
                  setParams({ ...params, mode: e });
                }}
                data={[
                  { value: "single", label: "Single" },
                  { value: "double", label: "Double" },
                ]}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item m={0} p={0} w="100%" key={"Geometry"} value={"Geometry"}>
            <Accordion.Control>{"Geometry"}</Accordion.Control>
            <Accordion.Panel m={0} p={0}>
              <Fieldset legend="Pin" m={0} px={0}>
                <NumberSlideSet
                  label={"Dp"}
                  fixedDecimalScale={true}
                  decimalScale={3}
                  step={0.05}
                  min={0.1}
                  max={params.D}
                  value={params.Dp}
                  suffix={" " + params.units}
                  onChange={(e) => {
                    setParams({ ...params, Dp: Number(e) });
                  }}
                />

                <NumberSlideSet
                  label={"D"}
                  fixedDecimalScale={true}
                  decimalScale={3}
                  step={0.05}
                  min={params.Dp}
                  max={Math.min(params.w1, params.w2, params.e1 * 2, params.e2 * 2) - 0.1}
                  value={params.D}
                  suffix={" " + params.units}
                  onChange={(e) => {
                    setParams({ ...params, D: Number(e) });
                  }}
                />
              </Fieldset>

              <Fieldset legend="Lug 1">
                <NumberSlideSet
                  label={"t1, thick"}
                  fixedDecimalScale={true}
                  decimalScale={2}
                  step={0.05}
                  min={0.01}
                  max={params.w1}
                  value={params.t1}
                  suffix={" " + params.units}
                  onChange={(e) => {
                    setParams({ ...params, t1: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"w1, width"}
                  fixedDecimalScale={true}
                  decimalScale={3}
                  step={0.1}
                  min={params.D}
                  max={params.D * 5}
                  value={params.w1}
                  suffix={" " + params.units}
                  onChange={(e) => {
                    setParams({ ...params, w1: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"e1, edge"}
                  fixedDecimalScale={true}
                  decimalScale={3}
                  step={0.1}
                  min={params.D / 2}
                  max={params.D * 5}
                  value={params.e1}
                  suffix={" " + params.units}
                  onChange={(e) => {
                    setParams({ ...params, e1: Number(e) });
                  }}
                />
              </Fieldset>
              <Fieldset legend="Lug 2">
                <NumberSlideSet
                  label={"t2"}
                  fixedDecimalScale={true}
                  decimalScale={2}
                  step={0.05}
                  min={0.01}
                  max={params.w2}
                  value={params.t2}
                  suffix={" " + params.units}
                  onChange={(e) => {
                    setParams({ ...params, t2: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"w2"}
                  fixedDecimalScale={true}
                  decimalScale={3}
                  step={0.1}
                  min={params.D}
                  max={params.D * 5}
                  value={params.w2}
                  suffix={" " + params.units}
                  onChange={(e) => {
                    setParams({ ...params, w2: Number(e) });
                  }}
                />
                {/*<Switch id="e2_switch" label="half width" bg="gray"*/}
                {/*        checked={e2checked}*/}
                {/*        onChange={(event) => {*/}
                {/*          setE2Checked(event.currentTarget.checked);*/}
                {/*        }}*/}
                {/*></Switch>*/}
                <NumberSlideSet
                  label={"e2"}
                  fixedDecimalScale={true}
                  decimalScale={3}
                  step={0.1}
                  min={params.D / 2}
                  max={params.D * 5}
                  value={params.e2}
                  suffix={" " + params.units}
                  onChange={(e) => {
                    setParams({ ...params, e2: Number(e) });
                  }}
                />
              </Fieldset>
              {params.mode == "double" ? (
                <NumberSlideSet
                  label={"g, gap"}
                  fixedDecimalScale={true}
                  decimalScale={3}
                  step={0.001}
                  min={0}
                  max={params.t1 * 0.1}
                  value={params.g}
                  suffix={" " + params.units}
                  onChange={(e) => {
                    setParams({ ...params, g: Number(e) });
                  }}
                />
              ) : (
                ""
              )}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item w="100%" key={"Materials"} value={"Materials"}>
            <Accordion.Control>{"Materials"}</Accordion.Control>
            <Accordion.Panel>
              <Fieldset legend="Pin">
                <NumberSlideSet
                  label={"F_tu Pin"}
                  min={0}
                  max={500000}
                  step={1000}
                  value={allow.F_tu_pin}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, F_tu_pin: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"F_ty Pin"}
                  min={0}
                  max={500000}
                  step={1000}
                  value={allow.F_ty_pin}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, F_ty_pin: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"F_su Pin"}
                  min={0}
                  max={500000}
                  step={1000}
                  value={allow.F_su_pin}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, F_su_pin: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"E Pin"}
                  min={0}
                  max={50000000}
                  step={1000000}
                  value={allow.E_pin}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, E_pin: Number(e) });
                  }}
                />
              </Fieldset>

              <Fieldset legend="Lug 1">
                <NumberSlideSet
                  label={"F_tux_1"}
                  min={0}
                  max={500000}
                  step={1000}
                  value={allow.F_tux_1}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, F_tux_1: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"F_tyx_1"}
                  min={0}
                  max={500000}
                  step={1000}
                  value={allow.F_tyx_1}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, F_tyx_1: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"E, Modulus"}
                  min={0}
                  max={50000000}
                  step={1000000}
                  value={allow.E_1}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, E_1: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"ult strain 1"}
                  min={0}
                  fixedDecimalScale={true}
                  decimalScale={3}
                  max={1}
                  step={0.001}
                  value={allow.e_u_1}
                  onChange={(e) => {
                    setAllow({ ...allow, e_u_1: Number(e) });
                  }}
                />
              </Fieldset>

              <Fieldset legend="Lug 2">
                <NumberSlideSet
                  label={"F_tux_2"}
                  min={0}
                  max={500000}
                  step={1000}
                  value={allow.F_tux_2}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, F_tux_2: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"F_tyx_2"}
                  min={0}
                  max={500000}
                  step={1000}
                  value={allow.F_tyx_2}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, F_tyx_2: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"E_2, Modulus"}
                  min={0}
                  max={50000000}
                  step={1000000}
                  value={allow.E_2}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, E_2: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"Ult Strain_2"}
                  min={0}
                  fixedDecimalScale={true}
                  decimalScale={3}
                  max={1}
                  step={0.001}
                  value={allow.e_u_2}
                  onChange={(e) => {
                    setAllow({ ...allow, e_u_2: Number(e) });
                  }}
                />
              </Fieldset>

              <Fieldset legend="Bushing">
                <NumberSlideSet
                  label={"F_tu"}
                  min={0}
                  max={500000}
                  step={1000}
                  value={allow.F_tu_bush}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, F_tu_bush: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"F_ty"}
                  min={0}
                  max={500000}
                  step={1000}
                  value={allow.F_ty_bush}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, F_ty_bush: Number(e) });
                  }}
                />
                <NumberSlideSet
                  label={"F_cy"}
                  min={0}
                  max={500000}
                  step={1000}
                  value={allow.F_cy_bush}
                  suffix={" " + allow.units}
                  onChange={(e) => {
                    setAllow({ ...allow, F_cy_bush: Number(e) });
                  }}
                />
              </Fieldset>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item w="100%" key={"Results"} value={"Results"}>
            <Accordion.Control>{"Results"}</Accordion.Control>

            <Accordion.Panel></Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Flex>
      <Container bg="lime" w="100%" h="calc(100dvh - var(--app-shell-header-height))">
        <Card ref={ref} h="calc(80dvh - var(--app-shell-header-height))">
          {/*<Tabs>*/}
          {/*<CarouselEmbla></CarouselEmbla>*/}

          <Tabs color="teal" defaultValue="first">
            <Tabs.List>
              <Tabs.Tab value="first">Lug Geometry</Tabs.Tab>
              <Tabs.Tab value="second" color="blue">
                Results
              </Tabs.Tab>
              <Tabs.Tab value="docs">Reference</Tabs.Tab>
              <Tabs.Tab value="d3">D3</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first" pt={0} m={20}>
              <LugSketch params={{ ...params }} allow={{ ...allow }} />
            </Tabs.Panel>

            <Tabs.Panel value="second" pt="xs">
              <MathLine
                tex={`P_u = ${results.P_u_L.toLocaleString("en-US").split(".", 1)}  \\ \\text{lb}`}
              ></MathLine>

              <MathLine
                tex={`P_{nu} = ${results.P_nu_L.toLocaleString("en-US").split(
                  ".",
                  1,
                )}  \\ \\text{lb}`}
              ></MathLine>

              <MathLine
                tex={`P_{bru} = ${results.P_bru_L.toLocaleString("en-US").split(
                  ".",
                  1,
                )}  \\ \\text{lb}`}
              ></MathLine>

              <MathLine
                tex={`P_T = ${results.P_T_L.toLocaleString("en-US").split(".", 1)} \\ \\text{lb}`}
              ></MathLine>
            </Tabs.Panel>

            <Tabs.Panel value="d3" pt="xs">
              <LinePlot
                data={[1, 2, 4, 6, 4]}
                width={600}
                height={300}
                marginTop={20}
                marginRight={20}
                marginBottom={20}
                marginLeft={20}
              ></LinePlot>
            </Tabs.Panel>
          </Tabs>

          {/*</Tabs>*/}
        </Card>
      </Container>
      ;
    </Flex>
  );
}
