import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { NumberInput, Slider, Group, Text } from "@mantine/core";

type DataPoint = { x: number; y: number };
type Series = { name: string; values: DataPoint[] };

interface Props {
  data: Series[];
}

const ResponsiveMultiLineChart: React.FC<Props> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredTooltip, setHoveredTooltip] = useState<{
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
  const [inputX, setInputX] = useState<number>(() => {
    // Default to midpoint of all x values in data
    const allX = data.flatMap((series) => series.values.map((d) => d.x));
    const extent = d3.extent(allX);
    return extent ? ((extent[0] || 0) + (extent[1] || 0)) / 2 : 0;
  });

  // Logical chart size for viewBox
  const WIDTH = 600;
  const HEIGHT = 400;
  const MARGIN = { top: 20, right: 140, bottom: 50, left: 50 };

  // Function to interpolate y for given x in a series
  function interpolateY(series: DataPoint[], x: number): number | null {
    if (series.length === 0) return null;
    const sorted = [...series].sort((a, b) => a.x - b.x);
    if (x <= sorted[0].x) return sorted[0].y;
    if (x >= sorted[sorted.length - 1].x) return sorted[sorted.length - 1].y;

    for (let i = 0; i < sorted.length - 1; i++) {
      const p0 = sorted[i];
      const p1 = sorted[i + 1];
      if (x >= p0.x && x <= p1.x) {
        const t = (x - p0.x) / (p1.x - p0.x);
        return p0.y + t * (p1.y - p0.y);
      }
    }
    return null;
  }

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Clear previous
    svg.selectAll("*").remove();

    const chartGroup = svg.append("g").attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

    const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
    const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

    // Flatten all x and y for scale domains
    const allX = data.flatMap((series) => series.values.map((d) => d.x));
    const allY = data.flatMap((series) => series.values.map((d) => d.y));

    const xExtent = d3.extent(allX) as [number, number];
    const yExtent = [d3.min(allY) ?? 0, d3.max(allY) ?? 0];

    const xScale = d3.scaleLinear().domain(xExtent).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain(yExtent).nice().range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeTableau10).domain(data.map((d) => d.name));

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(6);
    const yAxis = d3.axisLeft(yScale).ticks(6);

    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("fill", "var(--mantine-color-text)");

    chartGroup.append("g").call(yAxis).selectAll("text").attr("fill", "var(--mantine-color-text)");

    // Axis labels (optional)
    chartGroup
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--mantine-color-text)")
      .attr("font-weight", "bold")
      .text("X axis");

    chartGroup
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--mantine-color-text)")
      .attr("font-weight", "bold")
      .text("Y axis");

    // Line generator
    const line = d3
      .line<DataPoint>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));
    //.curve(d3.curveMonotoneX);

    // Draw lines
    const lines = chartGroup.selectAll(".line-series").data(data, (d) => d.name);

    lines.join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "line-series")
          .attr("stroke", (d) => colorScale(d.name) as string)
          .attr("fill", "none")
          .attr("stroke-width", 2)
          //.attr("opacity", 0)
          .attr("d", (d) => line(d.values))
          //.call((enter) => enter.transition().duration(700).attr("opacity", 1)),
          .call((enter) => enter.attr("opacity", 1)),
      (update) =>
        update.call((update) =>
          update
            //.transition()
            //.duration(700)
            .attr("d", (d) => line(d.values)),
        ),

      //(exit) => exit.call((exit) => exit.transition().duration(700).attr("opacity", 0).remove()),
      (exit) => exit.call((exit) => exit.remove()),
    );

    // Draw circles at data points with tooltips
    const pointsGroup = chartGroup
      .selectAll<SVGGElement, Series>(".points-group")
      .data(data, (d) => d.name);

    const pointsGroupEnter = pointsGroup.enter().append("g").attr("class", "points-group");

    pointsGroupEnter
      .selectAll("circle")
      .data((d) => d.values)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 0)
      .attr("fill", (d, i, nodes) => {
        const parentSeries = d3.select(nodes[i].parentNode!).datum() as Series;
        return colorScale(parentSeries.name) as string;
      })
      .on("mouseenter", (event, d) => {
        const svgRect = svgRef.current!.getBoundingClientRect();
        setHoveredTooltip({
          visible: true,
          x: event.clientX - svgRect.left + 10,
          y: event.clientY - svgRect.top - 10,
          content: `x: ${d.x}, y: ${d.y}`,
        });
      })
      .on("mouseleave", () => {
        setHoveredTooltip({ visible: false, x: 0, y: 0, content: "" });
      })
      //.transition()
      //.duration(700)
      .attr("r", 4);

    pointsGroup
      .selectAll("circle")
      .data((d) => d.values)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("cx", (d) => xScale(d.x))
            .attr("cy", (d) => yScale(d.y))
            .attr("r", 0)
            .attr("fill", (d, i, nodes) => {
              const parentSeries = d3.select(nodes[i].parentNode!).datum() as Series;
              return colorScale(parentSeries.name) as string;
            })
            .on("mouseenter", (event, d) => {
              const svgRect = svgRef.current!.getBoundingClientRect();
              setHoveredTooltip({
                visible: true,
                x: event.clientX - svgRect.left + 10,
                y: event.clientY - svgRect.top - 10,
                content: `x: ${d.x}, y: ${d.y}`,
              });
            })
            .on("mouseleave", () => {
              setHoveredTooltip({ visible: false, x: 0, y: 0, content: "" });
            })
            //.transition()
            //.duration(700)
            .attr("r", 4),
        (update) =>
          update
            //.transition()
            //.duration(700)
            .attr("cx", (d) => xScale(d.x))
            .attr("cy", (d) => yScale(d.y)),
        //(exit) => exit.transition().duration(700).attr("r", 0).remove(),
        (exit) => exit.remove(),
      );

    pointsGroup.exit().remove();

    // Interpolated points for given inputX
    const interpolatedPoints = data
      .map((series) => {
        const y = interpolateY(series.values, inputX);
        return { name: series.name, x: inputX, y };
      })
      .filter((p) => p.y !== null);

    // Draw interpolated points circles
    const interpPointsGroup = chartGroup
      .selectAll(".interpolated-points")
      .data([interpolatedPoints]);

    interpPointsGroup.join(
      (enter) => {
        const g = enter.append("g").attr("class", "interpolated-points");

        g.selectAll("circle")
          .data(interpolatedPoints)
          .enter()
          .append("circle")
          .attr("r", 6)
          .attr("stroke", "black")
          .attr("stroke-width", 1.5)
          .attr("fill", (d) => colorScale(d.name) as string)
          //.attr("opacity", 0)
          .attr("cx", (d) => xScale(d.x))
          .attr("cy", (d) => yScale(d.y!))
          //.transition()
          //.duration(700)
          .attr("opacity", 1);

        return g;
      },
      (update) => {
        update
          .selectAll("circle")
          .data(interpolatedPoints)
          .join(
            (enter) =>
              enter
                .append("circle")
                .attr("r", 6)
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)
                .attr("fill", (d) => colorScale(d.name) as string)
                .attr("opacity", 0)
                .attr("cx", (d) => xScale(d.x))
                .attr("cy", (d) => yScale(d.y!))
                //.transition()
                //.duration(700)
                .attr("opacity", 1),
            (update) =>
              update
                //.transition()
                //.duration(700)
                .attr("cx", (d) => xScale(d.x))
                .attr("cy", (d) => yScale(d.y!)),
            //(exit) => exit.transition().duration(700).attr("opacity", 0).remove(),
            (exit) => exit.remove(),
          );
        return update;
      },
      (exit) => exit.remove(),
    );

    // Draw legend on the right
    const legendGroup = svg
      .append("g")
      .attr("transform", `translate(${WIDTH - MARGIN.right + 20}, ${MARGIN.top})`);

    const legendItems = legendGroup.selectAll(".legend-item").data(data, (d) => d.name);

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
      .attr("fill", "var(--mantine-color-text)")
      .text((d) => d.name);

    legendItems.attr("transform", (d, i) => `translate(0, ${i * 24})`);

    legendItems.exit().remove();
  }, [data, inputX]);

  // Get min and max x for slider/input bounds
  const allXValues = data.flatMap((series) => series.values.map((d) => d.x));
  const minX = Math.min(...allXValues);
  const maxX = Math.max(...allXValues);

  // Interpolated results to display below chart
  const interpolatedResults = data.map((series) => {
    const y = interpolateY(series.values, inputX);
    return { name: series.name, y };
  });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }} ref={containerRef}>
      <svg
        ref={svgRef}
        style={{ width: "100%", height: "400px", display: "block" }}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
      />
      {hoveredTooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: hoveredTooltip.x,
            top: hoveredTooltip.y,
            pointerEvents: "none",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 12,
            userSelect: "none",
            whiteSpace: "nowrap",
            transform: "translate(-50%, -100%)",
            zIndex: 10,
          }}
        >
          {hoveredTooltip.content}
        </div>
      )}

      {/* Controls */}
      <Group spacing="md" style={{ marginTop: 16, maxWidth: 600, marginLeft: MARGIN.left }}>
        <NumberInput
          label="X value"
          min={minX}
          max={maxX}
          step={0.1}
          value={inputX}
          onChange={(val) => {
            if (val !== undefined) setInputX(val);
          }}
          precision={2}
          style={{ flexBasis: 120 }}
        />
        <Slider
          min={minX}
          max={maxX}
          step={0.1}
          value={inputX}
          onChange={(val) => setInputX(val)}
          style={{ flexGrow: 1 }}
          marks={[
            { value: minX, label: minX.toFixed(1) },
            { value: maxX, label: maxX.toFixed(1) },
          ]}
        />
      </Group>

      {/* Interpolated Points Values */}
      <Group spacing="xl" style={{ marginTop: 24, maxWidth: 600, marginLeft: MARGIN.left }}>
        {interpolatedResults.map(({ name, y }) => (
          <Text key={name} color="var(--mantine-color-text)" weight={600}>
            {name}: y = {y !== null ? y.toFixed(3) : "N/A"}
          </Text>
        ))}
      </Group>
    </div>
  );
};

export default ResponsiveMultiLineChart;
