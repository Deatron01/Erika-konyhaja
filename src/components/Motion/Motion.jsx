// src/components/Motion/Motion.jsx
// Újrahasznosítható mozgás-építőkockák. Elv: lassú, puha, organikus – mint a kelő tészta.
// Semmi nem ismétlődik végtelenítve.
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

export const EASE_OUT = [0.22, 1, 0.36, 1];

/** Görgetésre előtűnő blokk. A rácsban az `index` alapján lépcsőzik (max. 6 elemig). */
export const Reveal = ({ as = 'div', children, index = 0, delay = 0, y = 24, className = '', once = true, ...rest }) => {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: delay + Math.min(index, 6) * 0.06 }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/** Címsor, amelynek sorai egy maszk mögül csúsznak fel. `lines` elemei lehetnek JSX-ek is. */
export const SplitHeadline = ({ as = 'h1', lines, className = '', delay = 0.15, inView = false }) => {
  const Tag = as;
  const animateProps = inView
    ? { whileInView: { y: 0 }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
    : { animate: { y: 0 } };
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            {...animateProps}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/** Kézzel írt megjegyzés (Caveat) egy magát berajzoló nyíllal. */
export const HandNote = ({ children, className = '', arrow = 'left-up', delay = 1.2 }) => {
  const paths = {
    'left-up': 'M70 34c-18 4-36-2-48-18M22 16l1 11M22 16l10 3',
    'left-down': 'M70 8c-20-2-38 6-50 22M20 30l11-1M20 30l1-11',
    right: 'M6 22c20 6 40 4 58-8M64 14l-10-1M64 14l-4 9',
  };
  return (
    <div className={`pointer-events-none flex items-center gap-1 text-ink-soft ${className}`}>
      {arrow !== 'right' && (
        <svg width="76" height="40" viewBox="0 0 76 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <motion.path d={paths[arrow]} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: EASE_OUT, delay }} />
        </svg>
      )}
      <motion.span
        className="font-hand text-[1.6rem] leading-none"
        initial={{ opacity: 0, rotate: -4, y: 6 }}
        animate={{ opacity: 1, rotate: -4, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: delay + 0.35 }}
      >
        {children}
      </motion.span>
      {arrow === 'right' && (
        <svg width="76" height="40" viewBox="0 0 76 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <motion.path d={paths.right} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: EASE_OUT, delay }} />
        </svg>
      )}
    </div>
  );
};

/** Mágneses elem – csak egérrel, csak a hero fő gombján használd. */
export const Magnetic = ({ children, strength = 0.25, className = '' }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * strength)));
    y.set(Math.max(-8, Math.min(8, (e.clientY - (r.top + r.height / 2)) * strength)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className={`inline-flex ${className}`}>
      {children}
    </motion.div>
  );
};

/** Gőz: 3 puha pára-csík, ami EGYSZER felszáll, amikor az elem képbe ér. */
export const Steam = ({ className = '' }) => (
  <div className={`pointer-events-none ${className}`} aria-hidden="true">
    <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" style={{ filter: 'blur(3px)' }}>
      {['M30 85c-10-14 10-22 0-36s8-24 2-40', 'M60 85c-10-16 12-24 0-40s10-22 2-40', 'M90 85c-10-14 10-22 0-36s8-24 2-40'].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          initial={{ opacity: 0, y: 20, pathLength: 0.2 }}
          whileInView={{ opacity: [0, 0.5, 0], y: -30, pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.6, ease: 'easeOut', delay: 0.3 + i * 0.25 }}
        />
      ))}
    </svg>
  </div>
);
