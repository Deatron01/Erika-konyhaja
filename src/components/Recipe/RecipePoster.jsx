// src/components/Recipe/RecipePoster.jsx
// Recept borítókép. Ha nincs (vagy nem tölt be) kép, egy megtervezett, textúrás borítót mutat,
// így az admin felületen fotó nélkül feltöltött receptek is szépen jelennek meg.
import React, { useState } from 'react';
import { posterSrc, categoryById } from '../../data/taxonomy';
import { CategoryIcon } from '../UI/Icons';
import { StitchRosette } from '../UI/Stitch';

const TONES = {
  levesek: 'from-dough/70 to-linen',
  foetelek: 'from-paprika/20 to-linen',
  tesztak: 'from-crust/25 to-linen',
  sutemenyek: 'from-dough to-cream',
  falatkak: 'from-dill/20 to-linen',
};

export const PosterFallback = ({ recipe, compact = false }) => {
  const cat = categoryById(recipe?.category);
  return (
    <div className={`absolute inset-0 flex flex-col justify-between overflow-hidden bg-gradient-to-br p-5 ${TONES[recipe?.category] || 'from-dough/60 to-linen'}`}>
      <StitchRosette className="absolute -right-10 -top-10 w-48 text-paprika opacity-[.12]" />
      <CategoryIcon name={cat?.icon || 'plate'} size={compact ? 28 : 40} strokeWidth={1.2} className="relative text-ink-soft/70" />
      {!compact && (
        <p className="relative font-display text-step-2 italic leading-[1.05] text-ink/80 [font-variation-settings:'SOFT'_100,'WONK'_1]">
          {recipe?.title}
        </p>
      )}
    </div>
  );
};

const RecipePoster = ({ recipe, className = '', imgClassName = '', priority = false, style, compact = false, alt }) => {
  const src = posterSrc(recipe);
  const [state, setState] = useState({ src, failed: !src, loaded: false });
  // Másik receptre váltva alaphelyzetbe állunk
  if (state.src !== src) setState({ src, failed: !src, loaded: false });
  const { failed, loaded } = state;
  const setFailed = () => setState((s) => ({ ...s, failed: true }));
  const setLoaded = () => setState((s) => ({ ...s, loaded: true }));

  return (
    <div className={`relative overflow-hidden bg-linen ${className}`} style={style}>
      {failed ? (
        <PosterFallback recipe={recipe} compact={compact} />
      ) : (
        <img
          src={src}
          alt={alt ?? recipe?.title ?? ''}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={priority ? 'high' : undefined}
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </div>
  );
};

export default RecipePoster;
