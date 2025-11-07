import React, { useState, useMemo } from "react";
import * as d3 from "d3";
import { ScalableDimension } from "../viz/ScalableDimensions";
import type { LugParams } from "./types";
import { LugMode, LengthUnit } from "./types";
import { DEFAULT_ALLOW, DEFAULT_PARAMS } from "./Calcs";
import { Accordion, Box, Card, Container, Fieldset } from "@mantine/core";
import { Flex, NumberInput, SegmentedControl, Slider, Text, Tabs } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import classes from "./lug.module.css";
import convert from "convert";
//import * as d3 from "d3";

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
  mode: LugMode;
  unit: LengthUnit;
  parentW: number | string;
  parentH: number | string;

  //hoveredDimension?: string | null;
  //onDimensionHover?: (id: string | null) => void;
}

export const LugDrawing: React.FC<LugDrawingProps> = ({
  params,
  mode,
  unit,
  parentW,
  parentH,
  //hoveredDimension,
  //onDimensionHover,
}) => {
  let strokeWidthPx = 1.5;
  let arrowSizePx = 6;
  let fontSizePx = 10;

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

  // Front lug 2 path (top semicircle)
  const frontLug2Path = useMemo(() => {
    //if (mode !== LugMode.double) return null;
    const path = d3.path();
    const w = params.w2;
    const e = params.e2;

    path.moveTo(-w / 2, yTop);
    path.lineTo(-w / 2, yCenter);
    path.arc(0, yCenter, w / 2, Math.PI, 0, true);
    path.lineTo(w / 2, yTop);
    path.closePath();

    return path.toString();
  }, [params.w2, params.e2, mode]);

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

  const { ref, width, height } = useElementSize();

  const scalePxPerUnitL = Number(parentW) / totalWidth;

  strokeWidthPx = strokeWidthPx / scalePxPerUnitL;
  arrowSizePx = arrowSizePx * strokeWidthPx;
  fontSizePx = fontSizePx * strokeWidthPx;

  const aspectR = Number(totalWidth / totalHeight);

  return (
    <div>
      <svg
        width={Number(parentW)}
        height={Number(parentW) / aspectR}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        vectorEffect="non-scaling-stroke"
        shape-rendering="crispEdges"
        ref={ref}
      >
        <rect
          x={0}
          y={0}
          width={"100%"}
          height={"100%"}
          fill="none"
          strokeWidth={strokeWidthPx}
          stroke={"green"}
        />

        <g id="front_view" transform={`translate(${maxW / 2 + xPadding}, 0)`}>
          <g id="front_view_parts">
            {frontLug2Path ? (
              <path
                d={frontLug2Path}
                fill={color.lug2}
                stroke={color.dim}
                strokeWidth={strokeWidthPx}
              />
            ) : (
              ""
            )}
            <path
              d={frontLug1Path}
              fill={color.lug1}
              stroke={color.dim}
              strokeWidth={strokeWidthPx}
            />
            +
            {frontLug2Path ? (
              <path
                d={frontLug2Path}
                fill="none"
                strokeDasharray={`${strokeWidthPx * 3} 0 ${strokeWidthPx * 3}`}
                stroke={color.dim}
                strokeWidth={strokeWidthPx}
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
              strokeWidth={strokeWidthPx}
            />
            <circle
              cx={0}
              cy={yCenter}
              r={params.Dp / 2}
              fill={color.pin}
              stroke={color.dim}
              strokeWidth={strokeWidthPx}
            />
          </g>

          <g id="front_view_dimensions">
            <ScalableDimension
              id={"w1"}
              lengthInUnits={params.w1}
              unit={unit}
              startX={-params.w1 / 2}
              startY={yBot}
              arrowSizePx={arrowSizePx}
              orientation={"horizontal"}
              position={"middle"}
              below={true}
              leadL={2 * arrowSizePx}
              strokeW={strokeWidthPx}
              fontSize={fontSizePx}
            />

            <ScalableDimension
              id={"w2"}
              lengthInUnits={params.w2}
              unit={unit}
              startX={-params.w2 / 2}
              startY={yTop}
              arrowSizePx={arrowSizePx}
              orientation={"horizontal"}
              position={"middle"}
              below={false}
              leadL={-2 * arrowSizePx}
              strokeW={strokeWidthPx}
              fontSize={fontSizePx}
            />

            <ScalableDimension
              id={"e1"}
              lengthInUnits={params.e1}
              unit={unit}
              startX={0}
              startY={yCenter - params.e1}
              arrowSizePx={arrowSizePx}
              orientation={"vertical"}
              position={"end"}
              below={false}
              leadL={-1.5 * params.e1}
              strokeW={strokeWidthPx}
              fontSize={fontSizePx}
            />

            <ScalableDimension
              id={"e2"}
              lengthInUnits={params.e2}
              unit={unit}
              startX={0}
              startY={yCenter}
              arrowSizePx={arrowSizePx}
              orientation={"vertical"}
              position={"start"}
              below={false}
              leadL={-1.5 * params.e2}
              strokeW={strokeWidthPx}
              fontSize={fontSizePx}
            />
            <ScalableDimension
              id={"Dp"}
              lengthInUnits={params.Dp}
              unit={unit}
              startX={0}
              startY={yCenter - params.Dp / 2}
              arrowSizePx={arrowSizePx}
              orientation={"vertical"}
              position={"start"}
              below={false}
              leadL={maxW / 2 + 2 * arrowSizePx}
              strokeW={strokeWidthPx}
              fontSize={fontSizePx}
            />
          </g>
        </g>

        <g id="side_view" transform={`translate(${maxW + xPadding * 3}, ${yCenter})`}>
          <g id="side_view_parts">
            <path
              d={sideLugPath}
              fill={color.lug1}
              stroke={color.dim}
              strokeWidth={strokeWidthPx}
            />

            {/* Side hole as circle cut-out */}
            <rect
              width={params.t1}
              height={params.D}
              x={0}
              y={-params.D / 2}
              fill={color.hole}
              stroke={color.dim}
              strokeWidth={strokeWidthPx}
            />
            <rect
              width={params.t1}
              height={params.Dp}
              x={0}
              y={-params.Dp / 2}
              fill={color.pin}
              stroke={color.dim}
              strokeWidth={strokeWidthPx}
            />
          </g>

          <g id="side_view_dimensions">
            <ScalableDimension
              id={"t1"}
              lengthInUnits={params.t1}
              unit={unit}
              startX={0}
              startY={yBot - yCenter}
              arrowSizePx={arrowSizePx}
              orientation={"horizontal"}
              position={"end"}
              below={false}
              leadL={params.t1 / 2}
              strokeW={strokeWidthPx}
              fontSize={fontSizePx}
            />

            <ScalableDimension
              id={"t2"}
              lengthInUnits={params.t2}
              unit={unit}
              startX={params.t1 + params.gap}
              startY={yTop - yCenter}
              arrowSizePx={arrowSizePx}
              orientation={"horizontal"}
              position={"end"}
              below={false}
              leadL={-2 * arrowSizePx}
              strokeW={strokeWidthPx}
              fontSize={fontSizePx}
            />

            <ScalableDimension
              id={"D"}
              lengthInUnits={params.D}
              unit={unit}
              startX={0}
              startY={-params.D / 2}
              arrowSizePx={arrowSizePx}
              orientation={"vertical"}
              position={"start"}
              below={false}
              leadL={-4 * arrowSizePx}
              strokeW={strokeWidthPx}
              fontSize={fontSizePx}
            />
          </g>

          <g id="lug2_side_view" transform={`translate(${params.t1 + params.gap}, 0)`}>
            <path
              d={sideLugPath2}
              fill={color.lug2}
              stroke={color.dim}
              strokeWidth={strokeWidthPx}
            />

            <rect
              width={params.t2}
              height={params.D}
              x={0}
              y={-params.D / 2}
              fill={color.hole}
              stroke={color.dim}
              strokeWidth={strokeWidthPx}
            />
            <rect
              width={params.t2}
              height={params.Dp}
              x={0}
              y={-params.Dp / 2}
              fill={color.pin}
              stroke={color.dim}
              strokeWidth={strokeWidthPx}
            />
          </g>

          {mode == LugMode.double ? (
            <g
              id="Lug1_double_shear_side_view"
              transform={`translate(${params.t1 + params.t2 + params.gap * 2}, 0)`}
            >
              <path
                d={sideLugPath}
                fill={color.lug1}
                stroke={color.dim}
                strokeWidth={strokeWidthPx}
              />
              <rect
                width={params.t1}
                height={params.D}
                x={0}
                y={-params.D / 2}
                fill={color.hole}
                stroke={color.dim}
                strokeWidth={strokeWidthPx}
              />
              <rect
                width={params.t1}
                height={params.Dp}
                x={0}
                y={-params.Dp / 2}
                fill={color.pin}
                stroke={color.dim}
                strokeWidth={strokeWidthPx}
              />
              {/*{mode == LugMode.double ? (*/}
              {/*  <g>*/}
              <ScalableDimension
                id={"g"}
                lengthInUnits={params.gap}
                unit={unit}
                startX={-params.gap * 2 - params.t2}
                startY={-params.e1}
                arrowSizePx={arrowSizePx}
                orientation={"horizontal"}
                position={"end"}
                below={false}
                leadL={-4 * arrowSizePx}
                strokeW={strokeWidthPx}
                fontSize={fontSizePx}
              />

              <ScalableDimension
                id={"g"}
                lengthInUnits={params.gap}
                unit={unit}
                startX={-params.gap}
                startY={-params.e1}
                arrowSizePx={arrowSizePx}
                orientation={"horizontal"}
                position={"start"}
                below={false}
                leadL={-4 * arrowSizePx}
                strokeW={strokeWidthPx}
                fontSize={fontSizePx}
              />
            </g>
          ) : (
            ""
          )}
        </g>
      </svg>
    </div>
  );
};
