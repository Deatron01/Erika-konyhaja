import React, { useState, useContext } from 'react'
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/UI/RecipeCard';

const Recipes = () => {
  const { recipes } = useContext(RecipeContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Szűrési logika: Címben, leírásban és hozzávalókban is keres
  const filteredRecipes = recipes.filter(recipe => {
    const searchLower = searchTerm.toLowerCase().trim();
    const matchTitle = recipe.title.toLowerCase().includes(searchLower);
    const matchDesc = recipe.shortDescription.toLowerCase().includes(searchLower);
    const matchIngredients = recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchLower)
    );
    return matchTitle || matchDesc || matchIngredients;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-24 relative z-10">
      
      {/* FEJLÉC SZAKASZ */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pt-10">
        <h1 className="text-5xl md:text-6xl font-black text-brand-dark tracking-tight">
          Összes Recept
        </h1>
        <p className="text-brand-dark/70 text-lg md:text-xl font-medium italic leading-relaxed">
          Böngéssz az összes eddigi kedvenc között! Itt megtalálod a TikTokon látott összes finomságot, egy helyen összegyűjtve.
        </p>
      </div>
      
      {/* KERESŐMEZŐ - Modernizált üveghatású design */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-lg group">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Mit főznél ma?" 
            className="w-full bg-white/60 backdrop-blur-md border border-brand-beige/50 rounded-[2rem] py-5 pl-14 pr-12 shadow-soft focus:outline-none focus:ring-4 focus:ring-brand-light/20 focus:border-brand-light transition-all text-brand-dark font-medium placeholder:text-brand-mid/50"
          />
          {/* Nagyító ikon */}
          <svg 
            className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-light group-focus-within:scale-110 transition-transform" 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          {/* Törlés gomb */}
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-mid hover:text-brand-dark transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* RECEPT GRID - Megemelt gap a magas videós kártyákhoz */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-10 md:gap-y-16">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        /* Üres állapot kártyája */
        <div className="text-center py-24 bg-white/50 backdrop-blur-md rounded-[3rem] border border-brand-beige/50 shadow-soft max-w-2xl mx-auto">
          <div className="text-7xl mb-6 animate-bounce">🍳</div>
          <h3 className="text-3xl font-black text-brand-dark mb-3">Sajnos nincs ilyen receptünk</h3>
          <p className="text-brand-dark/60 text-lg mb-8 italic">
            Nem találtunk semmit erre: <span className="font-bold text-brand-dark">"{searchTerm}"</span>
          </p>
          <button 
            onClick={() => setSearchTerm('')}
            className="bg-brand-dark text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-mid transition-all shadow-lg active:scale-95"
          >
            Összes recept mutatása
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipes;