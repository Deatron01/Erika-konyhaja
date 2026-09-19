// src/pages/Home.jsx
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/Recipe/RecipeCard';
import RecipePoster from '../components/Recipe/RecipePoster';
import VideoFacade from '../components/Recipe/VideoFacade';
import CategoryRail from '../components/Recipe/CategoryRail';
import { Reveal, SplitHeadline, HandNote, Magnetic, EASE_OUT } from '../components/Motion/Motion';
import { StitchRosette, StitchDivider } from '../components/UI/Stitch';
import { ArrowRight, Play, TikTok } from '../components/UI/Icons';
import { CATEGORIES } from '../data/taxonomy';
import { TIKTOK_URL } from '../components/Layout/Navbar';
import { markTransition } from '../utils/transition';
import profileImage from '../img/pfp.jpeg';

const Polaroid = ({ recipe, rotate, delay, className = '' }) => (
  <motion.figure
    className={`absolute w-[42%] max-w-[190px] bg-surface p-2 pb-8 shadow-card ${className}`}
    initial={{ opacity: 0, y: -30, rotate: 0 }}
    animate={{ opacity: 1, y: 0, rotate }}
    transition={{ type: 'spring', stiffness: 120, damping: 14, delay }}
  >
    <RecipePoster recipe={recipe} compact className="aspect-square w-full" />
    <figcaption className="absolute inset-x-2 bottom-1.5 truncate text-center font-hand text-[1.25rem] leading-none text-ink-soft">
      {recipe.title}
    </figcaption>
  </motion.figure>
);

const Hero = ({ recipes, heroRecipe }) => {
  const polaroids = useMemo(() => {
    const pool = recipes.filter((r) => r.id !== heroRecipe?.id);
    const sweet = pool.find((r) => r.category === 'sutemenyek') || pool[0];
    const local = pool.find((r) => r.region === 'karpataljai' && r.id !== sweet?.id) || pool[1];
    return [sweet, local].filter(Boolean);
  }, [recipes, heroRecipe]);

  return (
    <section className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
      {/* Halvány beregi rozetta a háttérben */}
      <StitchRosette className="pointer-events-none absolute -right-40 top-10 w-[720px] max-w-none text-paprika opacity-[.045]" strokeWidth={1.2} />

      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        {/* Bal oszlop – szöveg */}
        <div className="relative z-10 lg:col-span-6">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            Kárpátaljai & magyar házi konyha
          </motion.p>

          <SplitHeadline
            className="mt-6 font-display text-step-4 leading-[0.98] text-ink"
            lines={['Nagymama konyhája,', <span className="accent-word">ma is.</span>]}
          />

          <motion.div className="mt-8 flex max-w-xl items-start gap-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.5 }}>
            <img src={profileImage} alt="Pógyor Erika" width="56" height="56" className="mt-1 h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-dough ring-offset-2 ring-offset-cream" />
            <p className="text-step-1 leading-relaxed text-ink-soft">
              Szia, Erika vagyok! Itt azokat az <strong className="font-semibold text-ink">igazi otthoni ízeket</strong> gyűjtöttem össze, amiket a TikTokon is láthattál.
            </p>
          </motion.div>

          <motion.div className="mt-10 flex flex-wrap items-center gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.65 }}>
            <Magnetic>
              <Link to="/recipes" viewTransition onClick={() => markTransition('wipe')} className="btn btn-primary">
                Receptek böngészése <ArrowRight size={18} className="btn-arrow" />
              </Link>
            </Magnetic>
            <Link to="/daily" viewTransition onClick={() => markTransition('wipe')} className="btn btn-ghost">
              <Play size={14} className="text-paprika" /> A nap receptje
            </Link>
          </motion.div>

          <motion.dl className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-step-n1 font-semibold text-ink-soft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}>
            <div className="flex items-baseline gap-1.5"><dt className="sr-only">Receptek</dt><dd className="font-display text-step-1 text-ink">{recipes.length}</dd> recept</div>
            <span className="h-1 w-1 rounded-full bg-crust" aria-hidden="true" />
            <div className="flex items-baseline gap-1.5"><dt className="sr-only">Kategóriák</dt><dd className="font-display text-step-1 text-ink">{CATEGORIES.length}</dd> kategória</div>
            <span className="h-1 w-1 rounded-full bg-crust" aria-hidden="true" />
            <div className="flex items-baseline gap-1.5"><dt className="sr-only">Videók</dt><dd className="font-display text-step-1 text-ink">{recipes.filter((r) => r.tikTokId).length}</dd> videós recept</div>
          </motion.dl>
        </div>

        {/* Jobb oszlop – videó + polaroid kollázs */}
        <div className="relative lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto w-full max-w-[340px]">
            {polaroids[0] && <Polaroid recipe={polaroids[0]} rotate={-5} delay={0.9} className="-left-[38%] top-[8%] hidden sm:block" />}
            {polaroids[1] && <Polaroid recipe={polaroids[1]} rotate={4} delay={1.05} className="-right-[34%] bottom-[10%] hidden sm:block" />}

            <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: EASE_OUT, delay: 0.35 }} className="relative z-10">
              {heroRecipe && <VideoFacade recipe={heroRecipe} priority className="shadow-lift" />}
            </motion.div>

            <HandNote arrow="left-down" className="absolute -bottom-14 left-[-10%] z-20 md:-left-[46%] md:bottom-[28%]" delay={1.5}>
              ezt ma főztem!
            </HandNote>
          </div>
        </div>
      </div>

      {/* Görgetés-jelző */}
      <motion.div className="absolute bottom-6 left-1/2 hidden flex-col items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-ink-soft/70 md:flex" style={{ x: '-50%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        görgess
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span className="absolute inset-x-0 top-0 h-4 bg-paprika" animate={{ y: [-16, 40] }} transition={{ duration: 1.6, ease: 'easeInOut', repeat: 2, repeatDelay: 0.4 }} />
        </span>
      </motion.div>
    </section>
  );
};

const SectionHeader = ({ eyebrow, title, text, action }) => (
  <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
    <div className="max-w-2xl">
      <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>
      <Reveal as="h2" delay={0.05} className="mt-4 font-display text-step-3 text-ink">{title}</Reveal>
      {text && <Reveal as="p" delay={0.1} className="mt-4 text-step-1 text-ink-soft">{text}</Reveal>}
    </div>
    {action}
  </div>
);

const Home = () => {
  const { recipes, dailyRecipe } = useContext(RecipeContext);
  const heroRecipe = dailyRecipe || recipes[0];
  // A hero már a nap receptjét mutatja, ezért itt a legújabb másik recept a kiemelt
  const rest = recipes.filter((r) => r.id !== heroRecipe?.id);
  const featured = rest[0];
  const latest = rest.slice(1, 5);
  const local = recipes.filter((r) => r.region === 'karpataljai').slice(0, 3);

  return (
    <>
      <Hero recipes={recipes} heroRecipe={heroRecipe} />

      {/* Kategóriák */}
      <section className="container-site pb-[var(--section)]">
        <Reveal className="mb-8 text-center">
          <p className="font-hand text-[1.9rem] leading-none text-ink-soft">Mit főzzünk ma?</p>
        </Reveal>
        <Reveal delay={0.1}>
          <CategoryRail asLinks />
        </Reveal>
      </section>

      {/* Friss receptek – bento rács */}
      <section className="container-site pb-[var(--section)]">
        <SectionHeader
          eyebrow="Frissen a konyhából"
          title={<>Frissen <span className="accent-word">sült</span> finomságok</>}
          text="Válogass a legújabb receptjeim között, mintha csak nálam ülnél a konyhában."
          action={
            <Link to="/recipes" className="group inline-flex shrink-0 items-center gap-2 font-bold text-paprika">
              <span className="link-draw">Összes recept</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />

        {recipes.length > 0 ? (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured && (
              <Reveal className="sm:col-span-2 lg:row-span-2">
                <RecipeCard recipe={featured} featured featuredLabel="Legújabb" />
              </Reveal>
            )}
            {latest.map((r, i) => (
              <Reveal key={r.id} index={i + 1}>
                <RecipeCard recipe={r} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="rounded-card border border-dashed border-line py-20 text-center italic text-ink-soft">Hamarosan érkeznek az új receptek…</p>
        )}
      </section>

      {/* Kárpátalja sáv */}
      <section className="linen section-space relative overflow-hidden">
        <StitchRosette className="pointer-events-none absolute -left-32 bottom-0 w-[520px] max-w-none text-ink opacity-[.04]" />
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal as="p" className="eyebrow">Ahonnan jövök</Reveal>
            <Reveal as="h2" delay={0.05} className="mt-4 font-display text-step-3 text-ink">
              A kárpátaljai konyha: <span className="accent-word">ízek találkozása</span>
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 max-w-lg text-step-1 text-ink-soft">
              Magyar, ruszin, ukrán és szlovák asztalok ízei keverednek nálunk – kukoricakása a hegyekből, hajdina a hétköznapokra, sárgatúró húsvétra.
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
              <Link to="/recipes?kat=karpataljai" className="btn btn-primary">
                Kárpátaljai receptek <ArrowRight size={18} className="btn-arrow" />
              </Link>
              <Link to="/tortenetem" viewTransition onClick={() => markTransition('wipe')} className="btn btn-ghost">
                A történetem
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {local.map((r, i) => (
              <Reveal key={r.id} index={i} className={i === 0 ? 'row-span-2' : ''}>
                <Link to={`/recipe/${r.id}`} className="group block">
                  <div className={`parallax-frame overflow-hidden rounded-card shadow-card ${i === 0 ? 'aspect-[3/5]' : 'aspect-[4/3]'}`}>
                    <div className="parallax-inner h-full w-full">
                      <RecipePoster recipe={r} className="h-full w-full" imgClassName="transition-transform duration-700 ease-out group-hover:scale-105" />
                    </div>
                  </div>
                  <p className="mt-3 font-display text-[1.1rem] text-ink">
                    <span className="link-draw">{r.title}</span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Történet ízelítő */}
      <section className="container-site section-space">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[380px]">
            <div className="deckled aspect-[4/5] overflow-hidden">
              <img src={profileImage} alt="Erika a konyhában" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="absolute -bottom-4 -right-2 rotate-[-4deg] font-hand text-[1.8rem] leading-none text-paprika">– Erika</p>
          </Reveal>
          <div>
            <Reveal as="p" className="eyebrow">Erika konyhájából</Reveal>
            <Reveal as="blockquote" delay={0.05} className="mt-6 font-display text-step-3 italic leading-[1.1] text-ink [font-variation-settings:'SOFT'_100,'WONK'_1]">
              „Nálunk a főzés nem csak recept, hanem <span className="text-paprika">gondoskodás</span>.”
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 max-w-lg text-step-1 text-ink-soft">
              Tarts velem, és készítsünk valami finomat a családnak – úgy, ahogy nálunk mindig is készült.
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <Link to="/tortenetem" viewTransition onClick={() => markTransition('wipe')} className="group inline-flex items-center gap-2 font-bold text-paprika">
                <span className="link-draw">Olvasd el a történetem</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Záró CTA */}
      <section className="container-site pb-[var(--section)]">
        <Reveal className="relative overflow-hidden rounded-frame bg-ink px-6 py-16 text-center text-cream md:px-16 md:py-24">
          <StitchRosette className="pointer-events-none absolute -right-16 -top-16 w-80 text-paprika opacity-20" />
          <StitchRosette className="pointer-events-none absolute -bottom-20 -left-16 w-72 text-paprika opacity-10" />
          <p className="font-hand text-[1.8rem] leading-none text-dough">Gyere, főzzünk együtt!</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-step-3 text-cream">
            Még több recept a <span className="accent-word">TikTokon</span>
          </h2>
          <StitchDivider className="my-8" stitches={4} />
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <TikTok size={16} /> Kövess: @eranagy20
          </a>
        </Reveal>
      </section>
    </>
  );
};

export default Home;
