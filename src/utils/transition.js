// src/utils/transition.js
// A View Transitions animáció típusát a <html data-transition> jelzi a CSS-nek:
//   'recipe' – kártya → recept oldal (a kép átnő a hero-ba)
//   'wipe'   – fő menüpontok között ("konyharuha-törlés")
export const markTransition = (kind) => {
  document.documentElement.dataset.transition = kind;
};
