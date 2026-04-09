import React, { useContext, useMemo } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/UI/RecipeCard';
import { Link } from 'react-router-dom';
import TikTokEmbed from '../components/UI/TikTokEmbed';

// A saját profilkép importálása a src/img mappából
import profileImage from '../img/pfp.jpeg';

const Home = () => {
  const { recipes } = useContext(RecipeContext);
  
  const allTikTokIds = useMemo(() => {
    const ids = recipes
      .map(r => r.tikTokId)
      .filter(id => id && id.trim() !== '');
    return ids.length > 0 ? ids : ["7321234567890123456"]; 
  }, [recipes]);

  const randomTikTokId = useMemo(() => {
    return allTikTokIds[Math.floor(Math.random() * allTikTokIds.length)];
  }, [allTikTokIds]);

  const latestRecipes = recipes.slice(0, 3);

  return (
    <div className="space-y-20 pb-12">
      {/* --- MODERN, DE OTTHONOS HERO SECTION --- */}
      <section className="relative overflow-hidden bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-16 shadow-soft border border-brand-beige/50 flex flex-col lg:flex-row items-center gap-12 animate-fade-in-up">
        
        <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-4 justify-center lg:justify-start">
            <div className="w-16 h-16 rounded-full border-2 border-brand-light p-0.5 shadow-md hover:scale-110 transition-transform duration-500">
               <img 
                src={profileImage} 
                alt="Pógyor Erika" 
                className="w-full h-full rounded-full object-cover"
               />
            </div>
            <div className="inline-block px-4 py-1.5 bg-brand-mid/10 text-brand-mid rounded-full text-sm font-bold tracking-wide hover:bg-brand-mid/20 transition-colors duration-300">
              Szeretettel köszöntelek az oldalamon!
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-brand-dark leading-[1.1]">
            Kárpátaljai ízek, <br />
            {/* Finom pulzálás a kiemelésen */}
            <span className="text-brand-light inline-block hover:scale-105 transition-transform duration-300">szívvel-lélekkel.</span>
          </h1>
          
          <p className="text-xl text-brand-dark/70 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            Szia, Erika vagyok! Itt azokat az <span className="text-brand-dark font-bold">igazi otthoni ízeket</span> gyűjtöttem össze neked, amiket a TikTokon is láthattál. Nálunk a főzés nem csak recept, hanem gondoskodás, tarts velem, és készítsünk valami finomat a családnak!
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <Link 
              to="/recipes" 
              className="bg-brand-light text-white px-10 py-4 rounded-2xl hover:bg-brand-mid hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-bold text-lg text-center"
            >
              Nézzük a recepteket!
            </Link>
            
            <a 
              href="https://www.tiktok.com/@eranagy20" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-white/80 text-brand-dark px-10 py-4 rounded-2xl border border-brand-beige hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3"
            >
              Főzzünk együtt a TikTokon
            </a>
          </div>
        </div>

        {/* Videó szekció - úszó (float) animációval */}
        <div className="flex-1 w-full relative flex justify-center lg:justify-end animate-float">
          <div className="absolute inset-0 bg-brand-mid/5 rounded-[2rem] transform rotate-3 scale-105 -z-10 transition-transform duration-700 hover:rotate-6"></div>
          <div className="w-full max-w-[325px] h-[580px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 relative z-10 bg-brand-dark/10 group-hover:scale-105 transition-transform duration-500">
            <TikTokEmbed key={randomTikTokId} videoId={randomTikTokId} asHero={true} autoplay={true} />
          </div>
        </div>
      </section>

      {/* Frissített felirat a listához - Késleltetett megjelenés */}
      <section className="space-y-12 animate-fade-in-up" style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-brand-beige/30 pb-8">
          <div>
            <h2 className="text-4xl font-black text-brand-dark mb-3 tracking-tight">Frissen sült finomságok</h2>
            <p className="text-brand-mid font-medium text-lg italic">Válogass a legújabb receptjeim között, mintha csak nálam ülnél a konyhában.</p>
          </div>
          <Link to="/recipes" className="text-brand-light font-bold hover:text-brand-mid hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-lg">
            Összes finomság
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        {latestRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {latestRecipes.map((recipe, index) => (
              <div 
                key={recipe.id} 
                className="animate-fade-in-up hover:-translate-y-2 transition-transform duration-500" 
                style={{ animationDelay: `${(index + 1) * 150 + 200}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/20 rounded-3xl border-2 border-dashed border-brand-beige">
            <p className="text-brand-mid text-xl font-medium italic">Hamarosan érkeznek az új receptek...</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;