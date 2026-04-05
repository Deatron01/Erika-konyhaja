import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { recipes } from '../data/mockRecipes';
import TikTokEmbed from '../components/UI/TikTokEmbed';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return <div className="text-center py-20 text-brand-mid">A recept nem található. <Link to="/recipes" className="underline font-bold text-brand-dark">Vissza a receptekhez</Link></div>;
  }

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-soft overflow-hidden border border-brand-beige">
      <div className="h-64 md:h-96 w-full">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
      </div>
      
      <div className="p-8 md:p-12">
        <h1 className="text-4xl font-bold text-brand-dark mb-4">{recipe.title}</h1>
        <p className="text-lg text-brand-mid mb-10 italic">{recipe.shortDescription}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Hozzávalók */}
          <div className="md:col-span-1 bg-brand-bg rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-bold text-brand-dark mb-4 border-b border-brand-light pb-2">Hozzávalók</h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((item, index) => (
                <li key={index} className="flex items-center text-brand-dark">
                  <span className="w-2 h-2 rounded-full bg-brand-mid mr-3"></span>
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
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-light text-brand-dark flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-brand-mid leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Videó beágyazás */}
        {recipe.tikTokId && (
          <div className="mt-16 pt-10 border-t border-brand-beige">
            <h3 className="text-2xl font-bold text-brand-dark mb-6 text-center">Nézd meg videón!</h3>
            <TikTokEmbed videoId={recipe.tikTokId} />
          </div>
        )}
      </div>
    </article>
  );
};

export default RecipeDetail;