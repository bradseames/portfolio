import React, { useState } from 'react';
import { Container } from '@mantine/core';
import { MathBlock, MathLine } from '../../components/MathJaxProvider';

export default function IntegrationByPartsVisualization() {
  const [u, setU] = useState('x');
  const [dv, setDv] = useState('e^x dx');

  return (
    <Container>
      <div className="p-4 border rounded-xl shadow">

        <div>
          <label>
            u:
            <select value={u} onChange={(e) => setU(e.currentTarget.value)}>
              <option value="x">x</option>
              <option value="sin(x)">sin(x)</option>
            </select>
          </label>

          <label>
            dv:
            <select value={dv} onChange={(e) => setDv(e.currentTarget.value)}>
              <option value="cos(x)dx">cos(x) dx</option>
              <option value="e^x dx">e^x dx</option>
            </select>
          </label>
        </div>

        <div className="mt-4">
          <p className="text-lg">
            IntegrationByPartsVisualization:
            <MathBlock tex={`u = ${u}, dv = ${dv}`}></MathBlock>
            <MathBlock tex={`\\int ${u}\\,${dv} = uv - \\int v\\,du `}></MathBlock>
          </p>
        </div>
      </div>
    </Container>
  );
}
