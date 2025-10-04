import {Card} from '@mantine/core';
import {RadarChart} from '@mantine/charts';
// import { data } from './data';
export const data = [
    {
        product: 'Apples',
        'Sales January': 120,
        'Sales February': 100,
    },
    {
        product: 'Oranges',
        'Sales January': 98,
        'Sales February': 90,
    },
    {
        product: 'Tomatoes',
        'Sales January': 86,
        'Sales February': 70,
    },
    {
        product: 'Grapes',
        'Sales January': 99,
        'Sales February': 80,
    },
    {
        product: 'Bananas',
        'Sales January': 85,
        'Sales February': 120,
    },
    {
        product: 'Lemons',
        'Sales January': 65,
        'Sales February': 150,
    },
];

export default function MyChart() {
    return (
        <Card>
            <RadarChart
                h={300}
                data={data}
                dataKey='product'
                withTooltip
                withDots
                series={[
                    {name: 'Sales January', color: 'lime.4', opacity: 0.1},
                    {name: 'Sales February', color: 'cyan.4', opacity: 0.1},
                ]}
                // radarChartProps={{  }}
            />
        </Card>
    );
}
