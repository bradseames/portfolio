import React, { useState } from "react";
import { Box, Fieldset, Flex, NumberInput, Slider, Text } from "@mantine/core";

interface NumberSlideSetProps {
  value: number;
  onChange: (e: string | number) => void;
  label?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  decimalScale?: number;
  size?: string;
  thousandSeparator?: string;
  fixedDecimalScale?: boolean;
  allowNegative?: boolean;
}

export function NumberSlideSet({
  value,
  onChange,
  label,
  suffix,
  min,
  max,
  step,
  decimalScale,
  size = "sm",
  thousandSeparator = ",",
  fixedDecimalScale = false,
  allowNegative = false,
}: NumberSlideSetProps) {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };

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
            min={min}
            max={max}
            step={step}
            decimalScale={decimalScale}
            fixedDecimalScale={fixedDecimalScale}
            allowNegative={allowNegative}
            suffix={suffix}
            thousandSeparator=","
            size="xs"
          />
        </Box>
      </Flex>
      <Slider
        value={value}
        onChange={onChange}
        label={value}
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
