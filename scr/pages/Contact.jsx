import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-brand-beige">
      <h1 className="text-3xl font-bold text-brand-dark mb-4">Írj nekem!</h1>
      <p className="text-brand-mid mb-8">Kérdésed van egy recepttel kapcsolatban, vagy csak üzennél? Töltsd ki az alábbi űrlapot!</p>
      
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-brand-dark font-medium mb-2">Neved</label>
          <input 
            type="text" 
            className="w-full bg-brand-bg/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid transition-colors text-brand-dark"
            placeholder="Kovács Anna"
          />
        </div>
        <div>
          <label className="block text-brand-dark font-medium mb-2">Email címed</label>
          <input 
            type="email" 
            className="w-full bg-brand-bg/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid transition-colors text-brand-dark"
            placeholder="anna@pelda.hu"
          />
        </div>
        <div>
          <label className="block text-brand-dark font-medium mb-2">Üzenet</label>
          <textarea 
            rows="5"
            className="w-full bg-brand-bg/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid transition-colors text-brand-dark resize-none"
            placeholder="Szia Erika! A tegnapi tészta isteni lett..."
          ></textarea>
        </div>
        <button 
          type="submit"
          className="w-full bg-brand-dark text-brand-bg py-3.5 rounded-xl hover:bg-brand-mid transition-colors font-semibold text-lg"
        >
          Üzenet küldése
        </button>
      </form>
    </div>
  );
};

export default Contact;