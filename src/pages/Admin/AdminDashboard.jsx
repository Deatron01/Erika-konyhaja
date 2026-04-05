import React, { useState, useContext } from 'react';
import { RecipeContext } from '../../context/RecipeContext';

const AdminDashboard = () => {
  const { addRecipe } = useContext(RecipeContext); // Behúzzuk a mentő függvényt

  // Űrlap állapotok (State)
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [image, setImage] = useState('');
  const [tikTokId, setTikTokId] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [isSuccess, setIsSuccess] = useState(false); // Sikeres mentés jelzője

  // Hozzávalók és lépések kezelése
  const handleIngredientChange = (text, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    setIngredients(newIngredients);
  };

  const handleStepChange = (text, index) => {
    const newSteps = [...steps];
    newSteps[index] = text;
    setSteps(newSteps);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const addStep = () => setSteps([...steps, '']);

  // Mentés gomb logikája
  const handleSubmit = (e) => {
    e.preventDefault();

    // Létrehozzuk a recept objektumot
    const newRecipe = {
      id: Date.now().toString(), // Egyedi azonosító generálása a pontos időből
      title,
      shortDescription,
      image: image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800", // Alapértelmezett kép, ha üres
      tikTokId,
      ingredients: ingredients.filter(ing => ing.trim() !== ''), // Üres sorok kiszűrése
      steps: steps.filter(step => step.trim() !== ''),
      isDaily: false // Alapból nem napi recept
    };

    // Elmentjük
    addRecipe(newRecipe);

    // Siker üzenet és űrlap ürítése
    setIsSuccess(true);
    setTitle('');
    setShortDescription('');
    setImage('');
    setTikTokId('');
    setIngredients(['']);
    setSteps(['']);

    // 3 másodperc után eltüntetjük a siker üzenetet
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-brand-beige pb-6">
        <h1 className="text-3xl font-bold text-brand-dark">Új Recept Feltöltése</h1>
      </div>

      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative">
          Szuper! A recept sikeresen mentve lett.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-soft border border-brand-beige space-y-8 relative z-10">
        
        {/* Alapadatok */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-brand-dark font-medium mb-2">Recept címe *</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="pl. Krémes Toszkán Csirke" className="w-full bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-brand-dark font-medium mb-2">Rövid leírás *</label>
            <textarea required value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows="2" placeholder="Egy-két mondatos kedvcsináló..." className="w-full bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid resize-none"></textarea>
          </div>
          <div>
            <label className="block text-brand-dark font-medium mb-2">Borítókép URL</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text" placeholder="https://..." className="w-full bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid" />
          </div>
          <div>
            <label className="block text-brand-dark font-medium mb-2">TikTok Videó ID</label>
            <input value={tikTokId} onChange={(e) => setTikTokId(e.target.value)} type="text" placeholder="pl. 7321234567890123456" className="w-full bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-3 focus:outline-none focus:border-brand-mid focus:ring-1 focus:ring-brand-mid" />
          </div>
        </div>

        <hr className="border-brand-beige" />

        {/* Hozzávalók */}
        <div>
          <label className="block text-brand-dark font-bold text-lg mb-4">Hozzávalók *</label>
          <div className="space-y-3 mb-4">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2">
                <input required={idx === 0} value={ing} onChange={(e) => handleIngredientChange(e.target.value, idx)} type="text" placeholder={`Hozzávaló ${idx + 1}`} className="flex-1 bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-2 focus:outline-none focus:border-brand-mid" />
              </div>
            ))}
          </div>
          <button type="button" onClick={addIngredient} className="text-brand-mid font-medium hover:text-brand-dark flex items-center gap-1">
            + Új hozzávaló hozzáadása
          </button>
        </div>

        <hr className="border-brand-beige" />

        {/* Lépések */}
        <div>
          <label className="block text-brand-dark font-bold text-lg mb-4">Elkészítés Lépései *</label>
          <div className="space-y-3 mb-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="w-10 h-10 flex-shrink-0 bg-brand-light rounded-xl flex items-center justify-center font-bold text-brand-dark">{idx + 1}</div>
                <textarea required={idx === 0} value={step} onChange={(e) => handleStepChange(e.target.value, idx)} rows="2" placeholder={`Lépés ${idx + 1} leírása...`} className="flex-1 bg-brand-bg/30 border border-brand-beige rounded-xl px-4 py-2 focus:outline-none focus:border-brand-mid resize-none"></textarea>
              </div>
            ))}
          </div>
          <button type="button" onClick={addStep} className="text-brand-mid font-medium hover:text-brand-dark flex items-center gap-1">
            + Új lépés hozzáadása
          </button>
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full bg-brand-dark text-brand-bg py-4 rounded-xl hover:bg-brand-mid transition-colors font-bold text-lg shadow-soft">
            Recept Mentése és Publikálása
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;