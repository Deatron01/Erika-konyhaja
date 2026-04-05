// src/pages/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  // Állapotok a gomb és a visszajelzés kezelésére
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Összegyűjtjük az űrlap adatait
    const formData = new FormData(e.target);
    
    // A TE WEB3FORMS KULCSOD:
    formData.append("access_key", "8e863443-9ff1-42fd-b3dc-e72121af6242");
    
    // Egy kis rejtett mező, hogy tudd, honnan jött a levél
    formData.append("subject", "Új üzenet az Erika Konyhája weboldalról!");
    formData.append("from_name", "Erika Konyhája Kapcsolat");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        e.target.reset(); // Űrlap kiürítése
        
        // 5 másodperc múlva visszaállítjuk az űrlapot alapállapotba
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error("Hiba:", data);
        setStatus('error');
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-soft border border-brand-beige relative z-10">
      <h1 className="text-3xl font-bold text-brand-dark mb-4">Írj nekem!</h1>
      <p className="text-brand-mid mb-8">
        Kérdésed van egy recepttel kapcsolatban, vagy csak üzennél? Töltsd ki az alábbi űrlapot!
      </p>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-brand-dark font-medium mb-2">Neved</label>
          <input 
            type="text" 
            name="name"
            required
            className="w-full bg-brand-bg/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid transition-colors text-brand-dark"
            placeholder="Kovács Anna"
          />
        </div>
        
        <div>
          <label className="block text-brand-dark font-medium mb-2">Email címed</label>
          <input 
            type="email" 
            name="email"
            required
            className="w-full bg-brand-bg/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid transition-colors text-brand-dark"
            placeholder="anna@pelda.hu"
          />
        </div>
        
        <div>
          <label className="block text-brand-dark font-medium mb-2">Üzenet</label>
          <textarea 
            name="message"
            required
            rows="5"
            className="w-full bg-brand-bg/50 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid transition-colors text-brand-dark resize-none"
            placeholder="Szia Erika! A tegnapi tészta isteni lett..."
          ></textarea>
        </div>

        {/* Visszajelzések a felhasználónak */}
        {status === 'success' && (
          <div className="bg-green-100 text-green-700 p-4 rounded-xl font-bold text-center border border-green-200">
            ✅ Köszönjük! Az üzenetet sikeresen elküldtük.
          </div>
        )}
        
        {status === 'error' && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl font-bold text-center border border-red-200">
            ❌ Hiba történt a küldés során. Kérjük, próbáld újra később!
          </div>
        )}

        <button 
          type="submit"
          disabled={status === 'submitting'}
          className={`w-full py-3.5 rounded-xl font-semibold text-lg transition-all shadow-md active:scale-95 flex justify-center items-center gap-2
            ${status === 'submitting' 
              ? 'bg-brand-mid/50 text-white cursor-not-allowed' 
              : 'bg-brand-dark text-brand-bg hover:bg-brand-mid'}`}
        >
          {status === 'submitting' ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Küldés folyamatban...
            </>
          ) : (
            'Üzenet küldése'
          )}
        </button>
      </form>
    </div>
  );
};

export default Contact;