import React, { useState } from 'react';
// @ts-ignore
// import {MathJax, MathJaxContext} from 'better-react-mathjax/esm';
import { Container } from '@mantine/core';


// const {MathJax} = pkg;
// You can use D3 or SVG directly here

// export { IntegrationByPartsVisualization };

export default function IntegrationByPartsVisualization() {
  // Example state and slider for demonstration
  const [u, setU] = useState('x');
  const [dv, setDv] = useState('e^x dx');

  return (
    <Container>
      <div className="p-4 border rounded-xl shadow">
        <div>
          <label>
            u:
            <select value={u} onChange={(e) => setU(e.target.value)}>
              <option value="x">
                {/*<MathJax>x</MathJax>*/}
              </option>
              <option value="sin(x)">
                {/*<MathJax>sin(x)</MathJax>*/}
              </option>
            </select>
          </label>
          <label>
            dv:
            <select value={dv} onChange={(e) => setDv(e.target.value)}>
              <option value="cos(x)dx">cos(x) dx</option>
              <option value="e^x dx">
                {/*<MathJax dynamic>$$ e^x dx $$</MathJax>*/}
              </option>
            </select>
          </label>
        </div>
        <div className="mt-4">
          {/* Here you'd display the integration result, maybe use MathJax/KaTeX */}
          <p className="text-lg">
            IntegrationByPartsVisualization:
            {/*<MathJax dynamic>*/}
            {/*  $$ u = {u}, dv = {dv} $$*/}
            {/*</MathJax>*/}
            {/*<MathJax dynamic>*/}
            {/*  $$ \int {u}\,{dv} = uv - \int v\,du $$*/}
            {/*</MathJax>*/}
          </p>
        </div>
      </div>
    </Container>
  );
}
