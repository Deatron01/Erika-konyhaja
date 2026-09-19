// src/pages/Recipes.jsx
// Receptek: kategória-sín + ragadós szűrősáv + bento rács.
// A szűrők az URL-ben élnek (?kat=levesek&q=krumpli), így megoszthatók és a Vissza gomb is működik.
import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/Recipe/RecipeCard';
import CategoryRail, { RAIL_ITEMS } from '../components/Recipe/CategoryRail';
import { Reveal, SplitHeadline } from '../components/Motion/Motion';
import { StitchRosette } from '../components/UI/Stitch';
import { Search, Close, Clock } from '../components/UI/Icons';
import { CATEGORIES, SPECIAL_FILTERS, matchesQuery } from '../data/taxonomy';

const SORTS = {
  uj: { label: 'Legújabb', fn: null },
  gyors: { label: 'Leggyorsabb', fn: (a, b) => (a.timeMinutes || 999) - (b.timeMinutes || 999) },
  abc: { label: 'ABC szerint', fn: (a, b) => a.title.localeCompare(b.title, 'hu') },
};

const Toggle = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[0.85rem] font-bold transition-colors ${
      active ? 'border-paprika bg-paprika text-on-paprika' : 'border-line bg-surface text-ink-soft hover:border-ink/30 hover:text-ink'
    }`}
  >
    {children}
  </button>
);

const Recipes = () => {
  const { recipes, favorites, dailyRecipe } = useContext(RecipeContext);
  const [params, setParams] = useSearchParams();

  const cat = params.get('kat') || 'all';
  const query = params.get('q') || '';
  const quick = params.get('gyors') === '1';
  const easy = params.get('konnyu') === '1';
  const sort = SORTS[params.get('rend')] ? params.get('rend') : 'uj';

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const matchCat = (r, id) => {
    if (id === 'all') return true;
    if (id === 'kedvencek') return favorites.includes(r.id);
    const special = SPECIAL_FILTERS.find((f) => f.id === id);
    return special ? special.match(r) : r.category === id;
  };

  const counts = useMemo(
    () => Object.fromEntries(RAIL_ITEMS.map((item) => [item.id, recipes.filter((r) => matchCat(r, item.id)).length])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recipes, favorites]
  );

  const filtered = useMemo(() => {
    const list = recipes.filter(
      (r) =>
        matchCat(r, cat) &&
        matchesQuery(r, query) &&
        (!quick || (r.timeMinutes && r.timeMinutes <= 30)) &&
        (!easy || r.difficulty === 1)
    );
    return SORTS[sort].fn ? [...list].sort(SORTS[sort].fn) : list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes, favorites, cat, query, quick, easy, sort]);

  const pristine = cat === 'all' && !query && !quick && !easy && sort === 'uj';
  const featured = pristine ? dailyRecipe || filtered[0] : null;
  const gridItems = featured ? filtered.filter((r) => r.id !== featured.id) : filtered;

  const activeLabel =
    cat === 'all'
      ? 'Összes recept'
      : CATEGORIES.find((c) => c.id === cat)?.label || RAIL_ITEMS.find((i) => i.id === cat)?.label || 'Receptek';

  return (
    <div className="pb-[var(--section)]">
      {/* Fejléc */}
      <header className="relative overflow-hidden pb-10 pt-32 md:pt-40">
        <StitchRosette className="pointer-events-none absolute -left-24 top-16 w-[420px] max-w-none text-paprika opacity-[.04]" />
        <div className="container-site text-center">
          <Reveal as="p" className="eyebrow">Receptek</Reveal>
          <SplitHeadline
            as="h1"
            className="mx-auto mt-5 max-w-3xl font-display text-step-4 leading-[1] text-ink"
            lines={[<>Minden, ami <span className="accent-word">otthon</span></>, 'készül.']}
          />
          <Reveal as="p" delay={0.3} className="mx-auto mt-6 max-w-xl text-step-1 text-ink-soft">
            A TikTokon látott összes finomság egy helyen – kategóriák, hozzávalók és főzési idő szerint.
          </Reveal>
        </div>
      </header>

      {/* Kategória-sín */}
      <div className="container-site">
        <Reveal delay={0.35}>
          <CategoryRail active={cat} onSelect={(id) => update({ kat: id === 'all' ? null : id })} counts={counts} />
        </Reveal>
      </div>

      {/* Ragadós szűrősáv */}
      <div className="sticky top-[5.5rem] z-30 mt-8">
        <div className="container-site">
          <div className="flex flex-col gap-3 rounded-[28px] border border-line bg-cream/90 p-2 shadow-card backdrop-blur-md md:flex-row md:items-center">
            <label className="relative flex flex-1 items-center">
              <span className="sr-only">Keresés</span>
              <Search size={18} className="pointer-events-none absolute left-4 text-paprika" />
              <input
                type="search"
                value={query}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Keresés név vagy hozzávaló alapján…"
                className="h-11 w-full rounded-full bg-transparent pl-11 pr-10 text-[0.95rem] text-ink placeholder:text-ink-soft/60 focus:bg-surface focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button type="button" onClick={() => update({ q: null })} className="absolute right-3 grid h-7 w-7 place-items-center rounded-full text-ink-soft hover:bg-linen" aria-label="Keresés törlése">
                  <Close size={15} />
                </button>
              )}
            </label>
            <div className="scroll-rail -mx-2 flex items-center gap-2 overflow-x-auto px-2 md:mx-0 md:px-0">
              <Toggle active={quick} onClick={() => update({ gyors: quick ? null : '1' })}>
                <Clock size={15} /> ≤ 30 perc
              </Toggle>
              <Toggle active={easy} onClick={() => update({ konnyu: easy ? null : '1' })}>Könnyű</Toggle>
              <label className="relative shrink-0">
                <span className="sr-only">Rendezés</span>
                <select
                  value={sort}
                  onChange={(e) => update({ rend: e.target.value === 'uj' ? null : e.target.value })}
                  className="h-10 appearance-none rounded-full border border-line bg-surface pl-4 pr-9 text-[0.85rem] font-bold text-ink-soft hover:border-ink/30 focus:outline-none"
                >
                  {Object.entries(SORTS).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[0.6rem] text-ink-soft">▼</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Találatok */}
      <section className="container-site pt-12" aria-live="polite">
        <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <h2 className="font-display text-step-2 text-ink">{activeLabel}</h2>
          <p className="shrink-0 text-step-n1 font-semibold text-ink-soft">{filtered.length} recept</p>
        </div>

        {filtered.length > 0 ? (
          // A kulcs a szűrők változásakor újraindítja a lépcsőzetes megjelenést
          <div key={`${cat}|${quick}|${easy}|${sort}`} className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-x-6 gap-y-12">
            {featured && (
              <Reveal className="sm:col-span-2 sm:row-span-2">
                <RecipeCard recipe={featured} featured featuredLabel={dailyRecipe ? 'A nap receptje' : 'Legújabb'} priority />
              </Reveal>
            )}
            {gridItems.map((r, i) => (
              <Reveal key={r.id} index={i}>
                <RecipeCard recipe={r} priority={i < 4} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="linen mx-auto max-w-2xl rounded-frame px-6 py-16 text-center">
            <StitchRosette className="mx-auto w-20 text-paprika opacity-60" />
            <h3 className="mt-6 font-display text-step-2 text-ink">
              {cat === 'kedvencek' && !query ? 'Még nincs kedvenced' : 'Erre most nincs receptem'}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">
              {cat === 'kedvencek' && !query
                ? 'Koppints a szívre bármelyik recepten, és itt összegyűjtöm neked.'
                : query
                  ? <>Nem találtam semmit erre: <strong className="text-ink">„{query}”</strong>. Próbáld egy hozzávalóval!</>
                  : 'Lazíts egy kicsit a szűrőkön.'}
            </p>
            <button type="button" onClick={() => setParams({}, { replace: true, preventScrollReset: true })} className="btn btn-primary mt-8">
              Összes recept mutatása
            </button>
          </Reveal>
        )}
      </section>
    </div>
  );
};

export default Recipes;
