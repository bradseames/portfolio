import type { MDXComponents } from 'mdx/types';
import { Title, Text, Table, Container, Code, Anchor, Button, Paper } from '@mantine/core';
import {
  Accordion, AccordionItem, AccordionPanel, AccordionControl, Box,
  Card, Checkbox, Divider, Drawer, Fieldset, Flex, Grid, Group, Menu,
  NumberInput, Pagination, ScrollArea, Select, Slider, Stack, Stepper, Tabs,
} from '@mantine/core';
import {
  BarChart,
  AreaChart,
  BubbleChart,
  CompositeChart,
  LineChart,
  ScatterChart,
} from '@mantine/charts';

import { MathBlock, MathLine } from './app/MathJaxProvider';

// Import custom visualization components
import LugChart from './components/viz/LugChart';
import CalculationForm from './components/Forms/CalculationForm';
import LugCalculator from './components/LugCalculator/LugCalculator';
import InteractiveStressContour from './components/viz/InteractiveStressContour';


/**
 * Maps standard HTML elements (and custom tags) to their corresponding Mantine components.
 * This is passed to the <MDXProvider components={...}>.
 */
export const mdxComponents: MDXComponents = {
  // === Layout and Typography ===
  h1: (props) => <Title order={1} mt="xl" mb="md" {...props} />,
  h2: (props) => <Title order={2} mt="lg" mb="sm" {...props} />,
  h3: (props) => <Title order={3} mt="md" mb="xs" {...props} />,
  p: (props) => <Text size="md" mb="md" {...props} />,
  a: (props) => <Anchor target="_blank" {...props} />,

  // === Lists ===
  ul: (props) => <ul style={{ paddingLeft: 20 }} {...props} />,
  li: (props) => <li style={{ marginBottom: 5 }} {...props} />,

  // === Containers and Blocks ===
  // Blockquote uses Mantine's Paper
  blockquote: (props) => <Paper component="blockquote" p="md" c="dimmed" withBorder {...props} />,

  // === Code and Preformatting ===
  code: (props) => <Code {...props} />,
  // Pre is  used for code blocks (using three backticks ```)
  pre: (props) => (
      <pre>
      <Code block>{props.children}</Code>
    </pre>
  ),

  // === Data and Tables ===
  table: (props) => <Table withColumnBorders withTableBorder {...props} />,

  // === Custom Components  ===
  LugChart,
  CalculationForm,
  MathBlock,
  MathLine,
  LugCalculator,
  InteractiveStressContour,


  // Mantine components directly by name
  Button: Button,
  Container: Container,
  BarChart,
  AreaChart,
  BubbleChart,
  CompositeChart,
  LineChart,
  ScatterChart,
  Accordion: Accordion, AccordionItem, AccordionPanel, AccordionControl, Box,
  Card, Checkbox, Divider, Drawer, Fieldset, Flex, Grid, Group, Menu,
  NumberInput, Pagination, ScrollArea, Select, Slider, Stack, Stepper, Tabs,

};

// Export this map for use in DynamicMdxPage.tsx
export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
