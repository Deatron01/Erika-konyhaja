// src/components/Recipe/CategoryRail.jsx
// Vízszintesen görgethető kategória-sín: kerek, len-textúrás ikonok felirattal.
// `asLinks` módban (Kezdőlap) a receptek oldalra visz, egyébként szűrőként működik.
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES, SPECIAL_FILTERS } from '../../data/taxonomy';
import { CategoryIcon } from '../UI/Icons';

export const RAIL_ITEMS = [
  { id: 'all', label: 'Mind', icon: 'all' },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.short, icon: c.icon })),
  ...SPECIAL_FILTERS.map((f) => ({ id: f.id, label: f.label, icon: f.icon })),
  { id: 'kedvencek', label: 'Kedvenceim', icon: 'heart' },
];

const Chip = ({ item, active, count }) => (
  <span className="group/chip flex w-[84px] shrink-0 flex-col items-center gap-2.5 text-center">
    <span
      className={`linen relative grid h-[72px] w-[72px] place-items-center rounded-full transition-[transform,box-shadow] duration-500 ease-out group-hover/chip:-rotate-6 group-hover/chip:scale-[1.08] ${
        active ? 'text-paprika' : 'text-ink-soft'
      }`}
    >
      <CategoryIcon name={item.icon} size={28} strokeWidth={1.4} />
      {active && (
        <motion.span
          layoutId="rail-ring"
          className="absolute -inset-[5px] rounded-full border-[1.5px] border-paprika"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </span>
    <span className={`text-[0.8rem] font-bold leading-tight ${active ? 'text-ink' : 'text-ink-soft'}`}>
      {item.label}
      {typeof count === 'number' && <span className="ml-1 font-semibold text-ink-soft/60">{count}</span>}
    </span>
  </span>
);

const CategoryRail = ({ active = 'all', onSelect, counts = {}, asLinks = false, items = RAIL_ITEMS, className = '' }) => (
  <nav aria-label="Receptkategóriák" className={`-mx-[var(--gutter)] ${className}`}>
    <ul className="scroll-rail flex gap-2 overflow-x-auto px-[var(--gutter)] py-2 md:justify-center">
      {items.map((item) => (
        <li key={item.id}>
          {asLinks ? (
            <Link to={item.id === 'all' ? '/recipes' : `/recipes?kat=${item.id}`} className="block rounded-2xl p-1">
              <Chip item={item} />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => onSelect?.(item.id)}
              aria-pressed={active === item.id}
              className="block rounded-2xl p-1"
            >
              <Chip item={item} active={active === item.id} count={counts[item.id]} />
            </button>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export default CategoryRail;
