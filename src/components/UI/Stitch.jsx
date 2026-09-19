// src/components/UI/Stitch.jsx
// Beregi keresztszemes motívumok – egyszínű, vektoros "öltésekből" rajzolva.
// Minden 'x' a mintában egy keresztöltés.
import React from 'react';

const ROSETTE = [
  '......x......',
  '.....x.x.....',
  '....x.x.x....',
  '...x.x.x.x...',
  '..x.x...x.x..',
  '.x.x..x..x.x.',
  'x.x..xxx..x.x',
  '.x.x..x..x.x.',
  '..x.x...x.x..',
  '...x.x.x.x...',
  '....x.x.x....',
  '.....x.x.....',
  '......x......',
];

const MINI = ['..x..', '.x.x.', 'x.x.x', '.x.x.', '..x..'];

const toCells = (rows) =>
  rows.flatMap((row, y) => [...row].map((c, x) => (c === 'x' ? [x, y] : null)).filter(Boolean));

const Cross = ({ x, y, size, style, className }) => {
  const p = size * 0.18;
  const x0 = x * size + p;
  const y0 = y * size + p;
  const x1 = (x + 1) * size - p;
  const y1 = (y + 1) * size - p;
  return (
    <path d={`M${x0} ${y0}L${x1} ${y1}M${x1} ${y0}L${x0} ${y1}`} style={style} className={className} />
  );
};

/** Nagy háttérdísz – nagyon halványan használd (opacity 0.03–0.06). */
export const StitchRosette = ({ className = '', cell = 10, strokeWidth = 1.6 }) => {
  const cells = toCells(ROSETTE);
  const size = ROSETTE.length * cell;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
      {cells.map(([x, y]) => <Cross key={`${x}-${y}`} x={x} y={y} size={cell} />)}
    </svg>
  );
};

/** Szakaszelválasztó: öltéssor + középen kis rozetta. */
export const StitchDivider = ({ className = '', stitches = 7 }) => {
  const cell = 8;
  const miniCells = toCells(MINI);
  const row = Array.from({ length: stitches });
  return (
    <div className={`flex items-center justify-center gap-3 text-paprika ${className}`} aria-hidden="true">
      <svg width={stitches * cell * 1.6} height={cell} viewBox={`0 0 ${stitches * cell * 1.6} ${cell}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="opacity-60">
        {row.map((_, i) => <g key={i} transform={`translate(${i * cell * 1.6} 0)`}><Cross x={0} y={0} size={cell} /></g>)}
      </svg>
      <svg width={5 * cell} height={5 * cell} viewBox={`0 0 ${5 * cell} ${5 * cell}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        {miniCells.map(([x, y]) => <Cross key={`${x}-${y}`} x={x} y={y} size={cell} />)}
      </svg>
      <svg width={stitches * cell * 1.6} height={cell} viewBox={`0 0 ${stitches * cell * 1.6} ${cell}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="opacity-60">
        {row.map((_, i) => <g key={i} transform={`translate(${i * cell * 1.6} 0)`}><Cross x={0} y={0} size={cell} /></g>)}
      </svg>
    </div>
  );
};

/** Betöltés-jelző: a rozetta öltésenként "kivarródik". */
export const StitchLoader = ({ label = 'Betöltés…', className = '' }) => {
  const cells = toCells(ROSETTE);
  const cell = 10;
  const size = ROSETTE.length * cell;
  return (
    <div role="status" className={`flex flex-col items-center gap-4 text-paprika ${className}`}>
      <svg viewBox={`0 0 ${size} ${size}`} width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        {cells.map(([x, y], i) => (
          <Cross
            key={`${x}-${y}`}
            x={x}
            y={y}
            size={cell}
            className="stitch-in"
            style={{ animationDelay: `${i * 30}ms` }}
          />
        ))}
      </svg>
      <span className="text-step-n1 font-semibold text-ink-soft">{label}</span>
      <style>{`
        .stitch-in { opacity: 0; animation: stitch-in 2.4s var(--ease-out) infinite; }
        @keyframes stitch-in { 0% { opacity: 0 } 15%, 80% { opacity: 1 } 100% { opacity: 0 } }
      `}</style>
    </div>
  );
};
