// src/pages/RecipeDetail.jsx
import React, { useContext, useMemo, useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { RecipeContext } from '../context/RecipeContext';
import VideoFacade from '../components/Recipe/VideoFacade';
import IngredientList, { ServingsStepper } from '../components/Recipe/IngredientList';
import CookMode from '../components/Recipe/CookMode';
import FavoriteButton from '../components/Recipe/FavoriteButton';
import RecipeCard from '../components/Recipe/RecipeCard';
import { Reveal, SplitHeadline } from '../components/Motion/Motion';
import { StitchDivider, StitchRosette } from '../components/UI/Stitch';
import { ArrowLeft, Clock, Users, DifficultyDots, Pan, Play } from '../components/UI/Icons';
import { categoryById, DIFFICULTY, REGIONS, formatTime, hasSteps } from '../data/taxonomy';

const Pill = ({ icon, children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[0.85rem] font-semibold text-ink-soft">
    {icon}
    {children}
  </span>
);

const RecipeView = ({ recipe, isDaily }) => {
  const { recipes } = useContext(RecipeContext);
  const [servings, setServings] = useState(recipe.servings || 4);
  const [checked, setChecked] = useState(() => new Set());
  const [cooking, setCooking] = useState(false);

  const factor = servings / (recipe.servings || 4);
  const category = categoryById(recipe.category);
  const steps = hasSteps(recipe) ? recipe.steps.filter((s) => s && s.trim()) : [];
  const ingredientCount = recipe.ingredients.filter(Boolean).length;

  const toggle = useCallback((idx) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }, []);
  const closeCooking = useCallback(() => setCooking(false), []);

  const related = useMemo(() => {
    const same = recipes.filter((r) => r.id !== recipe.id && r.category === recipe.category);
    const others = recipes.filter((r) => r.id !== recipe.id && r.category !== recipe.category);
    return [...same, ...others].slice(0, 4);
  }, [recipes, recipe]);

  // A mobil alsó sáv eltűnik az oldal alján, hogy ne takarja a láblécet
  const endRef = useRef(null);
  const atEnd = useInView(endRef);

  const scrollToVideo = () => document.getElementById('recipe-video')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <article className="pb-[var(--section)]">
      <div className="container-site pt-28 md:pt-32">
        {isDaily ? (
          <p className="mb-8"><span className="tag tag-paprika">★ A nap receptje</span></p>
        ) : (
          <Link to="/recipes" className="group mb-8 inline-flex items-center gap-2 text-step-n1 font-bold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-paprika">
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" /> Vissza a receptekhez
          </Link>
        )}

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Videó – asztali nézetben ragadós */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div id="recipe-video" className="relative mx-auto max-w-[360px]">
                <VideoFacade recipe={recipe} priority posterStyle={{ viewTransitionName: 'recipe-media' }} />
                <FavoriteButton recipeId={recipe.id} className="absolute right-4 top-4 z-20" />
              </div>
              <div className="mx-auto mt-5 hidden max-w-[360px] lg:block">
                <button type="button" onClick={() => setCooking(true)} className="btn btn-ghost w-full">
                  <Pan size={18} className="text-paprika" /> Főzés mód indítása
                </button>
                <p className="mt-2 text-center text-[0.78rem] text-ink-soft/80">Nagy betűk, és a kijelző nem alszik el.</p>
              </div>
            </div>
          </aside>

          {/* Tartalom */}
          <div className="lg:col-span-7">
            <Reveal as="p" className="eyebrow">
              {[category?.label, REGIONS[recipe.region]].filter(Boolean).join(' · ')}
            </Reveal>
            <SplitHeadline as="h1" className="mt-5 font-display text-step-4 leading-[1] text-ink" lines={[recipe.title]} delay={0.1} />
            <Reveal as="p" delay={0.25} className="mt-6 max-w-xl text-step-1 leading-relaxed text-ink-soft">
              {recipe.shortDescription}
            </Reveal>

            <Reveal delay={0.35} className="mt-8 flex flex-wrap gap-2">
              {recipe.timeMinutes && <Pill icon={<Clock size={16} />}>{formatTime(recipe.timeMinutes)}</Pill>}
              <Pill icon={<DifficultyDots level={recipe.difficulty} />}>{DIFFICULTY[recipe.difficulty]}</Pill>
              <Pill icon={<Users size={16} />}>{recipe.servings} adag</Pill>
              {recipe.tags.map((t) => (
                <span key={t} className="tag self-center">{t}</span>
              ))}
            </Reveal>

            <StitchDivider className="my-12 justify-start" stitches={5} />

            {/* Hozzávalók */}
            <section id="hozzavalok" className="scroll-mt-28">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-step-2 text-ink">Hozzávalók</h2>
                  <p className="mt-1 text-step-n1 font-semibold text-ink-soft">
                    {checked.size > 0 ? `${checked.size} / ${ingredientCount} előkészítve` : 'Pipáld ki, ami már megvan'}
                  </p>
                </div>
                <ServingsStepper value={servings} onChange={setServings} />
              </div>
              {factor !== 1 && (
                <p className="mb-2 rounded-xl bg-dough/50 px-3 py-2 text-step-n1 text-ink">
                  A mennyiségeket {servings} adagra számoltam át – a fűszereket kóstold!
                </p>
              )}
              <IngredientList ingredients={recipe.ingredients} factor={factor} checked={checked} onToggle={toggle} />
            </section>

            {/* Elkészítés */}
            <section id="elkeszites" className="mt-16 scroll-mt-28">
              <h2 className="mb-8 font-display text-step-2 text-ink">Elkészítés</h2>
              {steps.length > 0 ? (
                <ol className="space-y-10">
                  {steps.map((s, i) => (
                    <Reveal as="li" key={i} index={i} className="grid grid-cols-[3.5rem_1fr] gap-4">
                      <span className="font-display text-step-3 italic leading-none text-paprika [font-variation-settings:'SOFT'_100,'WONK'_1]">{i + 1}</span>
                      <p className="pt-1 text-step-0 leading-relaxed text-ink">{s}</p>
                    </Reveal>
                  ))}
                </ol>
              ) : (
                <div className="linen relative overflow-hidden rounded-card p-8">
                  <StitchRosette className="absolute -right-8 -top-8 w-32 text-paprika opacity-10" />
                  <p className="font-hand text-[1.7rem] leading-none text-paprika">Nézd meg, hogyan csinálom!</p>
                  <p className="mt-3 max-w-md text-ink-soft">
                    Ennél a receptnél minden lépést a videóban mutatok meg – úgy könnyebb, mintha csak mellettem állnál a konyhában.
                  </p>
                  <button type="button" onClick={scrollToVideo} className="btn btn-primary mt-6">
                    <Play size={14} /> Ugrás a videóhoz
                  </button>
                </div>
              )}
            </section>

            {/* Erika tippje */}
            {recipe.tip && (
              <Reveal className="relative mt-12 rotate-[-0.6deg] rounded-card bg-dough/60 p-7">
                <p className="font-hand text-[1.8rem] leading-none text-paprika">Erika tippje</p>
                <p className="mt-3 text-ink">{recipe.tip}</p>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      {/* Kapcsolódó receptek */}
      {related.length > 0 && (
        <section className="container-site mt-[var(--section)]">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Még valami finom</p>
              <h2 className="mt-3 font-display text-step-3 text-ink">
                Ezeket is <span className="accent-word">szeretni</span> fogod
              </h2>
            </div>
          </div>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <Reveal key={r.id} index={i}>
                <RecipeCard recipe={r} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div ref={endRef} aria-hidden="true" />

      {/* Mobil: lebegő alsó sáv */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
        animate={{ y: atEnd ? '130%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-md items-center gap-1 rounded-full border border-line bg-cream/90 p-1.5 shadow-nav backdrop-blur-md">
          <a href="#hozzavalok" className="flex-1 rounded-full py-2.5 text-center text-[0.85rem] font-bold text-ink-soft hover:bg-linen hover:text-ink">Hozzávalók</a>
          <a href="#elkeszites" className="flex-1 rounded-full py-2.5 text-center text-[0.85rem] font-bold text-ink-soft hover:bg-linen hover:text-ink">Elkészítés</a>
          <button type="button" onClick={() => setCooking(true)} className="btn btn-primary btn-sm">
            <Pan size={16} /> Főzés
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {cooking && <CookMode recipe={recipe} factor={factor} checked={checked} onToggle={toggle} onClose={closeCooking} />}
      </AnimatePresence>
    </article>
  );
};

// A `customRecipe` a Napi recept oldalról jön; egyébként az URL-ből keressük ki a receptet.
const RecipeDetail = ({ customRecipe }) => {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);
  const recipe = customRecipe || recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="container-site flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <StitchRosette className="w-20 text-paprika opacity-60" />
        <h1 className="mt-6 font-display text-step-3 text-ink">Hoppá, ez a recept nem található</h1>
        <p className="mt-3 text-ink-soft">Lehet, hogy átneveztem vagy elkerült a konyhából.</p>
        <Link to="/recipes" className="btn btn-primary mt-8">Vissza a receptekhez</Link>
      </div>
    );
  }

  // Új receptre lépve minden (pipák, adagok) alaphelyzetbe áll
  return <RecipeView key={recipe.id} recipe={recipe} isDaily={Boolean(customRecipe)} />;
};

export default RecipeDetail;
