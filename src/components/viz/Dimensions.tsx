import react from "react";

export interface TransformProps {
  xTranslate?: number;
  yTranslate?: number;
}

export interface ArrowProps {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  markerStart?: string;
  markerEnd?: string;
  transformParams?: TransformProps;
}

export interface LabelProps {
  label: string;
  xText?: number;
  yText?: number;
  textAnchor?: "middle" | "start" | "end" | "inherit" | undefined;
  transformParams?: TransformProps;
}

export interface DimensionProps {
  arrowParams: ArrowProps;
  labelParams: LabelProps;
  transformParams?: TransformProps;
}

export function Transform(transformParams: TransformProps) {
  const xTranslate = transformParams.xTranslate || 0;
  const yTranslate = transformParams.yTranslate || 0;

  return "translate(" + xTranslate + ", " + yTranslate + ")";
}

export const Dimensions: React.FC<DimensionProps> = ({
  arrowParams,
  labelParams,
  transformParams,
}) => {
  const p = arrowParams;
  const label = labelParams;

  const transform = transformParams ? Transform(transformParams) : "";

  return (
    <>
      <g transform={transform}>
        <line
          x1={p.x1}
          y1={p.y1}
          x2={p.x2}
          y2={p.y2}
          stroke="black"
          markerStart="url(#arrow-start)"
          markerEnd="url(#arrow-end)"
        />
        <text x={label.xText} y={label.yText} textAnchor={label.textAnchor}>
          {label.label}
        </text>
      </g>
    </>
  );
};

export function HorizontalDimension() {}
