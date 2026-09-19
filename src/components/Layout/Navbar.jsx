// src/components/Layout/Navbar.jsx
// Lebegő "pirula" navigáció: a tetején átlátszó, görgetés után tömör krém lesz.
// Lefelé görgetve elbújik, felfelé görgetve visszajön. Mobilon alulról felcsúszó lap (bottom sheet).
import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, Close, Sun, Moon, TikTok, ArrowRight } from '../UI/Icons';
import { StitchRosette } from '../UI/Stitch';
import { markTransition } from '../../utils/transition';
import { useTheme } from '../../hooks/useTheme';

export const NAV_LINKS = [
  { to: '/recipes', label: 'Receptek' },
  { to: '/daily', label: 'Napi recept' },
  { to: '/tortenetem', label: 'Történetem' },
  { to: '/contact', label: 'Kapcsolat' },
];

export const TIKTOK_URL = 'https://www.tiktok.com/@eranagy20';

const navProps = { viewTransition: true, onClick: () => markTransition('wipe') };

export const Logo = ({ className = '' }) => (
  <Link to="/" {...navProps} className={`group flex items-center gap-2.5 ${className}`} aria-label="Erika Konyhája – kezdőlap">
    <StitchRosette cell={10} strokeWidth={2.2} className="h-7 w-7 text-paprika transition-transform duration-700 ease-out group-hover:rotate-45" />
    <span className="font-display text-[1.35rem] leading-none tracking-tight text-ink">
      Erika <span className="accent-word">Konyhája</span>
    </span>
  </Link>
);

const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();
  return (
    <button type="button" onClick={toggle} className="grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-linen hover:text-ink" aria-label={isDark ? 'Világos mód' : 'Sötét mód'}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={isDark ? 'moon' : 'sun'} initial={{ rotate: -60, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 60, opacity: 0 }} transition={{ duration: 0.25 }}>
          {isDark ? <Moon size={19} /> : <Sun size={19} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

const Navbar = ({ onSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (Math.abs(y - last) > 6) setHidden(y > last && y > 160);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4"
        animate={{ y: hidden && !menuOpen ? '-120%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-site">
          <nav
            aria-label="Fő navigáció"
            className={`flex h-16 items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-500 ${
              scrolled ? 'border-line bg-cream/85 shadow-nav backdrop-blur-md' : 'border-transparent bg-transparent'
            }`}
          >
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} {...navProps} className={({ isActive }) => `relative block rounded-full px-4 py-2 text-[0.92rem] font-semibold transition-colors ${isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'}`}>
                    {({ isActive }) => (
                      <>
                        {l.label}
                        {isActive && <motion.span layoutId="nav-dot" className="absolute bottom-0.5 left-[calc(50%-2px)] h-1 w-1 rounded-full bg-paprika" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1">
              <button type="button" onClick={onSearch} className="group flex h-10 items-center gap-2 rounded-full px-3 text-ink-soft transition-colors hover:bg-linen hover:text-ink" aria-label="Keresés a receptek között">
                <Search size={19} />
                <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 text-[0.68rem] font-bold text-ink-soft/80 md:block">⌘K</kbd>
              </button>
              <ThemeToggle />
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm ml-1 hidden md:inline-flex">
                <TikTok size={15} /> Kövess
              </a>
              <button type="button" onClick={() => setMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-linen lg:hidden" aria-label="Menü megnyitása" aria-expanded={menuOpen}>
                <Menu size={22} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobil: alulról felcsúszó lap */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-[2px] lg:hidden" onClick={() => setMenuOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menü"
              className="linen fixed inset-x-0 bottom-0 z-[61] rounded-t-[32px] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 shadow-nav lg:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => info.offset.y > 80 && setMenuOpen(false)}
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink/15" />
              <div className="mb-2 flex items-center justify-between">
                <span className="eyebrow">Menü</span>
                <button type="button" onClick={() => setMenuOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink" aria-label="Menü bezárása">
                  <Close size={20} />
                </button>
              </div>
              <ul className="divide-y divide-line">
                {[{ to: '/', label: 'Kezdőlap' }, ...NAV_LINKS].map((l, i) => (
                  <motion.li key={l.to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                    <NavLink to={l.to} end {...navProps} className={({ isActive }) => `flex items-center justify-between py-4 font-display text-step-2 ${isActive ? 'text-paprika' : 'text-ink'}`}>
                      {l.label}
                      <ArrowRight size={20} className="opacity-40" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 w-full">
                <TikTok size={16} /> Főzzünk együtt a TikTokon
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
