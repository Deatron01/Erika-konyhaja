// src/context/RecipeContext.jsx
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { recipes as mockRecipes } from '../data/mockRecipes';
import { enrichRecipe } from '../data/taxonomy';

export const RecipeContext = createContext();

const STORAGE_KEY = 'erika_recipes';
const FAVORITES_KEY = 'erika_favorites';

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* privát mód / tele a tárhely – az oldal ettől még működik */
  }
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(() => readJSON(STORAGE_KEY, mockRecipes).map(enrichRecipe));
  const [favorites, setFavorites] = useState(() => readJSON(FAVORITES_KEY, []));

  // Első betöltéskor elmentjük az alap recepteket, ahogy eddig is
  useEffect(() => {
    if (!readJSON(STORAGE_KEY, null)) writeJSON(STORAGE_KEY, recipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (updated) => {
    setRecipes(updated);
    writeJSON(STORAGE_KEY, updated);
  };

  const addRecipe = (newRecipe) => persist([enrichRecipe(newRecipe), ...recipes]);

  const deleteRecipe = (id) => persist(recipes.filter((r) => r.id !== id));

  const updateRecipe = (updatedRecipe) =>
    persist(recipes.map((r) => (r.id === updatedRecipe.id ? enrichRecipe(updatedRecipe) : r)));

  const setDailyRecipe = (recipeId) =>
    persist(recipes.map((recipe) => ({ ...recipe, isDaily: recipe.id === recipeId })));

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      writeJSON(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const dailyRecipe = useMemo(() => recipes.find((r) => r.isDaily === true), [recipes]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        dailyRecipe,
        addRecipe,
        deleteRecipe,
        updateRecipe,
        setDailyRecipe,
        favorites,
        toggleFavorite,
        isFavorite: (id) => favorites.includes(id),
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
