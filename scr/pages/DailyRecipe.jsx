import React from 'react';
import { Link } from 'react-router-dom';
import { recipes } from '../data/mockRecipes';
import TikTokEmbed from '../components/UI/TikTokEmbed';

const DailyRecipe = () => {
  // Megkeressük a nap receptjét
  const recipe = recipes.find(r => r.isDaily);

  if (!recipe) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-brand-dark mb-4">Mára még nincs kiválasztva recept!</h2>
        <Link to="/recipes" className="text-brand-mid hover:text-brand-dark underline">Nézd meg a többi finomságot</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <span className="bg-brand-mid text-brand-bg px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase inline-block mb-4">
          Mai Ajánlatunk
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">A Nap Receptje</h1>
      </div>

      <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-soft overflow-hidden border border-brand-beige relative">
        <div className="h-72 md:h-[400px] w-full relative group">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent flex items-end p-8 md:p-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{recipe.title}</h2>
              <p className="text-brand-bg text-lg max-w-2xl">{recipe.shortDescription}</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Hozzávalók */}
            <div className="md:col-span-1 bg-brand-bg rounded-2xl p-6 h-fit border border-brand-beige">
              <h3 className="text-xl font-bold text-brand-dark mb-4 border-b border-brand-light pb-2">Mik kellenek hozzá?</h3>
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
              <h3 className="text-2xl font-bold text-brand-dark mb-6">Így készítsd el:</h3>
              <div className="space-y-6">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-5 bg-white p-4 rounded-xl border border-brand-bg hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-light text-brand-dark flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <p className="text-brand-dark leading-relaxed pt-1.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Videó beágyazás */}
          {recipe.tikTokId && (
            <div className="mt-16 pt-10 border-t border-brand-beige">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Főzz velem a TikTokon!</h3>
                <p className="text-brand-mid">Nézd meg a videót, hogy biztosan tökéletes legyen a végeredmény.</p>
              </div>
              <TikTokEmbed videoId={recipe.tikTokId} />
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default DailyRecipe;