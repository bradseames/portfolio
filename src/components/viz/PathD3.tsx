import * as d3 from "d3";

let w = 3.5;
let e = 1.5;
let D = 1;

export default function PathD3({
  data,
  width = 640,
  height = 600,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}: {
  data: { eD: number; K: number }[];
  width: number;
  height: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}) {
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.eD) as [number, number]) // Use D3 extent for min/max
    .range([0, width])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.K) || 10] as [number, number])
    .range([height, 0])
    .nice();
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Transition the axes to new values
  svg
    .select<SVGGElement>(".x-axis")
    .transition()
    .duration(500)
    .call(xAxis as any);
  svg
    .select<SVGGElement>(".y-axis")
    .transition()
    .duration(500)
    .call(yAxis as any);

  const line = d3
    .line<{ eD: number; K: number }>()
    .x((d) => xScale(d.eD))
    .y((d) => yScale(d.K));
  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data) || undefined} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={xScale(d.eD)} cy={yScale(d.K)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
