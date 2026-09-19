// src/data/taxonomy.js
// Kategóriák, tájegységek és a receptekhez tartozó segédfüggvények.

import { recipes as seedRecipes } from './mockRecipes';

export const CATEGORIES = [
  { id: 'levesek', label: 'Levesek & főzelékek', short: 'Levesek', icon: 'pot' },
  { id: 'foetelek', label: 'Főételek', short: 'Főételek', icon: 'plate' },
  { id: 'tesztak', label: 'Tészták & kásák', short: 'Tészták', icon: 'wheat' },
  { id: 'sutemenyek', label: 'Sütemények', short: 'Sütik', icon: 'cake' },
  { id: 'falatkak', label: 'Saláták & falatkák', short: 'Falatkák', icon: 'bowl' },
];

// Külön szűrők a kategória-sínen (nem kategóriák, hanem tulajdonságok)
export const SPECIAL_FILTERS = [
  { id: 'karpataljai', label: 'Kárpátaljai', icon: 'stitch', match: (r) => r.region === 'karpataljai' },
  { id: 'unnepi', label: 'Ünnepi asztal', icon: 'star', match: (r) => r.tags?.includes('ünnepi') },
];

export const REGIONS = {
  karpataljai: 'Kárpátaljai',
  magyar: 'Magyar',
  nemzetkozi: 'Nagyvilág',
};

export const DIFFICULTY = { 1: 'Könnyű', 2: 'Közepes', 3: 'Haladó' };

export const categoryById = (id) => CATEGORIES.find((c) => c.id === id);

export const formatTime = (minutes) => {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} perc`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} óra ${m} perc` : `${h} óra`;
};

// A TikTok videóból letöltött borító (npm run thumbs) – ha nincs, a RecipePoster megtervezett borítót mutat.
export const posterSrc = (recipe) =>
  recipe?.image || (recipe?.tikTokId ? `/thumbs/${recipe.tikTokId}.jpg` : '');

export const hasSteps = (recipe) => (recipe?.steps || []).some((s) => s && s.trim());

// ── Adatok frissítése ──
// A localStorage-ben tárolt (régebbi) receptekből hiányozhatnak az új mezők,
// ezért id alapján kiegészítjük őket az alap adatokból.
const META_KEYS = ['category', 'region', 'tags', 'timeMinutes', 'difficulty', 'servings', 'tip'];
const seedById = Object.fromEntries(seedRecipes.map((r) => [r.id, r]));

export const enrichRecipe = (recipe) => {
  const seed = seedById[recipe.id] || {};
  const out = { ...recipe };
  for (const key of META_KEYS) {
    if (out[key] === undefined || out[key] === null || out[key] === '') {
      if (seed[key] !== undefined) out[key] = seed[key];
    }
  }
  out.tags = out.tags || [];
  out.region = out.region || 'magyar';
  out.servings = Number(out.servings) || 4;
  out.difficulty = Number(out.difficulty) || 1;
  out.timeMinutes = Number(out.timeMinutes) || null;
  out.ingredients = out.ingredients || [];
  out.steps = out.steps || [];
  return out;
};

// ── Adag-számláló: a hozzávalók elején álló mennyiség átszámolása ──
const NUM = String.raw`(\d+(?:[.,]\d+)?(?:\/\d+)?|fél)`;
const LEADING = new RegExp(String.raw`^\s*${NUM}(?:\s*[-–]\s*${NUM})?`, 'i');

const parseNum = (str) => {
  if (!str) return null;
  if (/^fél$/i.test(str)) return 0.5;
  if (str.includes('/')) {
    const [a, b] = str.split('/').map(Number);
    return b ? a / b : null;
  }
  return parseFloat(str.replace(',', '.'));
};

const formatNum = (n) => {
  if (n >= 10) return String(Math.round(n));
  const rounded = Math.round(n * 2) / 2; // fél egységekre kerekít
  if (rounded === 0.5) return 'fél';
  return String(rounded || Math.round(n * 10) / 10).replace('.', ',');
};

export const scaleIngredient = (text, factor) => {
  if (factor === 1) return text;
  const match = text.match(LEADING);
  if (!match) return text;
  const a = parseNum(match[1]);
  const b = parseNum(match[2]);
  if (a === null || Number.isNaN(a)) return text;
  const scaled = b ? `${formatNum(a * factor)}-${formatNum(b * factor)}` : formatNum(a * factor);
  return scaled + text.slice(match[0].length);
};

// Kereséshez: ékezetfüggetlen, kisbetűs forma
export const normalize = (str = '') =>
  str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

export const matchesQuery = (recipe, query) => {
  const q = normalize(query);
  if (!q) return true;
  return (
    normalize(recipe.title).includes(q) ||
    normalize(recipe.shortDescription).includes(q) ||
    recipe.ingredients.some((i) => normalize(i).includes(q))
  );
};
