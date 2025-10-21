import React, { useEffect, useRef } from 'react';
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import { MantineProvider } from '@mantine/core';
import { Select, Card, Checkbox, Slider, Button, Flex, Code, Pagination, Stepper } from '@mantine/core';
import { BarChart, AreaChart, BubbleChart, CompositeChart, LineChart, ScatterChart } from '@mantine/charts';

import MathJaxContext from 'better-react-mathjax/MathJaxContext'; // Better for dynamic rendering
// import MathJax from 'better-react-mathjax/MathJax';
// import type { JSX } from 'react/jsx-runtime';

// import Carousel from './Carousel'
import LugCalculator from './LugCalculator/LugCalculator';
import MyChart from './Charts/MyChart';
import CarouselCard from './CarouselCard/CarouselCard';

// You could also configure MathJax manually, but a wrapper component is simpler.
export const mathJaxConfig = {
  loader: {
    load: ['input/tex', 'output/chtml'], paths: {
      mathjax: '@mathjax/src/bundle',
    },
  },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
  },
};

export function useMathJax() {
  useEffect(() => {
    if ((window as any).MathJax) return;
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    s.async = true;
    document.head.appendChild(s);
  }, []);
}

export function MathBlock({ tex }: { tex: string }) {
  useMathJax();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const MJ = (window as any).MathJax;
    if (!MJ) return;
    MJ.typesetPromise?.([ref.current]);
  }, [tex]);
  return <div ref={ref}>{`$$${tex}$$`}</div>;
}


export const components = {
  MathBlock, Flex, Card, Code, Button, Select, Checkbox, Slider, Pagination, Stepper,
  LineChart, BarChart, AreaChart, ScatterChart, BubbleChart, CompositeChart,
  LugCalculator, MyChart, CarouselCard,
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
