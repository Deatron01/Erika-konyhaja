// src/components/Recipe/RecipeCard.jsx
// Szerkesztőségi (magazin) kártya: nincs doboz – a kép és a szöveg közvetlenül a krém háttéren ül.
// A TikTok videó csak a recept oldalon töltődik be; itt borítókép + videó-jelvény látszik.
import React from 'react';
import { Link, useViewTransitionState } from 'react-router-dom';
import RecipePoster from './RecipePoster';
import FavoriteButton from './FavoriteButton';
import { Clock, DifficultyDots, Play, ArrowRight } from '../UI/Icons';
import { Steam } from '../Motion/Motion';
import { DIFFICULTY, formatTime, categoryById } from '../../data/taxonomy';
import { markTransition } from '../../utils/transition';

const Meta = ({ recipe, light = false }) => (
  <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-step-n1 font-semibold ${light ? 'text-white/85' : 'text-ink-soft'}`}>
    {recipe.timeMinutes && (
      <span className="inline-flex items-center gap-1.5">
        <Clock size={15} /> {formatTime(recipe.timeMinutes)}
      </span>
    )}
    <span className="inline-flex items-center gap-1.5">
      <DifficultyDots level={recipe.difficulty} /> {DIFFICULTY[recipe.difficulty]}
    </span>
  </div>
);

const RecipeCard = ({ recipe, featured = false, featuredLabel = 'A nap receptje', priority = false }) => {
  const to = `/recipe/${recipe.id}`;
  // Csak az éppen átmenetben lévő kártya kapja meg a közös nevet (egyedinek kell lennie az oldalon)
  const isTransitioning = useViewTransitionState(to);
  const mediaStyle = isTransitioning ? { viewTransitionName: 'recipe-media' } : undefined;
  const category = categoryById(recipe.category);

  const linkProps = {
    to,
    viewTransition: true,
    onClick: () => markTransition('recipe'),
  };

  if (featured) {
    return (
      <article className="recipe-card group relative h-full">
        <Link {...linkProps} className="block h-full focus:outline-none">
          <div className="card-media relative h-full min-h-[420px] overflow-hidden rounded-card" style={mediaStyle}>
            <RecipePoster recipe={recipe} priority={priority} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a120c]/85 via-[#1a120c]/25 to-transparent" />
            <Steam className="absolute left-1/2 top-[18%] -translate-x-1/2 text-white" />

            <div className="absolute left-5 top-5 flex gap-2">
              <span className="tag tag-paprika">★ {featuredLabel}</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 md:p-8">
              <Meta recipe={recipe} light />
              <h3 className="font-display text-step-3 leading-[1] text-white">
                <span className="link-draw">{recipe.title}</span>
              </h3>
              <p className="max-w-md text-[0.95rem] leading-relaxed text-white/80 line-clamp-2">{recipe.shortDescription}</p>
              <span className="inline-flex items-center gap-2 pt-1 text-sm font-bold text-white">
                Megnézem a receptet <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
        <FavoriteButton recipeId={recipe.id} className="absolute right-4 top-4" />
      </article>
    );
  }

  return (
    <article className="recipe-card group relative flex h-full flex-col">
      <Link {...linkProps} className="flex h-full flex-col focus:outline-none">
        <div className="card-media relative aspect-[4/5] overflow-hidden rounded-card" style={mediaStyle}>
          <RecipePoster recipe={recipe} priority={priority} className="absolute inset-0" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {recipe.region === 'karpataljai' && <span className="tag tag-glass">✕ Kárpátaljai</span>}
          </div>
          {recipe.tikTokId && (
            <span className="play-badge absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-2.5 py-1.5 text-[0.7rem] font-bold text-ink backdrop-blur-sm">
              <Play size={11} /> Videó
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 pt-4">
          <div className="flex items-center justify-between gap-3">
            <Meta recipe={recipe} />
            {category && <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-soft/70">{category.short}</span>}
          </div>
          <h3 className="font-display text-step-1 leading-tight text-ink">
            <span className="link-draw">{recipe.title}</span>
          </h3>
          <p className="line-clamp-1 text-[0.92rem] text-ink-soft">{recipe.shortDescription}</p>
          <span className="card-cta mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-bold text-paprika">
            Megnézem <ArrowRight size={15} />
          </span>
        </div>
      </Link>
      <FavoriteButton recipeId={recipe.id} className="absolute right-3 top-3" />
    </article>
  );
};

export default RecipeCard;
