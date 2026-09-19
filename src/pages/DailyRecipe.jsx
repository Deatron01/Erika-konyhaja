// src/pages/DailyRecipe.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import RecipeDetail from './RecipeDetail';
import { StitchRosette } from '../components/UI/Stitch';

const DailyRecipe = () => {
  const { dailyRecipe } = useContext(RecipeContext);

  if (!dailyRecipe) {
    return (
      <div className="container-site flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <StitchRosette className="w-20 text-paprika opacity-60" />
        <p className="mt-6 font-hand text-[1.8rem] leading-none text-paprika">Még fő a leves…</p>
        <h1 className="mt-3 font-display text-step-3 text-ink">Mára még nincs kiválasztva recept</h1>
        <p className="mt-3 text-ink-soft">Nézz vissza később, addig pedig böngéssz a többi között!</p>
        <Link to="/recipes" className="btn btn-primary mt-8">Receptek böngészése</Link>
      </div>
    );
  }

  return <RecipeDetail customRecipe={dailyRecipe} />;
};

export default DailyRecipe;
