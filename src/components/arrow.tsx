import classes from './lug.module.css';

export default function Arrow({ x1, y1, x2, y2, label, labelAnchor, strokeWidth }: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  strokeWidth: number;
  labelAnchor?: 'start' | 'middle' | 'end';
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.hypot(dx, dy);
  const ux = dx / L;
  const uy = dy / L;
  const hx = x2 - ux * .2;
  const hy = y2 - uy * .2;

  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} />
      <polygon
        points={`
            ${x2},${y2} 
            ${x2 - ux * 0.2 - uy * 0.1},${y2 - uy * 0.2 + ux * 0.1} 
            ${x2 - ux * 0.2 + uy * 0.1},${y2 - uy * 0.2 - ux * 0.1}`} />
      <text
        x={(x1 + x2) / 2 + .4}
        y={(y1 + y2) / 2}
        textAnchor={labelAnchor ?? 'start'}
      >{label}
      </text>

    </g>
  );
}
