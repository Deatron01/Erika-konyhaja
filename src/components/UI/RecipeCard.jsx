// src/components/UI/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TikTokEmbed from './TikTokEmbed';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="group relative bg-white/10 backdrop-blur-[120px] rounded-[3rem] shadow-soft overflow-hidden flex flex-col h-full border border-white/20 transition-all duration-500 hover:shadow-2xl hover:bg-white/15">
      
      {/* 1. VIDEÓ SZEKCIÓ (Most már kattintható és lejátszható) */}
      <div className="h-[580px] overflow-hidden relative p-1.5 z-10">
        <div className="w-full h-full rounded-[2.6rem] overflow-hidden relative z-10 shadow-inner bg-black/5"> 
          {/* A TikTokEmbed mostantól magától mutatja a Play gombot, és kattintásra indul */}
          <TikTokEmbed videoId={recipe.tikTokId} asHero={false} />
        </div>
      </div>

      {/* 2. SZÖVEGES TARTALOM ÉS GOMB */}
      <div className="p-7 flex flex-col flex-grow space-y-4 relative z-30">
        
        {/* A szöveges rész továbbra is a recept oldalra visz */}
        <Link to={`/recipe/${recipe.id}`} className="flex-grow text-center group/text cursor-pointer">
          <h2 className="text-2xl font-black text-brand-dark mb-1 leading-tight group-hover/text:text-brand-mid transition-colors">
            {recipe.title}
          </h2>
          <p className="text-brand-mid/70 text-[11px] line-clamp-2 italic font-semibold px-4">
            {recipe.shortDescription}
          </p>
        </Link>

        {/* GOMB */}
        <Link 
          to={`/recipe/${recipe.id}`}
          className="bg-brand-light text-white text-center py-4 rounded-[2rem] hover:bg-brand-mid hover:scale-[1.02] active:scale-95 transition-all font-bold text-xs uppercase tracking-[0.2em] shadow-md"
        >
          Recept megnyitása
        </Link>
      </div>
      
      {/* Finom üvegszerű csillanás az éleken */}
      <div className="absolute inset-0 border border-white/10 rounded-[3rem] pointer-events-none z-40"></div>
    </div>
  );
};

export default RecipeCard;