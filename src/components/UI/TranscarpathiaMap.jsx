// src/components/UI/TranscarpathiaMap.jsx
// Kárpátalja térképe valódi földrajzi adatokból (OpenStreetMap: megyehatár, Tisza, települések),
// egyszerűsítve és vetítve egy 600×450-es vászonra. A kiemelt pont Sárosoroszi – Erika faluja.
// Adatok © OpenStreetMap közreműködők (ODbL).
import React from 'react';
import { motion } from 'motion/react';
import { EASE_OUT } from '../Motion/Motion';

const OUTLINE = 'M30.1 195.0 L24.0 256.6 L38.1 249.3 L50.9 254.5 L45.4 262.6 L51.4 270.9 L62.6 273.1 L61.5 282.6 L66.9 288.9 L67.3 298.5 L77.5 313.6 L81.0 308.5 L103.5 308.5 L110.0 321.8 L118.9 326.3 L116.8 331.2 L125.0 343.5 L123.2 356.1 L141.6 361.3 L155.3 351.9 L163.2 355.5 L163.5 351.2 L170.4 351.2 L170.9 356.4 L175.2 352.6 L177.9 365.1 L188.0 374.2 L184.4 388.0 L177.9 395.3 L191.1 407.4 L202.6 403.0 L196.5 389.7 L198.1 385.6 L217.3 395.2 L234.4 390.1 L238.5 380.2 L237.7 369.9 L241.7 366.1 L239.6 362.8 L251.4 351.8 L256.4 359.3 L273.8 358.5 L279.0 367.9 L275.7 372.0 L278.3 376.4 L289.3 379.5 L288.3 385.0 L316.9 400.8 L325.7 402.6 L332.0 384.7 L340.3 391.1 L356.3 391.4 L362.2 397.6 L381.2 392.6 L396.3 397.7 L406.5 415.0 L438.3 403.0 L458.3 413.2 L461.6 420.7 L479.9 419.9 L485.7 426.6 L508.8 416.9 L514.1 420.5 L533.5 402.0 L548.6 408.1 L559.3 406.0 L564.6 386.6 L576.0 376.2 L569.5 362.3 L548.5 340.8 L551.8 333.5 L550.0 329.5 L557.8 319.6 L544.4 310.5 L545.0 298.2 L529.2 280.7 L516.0 274.1 L514.4 264.2 L500.4 258.6 L500.8 264.4 L493.8 274.8 L476.6 269.8 L470.3 261.5 L468.9 246.3 L464.7 240.4 L467.7 230.8 L462.0 225.0 L466.1 216.3 L464.1 212.9 L444.2 223.9 L436.9 222.3 L429.0 238.3 L419.9 236.0 L416.2 230.0 L420.7 206.8 L405.4 206.1 L393.0 197.3 L389.1 188.8 L389.6 177.2 L370.6 177.7 L353.4 155.1 L328.0 145.6 L319.2 151.1 L302.5 146.2 L294.7 133.6 L286.7 139.4 L277.8 131.8 L273.8 136.6 L259.1 137.0 L251.6 118.1 L244.0 112.3 L243.7 106.2 L236.2 102.6 L214.3 113.5 L208.7 108.8 L207.6 98.7 L192.0 89.0 L187.1 79.3 L186.2 71.0 L196.3 66.6 L191.6 54.9 L180.3 55.8 L177.3 47.9 L162.1 38.7 L143.2 43.4 L121.9 24.0 L115.0 30.0 L113.2 54.4 L98.1 59.6 L86.4 80.3 L85.6 95.3 L77.2 101.9 L78.2 123.7 L68.8 135.1 L72.4 147.1 L67.5 162.7 L47.6 174.9Z';
const TISZA = 'M490.9 367.0 L474.4 381.5 L474.3 387.6 L482.3 397.1 L472.6 420.4 L467.3 421.6 L461.4 420.5 L458.4 413.3 L450.8 407.8 L443.7 409.1 L438.3 403.0 L425.4 404.6 L423.1 409.7 L410.6 410.9 L406.5 415.0 L396.4 397.8 L386.8 394.1 L362.2 397.6 L351.0 389.2 L334.4 388.5 L325.7 380.7 L314.4 378.6 L306.4 364.9 L300.8 363.8 L300.8 357.8 L291.2 346.7 L278.1 343.1 L275.9 335.9 L269.0 330.8 L259.3 334.1 L253.2 330.5 L237.7 337.5 L232.1 352.8 L214.4 363.2 L205.0 361.1 L203.6 364.5 L188.7 366.6 L184.6 357.9 L177.0 360.1 L175.1 352.6 L170.9 356.4 L171.0 351.4 L163.8 351.2 L164.1 355.2 L155.3 351.9 L142.1 361.2 L130.1 357.1 L126.5 361.7 L122.2 358.0 L120.8 362.5 L117.0 360.7 L119.6 364.7 L117.7 367.0 L107.1 371.8 L98.4 368.1 L96.2 372.8 L91.6 367.6 L83.3 369.2 L70.9 353.2 L67.1 353.4 L66.9 348.5 L62.0 344.0 L65.2 333.6 L52.6 326.3 L56.1 323.5 L52.7 319.3 L56.9 310.2 L52.1 308.9 L51.5 303.8 L43.6 304.2 L49.8 296.5 L45.3 288.5 L51.0 277.8 L46.0 273.8 L51.4 270.9';

const TOWNS = [
  { name: 'Ungvár', x: 59.2, y: 183.3, side: 'right' },
  { name: 'Munkács', x: 151.7, y: 243.8, side: 'right' },
  { name: 'Beregszász', x: 135.4, y: 323.3, side: 'left' },
  { name: 'Nagyszőlős', x: 222.3, y: 345.0, side: 'right' },
  { name: 'Huszt', x: 279.0, y: 332.9, side: 'top' },
  { name: 'Técső', x: 342.8, y: 388.2, side: 'right' },
  { name: 'Rahó', x: 482.3, y: 373.4, side: 'right' },
];
const HOME = { name: 'Sárosoroszi', x: 174.3, y: 337.4 };

// A Kárpátok vonulata az északkeleti részen
const PEAKS = [[300, 180], [340, 196], [385, 222], [428, 262], [470, 296], [515, 330]];
const NEIGHBOURS = [
  { name: 'Szlovákia', x: 8, y: 62 },
  { name: 'Lengyelország', x: 232, y: 52 },
  { name: 'Ukrajna', x: 470, y: 180 },
  { name: 'Magyarország', x: 24, y: 392 },
  { name: 'Románia', x: 318, y: 440 },
];

// Háttérszínű körvonal a feliratok mögött, hogy a határ- és folyóvonalak ne zavarják az olvasást
const HALO = { paintOrder: 'stroke', stroke: 'rgb(var(--bg))', strokeWidth: 4, strokeLinejoin: 'round' };

const draw = (delay = 0, duration = 2) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: '0px 0px -20% 0px' },
  transition: { pathLength: { duration, ease: EASE_OUT, delay }, opacity: { duration: 0.2, delay } },
});

const fadeIn = (delay) => ({
  initial: { opacity: 0, y: 6 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: EASE_OUT, delay },
});

const TranscarpathiaMap = () => (
  <svg viewBox="0 0 600 450" className="h-auto w-full" role="img" aria-label="Kárpátalja térképe: Ungvár, Munkács, Beregszász, Nagyszőlős, Huszt, Técső, Rahó és a Tisza. Kiemelve Sárosoroszi, Beregszász mellett.">
    {/* Szomszédos országok – halvány kézírással */}
    {NEIGHBOURS.map((n, i) => (
      <motion.text key={n.name} x={n.x} y={n.y} fontSize="17" className="fill-ink-soft/50 font-hand" {...fadeIn(2 + i * 0.08)}>
        {n.name}
      </motion.text>
    ))}

    {/* Megyehatár */}
    <motion.path d={OUTLINE} className="fill-paprika/[0.04] stroke-ink" strokeWidth="1.5" strokeLinejoin="round" {...draw(0, 2.6)} />

    {/* Kárpátok */}
    {PEAKS.map(([x, y], i) => (
      <motion.path key={i} d={`M${x - 13} ${y + 9}L${x} ${y - 8}L${x + 13} ${y + 9}`} fill="none" className="stroke-ink-soft/70" strokeWidth="1.3" strokeLinejoin="round" {...draw(1 + i * 0.1, 0.6)} />
    ))}
    <motion.text x="330" y="252" fontSize="20" className="fill-ink-soft font-hand" style={HALO} {...fadeIn(1.8)}>
      Kárpátok
    </motion.text>

    {/* Tisza */}
    <motion.path d={TISZA} fill="none" className="stroke-dill" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...draw(0.8, 2.4)} />
    <motion.text x="438" y="444" fontSize="20" className="fill-dill font-hand" style={HALO} {...fadeIn(2.4)}>
      Tisza
    </motion.text>

    {/* Városok */}
    {TOWNS.map((t, i) => (
      <motion.g key={t.name} {...fadeIn(1.4 + i * 0.12)}>
        <circle cx={t.x} cy={t.y} r="3.2" className="fill-ink" />
        <text
          x={t.side === 'left' ? t.x - 8 : t.side === 'top' ? t.x : t.x + 8}
          y={t.side === 'top' ? t.y - 9 : t.y + 4}
          textAnchor={t.side === 'left' ? 'end' : t.side === 'top' ? 'middle' : 'start'}
          style={HALO}
          fontSize="12.5"
          fontWeight="600"
          className="fill-ink-soft"
        >
          {t.name}
        </text>
      </motion.g>
    ))}

    {/* Sárosoroszi – otthon */}
    <motion.g {...fadeIn(2.4)}>
      <motion.circle
        cx={HOME.x}
        cy={HOME.y}
        r="7"
        className="fill-none stroke-paprika"
        strokeWidth="1.5"
        initial={{ scale: 1, opacity: 0.8 }}
        whileInView={{ scale: 3, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeOut', delay: 2.8, repeat: 2 }}
        style={{ transformOrigin: `${HOME.x}px ${HOME.y}px` }}
      />
      <circle cx={HOME.x} cy={HOME.y} r="11" className="fill-paprika/15" />
      <circle cx={HOME.x} cy={HOME.y} r="5" className="fill-paprika" />
      <path d={`M${HOME.x + 6} ${HOME.y - 7} Q ${HOME.x + 26} ${HOME.y - 40} ${HOME.x + 52} ${HOME.y - 52}`} fill="none" className="stroke-paprika" strokeWidth="1.3" strokeLinecap="round" />
      <text x={HOME.x + 56} y={HOME.y - 64} fontSize="15" fontWeight="800" className="fill-paprika" style={HALO}>
        {HOME.name}
      </text>
      <text x={HOME.x + 56} y={HOME.y - 44} fontSize="19" className="fill-paprika font-hand" style={HALO}>
        innen jövök
      </text>
    </motion.g>
  </svg>
);

export default TranscarpathiaMap;
