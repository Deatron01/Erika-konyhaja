// src/pages/DailyRecipe.jsx
import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeDetail from './RecipeDetail';

const DailyRecipe = () => {
  const { recipes } = useContext(RecipeContext);
  
  // Fontos: ellenőrizd, hogy az adminon beállított isDaily valóban true-e
  const daily = recipes.find(r => r.isDaily === true);

  if (!daily) {
    return (
      <div className="text-center py-24 bg-white/20 backdrop-blur-xl rounded-[3rem] border border-white/10 max-w-4xl mx-auto mt-10">
        <div className="text-6xl mb-6 opacity-30">⭐️</div>
        <h2 className="text-2xl font-black text-brand-dark opacity-60 italic">
          Mára még nincs kiválasztva recept.
        </h2>
        <p className="text-brand-mid text-sm mt-2">Nézz vissza később!</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pt-6">
      <div className="text-center space-y-2">
        <h2 className="text-xs uppercase tracking-[0.6em] text-brand-light font-black opacity-80">
          A mai nap kedvence
        </h2>
        <div className="h-1 w-12 bg-brand-light/30 mx-auto rounded-full"></div>
      </div>
      
      {/* Ez hívja meg a fenti RecipeDetail-t a daily adatokkal */}
      <RecipeDetail customRecipe={daily} />
    </div>
  );
};

export default DailyRecipe;