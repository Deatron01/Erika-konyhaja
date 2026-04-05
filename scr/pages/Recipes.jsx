import React from 'react';
import { recipes } from '../data/mockRecipes';
import RecipeCard from '../components/UI/RecipeCard';

const Recipes = () => {
  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-brand-dark mb-4">Összes Recept</h1>
        <p className="text-brand-mid text-lg">
          Böngéssz az összes eddigi kedvenc között! Itt megtalálod a TikTokon látott összes finomságot, egy helyen összegyűjtve.
        </p>
      </div>
      
      {/* Kereső / Szűrő (Későbbi bővítéshez előkészítve) */}
      <div className="flex justify-center mb-8">
        <input 
          type="text" 
          placeholder="Mit főznél ma? (pl. tészta, csirke...)" 
          className="w-full max-w-md bg-white border border-brand-beige rounded-xl px-5 py-3 shadow-soft focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid transition-colors text-brand-dark"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;