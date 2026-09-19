// src/components/Recipe/IngredientList.jsx
// Hozzávaló-lista pipálással (kézzel rajzolt áthúzás) és adag-számlálóval.
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { scaleIngredient } from '../../data/taxonomy';
import { Check, Minus, Plus } from '../UI/Icons';

/** Adag-számláló: a szám "kilométeróra" módjára gördül. */
export const ServingsStepper = ({ value, onChange, min = 1, max = 30 }) => {
  const dir = React.useRef(1);
  const set = (next) => {
    dir.current = next > value ? 1 : -1;
    onChange(Math.min(max, Math.max(min, next)));
  };
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1" role="group" aria-label="Adagok száma">
      <button type="button" onClick={() => set(value - 1)} disabled={value <= min} className="grid h-8 w-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-linen hover:text-ink disabled:opacity-30" aria-label="Kevesebb adag">
        <Minus size={16} />
      </button>
      <span className="relative flex h-8 min-w-[5.5rem] items-center justify-center overflow-hidden text-sm font-bold tabular-nums" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout" custom={dir.current}>
          <motion.span
            key={value}
            custom={dir.current}
            variants={{
              enter: (d) => ({ y: d > 0 ? 18 : -18, opacity: 0 }),
              center: { y: 0, opacity: 1 },
              exit: (d) => ({ y: d > 0 ? -18 : 18, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {value}
          </motion.span>
        </AnimatePresence>
        <span className="ml-1">adag</span>
      </span>
      <button type="button" onClick={() => set(value + 1)} disabled={value >= max} className="grid h-8 w-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-linen hover:text-ink disabled:opacity-30" aria-label="Több adag">
        <Plus size={16} />
      </button>
    </div>
  );
};

/** Kicsit hullámos, kézzel húzott vonal – áthúzza a kipipált hozzávalót. */
const Strike = ({ show }) => (
  <svg className="pointer-events-none absolute left-0 top-1/2 h-3 w-full -translate-y-1/2 overflow-visible text-paprika/70" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
    <motion.path
      d="M1 6 C 15 3, 25 8, 40 5 S 70 3, 85 6 S 97 5, 99 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      initial={false}
      animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    />
  </svg>
);

const IngredientList = ({ ingredients, factor = 1, checked, onToggle, large = false }) => (
  <ul className="divide-y divide-line/70">
    {ingredients.filter(Boolean).map((ing, idx) => {
      const done = checked.has(idx);
      return (
        <li key={idx}>
          <label className={`group flex cursor-pointer items-start gap-3.5 ${large ? 'py-4' : 'py-3'}`}>
            <input type="checkbox" className="peer sr-only" checked={done} onChange={() => onToggle(idx)} />
            <span
              className={`mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-md border-[1.5px] transition-colors duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-paprika peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-cream ${
                done ? 'border-paprika bg-paprika text-on-paprika' : 'border-line bg-surface group-hover:border-ink-soft/60'
              }`}
            >
              {done && <Check size={13} strokeWidth={2.4} />}
            </span>
            <span className={`relative transition-opacity duration-300 ${large ? 'text-step-1' : ''} ${done ? 'opacity-50' : 'text-ink'}`}>
              {scaleIngredient(ing, factor)}
              <Strike show={done} />
            </span>
          </label>
        </li>
      );
    })}
  </ul>
);

export default IngredientList;
