import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // Állapot a mobilmenü nyitásához/zárásához
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Bezárja a menüt, ha a felhasználó rákattint egy linkre
  const closeMenu = () => setIsMenuOpen(false);

  // Asztali linkek stílusa (a te eredeti kódod)
  const linkClass = ({ isActive }) => 
    `transition-colors duration-200 font-medium ${isActive ? 'text-white border-b-2 border-brand-bg pb-1' : 'text-brand-bg/80 hover:text-white'}`;

  // Mobilos linkek stílusa (kicsit nagyobb betűk, jobb érintési felület)
  const mobileLinkClass = ({ isActive }) => 
    `block py-3 px-4 rounded-xl transition-all duration-200 text-lg ${isActive ? 'bg-white/10 text-white font-bold' : 'text-brand-bg/80 hover:text-white hover:bg-white/5'}`;

  return (
    <nav className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGÓ */}
          <NavLink to="/" onClick={closeMenu} className="text-2xl font-bold text-white tracking-tight z-50">
            Erika <span className="text-brand-light">Konyhája</span>
          </NavLink>

          {/* ASZTALI MENÜ */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className={linkClass}>Kezdőlap</NavLink>
            <NavLink to="/recipes" className={linkClass}>Receptek</NavLink>
            <NavLink to="/daily" className={linkClass}>Nap receptje</NavLink>
            <NavLink to="/contact" className={linkClass}>Kapcsolat</NavLink>
          </div>

          {/* MOBIL HAMBURGER GOMB */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-brand-light focus:outline-none p-2 z-50"
            aria-label="Menü"
          >
            <svg className="w-8 h-8 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                // 'X' ikon, ha nyitva van
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                // 3 vonalas ikon, ha zárva van
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBIL LEGÖRDÜLŐ MENÜ */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden shadow-2xl ${
          isMenuOpen ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col px-4 space-y-2">
          <NavLink to="/" onClick={closeMenu} className={mobileLinkClass}>Kezdőlap</NavLink>
          <NavLink to="/recipes" onClick={closeMenu} className={mobileLinkClass}>Receptek</NavLink>
          <NavLink to="/daily" onClick={closeMenu} className={mobileLinkClass}>Nap receptje</NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={mobileLinkClass}>Kapcsolat</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;