import {
  Accordion, AccordionItem, AccordionPanel, AccordionControl, Box, Button,
  Card, Checkbox, Code, Container, Divider, Drawer, Fieldset, Flex, Grid, Group, Menu,
  NumberInput, Pagination, Paper, ScrollArea, Select, Slider, Stack, Stepper, Tabs,
} from '@mantine/core';
import {
  BarChart,
  AreaChart,
  BubbleChart,
  CompositeChart,
  LineChart,
  ScatterChart,
} from '@mantine/charts';
import { MathBlock, MathLine } from '.././components/MathJaxProvider';
import IntegrationByPartsVisualization from '../content/math/IntegrationByPartsVisualization';
import LugCalculator from '.././components/LugCalculator/LugCalculator';
import MyChart from '.././components/Charts/MyChart';
import CarouselCard from '.././components/CarouselCard/CarouselCard';
import CarouselComponent from '.././components/LugCalculator/CarouselComponent';

export const components = {
  Accordion, AccordionItem, AccordionPanel, AccordionControl,
  Box, Button, Card, Checkbox, Code, Container, Divider,
  Drawer, Fieldset, Flex, Grid, Group,
  Menu, NumberInput, Pagination, Paper, ScrollArea,
  Select, Slider, Stack, Stepper, Tabs,
  LineChart, BarChart, AreaChart, ScatterChart, BubbleChart, CompositeChart, CarouselComponent,
  MathBlock, MathLine, LugCalculator, MyChart, CarouselCard, IntegrationByPartsVisualization,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8" {...props} />,
};

