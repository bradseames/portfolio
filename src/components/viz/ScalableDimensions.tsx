type Orientation = "horizontal" | "vertical";
type Unit = "m" | "in" | "mm";
type Position = "start" | "middle" | "end";
const METERS_PER_INCH = 0.0254;
const METERS_PER_MM = 0.001;

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
  leadL?: number;
  strokeW?: number;
  fontSize?: number;
  conversionFactor?: number;
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
  leadL = arrowSizePx,
  strokeW = 1,
  fontSize = 12,
  conversionFactor = 1,
}: ScalableDimensionProps) {
  let lengthInUnit: number;

  switch (unit) {
    case "in":
      lengthInUnit = lengthInMeters / METERS_PER_INCH;
      break;
    case "mm":
      lengthInUnit = lengthInMeters / METERS_PER_MM;
      break;
    case "m":
    default:
      lengthInUnit = lengthInMeters;
      break;
  }
  const lengthPx = lengthInMeters * scalePxPerMeter * conversionFactor;

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
            {lengthInUnit.toFixed(2)} {unit}
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
            {lengthInUnit.toFixed(2)} {unit}
          </text>
        </>
      )}
    </g>
  );
}


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
//
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
