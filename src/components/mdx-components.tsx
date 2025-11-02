import type { MDXComponents } from "mdx/types";

// Component Import Section
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionControl,
  Anchor,
  AngleSlider,
  AspectRatio,
  Autocomplete,
  Card,
  CardSection,
  Box,
  Button,
  type Checkbox,
  Breadcrumbs,
  Input,
  Center,
  type GetStylesApi,
  Container,
  Divider,
  Drawer,
  Fieldset,
  Flex,
  Grid,
  Group,
  Menu,
  NumberInput,
  Pagination,
  Paper,
  ScrollArea,
  Select,
  Slider,
  Stack,
  Stepper,
  Tabs,
  Title,
  Text,
  Table,
  Code,
  TableOfContents,
} from "@mantine/core";

import {
  AreaChart,
  BarChart,
  BubbleChart,
  ChartLegend,
  CompositeChart,
  Heatmap,
  LineChart,
  RadarChart,
  RadialBarChart,
  ScatterChart,
  Sparkline,
} from "@mantine/charts";

import { MathBlock, MathLine } from "./Equations";

// Import custom visualization components
import CalculationForm from "./Forms/CalculationForm";
import InteractiveStressContour from "./viz/InteractiveStressContour";
import LugCalculator from "./LugCalculator/LugCalculator";
import LugChart from "./viz/LugChart";

/**
 * Maps standard HTML elements (and custom tags) to their corresponding Mantine components.
 * This is passed to the <MDXProvider components={...}>.
 */

export const components: MDXComponents = {
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
  CalculationForm,
  MathBlock,
  MathLine,
  InteractiveStressContour,
  LugCalculator,
  LugChart,

  // Mantine components directly by name
  Button: Button,
  Accordion: Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionControl,
  Container: Container,
  AreaChart,
  BarChart,
  BubbleChart,
  CompositeChart,
  LineChart,
  ScatterChart,
  Box,
  Card,
  Divider,
  Drawer,
  Fieldset,
  Flex: Flex,
  Grid,
  Group,
  Menu,
  NumberInput,
  Pagination,
  ScrollArea,
  Select,
  Slider,
  Stack,
  Stepper,
  Tabs,
  TableOfContents,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
