import React, { useState } from 'react';
import {
  Accordion,
  Box,
  Card,
  Container,
  Fieldset,
  Flex,
  NumberInput,
  SegmentedControl,
  Switch,
  Slider,
  Text,
} from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { type Allowables, type LugParams } from './types';
import { DEFAULT_ALLOW } from './Calcs';
import { LugSketch } from './parametric_lug';
import classes from './lug.module.css';


function NumberSlideSet({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.01,
  suffix,
  decimalScale = 3,
  allowNegative = false,
  fixedDecimalScale = false,
}: {
  label?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  fixedDecimalScale?: boolean;
}) {

  return (
    <Fieldset p="xs">
      <Flex direction="row" bg="gray" align="center">
        <Text p="xs" py={0} size="xs"> <b>{label}</b> </Text>
        <Box>
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
      <Slider label={value}
              value={value}
              onChange={onChange}
              min={min}
              max={max}
              step={step}
              size="md"
              p="xs"
              m={0}
              mx="xs"
      />
    </Fieldset>
  );

}

export const DEFAULT_PARAMS: LugParams = {
  mode: 'double',
  units: 'in',
  Dp: Number(1.00),
  D: Number(1.00),
  w1: Number(3.00),
  w2: Number(3.50),
  e1: Number(1.50),
  e2: Number(1.75),
  t1: Number(0.50),
  t2: Number(0.75),
  g: Number(0.010),
};

export default function LugCalculator() {
  //const [e1checked, setE1Checked] = useState(true);
  //const [e2checked, setE2Checked] = useState(true);

  const [params, setParams] = useState<LugParams>(DEFAULT_PARAMS);
  const [allow, setAllow] = useState<Allowables>(DEFAULT_ALLOW);

  const { ref, width, height } = useElementSize();

  return (

    <Container strategy="grid">

      <Flex bg="grape" direction="row" wrap="nowrap" justify="stretch" align="flex-start">

        <Flex w={450} m={0} p={0} bg="teal" h="calc(100dvh - var(--app-shell-header-height))" direction="column"
              justify="stretch" align="flex-start" style={{ overflow: 'auto' }}>

          <Accordion w="100%" h="calc(100dvh - var(--app-shell-header-height))" defaultValue="Configuration"
                     classNames={classes}>

            <Accordion.Item w="100%" key={'Configuration'} value={'Configuration'}>
              <Accordion.Control>{'Configuration'}</Accordion.Control>
              <Accordion.Panel>
                <SegmentedControl value={params.mode}
                                  fullWidth
                                  onChange={e => {setParams({ ...params, mode: e }); }}
                                  data={[
                                    { value: 'single', label: 'Single' },
                                    { value: 'double', label: 'Double' },
                                  ]}
                />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item w="100%" key={'Geometry'} value={'Geometry'}>
              <Accordion.Control>{'Geometry'}</Accordion.Control>
              <Accordion.Panel>
                <NumberSlideSet label={'Dp'} fixedDecimalScale={true} decimalScale={3} step={0.05}
                                min={0.1}
                                max={params.D}
                                value={params.Dp} suffix={' ' + params.units}
                                onChange={e => { setParams({ ...params, Dp: Number(e) }); }}
                />
                <NumberSlideSet label={'D'} fixedDecimalScale={true} decimalScale={3} step={0.05}
                                min={params.Dp}
                                max={Math.min(params.w1, params.w2, params.e1 * 2, params.e2 * 2) - .1}
                                value={params.D} suffix={' ' + params.units}
                                onChange={e => { setParams({ ...params, D: Number(e) }); }}
                />
                <NumberSlideSet label={'t1'} fixedDecimalScale={true} decimalScale={2} step={0.05}
                                min={.01}
                                max={params.w1}
                                value={params.t1} suffix={' ' + params.units}
                                onChange={e => { setParams({ ...params, t1: Number(e) }); }}
                />
                <NumberSlideSet label={'w1'} fixedDecimalScale={true} decimalScale={3} step={0.1}
                                min={params.D}
                                max={params.D * 5}
                                value={params.w1} suffix={' ' + params.units}
                                onChange={e => { setParams({ ...params, w1: Number(e) }); }}
                />
                <NumberSlideSet label={'e1'} fixedDecimalScale={true} decimalScale={3} step={0.1}
                                min={params.D / 2}
                                max={params.D * 5}
                                value={params.e1} suffix={' ' + params.units}
                                onChange={e => { setParams({ ...params, e1: Number(e) }); }}
                />
                <NumberSlideSet label={'t2'} fixedDecimalScale={true} decimalScale={2} step={0.05}
                                min={.01}
                                max={params.w2}
                                value={params.t2} suffix={' ' + params.units}
                                onChange={e => { setParams({ ...params, t2: Number(e) }); }}
                />
                <NumberSlideSet label={'w2'} fixedDecimalScale={true} decimalScale={3} step={0.1}
                                min={params.D}
                                max={params.D * 5}
                                value={params.w2} suffix={' ' + params.units}
                                onChange={e => { setParams({ ...params, w2: Number(e) }); }}
                />
                {/*<Switch id="e2_switch" label="half width" bg="gray"*/}
                {/*        checked={e2checked}*/}
                {/*        onChange={(event) => {*/}
                {/*          setE2Checked(event.currentTarget.checked);*/}
                {/*        }}*/}
                {/*></Switch>*/}
                <NumberSlideSet label={'e2'} fixedDecimalScale={true} decimalScale={3} step={0.1}
                                min={params.D / 2}
                                max={params.D * 5}
                                value={params.e2} suffix={' ' + params.units}
                                onChange={e => { setParams({ ...params, e2: Number(e) }); }}
                />
                {(params.mode == 'double') ? (
                  <NumberSlideSet label={'g'} fixedDecimalScale={true} decimalScale={3} step={0.001}
                                  min={0}
                                  max={params.t1 * .1}
                                  value={params.g} suffix={' ' + params.units}
                                  onChange={e => { setParams({ ...params, g: Number(e) }); }}
                  />
                ) : ('')}
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item w="100%" key={'Materials'} value={'Materials'}>
              <Accordion.Control>{'Materials'}</Accordion.Control>
              <Accordion.Panel>
                <Fieldset legend="Pin">
                  <NumberSlideSet label={'F_tu_pin'} min={0} max={500000} step={1000}
                                  value={allow.F_tu_pin} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, F_tu_pin: Number(e) });}}
                  />
                  <NumberSlideSet label={'F_ty_pin'} min={0} max={500000} step={1000}
                                  value={allow.F_ty_pin} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, F_ty_pin: Number(e) });}}
                  />
                  <NumberSlideSet label={'F_su_pin'} min={0} max={500000} step={1000}
                                  value={allow.F_su_pin} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, F_su_pin: Number(e) });}}
                  />
                  <NumberSlideSet label={'E_pin'} min={0} max={500000000} step={1000}
                                  value={allow.E_pin} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, E_pin: Number(e) });}}
                  />

                </Fieldset>

                <Fieldset legend="Lug 1">
                  <NumberSlideSet label={'F_tux_1'} min={0} max={500000} step={1000}
                                  value={allow.F_tux_1} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, F_tux_1: Number(e) });}}
                  />
                  <NumberSlideSet label={'F_tyx_1'} min={0} max={500000} step={1000}
                                  value={allow.F_tyx_1} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, F_tyx_1: Number(e) });}}
                  />
                  <NumberSlideSet label={'E_1'} min={0} max={500000000} step={1000}
                                  value={allow.E_1} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, E_1: Number(e) });}}
                  />
                  <NumberSlideSet label={'e_u_1'} min={0} fixedDecimalScale={true} decimalScale={3} max={1} step={0.001}
                                  value={allow.e_u_1}
                                  onChange={e => {setAllow({ ...allow, e_u_1: Number(e) });}}
                  />

                </Fieldset>

                <Fieldset legend="Lug 2">
                  <NumberSlideSet label={'F_tux_2'} min={0} max={500000} step={1000}
                                  value={allow.F_tux_2} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, F_tux_2: Number(e) });}}
                  />
                  <NumberSlideSet label={'F_tyx_2'} min={0} max={500000} step={1000}
                                  value={allow.F_tyx_2} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, F_tyx_2: Number(e) });}}
                  />
                  <NumberSlideSet label={'E_2'} min={0} max={500000000} step={1000}
                                  value={allow.E_2} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, E_2: Number(e) });}}
                  />
                  <NumberSlideSet label={'e_u_2'} min={0} fixedDecimalScale={true} decimalScale={3} max={1} step={0.001}
                                  value={allow.e_u_2}
                                  onChange={e => {setAllow({ ...allow, e_u_2: Number(e) });}}
                  />

                </Fieldset>

                <Fieldset legend="Bushing">
                  <NumberSlideSet label={'F_tu_bush'} min={0} max={500000} step={1000}
                                  value={allow.F_tu_bush} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, F_tu_bush: Number(e) });}}
                  />
                  <NumberSlideSet label={'F_ty_bush'} min={0} max={500000} step={1000}
                                  value={allow.F_ty_bush} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, F_ty_bush: Number(e) });}}
                  />
                  <NumberSlideSet label={'F_cy_bush'} min={0} max={500000} step={1000}
                                  value={allow.F_cy_bush} suffix={' ' + allow.units}
                                  onChange={e => {setAllow({ ...allow, F_cy_bush: Number(e) });}}
                  />
                </Fieldset>

              </Accordion.Panel>
            </Accordion.Item>

          </Accordion>
        </Flex>

        <Container bg="lime" w="100%" h="calc(100dvh - var(--app-shell-header-height))">
          <Card ref={ref} bg="white" h="calc(100dvh - var(--app-shell-header-height))">
            <LugSketch params={{ ...params }} allow={{ ...allow }} />
          </Card>
        </Container>;

      </Flex>

      {/*  export const equations = {*/}
      {/*  eq9_1a: ({*/}
      {/*  a = 'a',*/}
      {/*  D = 'D',*/}
      {/*  K = 'K',*/}
      {/*  F_tux = `\\text{F}_\\text{tux}`*/}
      {/*}*/}
      {/*  ) => `\\text{F}_\\text{bru} = \\text{${K}} \\ \\frac{${a}}{${D}} \\ ${F_tux}`,*/}
      {/*  eq9_1b: ({*/}
      {/*  K = 'K',*/}
      {/*  F_tux = `\\text{F}_\\text{tux}`*/}
      {/*}*/}
      {/*  ) => `\\text{F}_\\text{bru} = \\text{${K}} \\ ${F_tux}`*/}
      {/*}*/}


      {/*  <MathBlock*/}
      {/*    tex={`\\quad ${vars.F_bryL} = ${1.48} \\ \\frac{${(geom.e1 - geom.D /*/}
      {/*      2)}}{${geom.D}} \\ ${matProps.F_tyx_1}`} />*/}
      {/*  <MathBlock*/}
      {/*    tex={`\\quad ${vars.F_bryL} = ${(1.48 * (geom.e1 - geom.D / 2) / geom.D * matProps.F_tyx_1).toFixed(3)}`} />*/}
      {/*  <MathBlock*/}
      {/*    tex={`\\quad ${vars.F_bruL} = ${(1.48 * (geom.e1 - geom.D / 2) / geom.D * matProps.F_tux_1).toFixed(3)}`} />*/}


    </Container>
  );
}


//{{
//  vars = {
//    F: {
//      bru_L:,
//      bry_L:,
//      tux:,
//      tyx:,
//      bru:,
//      bry:,
//      tu:,
//      nu_L:,
//      ny_L:,
//      bry_B:,
//      cy_B:,
//      bru_B:,
//      su_p:,
//      tu_p:,
//      tu_t:,
//      br_max_L:,
//      br_max_B:,
//      s_max_p:,
//      b_max_p:,
//    },
//    P: {}
//  }
//}}