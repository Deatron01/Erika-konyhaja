// src/pages/Story.jsx
// "Történetem" – szerkesztőségi, magazinszerű oldal négy jelenetben:
// portré + idézet → Kárpátalja térkép → ízek találkozása → idővonal.
//
// FIGYELEM: a szövegek vázlatok – Erika saját szavaira érdemes cserélni őket.
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { RecipeContext } from '../context/RecipeContext';
import RecipePoster from '../components/Recipe/RecipePoster';
import { Reveal, SplitHeadline, EASE_OUT } from '../components/Motion/Motion';
import { StitchDivider, StitchRosette } from '../components/UI/Stitch';
import { ArrowRight, TikTok } from '../components/UI/Icons';
import { TIKTOK_URL } from '../components/Layout/Navbar';
import TranscarpathiaMap from '../components/UI/TranscarpathiaMap';
import profileImage from '../img/pfp.jpeg';

const INFLUENCES = [
  { title: 'Magyar asztal', text: 'Pörkölt, paprikás krumpli, töltött paprika – a vasárnapi ebédek alapjai.', match: 'Töltött' },
  { title: 'Ruszin & ukrán hétköznapok', text: 'Hajdina (grecska), savanyú káposzta, laktató egytálak – egyszerű, becsületes ételek.', match: 'Grecska' },
  { title: 'Hegyvidéki pásztorkonyha', text: 'Kukoricakása tejjel, túróval – a hegyi bános közeli rokona.', match: 'Kukoricakása' },
  { title: 'Húsvéti kosár', text: 'Sárgatúró és kalács – ami nálunk szentelésre kerül a kosárba.', match: 'Sárgatúró' },
];

const Story = () => {
  const { recipes } = useContext(RecipeContext);
  const find = (needle) => recipes.find((r) => r.title.toLowerCase().includes(needle.toLowerCase()));

  const timeline = useMemo(
    () => [
      { label: 'Nagymama konyhája', text: 'Ahol minden kezdődött: a sparhelt melege, a kelő tészta illata, és a türelem, amit csak ott lehet megtanulni.', recipe: recipes.find((r) => r.title.includes('kalács')) },
      { label: 'A saját konyhám', text: 'A régi recepteket a saját családomnak kezdtem főzni – néha pontosan úgy, néha egy kis csavarral.', recipe: recipes.find((r) => r.category === 'foetelek') },
      { label: 'Az első videó', text: 'Egyszer csak elkezdtem felvenni, ahogy főzök. Kiderült, hogy sokan keresik ugyanezeket az ízeket.', recipe: recipes.find((r) => r.category === 'levesek') },
      { label: 'Ma', text: `${recipes.length} recept, egy helyen, videóval – hogy nálad is otthon legyen az íz.`, recipe: recipes[0] },
    ],
    [recipes]
  );

  return (
    <>
      {/* 1. Portré + idézet */}
      <section className="relative overflow-hidden pb-[var(--section)] pt-32 md:pt-40">
        <StitchRosette className="pointer-events-none absolute -right-32 top-20 w-[560px] max-w-none text-paprika opacity-[.04]" />
        <div className="container-site grid items-center gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
          <motion.div className="relative mx-auto w-full max-w-[420px]" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}>
            <div className="deckled parallax-frame aspect-[4/5]">
              <img src={profileImage} alt="Pógyor Erika" className="h-full w-full object-cover" />
            </div>
            <motion.p className="absolute -bottom-5 -right-3 rotate-[-5deg] font-hand text-[2rem] leading-none text-paprika" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              – Erika
            </motion.p>
          </motion.div>

          <div>
            <Reveal as="p" className="eyebrow">Történetem</Reveal>
            <SplitHeadline className="mt-5 font-display text-step-4 leading-[1] text-ink" lines={['Ízek, amikkel', <span className="accent-word">felnőttem.</span>]} delay={0.2} />
            <Reveal as="blockquote" delay={0.5} className="mt-10 border-l-2 border-paprika pl-6 font-display text-step-2 italic leading-snug text-ink [font-variation-settings:'SOFT'_100,'WONK'_1]">
              „Nálunk a főzés nem csak recept, hanem gondoskodás és a szeretet jelképe.”
            </Reveal>
            <Reveal as="p" delay={0.6} className="mt-8 max-w-xl text-step-1 leading-relaxed text-ink-soft">
              Kárpátalján a konyha mindig is több volt egy helyiségnél: itt beszéltük meg a napot, itt tanultam meg sütni, főzni. Ezeket az ízeket szeretném továbbadni neked.
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Térkép */}
      <section className="linen section-space">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <Reveal as="p" className="eyebrow">Ahonnan jövök</Reveal>
            <Reveal as="h2" delay={0.05} className="mt-4 font-display text-step-3 text-ink">
              Kárpátalja, a <span className="accent-word">Kárpátok</span> lábánál
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 max-w-md text-step-1 text-ink-soft">
              Sárosorosziból jövök – egy kis faluból Beregszász mellett, a Tisza közelében. Itt a vasárnapi ebéd, a húsvéti kosár és a karácsonyi bejgli ma is ugyanúgy készül, ahogy nagymamáink idejében. Az oldal hímzett motívumai is erről a vidékről, a beregi keresztszemesből erednek.
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <StitchDivider className="justify-start" stitches={4} />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="rounded-frame bg-cream/70 p-3 shadow-card md:p-6">
            <TranscarpathiaMap />
          </Reveal>
        </div>
      </section>

      {/* 3. Ízek találkozása */}
      <section className="section-space">
        <div className="container-site">
          <div className="mb-12 max-w-2xl">
            <Reveal as="p" className="eyebrow">A kárpátaljai konyha</Reveal>
            <Reveal as="h2" delay={0.05} className="mt-4 font-display text-step-3 text-ink">
              Ahol az ízek <span className="accent-word">találkoznak</span>
            </Reveal>
          </div>
        </div>
        <div className="container-site">
          <ul className="scroll-rail -mx-[var(--gutter)] flex gap-5 overflow-x-auto px-[var(--gutter)] pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
            {INFLUENCES.map((inf, i) => {
              const recipe = find(inf.match);
              return (
                <Reveal as="li" key={inf.title} index={i} className="w-[78vw] max-w-[320px] shrink-0 lg:w-auto lg:max-w-none">
                  <Link to={recipe ? `/recipe/${recipe.id}` : '/recipes?kat=karpataljai'} className="recipe-card group block h-full">
                    <div className="card-media overflow-hidden rounded-card">
                      <RecipePoster recipe={recipe} className="aspect-[4/3] w-full" />
                    </div>
                    <p className="mt-5 font-hand text-[1.5rem] leading-none text-paprika">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 font-display text-step-1 text-ink"><span className="link-draw">{inf.title}</span></h3>
                    <p className="mt-2 text-[0.95rem] text-ink-soft">{inf.text}</p>
                    {recipe && (
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-paprika">
                        {recipe.title} <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    )}
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4. Idővonal */}
      <section className="linen section-space">
        <div className="container-site">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Reveal as="p" className="eyebrow">Az út idáig</Reveal>
            <Reveal as="h2" delay={0.05} className="mt-4 font-display text-step-3 text-ink">
              Nagymama konyhájától <span className="accent-word">a képernyődig</span>
            </Reveal>
          </div>

          <ol className="relative mx-auto max-w-4xl">
            <span className="absolute bottom-0 left-[19px] top-0 w-px bg-line md:left-1/2" aria-hidden="true" />
            {timeline.map((step, i) => (
              <li key={step.label} className="relative grid gap-6 pb-16 pl-14 last:pb-0 md:grid-cols-2 md:gap-16 md:pl-0">
                <span className="absolute left-3 top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-paprika bg-cream md:left-[calc(50%-8px)]" aria-hidden="true" />
                <Reveal className={i % 2 ? 'md:order-1 md:text-right' : 'md:order-2'}>
                  <p className="font-hand text-[1.5rem] leading-none text-paprika">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-display text-step-2 text-ink">{step.label}</h3>
                  <p className="mt-3 text-ink-soft">{step.text}</p>
                </Reveal>
                {step.recipe && (
                  <Reveal delay={0.1} className={i % 2 ? 'md:order-2 md:justify-self-start' : 'md:order-1 md:justify-self-end'}>
                    <figure className="w-[200px] bg-surface p-2 pb-8 shadow-card" style={{ rotate: `${i % 2 ? 2.5 : -2.5}deg` }}>
                      <RecipePoster recipe={step.recipe} compact className="aspect-square w-full" />
                      <figcaption className="mt-2 truncate text-center font-hand text-[1.2rem] leading-none text-ink-soft">{step.recipe.title}</figcaption>
                    </figure>
                  </Reveal>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Záró CTA */}
      <section className="container-site section-space text-center">
        <Reveal>
          <p className="font-hand text-[2rem] leading-none text-paprika">Főzzünk együtt!</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-step-3 text-ink">
            A következő recept talán épp <span className="accent-word">a te kedvenced</span> lesz.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/recipes" className="btn btn-primary">
              Receptek böngészése <ArrowRight size={18} className="btn-arrow" />
            </Link>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <TikTok size={16} /> @eranagy20
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Story;
