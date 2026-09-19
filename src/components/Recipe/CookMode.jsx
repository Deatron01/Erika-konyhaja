// src/components/Recipe/CookMode.jsx
// Főzés mód: teljes képernyős, nagy betűs nézet. A Screen Wake Lock API-val
// a telefon kijelzője nem alszik el főzés közben (ahol a böngésző támogatja).
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import IngredientList from './IngredientList';
import VideoFacade from './VideoFacade';
import { Close, Pan } from '../UI/Icons';
import { hasSteps } from '../../data/taxonomy';

const useWakeLock = () => {
  const [active, setActive] = useState(false);
  const lock = useRef(null);

  useEffect(() => {
    if (!('wakeLock' in navigator)) return undefined;
    let cancelled = false;

    const request = async () => {
      try {
        lock.current = await navigator.wakeLock.request('screen');
        if (cancelled) return lock.current.release();
        setActive(true);
        lock.current.addEventListener('release', () => setActive(false));
      } catch {
        setActive(false);
      }
    };
    // A zár elengedődik, ha a lap háttérbe kerül – visszatéréskor újrakérjük
    const onVisible = () => document.visibilityState === 'visible' && request();

    request();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
      lock.current?.release().catch(() => {});
    };
  }, []);

  return active;
};

const CookMode = ({ recipe, factor, checked, onToggle, onClose }) => {
  const awake = useWakeLock();
  const steps = hasSteps(recipe) ? recipe.steps.filter((s) => s && s.trim()) : [];
  const [tab, setTab] = useState('ingredients');
  const closeRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const tabs = [
    { id: 'ingredients', label: 'Hozzávalók' },
    ...(steps.length ? [{ id: 'steps', label: 'Lépések' }] : []),
    ...(recipe.tikTokId ? [{ id: 'video', label: 'Videó' }] : []),
  ];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Főzés mód: ${recipe.title}`}
      className="fixed inset-0 z-[90] flex flex-col bg-cream"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="container-site flex items-center justify-between gap-4 border-b border-line py-4">
        <div className="min-w-0">
          <p className="eyebrow flex items-center gap-2"><Pan size={15} /> Főzés mód</p>
          <h2 className="mt-1 truncate font-display text-step-2 text-ink">{recipe.title}</h2>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink hover:border-ink/30" aria-label="Főzés mód bezárása">
          <Close size={20} />
        </button>
      </header>

      <div className="container-site flex items-center justify-between gap-3 py-3">
        <div className="inline-flex rounded-full bg-linen p-1" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${tab === t.id ? 'text-ink' : 'text-ink-soft'}`}
            >
              {tab === t.id && <motion.span layoutId="cook-tab" className="absolute inset-0 rounded-full bg-surface shadow-card" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
        <span className={`hidden text-step-n1 font-semibold sm:inline ${awake ? 'text-dill' : 'text-ink-soft/70'}`}>
          {awake ? '● A kijelző ébren marad' : 'A kijelző ébren tartása nem támogatott'}
        </span>
      </div>

      <div className="container-site flex-1 overflow-y-auto pb-16">
        {tab === 'ingredients' && (
          <div className="mx-auto max-w-2xl">
            <IngredientList ingredients={recipe.ingredients} factor={factor} checked={checked} onToggle={onToggle} large />
          </div>
        )}
        {tab === 'steps' && (
          <ol className="mx-auto max-w-2xl space-y-8 pt-4">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-5">
                <span className="font-display text-step-4 italic leading-none text-paprika">{i + 1}</span>
                <p className="pt-2 text-step-1 leading-relaxed text-ink">{s}</p>
              </li>
            ))}
          </ol>
        )}
        {tab === 'video' && (
          <div className="mx-auto max-w-[340px] pt-2">
            <VideoFacade recipe={recipe} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CookMode;
