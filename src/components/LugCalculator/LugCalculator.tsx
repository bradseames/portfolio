import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Accordion,
  Card,
  Container,
  Fieldset,
  Flex,
  NumberInput,
  SegmentedControl,
  Slider,
  Text,
  Box,
} from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { type LugParams, type Allowables, LugMode, UnitMode } from './types';
import { DEFAULT_ALLOW, calc } from './Calcs';
import { LugSketch } from './parametric_lug';
import classes from './lug.module.css';

function useMathJax() {
  useEffect(() => {
    if ((window as any).MathJax) return;
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    s.async = true;
    document.head.appendChild(s);
  }, []);
}

function MathBlock({ tex }: { tex: string }) {
  useMathJax();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const MJ = (window as any).MathJax;
    if (!MJ) return;
    MJ.typesetPromise?.([ref.current]);
  }, [tex]);
  return <div style={{ fontSize: 'small', color: 'black' }} ref={ref}>{`$$${tex}$$`}</div>;
}


function NumberSlideSet({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.01,
  suffix,
  decimalScale = 3,
  allowNegative = true,
  fixedDecimalScale = true,
}: {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
  decimalScale: number;
  allowNegative: boolean;
  fixedDecimalScale: boolean;
}) {
  // const [params, setParams] = useState(props);
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

export default function LugCalculator() {
  const [mode, setMode] = useState<LugMode | string>(LugMode.double);
  const [units, setUnits] = useState<UnitMode | string>(UnitMode.english);
  const [conversion, setConversion] = useState<number>(1);
  const [Dp, setPinD] = useState<number | string>(0.75);
  const [D, setHoleD] = useState<number | string>(1.00);
  const [g, setGap] = useState<number | string>(0.10);
  const [t1, setT1] = useState<number | string>(0.50);
  const [t2, setT2] = useState<number | string>(0.75);
  const [w1, setW1] = useState<number | string>(2.5);
  const [w2, setW2] = useState<number | string>(3.0);
  const [e1, setEd1] = useState<number | string>(Number(w1) / 2);
  const [e2, setEd2] = useState<number | string>(Number(w2) / 2);

  const [params, setParams] = useState<LugParams>({
    mode: mode,
    units: units,
    Dp: Number(Dp),
    D: Number(D),
    w1: Number(w1),
    w2: Number(w2),
    e1: Number(e1),
    e2: Number(e2),
    t1: Number(t1),
    t2: Number(t2),
    g: Number(g),
  });
  const [allow, setAllow] = useState<Allowables>(DEFAULT_ALLOW);

  function lengthUnits() {
    return (units === UnitMode.english ? 'in' : 'mm');
  };

  const R = calc({
    mode: mode,
    units: units,
    Dp: Number(Dp),
    D: Number(D),
    g: Number(g),
    t1: Number(t1),
    t2: Number(t2),
    w1: Number(w1),
    w2: Number(w2),
    e1: (Number(w1) / 2),
    e2: (Number(w2) / 2),
  }, allow);

  const { ref, width, height } = useElementSize();

  const handle = (k: keyof LugParams) => (e: React.ChangeEvent<HTMLInputElement>) => setParams(
    p => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <Container strategy="grid">
      <Flex bg="grape" direction="row" wrap="nowrap" justify="stretch" align="flex-start">
        <Flex w={350} m={0} p={0} bg="teal" h="calc(100dvh - var(--app-shell-header-height))" direction="column"
              justify="stretch" align="flex-start" style={{ overflow: 'auto' }}>
          <Accordion w="100%" h="calc(100dvh - var(--app-shell-header-height))" defaultValue="Configuration"
                     classNames={classes}>
            <Accordion.Item w="100%" key={'Configuration'} value={'Configuration'}>
              <Accordion.Control>{'Configuration'}</Accordion.Control>
              <Accordion.Panel>
                <SegmentedControl
                  value={mode}
                  onChange={(value) => setMode(value)}
                  fullWidth
                  data={[
                    {
                      value: 'single',
                      label: 'Single',
                    },
                    {
                      value: 'double',
                      label: 'Double',
                    },
                  ]}
                />
                {/*<Container w="100%">*/}
                {/*  <SegmentedControl*/}
                {/*    value={units}*/}
                {/*    onChange={setUnits}*/}
                {/*    fullWidth*/}
                {/*    size="xs"*/}
                {/*    data={[*/}
                {/*      {*/}
                {/*        value: 'english',*/}
                {/*        label: 'English',*/}
                {/*      },*/}
                {/*      {*/}
                {/*        value: 'metric',*/}
                {/*        label: 'Metric',*/}
                {/*      },*/}
                {/*    ]}*/}
                {/*  />*/}
                {/*</Container>*/}
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item w="100%" key={'Geometry'} value={'Geometry'}>
              <Accordion.Control>{'Geometry'}</Accordion.Control>
              <Accordion.Panel>
                <NumberSlideSet label={'Dp'}
                                value={Number(Dp)}
                                onChange={setPinD}
                                min={0.1}
                                max={Number(D)}
                                step={0.05}
                                suffix={' ' + lengthUnits()}
                                decimalScale={3}
                                allowNegative={false}
                                fixedDecimalScale={true} />

                <NumberSlideSet label={'D'}
                                value={Number(D)}
                                onChange={setHoleD}
                                min={Number(Dp)}
                                max={Math.min(Number(w1), Number(w2)) - .1}
                                step={0.05}
                                suffix={' ' + lengthUnits()}
                                decimalScale={3}
                                allowNegative={false}
                                fixedDecimalScale={true} />

                <NumberSlideSet label={'t1'}
                                value={Number(t1)}
                                onChange={setT1}
                                min={Number(.1)}
                                max={Number(w1) * 1}
                                step={0.05}
                                suffix={' ' + lengthUnits()}
                                decimalScale={2}
                                allowNegative={false}
                                fixedDecimalScale={true} />
                <NumberSlideSet label={'w1'}
                                value={Number(w1)}
                                onChange={setW1}
                                min={Number(D)}
                                max={Number(D) * 5}
                                step={0.1}
                                suffix={' ' + lengthUnits()}
                                decimalScale={3}
                                allowNegative={false}
                                fixedDecimalScale={true} />
                <NumberSlideSet label={'e1'}
                                value={Number(w1) / 2}
                                onChange={setEd1}
                                min={Number(D) / 2}
                                max={Number(D) * 5}
                                step={0.1}
                                suffix={' ' + lengthUnits()}
                                decimalScale={3}
                                allowNegative={false}
                                fixedDecimalScale={true} />

                <NumberSlideSet label={'t2'}
                                value={Number(t2)}
                                onChange={setT2}
                                min={Number(.1)}
                                max={Number(w2) * 1}
                                step={0.05}
                                suffix={' ' + lengthUnits()}
                                decimalScale={2}
                                allowNegative={false}
                                fixedDecimalScale={true} />
                <NumberSlideSet label={'w2'}
                                value={Number(w2)}
                                onChange={setW2}
                                min={Number(D)}
                                max={Number(D) * 5}
                                step={0.1}
                                suffix={' ' + lengthUnits()}
                                decimalScale={3}
                                allowNegative={false}
                                fixedDecimalScale={true} />
                {/*<Switch label="half width" bg="gray"*/}
                {/*        defaultChecked={true}></Switch>*/}
                <NumberSlideSet label={'e2'}
                                value={Number(w2) / 2}
                                onChange={setEd2}
                                min={Number(D) / 2}
                                max={Number(D) * 5}
                                step={0.1}
                                suffix={' ' + lengthUnits()}
                                decimalScale={3}
                                allowNegative={false}
                                fixedDecimalScale={true} />
                <NumberSlideSet label={'g'}
                                value={Number(g)}
                                onChange={setGap}
                                min={Number(0)}
                                max={Number(t1) * .1}
                                step={0.001}
                                suffix={' ' + lengthUnits()}
                                decimalScale={3}
                                allowNegative={false}
                                fixedDecimalScale={true} />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item key={'Areas'} value={'Areas'}>
              <Accordion.Control>{'Areas'}</Accordion.Control>
              <Accordion.Panel>
                <Flex direction="column" justify="flex-start" align="flex-start">
                  <MathBlock
                    tex={'A_{pin} = n_{s}\\, \\frac{\\pi D_p^2}{4} = ' + R.Apin_shear.toFixed(2) + '\\ in^2'} />
                  <MathBlock tex={'A_{net_1} = n_{s}\\, t_{1}\\,(w_{1}-D) = ' + R.Anet.toFixed(2)} />
                  <MathBlock tex={'A_{net_2} = t_{2}\\,(w_{2}-D) = ' + R.Anet.toFixed(2)} />
                  <MathBlock tex={'A_{b,\\,each} = t_{crit}\\, D_p = ' + R.Abearing_each.toFixed(2)} />
                  <MathBlock tex={'A_{b,\\,total} = n_{if}\\, t_{crit}\\, D_p'} />
                  <MathBlock tex={'A_{b_{total}} = n_{if}\\, t_{crit}\\, D_p'} />

                  <div className="text-sm">A_bear(total) = {R.Abearing_total.toFixed(2)}</div>

                  <div className="mt-2 text-sm">P_net = {R.P_net_tension.toFixed(1)}</div>
                  <div className="text-sm">P_bearing = {R.P_bearing_lug.toFixed(1)}</div>
                  <div className="text-sm">P_pin(shear) = {R.P_us_p.toFixed(1)}</div>
                  <div className="font-semibold">P_governing = {R.P_governing.toFixed(1)}</div>


                  {R.warnings.length > 0 && (
                    <div className="mt-2 text-sm text-red-700">
                      {R.warnings.map((w, i) => <div key={i}>⚠ {w}</div>)}
                    </div>
                  )}
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item w="100%" key={'Materials'} value={'Materials'}>
              <Accordion.Control>{'Materials'}</Accordion.Control>
              <Accordion.Panel></Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item w="100%" key={'Allowables'} value={'Allowables'}>
              <Accordion.Control>{'Allowables'}</Accordion.Control>
              <Accordion.Panel> </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Flex>
        <Container
          w="100%"
          h="calc(100dvh - var(--app-shell-header-height))"
          bg="lime">
          <Card ref={ref} bg="white" h="calc(100dvh - var(--app-shell-header-height))">
            <LugSketch params={{
              mode: mode,
              units: units,
              Dp: Number(Dp),
              D: Number(D),
              g: Number(g),
              t1: Number(t1),
              t2: Number(t2),
              w1: Number(w1),
              w2: Number(w2),
              e1: (Number(w1) / 2),
              e2: (Number(w2) / 2),
            }} />
          </Card>
        </Container>;
      </Flex>
    </Container>
  );
}


