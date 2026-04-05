// src/context/RecipeContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { recipes as mockRecipes } from '../data/mockRecipes';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const savedRecipes = localStorage.getItem('erika_recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    } else {
      setRecipes(mockRecipes);
      localStorage.setItem('erika_recipes', JSON.stringify(mockRecipes));
    }
  }, []);

  const addRecipe = (newRecipe) => {
    const updated = [newRecipe, ...recipes];
    setRecipes(updated);
    localStorage.setItem('erika_recipes', JSON.stringify(updated));
  };

  const deleteRecipe = (id) => {
    const updated = recipes.filter(r => r.id !== id);
    setRecipes(updated);
    localStorage.setItem('erika_recipes', JSON.stringify(updated));
  };

  const updateRecipe = (updatedRecipe) => {
    const updated = recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r);
    setRecipes(updated);
    localStorage.setItem('erika_recipes', JSON.stringify(updated));
  };
  
  // JAVÍTVA: Mentéssel együtt
  const setDailyRecipe = (recipeId) => {
    const updated = recipes.map(recipe => ({
      ...recipe,
      isDaily: recipe.id === recipeId
    }));
    setRecipes(updated);
    localStorage.setItem('erika_recipes', JSON.stringify(updated));
  };

  return (
    /* FONTOS: Itt a végén be kellett tenni a setDailyRecipe-t a listába! */
    <RecipeContext.Provider value={{ 
      recipes, 
      addRecipe, 
      deleteRecipe, 
      updateRecipe, 
      setDailyRecipe 
    }}>
      {children}
    </RecipeContext.Provider>
  );
};