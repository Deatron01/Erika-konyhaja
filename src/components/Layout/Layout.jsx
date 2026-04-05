// src/components/Layout/Layout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen font-sans text-brand-dark relative selection:bg-brand-mid selection:text-white">
      
      {/* --- MODERN, VIGNETTE-HATÁSÚ HÁTTÉR --- */}
      <div className="fixed inset-0 z-0 bg-[#EBE3D9] overflow-hidden">
        
        {/* 1. KÖZPONTI VILÁGOSSÁG: Marad a tiszta fehér ragyogás a közepén */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[100vh] bg-white rounded-full blur-[150px] opacity-90 pointer-events-none"></div>

        {/* 2. SÖTÉTEDŐ SZÉLEK ÉS SARKOK (Vignette) */}
        {/* Bal felső sötétebb folt */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#6E473B] rounded-full blur-[120px] opacity-40 pointer-events-none"></div>
        
        {/* Jobb alsó sötétebb folt */}
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-[#291C0E] rounded-full blur-[140px] opacity-45 pointer-events-none"></div>
        
        {/* Bal alsó mélyebb tónus */}
        <div className="absolute bottom-[-10%] left-[-15%] w-[450px] h-[450px] bg-[#3D2B1F] rounded-full blur-[100px] opacity-35 pointer-events-none"></div>

        {/* 3. EXTRA SÖTÉTÍTÉS A SZÉLEKEN (Gradiens keret) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#291C0E]/20 via-transparent to-[#291C0E]/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#291C0E]/10 via-transparent to-[#291C0E]/10 pointer-events-none"></div>
      </div>

      {/* TARTALOM */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
          <Outlet />
        </main>
        
        {/* FOOTER */}
        <footer className="bg-brand-dark/90 backdrop-blur-md text-brand-bg py-12 mt-auto border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="opacity-70 text-sm font-medium tracking-wide">
                © {new Date().getFullYear()} <span className="font-bold">Pógyor Erika</span> – Erika Konyhája
              </p>
              <p className="opacity-30 text-[10px] mt-1.5 uppercase tracking-[0.3em] font-bold italic">
                Kárpátaljai receptek szívvel-lélekkel
              </p>
            </div>

            <Link 
              to="/login" 
              className="text-[9px] uppercase tracking-[0.4em] opacity-20 hover:opacity-100 hover:text-brand-light transition-all duration-700 py-2 px-4 border border-white/10 rounded-full"
            >
              Adminisztráció
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;