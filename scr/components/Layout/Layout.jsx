import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans text-brand-dark">
      <Navbar />
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-brand-dark text-brand-bg py-8 text-center">
        <p className="opacity-80">© {new Date().getFullYear()} Pógyor Erika (@eranagy20). Minden jog fenntartva.</p>
      </footer>
    </div>
  );
};

export default Layout;