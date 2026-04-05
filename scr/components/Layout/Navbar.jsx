import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkClass = ({ isActive }) => 
    `transition-colors duration-200 font-medium ${isActive ? 'text-brand-dark border-b-2 border-brand-mid pb-1' : 'text-brand-mid hover:text-brand-dark'}`;

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-beige">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLink to="/" className="text-2xl font-bold text-brand-dark tracking-tight">
            Marcsi<span className="text-brand-light">Konyhája</span>
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