import React, {useState} from 'react';
import {MathJax, MathJaxContext} from './MathJaxConfig';

import {Container} from '@mantine/core';

function MathPage() {
    const inlineMath = `An inline formula: $E=mc^2$`;
    const displayMath = `A display formula: $$\\frac{d}{dx} \\left( \\int_{0}^{x} f(t) dt \\right) = f(x)$$`;
    const physicsFormula = `A formula with the physics extension: $\\ket{\\psi}$`;
    // const [u, setU] = useState('x');
    // const [dv, setDv] = useState('e^x dx');
    const [form, setForm] = useState({
        u: 'x',
        dv: 'e^x dx',
    });

    return (
        <Container py='md'>
            <div className='p-4 border rounded-xl shadow'>
                <div>
                    <label>
                        u:&nbsp;
                        <select
                            value={form.u}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    u: e.target.value,
                                });
                            }}
                        >
                            <option value='x'>x</option>
                            <option value='sin(x)'>sin(x)</option>
                        </select>
                    </label>
                    &nbsp;&nbsp;
                    <label>
                        dv:&nbsp;
                        <select
                            value={form.dv}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    dv: e.target.value,
                                });
                            }}
                        >
                            <option value='cos(x)dx'>cos(x) dx</option>
                            <option value='e^x dx'>e^x dx</option>
                        </select>
                    </label>
                </div>
                <div className='mt-4'>
                    {form.dv}
                    {/* Here you'd display the integration result, maybe use MathJax/KaTeX */}
                    <p className='text-lg'>
                        IntegrationByPartsVisualization:
                        <MathJax inline dynamic>
                            `$$ u = {form.u}, dv = {form.dv} $$`
                        </MathJax>
                        <MathJax inline dynamic>
                            $$ \int {form.u}\,{form.dv} = uv - \int v\,du $$
                        </MathJax>
                    </p>
                </div>
            </div>
            {/* </MathJaxContext> */}
        </Container>
    );
}

export default MathPage;
