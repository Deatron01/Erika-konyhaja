// src/components/Recipe/FavoriteButton.jsx
// Kedvencekhez adás – kattintásra 6 apró paprika-részecske "pattan ki" a szívből.
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RecipeContext } from '../../context/RecipeContext';
import { Heart } from '../UI/Icons';

const PARTICLES = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
  return { x: Math.cos(angle) * 22, y: Math.sin(angle) * 22 };
});

const FavoriteButton = ({ recipeId, className = '', variant = 'glass' }) => {
  const { isFavorite, toggleFavorite } = useContext(RecipeContext);
  const active = isFavorite(recipeId);
  const [burst, setBurst] = useState(0);

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!active) setBurst((b) => b + 1);
    toggleFavorite(recipeId);
  };

  const skin =
    variant === 'glass'
      ? 'bg-cream/90 backdrop-blur-sm shadow-card'
      : 'border border-line bg-surface hover:border-ink/30';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? 'Eltávolítás a kedvencek közül' : 'Mentés a kedvencek közé'}
      className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors ${skin} ${active ? 'text-paprika' : 'text-ink-soft hover:text-paprika'} ${className}`}
    >
      <motion.span key={active ? 'on' : 'off'} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
        <Heart filled={active} size={18} strokeWidth={1.8} />
      </motion.span>
      <AnimatePresence>
        {burst > 0 &&
          PARTICLES.map((p, i) => (
            <motion.span
              key={`${burst}-${i}`}
              className="pointer-events-none absolute left-[calc(50%-3px)] top-[calc(50%-3px)] h-1.5 w-1.5 rounded-full bg-paprika"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
      </AnimatePresence>
    </button>
  );
};

export default FavoriteButton;
