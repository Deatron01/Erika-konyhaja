import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import TikTokEmbed from '../components/UI/TikTokEmbed';
import { RecipeContext } from '../context/RecipeContext';

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);

  const recipe = recipes.find(r => String(r.id) === String(id));

  if (!recipe) {
    return (
      <div className="text-center py-20 text-brand-mid relative z-10">
        A recept nem található. <Link to="/recipes" className="underline font-bold text-brand-dark">Vissza a receptekhez</Link>
      </div>
    );
  }

  // Meghatározzuk, hogy a videó a kártyán kívül vagy borítóképként jelenjen meg
  const showTikTokAsHero = !recipe.image && recipe.tikTokId;

  return (
    // Flexbox elrendezés: asztali nézeten (lg) egymás mellett, mobilon egymás alatt
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start relative z-10">
      
      {/* BAL OLDAL: A recept fő kártyája (Borítókép + Szöveg) */}
      <article className="flex-1 bg-white/90 backdrop-blur-md rounded-3xl shadow-soft overflow-hidden border border-brand-beige">
        
        {/* Borítókép szekció a kártyán belül */}
        {showTikTokAsHero ? (
          <TikTokEmbed videoId={recipe.tikTokId} asHero={true} autoplay={true} />
        ) : recipe.image ? (
          <div className="h-64 md:h-96 w-full">
            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          </div>
        ) : null}
        
        <div className="p-8 md:p-12 relative z-20">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">{recipe.title}</h1>
          <p className="text-lg text-brand-mid mb-10 italic">{recipe.shortDescription}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Hozzávalók */}
            <div className="md:col-span-1 bg-brand-bg/50 rounded-2xl p-6 h-fit border border-brand-beige">
              <h3 className="text-xl font-bold text-brand-dark mb-4 border-b border-brand-light pb-2">Hozzávalók</h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((item, index) => (
                  <li key={index} className="flex items-center text-brand-dark">
                    <span className="w-2 h-2 rounded-full bg-brand-mid mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Elkészítés */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-brand-dark mb-6">Elkészítés</h3>
              <div className="space-y-6">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 bg-white/50 p-4 rounded-xl">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-light text-brand-dark flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-brand-mid leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* JOBB OLDAL: A TikTok videó a kártyán KÍVÜL */}
      {/* Csak akkor jelenik meg itt, ha nem borítóképként van használva */}
      {!showTikTokAsHero && recipe.tikTokId && (
        <aside className="w-full lg:w-[350px] shrink-0 lg:sticky lg:top-24">
          <div className="bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-brand-beige shadow-soft">
            <h3 className="text-xl font-bold text-brand-dark mb-4 text-center">Nézd meg videón!</h3>
            <div className="flex justify-center">
              <TikTokEmbed videoId={recipe.tikTokId} />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default RecipeDetail;