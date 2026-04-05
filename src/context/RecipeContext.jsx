import React, { createContext, useState, useEffect } from 'react';
import { recipes as mockRecipes } from '../data/mockRecipes';

// Létrehozzuk a Contextet
export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  // Amikor betölt az oldal, megnézzük, van-e már elmentett adat
  useEffect(() => {
    const savedRecipes = localStorage.getItem('erika_recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    } else {
      // Ha nincs, betöltjük az alap (mock) recepteket és elmentjük
      setRecipes(mockRecipes);
      localStorage.setItem('erika_recipes', JSON.stringify(mockRecipes));
    }
  }, []);

  // Új recept hozzáadása
  const addRecipe = (newRecipe) => {
    const updatedRecipes = [newRecipe, ...recipes]; // Az új recept kerül előre
    setRecipes(updatedRecipes);
    localStorage.setItem('erika_recipes', JSON.stringify(updatedRecipes));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};