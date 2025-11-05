import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type DataPoint = { x: number; y: number };
type Series = { name: string; values: DataPoint[] };

interface Props {
  data: Series[];
}

const ResponsiveMultiLineChart2: React.FC<Props> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  // Logical chart size for viewBox
  const WIDTH = 800;
  const HEIGHT = 400;
  const MARGIN = { top: 20, right: 120, bottom: 30, left: 50 };

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous drawing
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG group translated for margins
    const svg = d3.select(svgRef.current);
    const textColor = "var(--mantine-color-text)";

    const chartGroup = svg.append("g").attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

    const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
    const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

    // Flatten all x and y values to determine scale domains
    const allX = data.flatMap((series) => series.values.map((d) => d.x));
    const allY = data.flatMap((series) => series.values.map((d) => d.y));

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(allX) as [number, number])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(allY) ?? 0, d3.max(allY) ?? 0])
      .nice()
      .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(data.map((d) => d.name));

    // Create axes
    const xAxis = d3.axisBottom(xScale).ticks(6);
    const yAxis = d3.axisLeft(yScale);

    chartGroup.append("g").attr("transform", `translate(0, ${innerHeight})`).call(xAxis);

    chartGroup.append("g").call(yAxis);

    // Line generator function with curve for smooth lines
    const line = d3
      .line<DataPoint>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));
    //.curve(d3.curveMonotoneX);

    // Draw lines for each series with transition
    const lines = chartGroup.selectAll(".line-series").data(data, (d: any) => d.name);

    lines.join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "line-series")
          .attr("fill", "none")
          .attr("stroke-width", 2)
          .attr("stroke", (d) => colorScale(d.name) as string)
          .attr("d", (d) => line(d.values))
          .call((enter) => enter.transition().duration(700).attr("opacity", 1)),
      (update) =>
        update.call((update) =>
          update
            .transition()
            .duration(700)
            .attr("d", (d) => line(d.values)),
        ),
      (exit) => exit.call((exit) => exit.transition().duration(700).attr("opacity", 0).remove()),
    );

    // Add circles at points with transitions and tooltips
    const pointsGroup = chartGroup.selectAll(".points-group").data(data, (d: any) => d.name);

    const pointsGroupEnter = pointsGroup.enter().append("g").attr("class", "points-group");

    // Append circles to new groups
    pointsGroupEnter
      .selectAll("circle")
      .data((d) => d.values)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 0)
      .attr("fill", (d, i, nodes) => {
        const parentData = d3.select(nodes[i].parentNode!).datum() as Series;
        return colorScale(parentData.name) as string;
      })
      .on("mouseenter", (event, d) => {
        const svgRect = svgRef.current!.getBoundingClientRect();
        setTooltip({
          visible: true,
          x: event.clientX - svgRect.left + 10,
          y: event.clientY - svgRect.top - 10,
          content: `x: ${d.x}, y: ${d.y}`,
        });
      })
      .on("mouseleave", () => {
        setTooltip({ visible: false, x: 0, y: 0, content: "" });
      })
      .transition()
      .duration(700)
      .attr("r", 4);

    // Update existing points group circles
    pointsGroup
      .selectAll("circle")
      .data((d) => d.values)
      .join(
        (enter) => {
          enter
            .append("circle")
            .attr("cx", (d) => xScale(d.x))
            .attr("cy", (d) => yScale(d.y))
            .attr("r", 0)
            .attr("fill", (d, i, nodes) => {
              const parentData = d3.select(nodes[i].parentNode!).datum() as Series;
              return colorScale(parentData.name) as string;
            })
            .on("mouseenter", (event, d) => {
              const svgRect = svgRef.current!.getBoundingClientRect();
              setTooltip({
                visible: true,
                x: event.clientX - svgRect.left + 10,
                y: event.clientY - svgRect.top - 10,
                content: `x: ${d.x}, y: ${d.y}`,
              });
            })
            .on("mouseleave", () => {
              setTooltip({ visible: false, x: 0, y: 0, content: "" });
            })
            .transition()
            .duration(700)
            .attr("r", 4);
        },
        (update) => {
          update
            .transition()
            .duration(700)
            .attr("cx", (d) => xScale(d.x))
            .attr("cy", (d) => yScale(d.y));
        },
        (exit) => {
          exit.transition().duration(700).attr("r", 0).remove();
        },
      );

    // Remove exiting points groups
    pointsGroup.exit().remove();

    // Draw legend
    const legendGroup = svg
      .append("g")
      .attr("transform", `translate(${WIDTH - MARGIN.right + 20},${MARGIN.top})`);

    const legendItems = legendGroup.selectAll(".legend-item").data(data, (d: any) => d.name);

    const legendEnter = legendItems
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 24})`);

    legendEnter
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d) => colorScale(d.name) as string);

    legendEnter
      .append("text")
      .attr("x", 24)
      .attr("y", 14)
      .attr("fill", textColor)
      .text((d) => d.name);

    // Update legend position if data changes
    legendItems.attr("transform", (d, i) => `translate(0, ${i * 24})`);

    legendItems.exit().remove();
  }, [data]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <svg
        ref={svgRef}
        style={{ width: "100%", height: "100%", display: "block" }}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
      />
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            pointerEvents: "none",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            transform: "translate(-50%, -100%)",
            userSelect: "none",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default ResponsiveMultiLineChart2;

//import React, { useEffect, useRef } from "react";
//import * as d3 from "d3";
//
//type DataPoint = { x: number; y: number };
//type Series = { name: string; values: DataPoint[] };
//
//interface Props {
//  data: Series[];
//}
//
//const ResponsiveMultiLineChart2: React.FC<Props> = ({ data }) => {
//  const containerRef = useRef<HTMLDivElement>(null);
//  const svgRef = useRef<SVGSVGElement>(null);
//
//  // Logical chart size for viewBox
//  const WIDTH = 800;
//  const HEIGHT = 400;
//  const MARGIN = { top: 20, right: 20, bottom: 30, left: 50 };
//
//  useEffect(() => {
//    if (!svgRef.current) return;
//
//    // Clear previous drawing
//    d3.select(svgRef.current).selectAll("*").remove();
//
//    // Create SVG group translated for margins
//    const svg = d3.select(svgRef.current);
//
//    const chartGroup = svg.append("g").attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);
//
//    const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
//    const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
//
//    // Flatten all x and y values to determine scale domains
//    const allX = data.flatMap((series) => series.values.map((d) => d.x));
//    const allY = data.flatMap((series) => series.values.map((d) => d.y));
//
//    const xScale = d3
//      .scaleLinear()
//      .domain(d3.extent(allX) as [number, number])
//      .range([0, innerWidth]);
//
//    const yScale = d3
//      .scaleLinear()
//      .domain([d3.min(allY) ?? 0, d3.max(allY) ?? 0])
//      .nice()
//      .range([innerHeight, 0]);
//
//    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(data.map((d) => d.name));
//
//    // Create axes
//    const xAxis = d3.axisBottom(xScale).ticks(6);
//    const yAxis = d3.axisLeft(yScale);
//
//    chartGroup.append("g").attr("transform", `translate(0, ${innerHeight})`).call(xAxis);
//
//    chartGroup.append("g").call(yAxis);
//
//    // Line generator function
//    const line = d3
//      .line<DataPoint>()
//      .x((d) => xScale(d.x))
//      .y((d) => yScale(d.y));
//    //.curve(d3.curveMonotoneX);
//    const circle = d3
//      .cx((d) => xScale(d.x))
//      .cy((d) => yScale(d.y))
//
//    // Draw lines for each series
//    chartGroup
//      .selectAll(".line-series")
//      .data(data)
//      .join("path")
//      .attr("class", "line-series")
//      .attr("fill", "none")
//      .attr("stroke", (d) => colorScale(d.name) as string)
//      .attr("stroke-width", 2)
//      .attr("d", (d) => line(d.values))
//      .join("circle")
//      .attr("cx", (d) => circle(d.values))
//      .attr("cy", (d) => yScale(d.y))
//    ;
//  }, [data]);
//
//  return (
//    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
//      <svg
//        ref={svgRef}
//        style={{ width: "100%", height: "100%", display: "block" }}
//        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
//        preserveAspectRatio="none"
//      />
//    </div>
//  );
//};
//
//export default ResponsiveMultiLineChart2;
