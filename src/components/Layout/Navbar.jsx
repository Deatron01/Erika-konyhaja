import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkClass = ({ isActive }) => 
    `transition-colors duration-200 font-medium ${isActive ? 'text-white border-b-2 border-brand-bg pb-1' : 'text-brand-bg/80 hover:text-white'}`;

  return (
    // sticky top-0: rögzítés a tetőn
    // bg-brand-dark/80: félig áttetsző sötét barna
    // backdrop-blur-md: az Apple-stílusú elmosódás effekt
    <nav className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLink to="/" className="text-2xl font-bold text-white tracking-tight">
            Erika<span className="text-brand-light">Konyhája</span>
          </NavLink>
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className={linkClass}>Kezdőlap</NavLink>
            <NavLink to="/recipes" className={linkClass}>Receptek</NavLink>
            <NavLink to="/daily" className={linkClass}>Nap receptje</NavLink>
            <NavLink to="/contact" className={linkClass}>Kapcsolat</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;