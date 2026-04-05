import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen font-sans text-brand-dark relative selection:bg-brand-mid selection:text-white">
      
      {/* --- FELJAVÍTOTT, LÁTVÁNYOSABB MESH GRADIENT HÁTTÉR --- */}
      <div className="fixed inset-0 z-0 bg-[#CBB8A5] overflow-hidden">
        
        {/* 1. Hatalmas, ragyogó fehér fény középen felül (Ez emeli ki az olvasandó tartalmat) */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1400px] h-[1000px] bg-[#F7F2EC] rounded-full blur-[100px] opacity-100 pointer-events-none"></div>
        
        {/* 2. Intenzív, sötétebb karamell/kávé folt a jobb alsó sarokban */}
        <div className="absolute bottom-[5%] right-[-10%] w-[700px] h-[700px] bg-[#8B6B53] rounded-full blur-[130px] opacity-80 pointer-events-none"></div>
        
        {/* 3. Meleg, sötétebb bézs/barna folt a bal oldalon */}
        <div className="absolute top-[20%] left-[-15%] w-[600px] h-[600px] bg-[#A78D78] rounded-full blur-[140px] opacity-70 pointer-events-none"></div>

        {/* 4. Opcionális extra: Egy apróbb, élénkebb folt bal alul, hogy teljes legyen a háló */}
        <div className="absolute bottom-[-20%] left-[10%] w-[500px] h-[500px] bg-[#6E473B] rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
      </div>
      {/* ----------------------------------------------------------- */}

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
          <Outlet />
        </main>
        
        <footer className="bg-brand-dark text-brand-bg py-8 text-center mt-auto border-t border-brand-mid/30">
          <p className="opacity-80 text-sm">© {new Date().getFullYear()} Pógyor Erika (@eranagy20). Minden jog fenntartva.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;