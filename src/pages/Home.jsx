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
            Isten hozott <strong>Pógyor Erika</strong> digitális receptfüzetében! Itt megtalálod az <a href="https://www.tiktok.com/@eranagy20" target="_blank" rel="noopener noreferrer" className="text-brand-dark font-bold hover:underline">@eranagy20</a> TikTok csatornámon szereplő összes étel pontos hozzávalóit és lépésről-lépésre leírását. Főzzünk valami finomat!
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Link to="/recipes" className="bg-brand-dark text-brand-bg px-8 py-3 rounded-xl hover:bg-brand-mid transition-colors font-semibold text-lg inline-block text-center">
              Böngészek a receptek között
            </Link>
            
            {/* TikTok Gomb */}
            <a 
              href="https://www.tiktok.com/@eranagy20" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-brand-bg text-brand-dark px-8 py-3 rounded-xl hover:bg-white border border-brand-beige transition-colors font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.63 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              Irány a TikTok
            </a>
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