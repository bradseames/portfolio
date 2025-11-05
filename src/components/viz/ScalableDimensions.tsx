// ScalableDimensions.tsx
//import React from "react";
import React, { useState } from "react";
//import { MultiDimension } from "./ScalableDimensions"; // Adjust import path

//const METERS_PER_INCH = 0.0254;
type Orientation = "horizontal" | "vertical";
type Unit = "m" | "in";
type Position = "start" | "middle" | "end";
const METERS_PER_INCH = 0.0254;

interface ScalableDimensionProps {
  id?: string;
  lengthInMeters: number;
  unit: Unit;
  scalePxPerMeter: number;
  startX: number;
  startY: number;
  arrowSizePx?: number;
  orientation?: Orientation;
  position?: Position;
  below?: boolean;
  leadX?: number;
  leadY?: number;
  leadL?: number;
}

export function ScalableDimension({
  id,
  lengthInMeters,
  unit,
  scalePxPerMeter,
  startX,
  startY,
  arrowSizePx = 10,
  orientation = "horizontal",
  position = "middle",
  below = false,
  leadX = 0,
  leadY = 0,
  leadL = arrowSizePx
}: ScalableDimensionProps) {
  const lengthInUnit = unit === "in" ? lengthInMeters / METERS_PER_INCH : lengthInMeters;
  const lengthPx = lengthInMeters * scalePxPerMeter;

  // Threshold to flip arrows if length is short
  const ARROW_FLIP_THRESHOLD = 2.5 * arrowSizePx;

  // Arrow shape path (triangle)
  const arrowPath = `
    M 0 0
    L ${arrowSizePx} ${arrowSizePx / 2}
    L 0 ${arrowSizePx}
    Z
  `;

  // Text positioning logic
  let textAnchor: "start" | "middle" | "end" = "middle";
  let textX = 0;
  let textY = 0;
  const textOffsetY = below ? arrowSizePx : -arrowSizePx;

  if (orientation === "horizontal") {
    switch (position) {
      case "start":
        textAnchor = "start";
        textX = startX + lengthPx + arrowSizePx * (lengthPx < ARROW_FLIP_THRESHOLD ? 1.5 : .5);
        textY = startY + leadL - arrowSizePx * 0.5;
        break;
      case "end":
        textAnchor = "end";
        textX = startX - arrowSizePx * (lengthPx < ARROW_FLIP_THRESHOLD ? 1.5 : .5);
        textY = startY + leadL + arrowSizePx * 0.5;
        break;
      case "middle":
      default:
        textAnchor = "middle";
        textX = startX + lengthPx / 2;
        textY = startY + leadL + textOffsetY;
        break;
    }
  } else {
    // vertical orientation
    switch (position) {
      case "start":
        textAnchor = "end";
        textX = startX + leadL;
        textY = startY + lengthPx + arrowSizePx * (lengthPx < ARROW_FLIP_THRESHOLD ? 1.5 : .5);
        break;
      case "end":
        textAnchor = "start";
        textX = startX + leadL;
        textY = startY - arrowSizePx * (lengthPx < ARROW_FLIP_THRESHOLD ? 1.5 : .5);
        break;
      case "middle":
      default:
        textAnchor = "middle";
        textX = startX + leadL + (textOffsetY);
        textY = startY + lengthPx / 2;
        break;
    }
  }

  return (
    <g id={id || ""} transform={`translate(${leadX}, ${leadY})`}>
      {orientation === "horizontal" ? (
        <>
          {/* Dimension Line */}
          <line
            x1={startX}
            y1={startY + leadL}
            x2={startX + lengthPx}
            y2={startY + leadL}
            stroke="black"
            strokeWidth={1.5}
          />
          {/* Leaders */}
          <line
            x1={startX}
            y1={startY + arrowSizePx * Math.sign(leadL) / 2}
            x2={startX}
            y2={startY + leadL + arrowSizePx * Math.sign(leadL)}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={startX + lengthPx}
            y1={startY + arrowSizePx * Math.sign(leadL) / 2}
            x2={startX + lengthPx}
            y2={startY + leadL + arrowSizePx * Math.sign(leadL)}
            stroke="black"
            strokeWidth={1}
          />
          {/* Left Arrow */}
          <g
            transform={`translate(${startX +
            (lengthPx < ARROW_FLIP_THRESHOLD ? -arrowSizePx : arrowSizePx)},
             ${
              startY + leadL - arrowSizePx / 2
            }) scale(${lengthPx < ARROW_FLIP_THRESHOLD ? "1" : "-1"}, 1)`}
          >
            <path d={arrowPath} fill="black" />
          </g>
          {/* Right Arrow */}
          <g
            transform={`translate(${startX + lengthPx +
            (lengthPx < ARROW_FLIP_THRESHOLD ? arrowSizePx : -arrowSizePx)}, ${
              startY + leadL - arrowSizePx / 2
            }) scale(${lengthPx < ARROW_FLIP_THRESHOLD ? "-1" : "1"}, 1)`}
          >
            <path d={arrowPath} fill="black" />
          </g>
          {/* Text */}
          <text
            x={textX}
            y={textY}
            textAnchor={textAnchor}
            fontSize={12}
            fontFamily="Arial"
            fill="black"
            dominantBaseline={below ? "hanging" : "auto"}
          >
            {lengthInUnit.toFixed(2)} {unit}
          </text>
        </>
      ) : (
        <>
          {/* Dimension Line */}
          <line
            x1={startX + leadL}
            y1={startY}
            x2={startX + leadL}
            y2={startY + lengthPx}
            stroke="black"
            strokeWidth={1.5}
          />
          {/* Leaders */}
          <line
            x1={startX + arrowSizePx * Math.sign(leadL) / 2}
            y1={startY}
            x2={startX + leadL + arrowSizePx * Math.sign(leadL)}
            y2={startY}
            stroke="black"
            strokeWidth={1}
          />
          <line
            x1={startX + arrowSizePx * Math.sign(leadL) / 2}
            y1={startY + lengthPx}
            x2={startX + leadL + arrowSizePx * Math.sign(leadL)}
            y2={startY + lengthPx}
            stroke="black"
            strokeWidth={1}
          />
          {/* Top Arrow */}
          <g
            transform={`translate(${
              startX + leadL + arrowSizePx / 2},
            ${
              startY + (lengthPx < ARROW_FLIP_THRESHOLD ? -arrowSizePx : arrowSizePx)
            }) rotate(90) scale(${lengthPx < ARROW_FLIP_THRESHOLD ? "1" : "-1"}, 1)`}
          >
            <path d={arrowPath} fill="black" />
          </g>
          {/* Bottom Arrow */}
          <g
            transform={`translate(${
              startX + leadL + arrowSizePx / 2}, ${
              startY + lengthPx + (lengthPx < ARROW_FLIP_THRESHOLD ? arrowSizePx : -arrowSizePx)
            }) rotate(90) scale(${lengthPx < ARROW_FLIP_THRESHOLD ? "-1" : "1"}, 1)`}
          >
            <path d={arrowPath} fill="black" />
          </g>
          {/* Text rotated vertically */}
          <text
            x={textX}
            y={textY}
            textAnchor={textAnchor}
            fontSize={12}
            fontFamily="Arial"
            fill="black"
            transform={`rotate(-90, ${textX}, ${textY})`}
            dominantBaseline={"middle"}
          >
            {lengthInUnit.toFixed(2)} {unit}
          </text>
        </>
      )}
    </g>
  );
}

interface DimensionSpec extends ScalableDimensionProps {
  id: string;
}

interface MultiDimensionProps {
  dimensions: DimensionSpec[];
  scalePxPerMeter: number;
  width: number;
  height: number;
}

export function MultiDimension({
  dimensions, scalePxPerMeter, width, height
}: MultiDimensionProps) {
  return (
    <svg width={width} height={height} style={{ overflow: "visible", border: "1px solid #ccc" }}>
      {dimensions.map(({ id, ...props }) => (
        <ScalableDimension key={id} scalePxPerMeter={scalePxPerMeter} {...props} />
      ))}
    </svg>
  );
}


export default function Example() {
  const scalePxPerMeter = 800;

  const dimensions1 = [
    {
      id: "dim1",
      lengthInMeters: 0.5,
      unit: "m" as const,
      startX: 150,
      startY: 200,
      orientation: "horizontal" as const,
      position: "middle" as const,
      below: false,
      arrowSizePx: 10,
      leadL: -50
    },
    {
      id: "dim2",
      lengthInMeters: 1 / 12 / 39.37, // about 1 inch in meters
      unit: "in" as const,
      startX: 400,
      startY: 100,
      orientation: "horizontal" as const,
      position: "start" as const,
      below: true,
      arrowSizePx: 10,
      leadL: -30
    },
    {
      id: "dim3",
      lengthInMeters: 0.1,
      unit: "m" as const,
      startX: 0,
      startY: 0,
      orientation: "vertical" as const,
      position: "middle" as const,
      below: false,
      arrowSizePx: 10,
      leadL: 100

    },

    {
      id: "dim4",
      lengthInMeters: 0.03,
      unit: "m" as const,
      startX: 100,
      startY: 100,
      orientation: "vertical" as const,
      position: "start" as const,
      below: false,
      arrowSizePx: 10,
      leadL: -30
    }

  ];

  const svgWidth = 600;
  const svgHeight = 400;

  return (
    <div>
      <h2>Multi-Dimension SVG Example</h2>
      <MultiDimension dimensions={dimensions1} scalePxPerMeter={scalePxPerMeter} width={svgWidth}
                      height={svgHeight} />
    </div>
  );
}


//import React, { useState } from "react";
//
//type Orientation = "horizontal" | "vertical";
//
//type Unit = "m" | "in";
//type Position = "start" | "middle" | "end";
//const METERS_PER_INCH = 0.0254;
//
//interface ScalableDimensionProps {
//  lengthInMeters: number;
//  unit: Unit;
//  scalePxPerMeter: number;
//  startX: number;
//  startY: number;
//  arrowSizePx?: number;
//  orientation?: Orientation;
//  position?: Position;
//  below?: boolean;
//}
//
//function ScalableDimension({
//  lengthInMeters,
//  unit,
//  scalePxPerMeter,
//  startX,
//  startY,
//  arrowSizePx = 10,
//  orientation = "horizontal",
//  position = "middle",
//  below = false,
//}: ScalableDimensionProps) {
//  const lengthInUnit = unit === "in" ? lengthInMeters / METERS_PER_INCH : lengthInMeters;
//  const lengthPx = lengthInMeters * scalePxPerMeter;
//  let text_perp = below ? 2 : -1;
//  let text_parallel: Position = position;
//  let text_offset;
//
//  if (text_parallel === "end") {
//    text_offset = lengthPx;
//    text_perp = 0.5;
//  } else if (text_parallel === "start") {
//    text_perp = 0.5;
//    text_offset = -arrowSizePx;
//  } else if (text_parallel === "middle") {
//    text_offset = lengthPx / 2;
//  } else {
//    text_offset = lengthPx / 2;
//  }
////let textAnchor: "start" | "middle" | "end" = "middle";
////
////let textX = 0;
////let textY = 0;
////const arrowPadding = arrowSizePx * 0.5;
////
////if (orientation === "horizontal") {
////  switch (position) {
////    case "start":
////      textAnchor = "start";
////      textX = startX + arrowPadding;
////      textY = startY + (below ? arrowSizePx * 2 : -arrowSizePx);
////      break;
////    case "end":
////      textAnchor = "end";
////      textX = startX + lengthPx - arrowPadding;
////      textY = startY + (below ? arrowSizePx * 2 : -arrowSizePx);
////      break;
////    case "middle":
////    default:
////      textAnchor = "middle";
////      textX = startX + lengthPx / 2;
////      textY = startY + (below ? arrowSizePx * 2 : -arrowSizePx);
////      break;
////  }
////} else {
////  // vertical orientation
////  // similarly set textAnchor and coordinates and rotation
////    switch (position) {
////    case "start":
////      textAnchor = "start";
////      textX = startX + arrowPadding;
////      textY = startY + (below ? arrowSizePx * 2 : -arrowSizePx);
////      break;
////    case "end":
////      textAnchor = "end";
////      textX = startX + lengthPx - arrowPadding;
////      textY = startY + (below ? arrowSizePx * 2 : -arrowSizePx);
////      break;
////    case "middle":
////    default:
////      textAnchor = "middle";
////      textX = startX + (below ? arrowSizePx * 2 : -arrowSizePx);
////      textY = startY - (lengthPx / 2);
////      break;
////  }
//}
//
//  // Arrow path remains the same
//
//  const arrowPath = `
//    M 0 0
//    L ${arrowSizePx} ${arrowSizePx / 2}
//    L 0 ${arrowSizePx}
//    Z
//  `;
//
//  // Compute transforms and positions based on orientation
//
//  // For horizontal:
//  //  - Dimension line: horizontal line from startX,startY to startX+lengthPx,startY
//  //  - Leaders: vertical lines from startX,to startY, from startX+lengthPx to startY
//  //  - Arrows: same logic as current, with horizontal flipping
//  //  - Text: centered above the dimension line
//
//  // For vertical:
//  //  - Dimension line: vertical line from startX,startY to startX,startY+lengthPx
//  //  - Leaders: horizontal lines from x=0 to x=startX and x=startX+lengthPx
//  //  - Arrows: rotated 90deg and flipped similarly
//  //  - Text: centered to the left of the dimension line, rotated -90deg for readability
//
//  return (
//    <svg
//      width={
//        orientation === "horizontal"
//          ? startX + lengthPx + arrowSizePx * 2
//          : startX + arrowSizePx * 3
//      }
//      height={
//        orientation === "horizontal"
//          ? startY + arrowSizePx * 2
//          : startY + lengthPx + arrowSizePx * 2
//      }
//      style={{ overflow: "visible" }}
//    >
//      {/* Dimension line */}
//      {orientation === "horizontal" ? (
//        <>
//          <line
//            x1={startX}
//            y1={startY}
//            x2={startX + lengthPx}
//            y2={startY}
//            stroke="black"
//            strokeWidth={2}
//          />
//          {/* Leaders */}
//          <line
//            x1={startX}
//            y1={0}
//            x2={startX}
//            y2={startY + arrowSizePx}
//            stroke="black"
//            strokeWidth={1}
//          />
//          <line
//            x1={startX + lengthPx}
//            y1={0}
//            x2={startX + lengthPx}
//            y2={startY + arrowSizePx}
//            stroke="black"
//            strokeWidth={1}
//          />
//          {/* Left arrow */}
//
//          <g
//            transform={`translate(${
//              startX + arrowSizePx * (lengthPx < 2.5 * arrowSizePx ? -1 : 1)
//            },${startY - arrowSizePx / 2})
//            scale(${lengthPx < 2.5 * arrowSizePx ? "1" : "-1"},1)`}
//          >
//            <path d={arrowPath} fill="black" />
//          </g>
//
//          {/* Right arrow */}
//          <g
//            transform={`translate(${
//              startX + lengthPx + arrowSizePx * (lengthPx < 2.5 * arrowSizePx ? 1 : -1)
//            },${startY - arrowSizePx / 2}) scale(${lengthPx < 2.5 * arrowSizePx ? "-1" : "1"},1)`}
//          >
//            <path d={arrowPath} fill="black" />
//          </g>
//          {/* Text */}
//          <text
//            x={startX + lengthPx - text_offset}
//            y={startY + arrowSizePx * text_perp}
//            textAnchor={text_parallel}
//            fontSize={12}
//            fontFamily="Arial"
//            fill="black"
//          >
//            {lengthInUnit.toFixed(2)} {unit}
//          </text>
//        </>
//      ) : (
//        <>
//          <line
//            x1={startX}
//            y1={startY}
//            x2={startX}
//            y2={startY + lengthPx}
//            stroke="black"
//            strokeWidth={2}
//          />
//          {/* Leaders */}
//          <line
//            x1={0}
//            y1={startY}
//            x2={startX + arrowSizePx}
//            y2={startY}
//            stroke="black"
//            strokeWidth={1}
//          />
//          <line
//            x1={0}
//            y1={startY + lengthPx}
//            x2={startX + arrowSizePx}
//            y2={startY + lengthPx}
//            stroke="black"
//            strokeWidth={1}
//          />
//          {/* Top arrow */}
//          <g
//            transform={`translate(${startX + arrowSizePx / 2},${
//              startY + arrowSizePx * (lengthPx < 2.5 * arrowSizePx ? -1 : 1)
//            }) rotate(90) scale(${lengthPx < 2.5 * arrowSizePx ? "1" : "-1"},1)`}
//          >
//            <path d={arrowPath} fill="black" />
//          </g>
//          {/* Bottom arrow */}
//          <g
//            transform={`translate(${startX + arrowSizePx / 2},${
//              startY + lengthPx + arrowSizePx * (lengthPx < 2.5 * arrowSizePx ? 1 : -1)
//            }) rotate(90) scale(${lengthPx < 2.5 * arrowSizePx ? "-1" : "1"},1)`}
//          >
//            <path d={arrowPath} fill="black" />
//          </g>
//          {/* Text rotated vertically */}
//
//          <text
//            x={startX + text_perp * arrowSizePx}
//            y={startY + text_offset}
//            textAnchor={text_parallel}
//            fontSize={12}
//            fontFamily="Arial"
//            fill="black"
//            transform={`rotate(-90, ${startX + text_perp * arrowSizePx}, ${startY + text_offset})`}
//          >
//            {lengthInUnit.toFixed(2)} {unit}
//          </text>
//        </>
//      )}
//    </svg>
//  );
//}

//import { NumberInput } from "@mantine/core";
//
//export default function Example() {
//  // Example: dimension of 0.5842 meters (approx 23 inches)
//  const [unit, setUnit] = useState<Unit>("m");
//  const [len, setLen] = useState(0.5);
//  const [orient, setOrient] = useState<Orientation>("horizontal");
//  // Scale: 200 px = 1 meter (adjust as needed)
//  const scalePxPerMeter = 200;
//  const [position, setPosition] = useState<Position>("middle");
//  // Toggle unit handler
//  const toggleUnit = () => {
//    setUnit((prev) => (prev === "m" ? "in" : "m"));
//  };
//  const toggleOrient = () => {
//    setOrient((prev) => (prev === "horizontal" ? "vertical" : "horizontal"));
//  };
//  const togglePosition = () => {
//    setPosition((prev) => (prev === "middle" ? "end" : prev === "end" ? "start" : "middle"));
//  };
//
//  function handleLenChange(length: number) {
//    setLen(Number(length) * (unit == "in" ? METERS_PER_INCH : 1));
//  }
//
//  return (
//    <div style={{ padding: "20px" }}>
//      <h2>Scalable Dimension Example</h2>
//      <button onClick={toggleUnit}>Switch to {unit === "m" ? "inches" : "meters"}</button>
//      <button onClick={toggleOrient}>
//        Switch to {orient === "horizontal" ? "vertical" : "horizontal"}
//      </button>
//      <button onClick={togglePosition}>
//        Switch to {position === "middle" ? "end" : position === "end" ? "start" : "middle"}
//      </button>
//      <NumberInput
//        value={len / (unit == "in" ? METERS_PER_INCH : 1)}
//        onChange={(e) => handleLenChange(Number(e))}
//        step={unit == "in" ? 0.1 : 0.01}
//      ></NumberInput>
//
//      <div style={{ marginTop: "40px" }}>
//        <ScalableDimension
//          lengthInMeters={len}
//          unit={unit}
//          scalePxPerMeter={scalePxPerMeter}
//          startX={50}
//          startY={50}
//          orientation={orient}
//          position={position}
//        />
//      </div>
//    </div>
//  );
//}
