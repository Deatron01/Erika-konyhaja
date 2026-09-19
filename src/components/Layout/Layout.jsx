// src/components/Layout/Layout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import CommandSearch from './CommandSearch';

const Layout = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();

  // "/" vagy ⌘K / Ctrl+K nyitja a keresőt
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => setSearchOpen(false), [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col bg-cream text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-paprika focus:px-4 focus:py-2 focus:text-on-paprika">
        Ugrás a tartalomra
      </a>

      <Navbar onSearch={() => setSearchOpen(true)} />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <AnimatePresence>{searchOpen && <CommandSearch onClose={() => setSearchOpen(false)} />}</AnimatePresence>

      {/* Filmszemcse / lisztpor – a lapos digitális krémet papírszerűvé teszi */}
      <div className="grain" aria-hidden="true" />

      <ScrollRestoration />
    </div>
  );
};

export default Layout;
