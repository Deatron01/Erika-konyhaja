import React, { useState } from 'react';

const AdminDashboard = () => {
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);

  const addIngredient = () => setIngredients([...ingredients, '']);
  const addStep = () => setSteps([...steps, '']);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-brand-beige pb-6">
        <h1 className="text-3xl font-bold text-brand-dark">Új Recept Feltöltése</h1>
        <button className="bg-brand-bg text-brand-dark px-4 py-2 rounded-xl font-medium border border-brand-beige hover:bg-white transition-colors">
          Kilépés
        </button>
      </div>

      <form className="bg-white p-8 md:p-10 rounded-3xl shadow-soft border border-brand-beige space-y-8">
        
        {/* Alapadatok */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-brand-dark font-medium mb-2">Recept címe</label>
            <input type="text" placeholder="pl. Krémes Toszkán Csirke" className="w-full bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-brand-dark font-medium mb-2">Rövid leírás</label>
            <textarea rows="2" placeholder="Egy-két mondatos kedvcsináló..." className="w-full bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid resize-none"></textarea>
          </div>
          <div>
            <label className="block text-brand-dark font-medium mb-2">Borítókép URL (Ideiglenes megoldás)</label>
            <input type="text" placeholder="https://..." className="w-full bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid" />
          </div>
          <div>
            <label className="block text-brand-dark font-medium mb-2">TikTok Videó ID</label>
            <input type="text" placeholder="pl. 7321234567890123456" className="w-full bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid" />
            <span className="text-xs text-brand-light mt-1 inline-block">A videó linkjében található hosszú számsor.</span>
          </div>
        </div>

        <hr className="border-brand-beige" />

        {/* Hozzávalók Listája (Dinamikus) */}
        <div>
          <label className="block text-brand-dark font-bold text-lg mb-4">Hozzávalók</label>
          <div className="space-y-3 mb-4">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" placeholder={`Hozzávaló ${idx + 1}`} className="flex-1 bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-2 focus:outline-none focus:border-brand-mid" />
              </div>
            ))}
          </div>
          <button type="button" onClick={addIngredient} className="text-brand-mid font-medium hover:text-brand-dark flex items-center gap-1">
            + Új hozzávaló hozzáadása
          </button>
        </div>

        <hr className="border-brand-beige" />

        {/* Elkészítés Lépései (Dinamikus) */}
        <div>
          <label className="block text-brand-dark font-bold text-lg mb-4">Elkészítés Lépései</label>
          <div className="space-y-3 mb-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="w-10 h-10 flex-shrink-0 bg-brand-light rounded-xl flex items-center justify-center font-bold text-brand-dark">
                  {idx + 1}
                </div>
                <textarea rows="2" placeholder={`Lépés ${idx + 1} leírása...`} className="flex-1 bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-2 focus:outline-none focus:border-brand-mid resize-none"></textarea>
              </div>
            ))}
          </div>
          <button type="button" onClick={addStep} className="text-brand-mid font-medium hover:text-brand-dark flex items-center gap-1">
            + Új lépés hozzáadása
          </button>
        </div>

        {/* Mentés gomb */}
        <div className="pt-6">
          <button type="button" className="w-full bg-brand-dark text-brand-bg py-4 rounded-xl hover:bg-brand-mid transition-colors font-bold text-lg shadow-soft">
            Recept Mentése és Publikálása
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;