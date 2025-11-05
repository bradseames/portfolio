import React, { useState, useMemo } from "react";
import * as d3 from "d3";
import { ScalableDimension } from "../viz/ScalableDimensions";

enum LugMode {
  single = "single",
  double = "double",
}

interface LugParams {
  mode: LugMode;
  w1: number;
  e1: number;
  w2: number;
  e2: number;
  D: number; // hole diameter
  Dp: number; // pin diameter
  thickness: number; // lug thickness (for side view)
  length: number; // pin length or lug length side view
}

const color = {
  lug1: "steelblue",
  lug2: "grey",
  hole: "white",
  pin: "teal",
  dim: "black",
  highlight: "orange",
};

interface DimensionProps {
  start: [number, number];
  end: [number, number];
  label: string;
  id: string;
  isFocused?: boolean;
  onHover?: (id: string | null) => void;
}

const Dimension: React.FC<DimensionProps> = ({
  start,
  end,
  label,
  id,
  isFocused = false,
  onHover,
}) => {
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
  const arrowSize = 6;

  // Points for arrows on the line ends
  const arrowPoints = (x: number, y: number, offsetAngle: number): string =>
    [
      `${x},${y}`,
      `${x - arrowSize * Math.cos(angle + offsetAngle)},${
        y - arrowSize * Math.sin(angle + offsetAngle)
      }`,
    ].join(" ");

  return (
    <g
      onMouseEnter={() => onHover && onHover(id)}
      onMouseLeave={() => onHover && onHover(null)}
      style={{ cursor: "pointer" }}
    >
      {/* Dimension line */}
      <line
        x1={start[0]}
        y1={start[1]}
        x2={end[0]}
        y2={end[1]}
        stroke={isFocused ? color.highlight : color.dim}
        strokeWidth={2}
      />
      {/* Arrows */}
      <polygon
        points={arrowPoints(start[0], start[1], Math.PI / 6)}
        fill={isFocused ? color.highlight : color.dim}
      />
      <polygon
        points={arrowPoints(start[0], start[1], -Math.PI / 6)}
        fill={isFocused ? color.highlight : color.dim}
      />
      <polygon
        points={arrowPoints(end[0], end[1], Math.PI - Math.PI / 6)}
        fill={isFocused ? color.highlight : color.dim}
      />
      <polygon
        points={arrowPoints(end[0], end[1], Math.PI + Math.PI / 6)}
        fill={isFocused ? color.highlight : color.dim}
      />
      {/* Label */}
      <text
        x={midX}
        y={midY - 8}
        fill={isFocused ? color.highlight : color.dim}
        fontSize={12}
        fontFamily="Arial"
        textAnchor="middle"
        pointerEvents="none"
      >
        {label}
      </text>
    </g>
  );
};

interface LugDrawingProps {
  params: LugParams;
  hoveredDimension: string | null;
  onDimensionHover: (id: string | null) => void;
}

const LugDrawing: React.FC<LugDrawingProps> = ({ params, hoveredDimension, onDimensionHover }) => {
  // Compute front view height
  const frontHeight = Math.max(params.e1, params.e2) * 6;
  const frontWidth = Math.max(params.w1, params.w2) * 1.5;

  // Front lug 1 path (bottom semicircle)
  const frontLug1Path = useMemo(() => {
    const path = d3.path();
    const w = params.w1;
    const e = params.e1;
    const yBot = frontHeight - e * 1;
    const yCenter = frontHeight - e * 3;
    path.moveTo(-w / 2, yBot);
    path.lineTo(-w / 2, yCenter);
    path.arc(0, yCenter, w / 2, Math.PI, 0, false);
    path.lineTo(w / 2, yBot);
    path.closePath();

    return path.toString();
  }, [params.w1, params.e1, frontHeight]);

  // Front lug 2 path (top semicircle) if double mode
  const frontLug2Path = useMemo(() => {
    if (params.mode !== LugMode.double) return null;
    const path = d3.path();
    const w = params.w2;
    const e = params.e2;
    const yTop = e * 0.5;
    const yCenter = e * 3;
    path.moveTo(-w / 2, yTop);
    path.lineTo(-w / 2, yCenter);
    path.arc(0, yCenter, w / 2, Math.PI, 0, true);
    path.lineTo(w / 2, yTop);
    path.closePath();

    return path.toString();
  }, [params.w2, params.e2, params.mode]);

  // Hole and pin radii
  const holeRadius = params.D / 2;
  const pinRadius = params.Dp / 2;

  // Side view parameters and sizing
  const sideWidth = params.thickness * 3;
  const sideHeight = frontHeight;
  const sidePaddingX = frontWidth + 30;

  // Side lug shape path (simple rectangle for thickness and height)
  const sideLugPath = useMemo(() => {
    const path = d3.path();
    path.rect(0, -params.e1, params.thickness, params.e1 * 2.5);
    return path.toString();
  }, [params.thickness, frontHeight]);
  const sideLugPath2 = useMemo(() => {
    const path = d3.path();
    path.rect(0, -3 * params.e2, params.thickness, 4 * params.e2);
    return path.toString();
  }, [params.thickness, frontHeight]);

  // Side hole and pin positions
  // Hole is a circle centered vertically at frontHeight - e1*2 approximately
  const holeY = frontHeight / 2;

  return (
    <svg
      width="100%"
      height={350}
      viewBox={`0 0 ${sidePaddingX + sideWidth + 100} ${frontHeight + 100}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Front view group */}
      <g transform={`translate(${Math.max(params.w1, params.w2) / 2 + params.e2 * 2}, 0)`}>
        {/* Lug 2 front view */}
        {params.mode === LugMode.double && frontLug2Path && (
          <path d={frontLug2Path} fill={color.lug2} stroke={color.dim} strokeWidth={1} />
        )}

        {/* Lug 1 front view */}
        {/*<path d={frontLug1Path} fill={color.lug1} stroke={color.dim} strokeWidth={0.12} />*/}
        <path d={frontLug1Path} fill={color.lug1} opacity={1} stroke={color.dim} strokeWidth={1} />

        <path
          d={frontLug2Path}
          fill="none"
          stroke={color.dim}
          strokeDasharray="3 0 3"
          strokeWidth={1}
        />
        {/* Hole and pin */}
        <circle cx={0} cy={holeY} r={holeRadius} fill={color.hole} stroke={color.dim} />
        <circle cx={0} cy={holeY} r={pinRadius} fill={color.pin} stroke={color.dim} />
        {
          <ScalableDimension
            id={"w1"}
            lengthInMeters={params.w1 / 1000}
            unit={"in"}
            scalePxPerMeter={1000}
            startX={-params.w1 / 2}
            startY={holeY + params.e1 * 2}
            arrowSizePx={10}
            orientation={"horizontal"}
            position={"middle"}
            below={true}
            leadL={params.e1 / 4}
          />
        }
        {
          <ScalableDimension
            id={"w2"}
            lengthInMeters={params.w2 / 1000}
            unit={"in"}
            scalePxPerMeter={1000}
            startX={-params.w2 / 2}
            startY={holeY - params.e2 * 2}
            arrowSizePx={10}
            orientation={"horizontal"}
            position={"middle"}
            below={false}
            leadL={-params.e2 / 2}
          />
        }
        {/* Dimensions on front view */}
        {/*<Dimension*/}
        {/*  id="dimension_w1"*/}
        {/*  start={[-params.w1 / 2, frontHeight + 10]}*/}
        {/*  end={[params.w1 / 2, frontHeight + 10]}*/}
        {/*  label={`w1 = ${params.w1} mm`}*/}
        {/*  isFocused={hoveredDimension === "dimension_w1"}*/}
        {/*  onHover={onDimensionHover}*/}
        {/*/>*/}

        {/*<Dimension*/}
        {/*  id="dimension_e1"*/}
        {/*  start={[params.w1 / 2 + 10, holeY]}*/}
        {/*  end={[params.w1 / 2 + 10, frontHeight]}*/}
        {/*  label={`e1 = ${params.e1} mm`}*/}
        {/*  isFocused={hoveredDimension === "dimension_e1"}*/}
        {/*  onHover={onDimensionHover}*/}
        {/*/>*/}
      </g>

      {/* Side view group */}
      <g transform={`translate(${sidePaddingX}, ${holeY})`}>
        {/* Side lug rectangle */}
        <path d={sideLugPath} fill={color.lug1} stroke={color.dim} strokeWidth={1} />

        {/* Side hole as circle cut-out */}
        <rect
          width={params.thickness}
          height={params.D}
          x={0}
          y={-params.D / 2}
          fill={color.hole}
          stroke={color.dim}
          strokeWidth={1}
        />
        <rect
          width={params.thickness}
          height={params.Dp}
          x={0}
          y={-params.Dp / 2}
          fill={color.pin}
          stroke={color.dim}
          strokeWidth={1}
        />
        {
          <ScalableDimension
            id={"t1"}
            lengthInMeters={params.thickness / 1000}
            unit={"in"}
            scalePxPerMeter={1000}
            startX={0}
            startY={params.e2 * 2.5 + params.e1 * 2.5}
            arrowSizePx={10}
            orientation={"horizontal"}
            position={"end"}
            below={false}
            leadL={-params.e2 / 2}
          />
        }

        {
          <ScalableDimension
            id={"Dp"}
            lengthInMeters={params.Dp / 1000}
            unit={"in"}
            scalePxPerMeter={1000}
            startX={0}
            startY={-params.Dp / 2}
            arrowSizePx={10}
            orientation={"vertical"}
            position={"end"}
            below={false}
            leadL={-params.e2 / 2}
          />
        }
        {
          <ScalableDimension
            id={"Dp"}
            lengthInMeters={params.D / 1000}
            unit={"in"}
            scalePxPerMeter={1000}
            startX={0}
            startY={-params.D / 2}
            arrowSizePx={10}
            orientation={"vertical"}
            position={"end"}
            below={false}
            leadL={-params.e2}
          />
        }
        <g transform={`translate(${params.thickness}, 0)`}>
          <path d={sideLugPath2} fill={color.lug2} stroke={color.dim} strokeWidth={1} />

          {/* Side hole as circle cut-out */}
          <rect
            width={params.thickness}
            height={params.D}
            x={0}
            y={-params.D / 2}
            fill={color.hole}
            stroke={color.dim}
            strokeWidth={1}
          />
          <rect
            width={params.thickness}
            height={params.Dp}
            x={0}
            y={-params.Dp / 2}
            fill={color.pin}
            stroke={color.dim}
            strokeWidth={1}
          />
        </g>

        <g transform={`translate(${params.thickness * 2}, 0)`}>
          {/* Side lug rectangle */}
          <path d={sideLugPath} fill={color.lug1} stroke={color.dim} strokeWidth={1} />

          {/* Side hole as circle cut-out */}
          <rect
            width={params.thickness}
            height={params.D}
            x={0}
            y={-params.D / 2}
            fill={color.hole}
            stroke={color.dim}
            strokeWidth={1}
          />
          <rect
            width={params.thickness}
            height={params.Dp}
            x={0}
            y={-params.Dp / 2}
            fill={color.pin}
            stroke={color.dim}
            strokeWidth={1}
          />
        </g>
      </g>
    </svg>
  );
};

export default function LugCalculator() {
  const [params, setParams] = useState<LugParams>({
    mode: LugMode.double,
    w1: 120,
    e1: 60,
    w2: 100,
    e2: 30,
    D: 40,
    Dp: 35,
    thickness: 30,
    length: 120,
  });

  const [hoveredDimension, setHoveredDimension] = useState<string | null>(null);

  // Handle input changes
  function handleParamChange<K extends keyof LugParams>(key: K, value: number) {
    setParams((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div style={{ display: "flex", gap: 40 }}>
      <div style={{ flex: "1 1 auto" }}>
        <LugDrawing
          params={params}
          hoveredDimension={hoveredDimension}
          onDimensionHover={setHoveredDimension}
        />
      </div>

      {/*<form style={{ flex: "0 0 220px" }}>*/}
      {/*  {Object.entries(params).map(*/}
      {/*    ([key, value]) =>*/}
      {/*      key !== "mode" && (*/}
      {/*        <div key={key} style={{ marginBottom: 10 }}>*/}
      {/*          <label htmlFor={key}>*/}
      {/*            {key}:*/}
      {/*            <input*/}
      {/*              id={key}*/}
      {/*              type="number"*/}
      {/*              value={value}*/}
      {/*              min={0}*/}
      {/*              style={{*/}
      {/*                width: "100%",*/}
      {/*                borderColor:*/}
      {/*                  hoveredDimension === `dimension_${key}` ? color.highlight : "initial",*/}
      {/*              }}*/}
      {/*              onChange={(e) =>*/}
      {/*                handleParamChange(key as keyof LugParams, Number(e.target.value))*/}
      {/*              }*/}
      {/*              onFocus={() => setHoveredDimension(`dimension_${key}`)}*/}
      {/*              onBlur={() => setHoveredDimension(null)}*/}
      {/*            />*/}
      {/*          </label>*/}
      {/*        </div>*/}
      {/*      ),*/}
      {/*  )}*/}
      {/*</form>*/}
    </div>
  );
}


//import React, {
//  useMemo;
//} from "react";
//import * as d3 from "d3";
//import {
//  type LugParams
//,
//  LugMode;
//} from "./types";
//
//interface LugCrossSectionProps {
//  params: LugParams;
//}
//
//// Example colors based on your existing palette
//const color = {
//  lug1: "blue",
//  lug2: "grey",
//  hole: "white",
//  pin: "teal",
//  dim: "silver",
//};
//
//export const LugDrawing: React.FC<LugCrossSectionProps> = ({ params }) => {
//  // Memoize path strings to recalc only when params change
//
//  const h = (params.e1 + params.e2) * 2;
//
//  const frontLug1Path = useMemo(() => {
//    const path = d3.path();
//    const w = params.w1;
//    const e = params.e1;
//    const yBot = h;
//    const yCenter = h - e * 2; // semicircle center vertically
//
//    path.moveTo(-w / 2, yBot);
//    path.lineTo(-w / 2, yCenter);
//    path.arc(0, yCenter, w / 2, Math.PI, 0, false);
//    path.lineTo(w / 2, yBot);
//    path.closePath();
//
//    return path.toString();
//  }, [params.w1, params.e1]);
//
//  const frontLug2Path = useMemo(() => {
//    if (params.mode !== "double") return null;
//    const path = d3.path();
//    const w = params.w2;
//    const e = params.e2;
//    const yTop = 0;
//    const yCenter = e * 2;
//
//    path.moveTo(-w / 2, yTop);
//    path.lineTo(-w / 2, yCenter);
//    path.arc(0, yCenter, w / 2, Math.PI, 0, true);
//    path.lineTo(w / 2, yTop);
//    path.closePath();
//
//    return path.toString();
//  }, [params.w2, params.e2, params.mode]);
//
//  // Hole and pin radii
//  const holeRadius = params.D / 2;
//  const pinRadius = params.Dp / 2;
//
//  // SVG sizing helpers
//  const height = Math.max(params.e1, params.e2) * 2 * 2.5;
//  const width = Math.max(params.w1, params.w2);
//
//  return (
//    <svg
//      width="100%"
//      height="100%"
//      viewBox={`-${width / 2} 0 ${width} ${h}`}
//      xmlns="http://www.w3.org/2000/svg"
//    >
//      {/* Lug 2 front view */}
//      {params.mode === "double" && frontLug2Path && (
//        <path d={frontLug2Path} fill={color.lug2} stroke={color.dim} strokeWidth={0.02} />
//      )}
//
//      {/* Lug 1 front view */}
//      <path d={frontLug1Path} fill={color.lug1} stroke={color.dim} strokeWidth={0.02} />
//
//      {/* Hole */}
//      <circle cx={0} cy={params.e2 * 2} r={holeRadius} fill={color.hole} stroke={color.dim} />
//
//      {/* Pin */}
//      <circle cx={0} cy={params.e2 * 2} r={pinRadius} fill={color.pin} stroke={color.dim} />
//    </svg>
//  );
//};
