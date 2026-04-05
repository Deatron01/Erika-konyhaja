import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full border border-brand-bg">
      <div className="h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-brand-dark mb-2">{recipe.title}</h3>
        <p className="text-brand-mid text-sm mb-6 flex-grow">{recipe.shortDescription}</p>
        <Link 
          to={`/recipe/${recipe.id}`}
          className="bg-brand-mid text-white text-center py-2.5 rounded-xl hover:bg-brand-dark transition-colors font-medium"
        >
          Recept megtekintése
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;