import React, { useState, useContext } from 'react'
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/UI/RecipeCard';

const Recipes = () => {
  // Ezt a sort illeszd be a komponens legelejére:
  const { recipes } = useContext(RecipeContext);
  
  // Ez az állapot (state) tárolja, amit a felhasználó beír a keresőbe
  const [searchTerm, setSearchTerm] = useState('');

  // Szűrési logika
  const filteredRecipes = recipes.filter(recipe => {
    // Mindent kisbetűssé alakítunk a biztonságos összehasonlításhoz
    const searchLower = searchTerm.toLowerCase();
    
    // Keresés a címben
    const matchTitle = recipe.title.toLowerCase().includes(searchLower);
    
    // Keresés a rövid leírásban
    const matchDesc = recipe.shortDescription.toLowerCase().includes(searchLower);
    
    // Keresés a hozzávalók között (ha bármelyik hozzávaló tartalmazza a keresett szót)
    const matchIngredients = recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchLower)
    );
    
    // Ha a címben, a leírásban VAGY a hozzávalókban szerepel a szó, akkor mutatjuk
    return matchTitle || matchDesc || matchIngredients;
  });

  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-brand-dark mb-4">Összes Recept</h1>
        <p className="text-brand-mid text-lg">
          Böngéssz az összes eddigi kedvenc között! Itt megtalálod a TikTokon látott összes finomságot, egy helyen összegyűjtve.
        </p>
      </div>
      
      {/* Keresőmező bekötve */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Mit főznél ma? (pl. tészta, fokhagyma...)" 
            className="w-full bg-white border border-brand-beige rounded-xl py-3.5 pl-12 pr-5 shadow-soft focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid transition-colors text-brand-dark"
          />
          {/* Kis nagyító ikon a keresőmezőbe (Tailwind-hez igazítva) */}
          <svg 
            className="absolute left-4 top-4 w-5 h-5 text-brand-light" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          {/* "X" gomb a keresés törléséhez, csak akkor jelenik meg, ha van beírva valami */}
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-4 text-brand-light hover:text-brand-mid"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Recept kártyák listázása VAGY üres állapot kezelése */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        /* Ezt látja a felhasználó, ha nincs találat */
        <div className="text-center py-16 bg-white rounded-3xl border border-brand-beige shadow-soft">
          <div className="text-6xl mb-4">🍳</div>
          <h3 className="text-2xl font-bold text-brand-dark mb-2">Sajnos nincs ilyen receptünk</h3>
          <p className="text-brand-mid text-lg mb-6">
            Nem találtunk semmit erre: <span className="font-bold text-brand-dark">"{searchTerm}"</span>
          </p>
          <button 
            onClick={() => setSearchTerm('')}
            className="bg-brand-bg text-brand-dark px-6 py-2 rounded-xl font-medium border border-brand-beige hover:bg-white transition-colors"
          >
            Összes recept mutatása
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipes;