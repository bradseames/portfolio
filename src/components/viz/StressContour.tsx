import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface StressData {
  x: number;
  y: number;
  stress: number;
}

export default function StressContour({
  width = 400,
  height = 300,
  data,
}: {
  width?: number;
  height?: number;
  data: StressData[];
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([0, 1]).range([margin.left, innerWidth]);

    const y = d3.scaleLinear().domain([0, 1]).range([innerHeight, margin.top]);

    const color = d3
      .scaleSequential(d3.interpolateViridis)
      .domain([0, d3.max(data, (d) => d.stress)]);

    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", 6)
      .attr("fill", (d) => color(d.stress))
      .attr("stroke", "black")
      .attr("stroke-width", 0.5);

    svg.append("g").attr("transform", `translate(0,${innerHeight})`).call(d3.axisBottom(x));

    svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={ref} width={width} height={height} />;
}
