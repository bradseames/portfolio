import { type LengthUnit } from "../../components/LugCalculator/types";

type Orientation = "horizontal" | "vertical";
type Position = "start" | "middle" | "end";

interface ScalableDimensionProps {
  id?: string;
  lengthInUnits: number;
  unit: LengthUnit;
  startX: number;
  startY: number;
  arrowSizePx?: number;
  orientation?: Orientation;
  position?: Position;
  below?: boolean;
  leadL?: number;
  strokeW?: number;
  fontSize?: number;
}

export function ScalableDimension({
  id,
  lengthInUnits,
  unit,
  startX,
  startY,
  arrowSizePx = 10,
  orientation = "horizontal",
  position = "middle",
  below = false,
  leadL = arrowSizePx,
  strokeW = 1,
  fontSize = 12,
}: ScalableDimensionProps) {
  const lengthPx = lengthInUnits;

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
  const textOffsetY = below ? arrowSizePx * 0.5 : -arrowSizePx * 0.5;

  if (orientation === "horizontal") {
    switch (position) {
      case "start":
        textAnchor = "start";
        textX = lengthPx + arrowSizePx * (lengthPx < ARROW_FLIP_THRESHOLD ? 1.5 : 0.5);
        textY = leadL + arrowSizePx * 0.5;
        break;
      case "end":
        textAnchor = "end";
        textX = arrowSizePx * (lengthPx < ARROW_FLIP_THRESHOLD ? -1.5 : -0.5);
        textY = leadL + arrowSizePx * 0.5;
        break;
      case "middle":
      default:
        textAnchor = "middle";
        textX = lengthPx / 2;
        textY = leadL + textOffsetY;
        break;
    }
  } else {
    // vertical orientation
    switch (position) {
      case "start":
        textAnchor = "end";
        textX = leadL;
        textY = lengthPx + arrowSizePx * (lengthPx < ARROW_FLIP_THRESHOLD ? 1.5 : 0.5);
        break;
      case "end":
        textAnchor = "start";
        textX = leadL;
        textY = arrowSizePx * (lengthPx < ARROW_FLIP_THRESHOLD ? 1.5 : -0.5);
        break;
      case "middle":
      default:
        textAnchor = "middle";
        textX = leadL + textOffsetY * 2;
        textY = lengthPx / 2;
        break;
    }
  }

  return (
    <g id={id || ""} transform={`translate(${startX}, ${startY})`}>
      {orientation === "horizontal" ? (
        <>
          {/* Dimension Line */}
          <line x1={0} y1={leadL} x2={lengthPx} y2={leadL} stroke="black" strokeWidth={strokeW} />
          {/* Leaders */}
          <line
            x1={0}
            y1={(arrowSizePx * Math.sign(leadL)) / 2}
            x2={0}
            y2={leadL + arrowSizePx * Math.sign(leadL)}
            stroke="black"
            strokeWidth={strokeW}
          />
          <line
            x1={lengthPx}
            y1={(arrowSizePx * Math.sign(leadL)) / 2}
            x2={lengthPx}
            y2={leadL + arrowSizePx * Math.sign(leadL)}
            stroke="black"
            strokeWidth={strokeW}
          />
          {/* Left Arrow */}
          <g
            transform={`translate(${lengthPx < ARROW_FLIP_THRESHOLD ? -arrowSizePx : arrowSizePx},
             ${leadL - arrowSizePx / 2}) scale(${lengthPx < ARROW_FLIP_THRESHOLD ? "1" : "-1"}, 1)`}
          >
            <path d={arrowPath} fill="black" />
          </g>
          {/* Right Arrow */}
          <g
            transform={`translate(${
              lengthPx + (lengthPx < ARROW_FLIP_THRESHOLD ? arrowSizePx : -arrowSizePx)
            }, ${
              leadL - arrowSizePx / 2
            }) scale(${lengthPx < ARROW_FLIP_THRESHOLD ? "-1" : "1"}, 1)`}
          >
            <path d={arrowPath} fill="black" />
          </g>
          {/* Text */}
          <text
            x={textX}
            y={textY}
            textAnchor={textAnchor}
            fontSize={fontSize}
            fontFamily="Arial"
            fill="black"
            dominantBaseline={below ? "hanging" : "auto"}
          >
            {lengthInUnits.toFixed(2)} {unit}
          </text>
        </>
      ) : (
        <>
          {/* Dimension Line */}

          <line x1={leadL} y1={0} x2={leadL} y2={lengthPx} stroke="black" strokeWidth={strokeW} />

          {/* Leaders */}
          <line
            x1={(arrowSizePx * Math.sign(leadL)) / 2}
            y1={0}
            x2={leadL + arrowSizePx * Math.sign(leadL)}
            y2={0}
            stroke="black"
            strokeWidth={strokeW}
          />
          <line
            x1={(arrowSizePx * Math.sign(leadL)) / 2}
            y1={lengthPx}
            x2={leadL + arrowSizePx * Math.sign(leadL)}
            y2={lengthPx}
            stroke="black"
            strokeWidth={strokeW}
          />

          {/* Top Arrow */}
          <g
            transform={`translate(${startX + leadL + arrowSizePx / 2},
            ${
              lengthPx < ARROW_FLIP_THRESHOLD ? -arrowSizePx : arrowSizePx
            }) rotate(90) scale(${lengthPx < ARROW_FLIP_THRESHOLD ? "1" : "-1"}, 1)`}
          >
            <path d={arrowPath} fill="black" />
          </g>

          {/* Bottom Arrow */}
          <g
            transform={`translate(${startX + leadL + arrowSizePx / 2}, ${
              lengthPx + (lengthPx < ARROW_FLIP_THRESHOLD ? arrowSizePx : -arrowSizePx)
            }) rotate(90) scale(${lengthPx < ARROW_FLIP_THRESHOLD ? "-1" : "1"}, 1)`}
          >
            <path d={arrowPath} fill="black" />
          </g>

          {/* Text rotated vertically */}
          <text
            x={textX}
            y={textY}
            textAnchor={textAnchor}
            fontSize={fontSize}
            fontFamily="Arial"
            fill="black"
            transform={`rotate(-90, ${textX}, ${textY})`}
            dominantBaseline={"middle"}
          >
            {lengthInUnits.toFixed(2)} {unit}
          </text>
        </>
      )}
    </g>
  );
}
