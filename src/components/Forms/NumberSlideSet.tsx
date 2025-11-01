import React, { useState } from 'react';

import { Accordion, Box, Card, Container, Fieldset, Flex, NumberInput } from '@mantine/core';
import { SegmentedControl, Switch, Slider, Text, Tabs } from '@mantine/core';


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
          <Text p="xs" py={0} size="xs"> <b>{label}</b> </Text>
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
        <Slider label={value}
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
};
