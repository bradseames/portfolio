import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useElementSize } from '@mantine/hooks';
import { type LugParams, type Allowables, type SketchProps, LugMode, UnitMode } from './types';

// ---------- Fit into viewBox ----------
function useFit(dim: { width: number; height: number }) {
  const marginH = dim.width * .75;
  const marginV = dim.height * .5;
  const vb = useMemo(() => {
    const W = dim.width + marginH;
    const H = dim.height + marginV;
    return { viewBox: `0 0 ${W} ${H}`, offsetX: marginH / 4, offsetY: marginV / 2, W, H };
  }, [dim.width, dim.height]);
  return vb;
}

// ---------- SVG Sketch ----------
export const LugSketch: React.FC<SketchProps> = ({
  params, allow, showDims = false, showLoads = true, showWarnings = true, showPanels = true, style,
}) => {
  // const p = params;
  // const A = { ...DEFAULT_ALLOW, ...(allow ?? {}) } as Allowables;
  // const R = calc(p, A);
  const { ref, width, height } = useElementSize();
  console.log(`Width: ${width}, height: ${height}`);

  const maxWidth = Math.max(params.w1, params.w2);
  const totalThk = params.mode === LugMode.double ? (params.t1 * 2 + params.g * 2 + params.t2) :
    (params.t1 + params.t2);

  const maxHeight = Math.max(params.e1, params.e2) * 1.5 * 2;
  const vb = useFit({ width: (maxWidth + totalThk), height: maxHeight });

  // Hole center
  const xFrontLeft = vb.offsetX;
  const xFrontRight = xFrontLeft + maxWidth;
  const xFrontCenter = (xFrontLeft + xFrontRight) / 2;

  const xSideRight = vb.W - vb.offsetX;
  const xSideLeft = xSideRight - totalThk;
  const xSideCenter = (xSideLeft + xSideRight) / 2;

  const yTop = vb.offsetY;
  const yBottom = vb.H - vb.offsetY;
  const yCenter = (yTop + yBottom) / 2;

  const refHole = useRef<SVGCircleElement>(null);
  const refPin = useRef<SVGCircleElement>(null);

  useEffect(() => { (window as any)._lugRefs = { hole: refHole.current, pin: refPin.current }; }, []);

  const color = {
    hole: 'white',
    pin: 'teal',
    lug1: 'grey',
    lug2: 'blue',
    dim: 'black',
  };

  return (
    <svg id="lug-svg"
         width="100%"
         height="100%"
         viewBox={vb.viewBox}
         strokeWidth={.01}
         fontFamily="system-ui, sans-serif"
         fontSize={.2}
         fontWeight={700}
         vectorEffect="non-scaling-stroke"
         xmlns="http://www.w3.org/2000/svg"
         ref={ref}
    >
      <defs>
        <marker
          id="arrow-start"
          markerWidth="20"
          markerHeight="10"
          refX="0"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth">
          <path
            d="M0,5 L20,0 L20,10 Z"
            fill="black" />
        </marker>

        <marker
          id="arrow-end"
          markerWidth="20"
          markerHeight="10"
          refX="20"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth">
          <path
            d="M0,10 L20,5 L0,0, Z"
            fill="black" />
        </marker>
        <marker
          id="arrow-force"
          markerWidth="10"
          markerHeight="5"
          refX="2.5"
          refY="2.5"
          orient="auto"
          markerUnits="strokeWidth">
          <path
            d="M0,2.5 10,0 10,5 Z"
            fill="red" />
        </marker>
      </defs>

      <g id="front_view" transform={'translate(' + xFrontCenter + ', 0)'}>
        <path
          id="lug2"
          d={`M ${-params.w2 / 2} ${yTop} 
            V ${yCenter} 
            A ${params.w2 / 2} ${params.e2} 1 0 0 ${params.w2 / 2} ${yCenter} 
            V ${yTop} H ${-params.w2 / 2}`}
          fill={color.lug2}
          stroke={color.dim}></path>

        <path
          id="lug1"
          d={`M ${-params.w1 / 2} ${yBottom} 
            V ${yCenter} 
            A ${params.w1 / 2} ${params.e1} 0 0 1 ${params.w1 / 2} ${yCenter} 
            V ${yBottom} H ${-params.w1 / 2}`}
          fill={color.lug1}
          stroke={color.dim}></path>

        <path id="lug2_outline"
              d={`M ${-params.w2 / 2} ${yTop} 
            V ${yCenter} 
            A ${params.w2 / 2} ${params.e2} 1 0 0 ${params.w2 / 2} ${yCenter} 
            V ${yTop} H ${-params.w2 / 2}`}
              stroke={color.dim}
              fill="none"
              strokeDasharray={vb.W / 50 + ' ' + vb.W / 50}></path>

        <circle id="hole"
                ref={refHole}
                cx={0}
                cy={yCenter}
                r={params.D / 2}
                stroke={color.dim}
                fill={color.hole} />

        <circle id="pin"
                ref={refPin}
                cx={0}
                cy={yCenter}
                r={params.Dp / 2}
                stroke={color.dim}
                fill={color.pin} />
      </g>

      <g id="side_view"
         transform={'translate(' + xSideLeft + ', 0)'}
         stroke={color.dim}
      >

        <rect id="lug1_side_left"
              x={0}
              y={yCenter - params.e1}
              width={params.t1}
              height={yBottom - yCenter + params.e1}
              fill={color.lug1} />
        <rect id="lug1_hole_side_left"
              x={0}
              y={yCenter - params.D / 2}
              width={params.t1}
              height={params.D}
              fill={color.hole} />

        <rect id="lug2_side"
              x={params.t1 + params.g}
              y={yTop}
              width={params.t2}
              height={yCenter + params.e2 - yTop}
              fill={color.lug2} />
        <rect id="lug2_hole_side"
              x={params.t1 + params.g}
              y={yCenter - params.D / 2}
              width={params.t2}
              height={params.D}
              fill={color.hole} />

        {params.mode === LugMode.double ? (
          <>
            <rect id="lug1_side_right"
                  x={params.t1 + params.t2 + params.g * 2}
                  y={yCenter - params.e1}
                  width={params.t1}
                  height={yBottom - yCenter + params.e1}
                  fill={color.lug1} />
            <rect id="lug1_hole_side_right"
                  x={params.t1 + params.t2 + params.g * 2}
                  y={yCenter - params.D / 2}
                  width={params.t1}
                  height={params.D}
                  fill={color.hole} />

            <rect id="pin_side"
                  x={0}
                  y={yCenter - params.Dp / 2}
                  width={params.t1 * 2 + params.t2 + params.g * 2}
                  height={params.Dp}
                  fill={color.pin} />
          </>
        ) : (
          <>
            <rect id="pin_side"
                  x={0}
                  y={yCenter - params.Dp / 2}
                  width={params.t1 + params.t2}
                  height={params.Dp}
                  fill={color.pin} />
          </>
        )}
      </g>

      <g id="center_lines"
         stroke={color.dim}
         strokeDasharray={vb.W / 25 + ' ' + vb.W / 25}>
        <line transform={'translate(' + xFrontLeft + ', 0)'}
              x1={0}
              x2={maxWidth}
              y1={yCenter}
              y2={yCenter} />
        <line transform={'translate(' + xFrontCenter + ', 0)'}
              x1={0}
              x2={0}
              y1={yTop}
              y2={yBottom} />
        <line transform={'translate(' + (xSideLeft) + ', 0)'}
              x1={0}
              x2={totalThk}
              y1={yCenter}
              y2={yCenter} />
        <line transform={'translate(' + xSideCenter + ', 0)'}
              x1={0}
              x2={0}
              y1={yTop}
              y2={yBottom} />
      </g>

      <g id="dims"
         fill="black">
        <g transform={'translate(' + xFrontCenter + ', ' + (yBottom + vb.offsetY / 2) + ')'}>
          <line
            x1={-params.w1 / 2}
            y1={-vb.offsetY * 3 / 8}
            x2={-params.w1 / 2}
            y2={vb.offsetY / 4}
            stroke="black"
          />
          <line
            x1={params.w1 / 2}
            y1={-vb.offsetY * 3 / 8}
            x2={params.w1 / 2}
            y2={vb.offsetY / 4}
            stroke="black"
          />
          <line
            x1={-params.w1 / 2}
            y1={0}
            x2={params.w1 / 2}
            y2={0}
            stroke="black"
            markerStart="url(#arrow-start)"
            markerEnd="url(#arrow-end)"
          />
          <text
            x={0}
            y={0}
            textAnchor="middle"
          >w1
          </text>
        </g>
        <g transform={'translate(' + xFrontCenter + ', ' + (yTop - vb.offsetY / 2) + ')'}>
          <line
            x1={-params.w2 / 2}
            y1={vb.offsetY * 3 / 8}
            x2={-params.w2 / 2}
            y2={-vb.offsetY / 4}
            stroke="black"
          />
          <line
            x1={params.w2 / 2}
            y1={vb.offsetY * 3 / 8}
            x2={params.w2 / 2}
            y2={-vb.offsetY / 4}
            stroke="black"
          />

          <line x1={-params.w2 / 2}
                y1={0}
                x2={params.w2 / 2}
                y2={0}
                stroke="black"
                markerStart="url(#arrow-start)"
                markerEnd="url(#arrow-end)"
          />
          <text x={0}
                y={0}
                textAnchor="middle"
          >w2
          </text>
        </g>
        <g transform={'translate(' + xFrontCenter + ', ' + (yCenter) + ')'}>
          <line x1={0}
                y1={0}
                x2={-Math.min(params.w1 / 2) * Math.cos(Math.PI / 4)}
                y2={-Math.min(params.w1 / 2) * Math.sin(Math.PI / 4)}
                stroke="black"
                markerStart="url(#arrow-start)"
                markerEnd="url(#arrow-end)"
          />
          <text x={-Math.min(params.w1 / 2) * 1.1 * Math.cos(Math.PI / 4)}
                y={-Math.min(params.w1 / 2) * 1.1 * Math.cos(Math.PI / 4)}
                textAnchor="middle"
          >e1
          </text>
        </g>
        <g transform={'translate(' + xSideLeft + ', ' + yCenter + ')'}>

          <line
            x1={-vb.offsetX / 2}
            y1={-params.Dp / 2}
            x2={-vb.offsetX / 8}
            y2={-params.Dp / 2}
            stroke="black"
          />
          <line
            x1={-vb.offsetX / 2}
            y1={params.Dp / 2}
            x2={-vb.offsetX / 8}
            y2={params.Dp / 2}
            stroke="black"
          />
          <line
            x1={-vb.offsetX * 7 / 8}
            y1={-params.D / 2}
            x2={-vb.offsetX / 8}
            y2={-params.D / 2}
            stroke="black"
          />
          <line
            x1={-vb.offsetX * 7 / 8}
            y1={params.D / 2}
            x2={-vb.offsetX / 8}
            y2={params.D / 2}
            stroke="black"
          />
          <line
            x1={-vb.offsetX / 4}
            y1={-params.Dp / 2}
            x2={-vb.offsetX / 4}
            y2={params.Dp / 2}
            stroke="black"
            markerStart="url(#arrow-start)"
            markerEnd="url(#arrow-end)"
          />
          <text
            x={-vb.offsetX / 4}
            y={0}
            textAnchor="middle"
            markerStart="url(#arrow-start)"
            markerEnd="url(#arrow-end)"
          >Dp
          </text>

          <line
            x1={-vb.offsetX * 3 / 4}
            y1={-params.D / 2}
            x2={-vb.offsetX * 3 / 4}
            y2={params.D / 2}
            stroke="black"
            markerStart="url(#arrow-start)"
            markerEnd="url(#arrow-end)"
          />
          <text
            x={-vb.offsetX * 3 / 4}
            y={0}
            textAnchor="middle"
          >D
          </text>
        </g>
        <g transform={'translate(' + xSideLeft + ', 0)'}>

          {/* thickness labels */}
          {params.mode === LugMode.double ? (
            <g>
              <line
                x1={0}
                y1={yTop + vb.offsetY * .3}
                x2={0}
                y2={yCenter - params.e1 - .1}
                stroke="black"
              />
              <line
                x1={params.t1}
                y1={yTop + vb.offsetY * .3}
                x2={params.t1}
                y2={yCenter - params.e1 - .1}
                stroke="black"
              />
              <line
                x1={0}
                y1={yTop + vb.offsetY * .5}
                x2={params.t1}
                y2={yTop + vb.offsetY * .5}
                stroke="black"
                markerStart="url(#arrow-start)"
                markerEnd="url(#arrow-end)"
              />
              <text
                x={-.1}
                y={yTop + vb.offsetY * .6}
                textAnchor="end"
              >t1
              </text>
              <line
                x1={params.t1 + params.g}
                y1={yTop + vb.offsetY}
                x2={params.t1 + params.g}
                y2={yTop}
                stroke="black"
              />
              <line
                x1={params.t1 + params.g + params.t2}
                y1={yTop + vb.offsetY / 4}
                x2={params.t1 + params.g + params.t2}
                y2={yTop}
                stroke="black"
              />
              <line
                x1={params.t1 + params.g}
                y1={yTop + vb.offsetY * .25}
                x2={params.t1 + params.g + params.t2}
                y2={yTop + vb.offsetY * .25}
                stroke="black"
                markerStart="url(#arrow-end)"
                markerEnd="url(#arrow-start)"
              />
              <text
                x={params.t1 + params.g - .3}
                y={yTop + vb.offsetY * .3}
                textAnchor="end"
              >t2
              </text>
              <line
                x1={params.t1 + params.t2 + params.g}
                y1={yTop + vb.offsetY / 4}
                x2={params.t1 + params.t2 + params.g}
                y2={yTop}
                stroke="black"
              />
              <line
                x1={params.t1 + params.t2 + params.g * 2}
                y1={yTop + vb.offsetY / 4}
                x2={params.t1 + params.t2 + params.g * 2}
                y2={yCenter - params.w2 / 2}
                stroke="black"
              />
              <line
                x1={params.t1 + params.t2 + params.g}
                y1={yTop + vb.offsetY * .75}
                x2={params.t1 + params.t2 + params.g * 2}
                y2={yTop + vb.offsetY * .75}
                stroke="black"
                markerStart="url(#arrow-end)"
                markerEnd="url(#arrow-start)"
              />
              <text
                x={params.t1 + params.t2 + params.g * 2 + .3}
                y={yTop + vb.offsetY * .75}
                textAnchor="middle"
              >g
              </text>
            </g>
          ) : (
            <g>
              <line
                x1={0}
                y1={yTop}
                x2={params.t1}
                y2={yTop}
                stroke="black"
              />
              <text
                x={params.t1 / 2}
                y={yTop}
                textAnchor="end"
              >t1
              </text>
              <line
                x1={params.t1}
                y1={yTop - vb.offsetY * .5}
                x2={params.t1 + params.t2}
                y2={yTop - vb.offsetY * .5}
                stroke="black"
              />
              <text
                x={params.t1 + params.t2 / 2}
                y={yTop - vb.offsetY * .5}
                textAnchor="end"
              >t2
              </text>
            </g>
          )}
        </g>
      </g>

      <g id="forces" fontFamily="system-ui, sans-serif"
         fontSize={.35}
         fontWeight={700}>
        <g transform={'translate(' + xSideCenter + ', ' + yTop + ')'}>
          <line
            strokeWidth={.04}
            x1={0}
            x2={0}
            y1={-vb.offsetY * 3 / 4}
            y2={0}
            stroke={'red'}
            markerStart="url(#arrow-force)"
          ></line>
          <text x={-.2} y={-vb.offsetY * .5} fill="red" textAnchor="middle">F</text>
        </g>
        <g transform={'translate(' + (xSideCenter + params.t2 / 2 + params.t1 / 2 + params.g) + ', ' + yBottom + ')'}>
          <line strokeWidth={.04}
                x1={0}
                x2={0}
                y1={vb.offsetY * 3 / 4}
                y2={0}
                stroke={'red'}
                markerStart="url(#arrow-force)"
          ></line>
          <text x={.2} y={vb.offsetY * .75} fill="red" textAnchor="start">F/2</text>
        </g>
        <g transform={'translate(' + (xSideCenter - params.t2 / 2 - params.t1 / 2 - params.g) + ', ' + yBottom + ')'}>
          <line strokeWidth={.04}
                x1={0}
                x2={0}
                y1={vb.offsetY * 3 / 4}
                y2={0}
                stroke={'red'}
                markerStart="url(#arrow-force)"
          ></line>
          <text x={-.2} y={vb.offsetY * .75} fill="red" textAnchor="end">F/2</text>
        </g>
      </g>
    </svg>
  );
};
