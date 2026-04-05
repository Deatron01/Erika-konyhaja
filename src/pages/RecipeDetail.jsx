// src/pages/RecipeDetail.jsx
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import TikTokEmbed from '../components/UI/TikTokEmbed';

// Hozzáadtuk a { customRecipe } paramétert
const RecipeDetail = ({ customRecipe }) => {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);

  // LOGIKA: Ha kaptunk customRecipe-t (a Nap receptje oldaltól), azt használjuk.
  // Ha nem, akkor megkeressük az URL-ben lévő ID alapján.
  const recipe = customRecipe || recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-brand-beige">
        <h2 className="text-2xl font-bold text-brand-dark mb-4">Hoppá, a recept nem található!</h2>
        <Link to="/recipes" className="text-brand-light font-bold hover:underline">Vissza a receptekhez</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 relative z-10">
      {/* ... a többi kód változatlan marad ... */}
      <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] shadow-soft border border-brand-beige overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          
          {/* BAL OLDAL */}
          <div className="flex-1 p-8 md:p-12 space-y-10 order-2 lg:order-1">
             {/* Csak akkor mutassuk a visszagombot, ha nem a Nap receptje oldalon vagyunk */}
             {!customRecipe && (
                <Link to="/recipes" className="text-brand-light font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  ← Vissza a listához
                </Link>
             )}
             <h1 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight">{recipe.title}</h1>
             {/* ... az összes többi tartalom (hozzávalók, lépések) marad ... */}
             <section className="bg-brand-bg/30 p-8 rounded-[2rem] border border-brand-beige/50">
                <h2 className="text-2xl font-bold text-brand-dark mb-6 italic">Hozzávalók</h2>
                <ul className="space-y-4">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-brand-dark/80 font-medium border-b border-brand-beige/20 pb-2">
                      {ing}
                    </li>
                  ))}
                </ul>
             </section>
          </div>

          {/* JOBB OLDAL (TikTok) */}
          <div className="lg:w-[400px] bg-brand-dark/5 border-l border-brand-beige/30 order-1 lg:order-2 flex items-center justify-center p-4">
            <div className="sticky top-8 w-full max-w-[325px]">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50">
                <TikTokEmbed videoId={recipe.tikTokId} asHero={true} autoplay={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;