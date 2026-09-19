// src/components/Layout/CommandSearch.jsx
// Parancspaletta-szerű keresés ("/" vagy ⌘K): címben ÉS hozzávalókban keres, ékezetfüggetlenül.
// Pl. "krumpli" → minden recept, amiben krumpli van.
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { RecipeContext } from '../../context/RecipeContext';
import { categoryById, formatTime, normalize } from '../../data/taxonomy';
import RecipePoster from '../Recipe/RecipePoster';
import { Search, ArrowRight } from '../UI/Icons';
import { markTransition } from '../../utils/transition';

const SUGGESTIONS = ['krumpli', 'túró', 'csirke', 'paprika', 'mák', 'tészta'];

const CommandSearch = ({ onClose }) => {
  const { recipes } = useContext(RecipeContext);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return recipes.slice(0, 6).map((r) => ({ recipe: r }));
    return recipes
      .map((r) => {
        if (normalize(r.title).includes(q)) return { recipe: r, score: 2 };
        const ing = r.ingredients.find((i) => normalize(i).includes(q));
        if (ing) return { recipe: r, score: 1, via: ing };
        if (normalize(r.shortDescription).includes(q)) return { recipe: r, score: 0 };
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [query, recipes]);

  useEffect(() => setCursor(0), [query]);

  const open = (recipe) => {
    onClose();
    markTransition('recipe');
    navigate(`/recipe/${recipe.id}`, { viewTransition: true });
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(results.length - 1, c + 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    }
    if (e.key === 'Enter' && results[cursor]) open(results[cursor].recipe);
  };

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${cursor}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[3px]" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Receptkereső"
        className="relative w-full max-w-xl overflow-hidden rounded-frame border border-line bg-surface shadow-nav"
        initial={{ y: -12, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search size={20} className="shrink-0 text-paprika" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Mit főznél? Pl. krumpli, túró, leves…"
            className="h-16 w-full bg-transparent text-step-0 text-ink placeholder:text-ink-soft/60 focus:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[cursor] ? `sr-${results[cursor].recipe.id}` : undefined}
          />
          <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 text-[0.7rem] font-semibold text-ink-soft sm:block">Esc</kbd>
        </div>

        {!query && (
          <div className="flex flex-wrap items-center gap-2 px-5 pt-4">
            <span className="text-step-n1 font-semibold text-ink-soft">Hozzávaló szerint:</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => setQuery(s)} className="rounded-full bg-linen px-3 py-1 text-[0.8rem] font-semibold text-ink-soft transition-colors hover:bg-dough hover:text-ink">
                {s}
              </button>
            ))}
          </div>
        )}

        <ul id="search-results" ref={listRef} role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-4 py-10 text-center text-ink-soft">
              Erre most nincs receptem: <strong className="text-ink">„{query}”</strong>
            </li>
          )}
          {results.map(({ recipe, via }, i) => (
            <li key={recipe.id} id={`sr-${recipe.id}`} role="option" aria-selected={i === cursor} data-index={i}>
              <button
                type="button"
                onMouseEnter={() => setCursor(i)}
                onClick={() => open(recipe)}
                className={`flex w-full items-center gap-4 rounded-2xl p-2.5 text-left transition-colors ${i === cursor ? 'bg-linen' : ''}`}
              >
                <RecipePoster recipe={recipe} compact className="h-14 w-12 shrink-0 rounded-xl" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-[1.1rem] text-ink">{recipe.title}</span>
                  <span className="block truncate text-step-n1 text-ink-soft">
                    {via ? <>…{via}</> : [categoryById(recipe.category)?.short, formatTime(recipe.timeMinutes)].filter(Boolean).join(' · ')}
                  </span>
                </span>
                <ArrowRight size={16} className={`shrink-0 text-paprika transition-opacity ${i === cursor ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default CommandSearch;
