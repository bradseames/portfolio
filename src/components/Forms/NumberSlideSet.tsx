import React, { useState } from 'react';
import CalculationForm from '/src/components/Forms/CalculationForm';
import { type Allowables, type LugParams } from './types';
import { DEFAULT_ALLOW, DEFAULT_PARAMS } from './Calcs';

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



};


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

