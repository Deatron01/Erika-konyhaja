import React from 'react';

const Login = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-brand-beige w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-2">Admin Belépés</h1>
          <p className="text-brand-mid">Csak jogosult felhasználóknak.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-brand-dark font-medium mb-2">Felhasználónév</label>
            <input 
              type="text" 
              className="w-full bg-brand-bg/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid transition-colors"
            />
          </div>
          <div>
            <label className="block text-brand-dark font-medium mb-2">Jelszó</label>
            <input 
              type="password" 
              className="w-full bg-brand-bg/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid transition-colors"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-dark text-brand-bg py-3.5 rounded-xl hover:bg-brand-mid transition-colors font-semibold text-lg mt-4"
          >
            Belépés
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;