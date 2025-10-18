// src/components/MDXProvider.jsx
import React from 'react';
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import MathJaxContext from 'better-react-mathjax/MathJaxContext'; // Better for dynamic rendering
import MathJax from 'better-react-mathjax/MathJax';
import MyChart from './Charts/MyChart';
import CarouselCard from './CarouselCard/CarouselCard';
// import LugCalculatorDemo from './parametric_lug';
import type { JSX } from 'react/jsx-runtime';
import { BarChart, AreaChart, BubbleChart, CompositeChart, LineChart, ScatterChart } from '@mantine/charts';
import { Select, Card, Checkbox, Slider, Button, Code, Pagination, Stepper } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
// import Carousel from './Carousel'

// You could also configure MathJax manually, but a wrapper component is simpler.
export const mathJaxConfig = {
  loader: { load: ['input/tex', 'output/chtml'] },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
  },
};


export const components = {
  MyChart, MathJax, CarouselCard, ScatterChart, BarChart, AreaChart, BubbleChart, LineChart,
  Select, Card, Checkbox, Slider, Button, Code, CompositeChart, Pagination, Stepper,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8" {...props} />,
};


export default function MDXProvider(children: any) {
  return (
    <MantineProvider>
      <BaseMDXProvider components={components}>
        <MathJaxContext config={mathJaxConfig}>
          {children}
        </MathJaxContext>
      </BaseMDXProvider>
    </MantineProvider>
  );
}
