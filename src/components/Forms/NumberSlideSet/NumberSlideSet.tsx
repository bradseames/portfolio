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
  Tabs,
} from '@mantine/core';

import { type Allowables, type LugParams } from './types';
import { DEFAULT_ALLOW, DEFAULT_PARAMS } from './Calcs';

interface NumberSlideSetProps {
  label?: string;
  value: number;
  onChange: (value: string | number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  fixedDecimalScale?: boolean;
}

export const NumberSlideSet = ({
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
}: NumberSlideSetProps) => {

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
};


import React, { useState } from 'react';
import ChildComponent from './ChildComponent';


import React from 'react';


interface NumberSlideSetProps {
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
}


const ChildComponent = ({ count, onIncrement }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <p>Current count: {count}</p>
      <button onClick={onIncrement}>Increment Count</button>
    </div>
  );
};

export default ChildComponent;


export const ParentComponent: React.FC<NumberSlideSetProps> = ({
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
}: NumberSlideSetProps) => {


  export const ParentComponent = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
      setCount(count + 1);
    };

    return (
      <>
        <p>This is the parent component handling the state.</p>
        <ChildComponent count={count} onIncrement={handleIncrement} />
      </>
    );
  };

