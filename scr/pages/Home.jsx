import React from 'react';
import { recipes } from '../data/mockRecipes';
import RecipeCard from '../components/UI/RecipeCard';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-soft flex flex-col md:flex-row items-center gap-8 border border-brand-beige">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
            Ízek, amiket a <span className="text-brand-mid">TikTokról</span> már ismersz.
          </h1>
          <p className="text-lg text-brand-mid leading-relaxed">
            Isten hozott a digitális receptfüzetemben! Itt megtalálod a videóimban szereplő összes étel pontos hozzávalóit és lépésről-lépésre leírását. Főzzünk valami finomat!
          </p>
          <div className="pt-4">
            <Link to="/recipes" className="bg-brand-dark text-brand-bg px-8 py-3 rounded-xl hover:bg-brand-mid transition-colors font-semibold text-lg inline-block">
              Böngészek a receptek között
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
            alt="Konyha hangulat" 
            className="rounded-2xl shadow-md object-cover h-80 w-full"
          />
        </div>
      </section>

      {/* Latest Recipes */}
      <section>
        <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Legújabb Finomságok</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;