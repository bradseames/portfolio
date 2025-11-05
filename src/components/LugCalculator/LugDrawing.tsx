import React, { useState, useMemo } from "react";
import * as d3 from "d3";
import { ScalableDimension } from "../viz/ScalableDimensions";

type Unit = "m" | "in" | "mm";

const convMeters = {
  m: 1,
  in: 0.0254,
  mm: 0.001,
};
const METERS_PER_INCH = 0.0254;
const METERS_PER_MM = 0.001;
const scalePxPerMeter = 1;
//let conversionFactorMeters = 1;

let strokeW = 0.001;
let arrowSizePx = strokeW * 6;
let fontSize = strokeW * 8;

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
  D: number;
  Dp: number;
  t1: number;
  t2: number;
  gap: number;
}

const color = {
  lug1: "steelblue",
  lug2: "grey",
  hole: "white",
  pin: "teal",
  dim: "black",
  highlight: "orange",
};

interface LugDrawingProps {
  params: LugParams;
  hoveredDimension: string | null;
  onDimensionHover: (id: string | null) => void;
}

const LugDrawing: React.FC<LugDrawingProps> = ({ params, hoveredDimension, onDimensionHover }) => {
  const [unit, setUnit] = useState<Unit>("m");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "m" ? "in" : prev === "in" ? "mm" : "m"));
  };

  const maxEd = Math.max(params.e1, params.e2);
  const yPadding = maxEd;
  const totalHeight = maxEd * 4 + yPadding * 2;

  const yCenter = totalHeight / 2;
  const yTop = yPadding;
  const yBot = totalHeight - yPadding;

  // Side view parameters and sizing
  const maxW = Math.max(params.w1, params.w2);
  const maxT = params.t1 * 2 + params.t2 + params.gap * 2;
  const xPadding = maxW * 0.5;
  const totalWidth = maxW + maxT + xPadding * 4;

  // Front lug 1 path (bottom semicircle)
  const frontLug1Path = useMemo(() => {
    const path = d3.path();
    const w = params.w1;
    const e = params.e1;

    path.moveTo(-w / 2, yBot);
    path.lineTo(-w / 2, yCenter);
    path.arc(0, yCenter, w / 2, Math.PI, 0, false);
    path.lineTo(w / 2, yBot);
    path.closePath();

    return path.toString();
  }, [params.w1, params.e1, totalHeight]);

  // Front lug 2 path (top semicircle) if double mode
  const frontLug2Path = useMemo(() => {
    if (params.mode !== LugMode.double) return null;
    const path = d3.path();
    const w = params.w2;
    const e = params.e2;

    path.moveTo(-w / 2, yTop);
    path.lineTo(-w / 2, yCenter);
    path.arc(0, yCenter, w / 2, Math.PI, 0, true);
    path.lineTo(w / 2, yTop);
    path.closePath();

    return path.toString();
  }, [params.w2, params.e2, params.mode]);

  // Side lug shape path (simple rectangle for thickness and height)
  const sideLugPath = useMemo(() => {
    const path = d3.path();
    path.rect(0, -params.e1, params.t1, yBot - yCenter + params.e1);
    return path.toString();
  }, [params.t1, totalHeight]);

  const sideLugPath2 = useMemo(() => {
    const path = d3.path();
    path.rect(0, -yCenter + yTop, params.t2, params.e2 + yCenter - yTop);
    return path.toString();
  }, [params.t2, totalHeight]);

  return (
    <div>
      <button onClick={toggleUnit}>
        Switch to {unit === "m" ? "in" : unit === "in" ? "mm" : "m"}
      </button>
      <svg
        width={"100%"}
        height={"100%"}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x={0}
          y={0}
          width={"100%"}
          height={"100%"}
          fill="none"
          strokeWidth={strokeW}
          stroke={"green"}
        />

        <g id="front_view" transform={`translate(${maxW / 2 + xPadding}, 0)`}>
          <g id="front_view_parts">
            {frontLug2Path ? (
              <path d={frontLug2Path} fill={color.lug2} stroke={color.dim} strokeWidth={strokeW} />
            ) : (
              ""
            )}
            <path
              d={frontLug1Path}
              fill={color.lug1}
              opacity={1}
              stroke={color.dim}
              strokeWidth={strokeW}
            />
            +
            {frontLug2Path ? (
              <path
                d={frontLug2Path}
                fill="none"
                strokeDasharray={`${strokeW * 3} 0 ${strokeW * 3}`}
                stroke={color.dim}
                strokeWidth={strokeW}
              />
            ) : (
              ""
            )}
            {/* Hole and pin */}
            <circle
              cx={0}
              cy={yCenter}
              r={params.D / 2}
              fill={color.hole}
              stroke={color.dim}
              strokeWidth={strokeW}
            />
            <circle
              cx={0}
              cy={yCenter}
              r={params.Dp / 2}
              fill={color.pin}
              stroke={color.dim}
              strokeWidth={strokeW}
            />
          </g>

          <g id="front_view_dimensions">
            <ScalableDimension
              id={"w1"}
              lengthInMeters={params.w1}
              unit={unit}
              scalePxPerMeter={scalePxPerMeter}
              startX={-params.w1 / 2}
              startY={yBot}
              arrowSizePx={arrowSizePx}
              orientation={"horizontal"}
              position={"middle"}
              below={true}
              leadL={params.e1 / 4}
              strokeW={strokeW}
              fontSize={fontSize}
            />

            <ScalableDimension
              id={"w2"}
              lengthInMeters={params.w2}
              unit={unit}
              scalePxPerMeter={scalePxPerMeter}
              startX={-params.w2 / 2}
              startY={yTop}
              arrowSizePx={arrowSizePx}
              orientation={"horizontal"}
              position={"middle"}
              below={false}
              leadL={-params.e2 / 4}
              strokeW={strokeW}
              fontSize={fontSize}
            />

            <ScalableDimension
              id={"e1"}
              lengthInMeters={params.e1}
              unit={unit}
              scalePxPerMeter={scalePxPerMeter}
              startX={0}
              startY={yCenter - params.e1}
              arrowSizePx={arrowSizePx}
              orientation={"vertical"}
              position={"middle"}
              below={false}
              leadL={-params.w1 * 0.75}
              strokeW={strokeW}
              fontSize={fontSize}
            />

            <ScalableDimension
              id={"e2"}
              lengthInMeters={params.e2}
              unit={unit}
              scalePxPerMeter={scalePxPerMeter}
              startX={0}
              startY={yCenter}
              arrowSizePx={arrowSizePx}
              orientation={"vertical"}
              position={"start"}
              below={false}
              leadL={-params.w1 * 0.75}
              strokeW={strokeW}
              fontSize={fontSize}
            />
          </g>
        </g>

        <g id="side_view" transform={`translate(${maxW + xPadding * 3}, ${yCenter})`}>
          <g id="side_view_parts">
            <path d={sideLugPath} fill={color.lug1} stroke={color.dim} strokeWidth={strokeW} />

            {/* Side hole as circle cut-out */}
            <rect
              width={params.t1}
              height={params.D}
              x={0}
              y={-params.D / 2}
              fill={color.hole}
              stroke={color.dim}
              strokeWidth={strokeW}
            />
            <rect
              width={params.t1}
              height={params.Dp}
              x={0}
              y={-params.Dp / 2}
              fill={color.pin}
              stroke={color.dim}
              strokeWidth={strokeW}
            />
          </g>

          <g id="side_view_dimensions">
            <ScalableDimension
              id={"t1"}
              lengthInMeters={params.t1}
              unit={unit}
              scalePxPerMeter={scalePxPerMeter}
              startX={0}
              startY={yBot - yCenter}
              arrowSizePx={arrowSizePx}
              orientation={"horizontal"}
              position={"end"}
              below={false}
              leadL={params.t1 / 2}
              strokeW={strokeW}
              fontSize={fontSize}
            />

            <ScalableDimension
              id={"t2"}
              lengthInMeters={params.t2}
              unit={unit}
              scalePxPerMeter={scalePxPerMeter}
              startX={params.t1 + params.gap}
              startY={yTop - yCenter}
              arrowSizePx={arrowSizePx}
              orientation={"horizontal"}
              position={"end"}
              below={false}
              leadL={-2 * arrowSizePx}
              strokeW={strokeW}
              fontSize={fontSize}
            />

            <ScalableDimension
              id={"Dp"}
              lengthInMeters={params.Dp}
              unit={unit}
              scalePxPerMeter={scalePxPerMeter}
              startX={0}
              startY={-params.Dp / 2}
              arrowSizePx={arrowSizePx}
              orientation={"vertical"}
              position={"end"}
              below={false}
              leadL={-2 * arrowSizePx}
              strokeW={strokeW}
              fontSize={fontSize}
            />

            <ScalableDimension
              id={"D"}
              lengthInMeters={params.D}
              unit={unit}
              scalePxPerMeter={scalePxPerMeter}
              startX={0}
              startY={-params.D / 2}
              arrowSizePx={arrowSizePx}
              orientation={"vertical"}
              position={"end"}
              below={false}
              leadL={-4 * arrowSizePx}
              strokeW={strokeW}
              fontSize={fontSize}
            />
          </g>

          <g id="lug2_side_view" transform={`translate(${params.t1 + params.gap}, 0)`}>
            <path d={sideLugPath2} fill={color.lug2} stroke={color.dim} strokeWidth={strokeW} />

            <rect
              width={params.t2}
              height={params.D}
              x={0}
              y={-params.D / 2}
              fill={color.hole}
              stroke={color.dim}
              strokeWidth={strokeW}
            />
            <rect
              width={params.t2}
              height={params.Dp}
              x={0}
              y={-params.Dp / 2}
              fill={color.pin}
              stroke={color.dim}
              strokeWidth={strokeW}
            />
          </g>

          <g
            id="Lug1_double_shear_side_view"
            transform={`translate(${params.t1 + params.t2 + params.gap * 2}, 0)`}
          >
            <path d={sideLugPath} fill={color.lug1} stroke={color.dim} strokeWidth={strokeW} />
            <rect
              width={params.t1}
              height={params.D}
              x={0}
              y={-params.D / 2}
              fill={color.hole}
              stroke={color.dim}
              strokeWidth={strokeW}
            />
            <rect
              width={params.t1}
              height={params.Dp}
              x={0}
              y={-params.Dp / 2}
              fill={color.pin}
              stroke={color.dim}
              strokeWidth={strokeW}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default function LugCalculator() {
  const [params, setParams] = useState<LugParams>({
    mode: LugMode.double,
    w1: 3 * METERS_PER_INCH,
    e1: 1.5 * METERS_PER_INCH,
    w2: 2.5 * METERS_PER_INCH,
    e2: 1.25 * METERS_PER_INCH,
    D: 0.75 * METERS_PER_INCH,
    Dp: 0.75 * METERS_PER_INCH,
    t1: 0.5 * METERS_PER_INCH,
    t2: 1 * METERS_PER_INCH,
    gap: 0.01 * METERS_PER_INCH,
  });
  //// Scale: 200 px = 1 meter (adjust as needed)

  const [hoveredDimension, setHoveredDimension] = useState<string | null>(null);

  //// Handle input changes
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
      {/*            {key} ({unit}):*/}
      {/*            <NumberInput*/}
      {/*              id={key}*/}
      {/*              //type="number"*/}
      {/*              value={value}*/}
      {/*              min={0}*/}
      {/*              style={{*/}
      {/*                width: "150px",*/}
      {/*                borderColor:*/}
      {/*                  hoveredDimension === `dimension_${key}` ? color.highlight : "initial",*/}
      {/*              }}*/}
      {/*              onChange={(e) => handleParamChange(key as keyof LugParams, Number(e))}*/}
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


//interface DimensionProps {
//  start: [number, number];
//  end: [number, number];
//  label: string;
//  id: string;
//  isFocused?: boolean;
//  onHover?: (id: string | null) => void;
//}
//
//const Dimension: React.FC<DimensionProps> = ({
//  start,
//  end,
//  label,
//  id,
//  isFocused = false,
//  onHover,
//}) => {
//  const midX = (start[0] + end[0]) / 2;
//  const midY = (start[1] + end[1]) / 2;
//  const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
//  const arrowSize = 6;
//
//  // Points for arrows on the line ends
//  const arrowPoints = (x: number, y: number, offsetAngle: number): string =>
//    [
//      `${x},${y}`,
//      `${x - arrowSize * Math.cos(angle + offsetAngle)},${
//        y - arrowSize * Math.sin(angle + offsetAngle)
//      }`,
//    ].join(" ");
//
//  return (
//    <g
//      onMouseEnter={() => onHover && onHover(id)}
//      onMouseLeave={() => onHover && onHover(null)}
//      style={{ cursor: "pointer" }}
//    >
//      {/* Dimension line */}
//      <line
//        x1={start[0]}
//        y1={start[1]}
//        x2={end[0]}
//        y2={end[1]}
//        stroke={isFocused ? color.highlight : color.dim}
//        strokeWidth={2}
//      />
//      {/* Arrows */}
//      <polygon
//        points={arrowPoints(start[0], start[1], Math.PI / 6)}
//        fill={isFocused ? color.highlight : color.dim}
//      />
//      <polygon
//        points={arrowPoints(start[0], start[1], -Math.PI / 6)}
//        fill={isFocused ? color.highlight : color.dim}
//      />
//      <polygon
//        points={arrowPoints(end[0], end[1], Math.PI - Math.PI / 6)}
//        fill={isFocused ? color.highlight : color.dim}
//      />
//      <polygon
//        points={arrowPoints(end[0], end[1], Math.PI + Math.PI / 6)}
//        fill={isFocused ? color.highlight : color.dim}
//      />
//      {/* Label */}
//      <text
//        x={midX}
//        y={midY - 8}
//        fill={isFocused ? color.highlight : color.dim}
//        fontSize={12}
//        fontFamily="Arial"
//        textAnchor="middle"
//        pointerEvents="none"
//      >
//        {label}
//      </text>
//    </g>
//  );
//};


//
//
//const [convFact, setConvFact] = useState(1);
//
//const convertedParams = useMemo(() => {
//  const factor = unit === "m" ? convMeters.m : unit === "in" ? convMeters.in : convMeters.mm;
//
//  setConvFact(factor);
//
//  return {
//    ...params,
//    w1: params.w1 * factor,
//    e1: params.e1 * factor,
//    w2: params.w2 * factor,
//    e2: params.e2 * factor,
//    D: params.D * factor,
//    Dp: params.Dp * factor,
//    t1: params.t1 * factor,
//    t2: params.t2 * factor,
//    gap: params.gap * factor,
//  };
//}, [params, unit]);
//
//params = convertedParams;
//
////const toggleUnit = () => {
////  setUnit((prev) => {
////    const nextUnit = prev === "m" ? "in" : prev === "in" ? "mm" : "m";
////    setConvFact(
////      nextUnit === "m" ? convMeters.m : nextUnit === "in" ? convMeters.in : convMeters.mm,
////    );
////    return nextUnit;
////  });
////};

// Compute front view height

//params.w1 = params.w1 * convFact;
//params.e1 = params.e1 * convFact;
//params.w2 = params.w2 * convFact;
//params.e2 = params.e2 * convFact;
//params.D = params.D * convFact;
//params.Dp = params.Dp * convFact;
//params.t1 = params.t1 * convFact;
//params.t2 = params.t2 * convFact;
//params.gap = params.gap * convFact;
