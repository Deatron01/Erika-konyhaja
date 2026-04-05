// src/pages/Admin/AdminDashboard.jsx
import React, { useState, useContext } from 'react';
import { RecipeContext } from '../../context/RecipeContext';

const AdminDashboard = () => {
  // JAVÍTVA: Itt setDailyRecipe-t kell használni, mert így neveztük el a Context-ben!
  const { recipes, addRecipe, deleteRecipe, updateRecipe, setDailyRecipe } = useContext(RecipeContext);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    image: '',
    tikTokId: '',
    ingredients: [''],
    steps: ['']
  });

  const resetForm = () => {
    setFormData({ title: '', shortDescription: '', image: '', tikTokId: '', ingredients: [''], steps: [''] });
    setEditingId(null);
  };

  const handleEdit = (recipe) => {
    setFormData(recipe);
    setEditingId(recipe.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exportRecipes = () => {
  // Kivesszük az összes aktuális receptet a Context-ből
  const data = JSON.stringify(recipes, null, 2);
  
  // Kimásoljuk a vágólapra (clipboard)
  navigator.clipboard.writeText(`export const recipes = ${data};`)
    .then(() => alert("Siker! Az összes recept kimásolva a vágólapra JS formátumban."))
    .catch(err => console.error("Hiba a másoláskor:", err));
};
  // Kép konvertálása Base64-be
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateRecipe({ ...formData, id: editingId });
    } else {
      addRecipe({ ...formData, id: Date.now().toString() });
    }
    resetForm();
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 relative z-10 pb-20">
      {/* Fejléc kijelentkezéssel */}
      <div className="flex justify-between items-center border-b border-brand-beige pb-4">
        <h1 className="text-3xl font-bold text-brand-dark">
          {editingId ? '📝 Recept Szerkesztése' : 'Új Recept Feltöltése'}
        </h1>
        <button 
          onClick={exportRecipes}
          className="bg-green-600/20 text-green-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-600 hover:text-white transition-all border border-green-600/30"
        >
          📥 Adatok mentése fájlba
        </button>
        <button 
          onClick={handleLogout}
          className="text-xs font-bold text-red-600/60 hover:text-red-600 uppercase tracking-widest transition-colors"
        >
          Kijelentkezés
        </button>
      </div>

      {/* --- FŐ ŰRLAP --- */}
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-soft border border-brand-beige space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark ml-1">Recept címe</label>
            <input required placeholder="pl. Kárpátaljai töltött káposzta" className="w-full p-3 rounded-xl border border-brand-beige bg-brand-bg/20 focus:outline-none focus:border-brand-light" 
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark ml-1">TikTok Videó ID</label>
            <input placeholder="pl. 732123456789..." className="w-full p-3 rounded-xl border border-brand-beige bg-brand-bg/20 focus:outline-none focus:border-brand-light"
              value={formData.tikTokId} onChange={e => setFormData({...formData, tikTokId: e.target.value})} />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark ml-1">Rövid kedvcsináló leírás</label>
          <textarea required placeholder="Mesélj pár szót az ételről..." className="w-full p-3 rounded-xl border border-brand-beige bg-brand-bg/20 h-24 resize-none focus:outline-none focus:border-brand-light"
            value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hozzávalók kezelése */}
          <div className="space-y-4">
            <label className="font-bold text-brand-dark">Hozzávalók</label>
            {formData.ingredients.map((ing, idx) => (
              <input key={idx} value={ing} onChange={e => {
                const newIngs = [...formData.ingredients];
                newIngs[idx] = e.target.value;
                setFormData({...formData, ingredients: newIngs});
              }} className="w-full p-2 rounded-lg border border-brand-beige bg-white/50 mb-2" placeholder={`${idx+1}. hozzávaló`} />
            ))}
            <button type="button" onClick={() => setFormData({...formData, ingredients: [...formData.ingredients, '']})} className="text-sm text-brand-light font-bold">+ Hozzáadás</button>
          </div>

          {/* Képfeltöltés */}
          <div className="space-y-4">
            <label className="font-bold text-brand-dark">Borítókép</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-xs" />
            {formData.image && <img src={formData.image} className="w-full h-40 object-cover rounded-2xl border border-brand-beige" alt="preview" />}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="flex-1 bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-mid transition-all shadow-md">
            {editingId ? 'Módosítások mentése' : 'Recept publikálása'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-8 py-4 border border-brand-beige rounded-2xl text-brand-dark font-bold hover:bg-white transition-all">Mégse</button>
          )}
        </div>
      </form>

      {/* --- RECEPT LISTA --- */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
          Konyhád kincsei <span className="bg-brand-light text-white text-xs px-2 py-1 rounded-full">{recipes.length}</span>
        </h2>
        <div className="grid gap-4">
          {recipes.map(recipe => (
            <div key={recipe.id} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-brand-beige/30">
              <div className="flex items-center gap-4">
                <span className="font-bold text-brand-dark">{recipe.title}</span>
                {recipe.isDaily && (
                  <span className="bg-brand-light text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-tighter">
                    Aktuális napi
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setDailyRecipe(recipe.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    recipe.isDaily 
                    ? 'bg-brand-mid text-white shadow-inner' 
                    : 'bg-white text-brand-mid border border-brand-mid/20 hover:bg-brand-mid/10'
                  }`}
                >
                  {recipe.isDaily ? '★ Kiemelve' : '☆ Legyen napi'}
                </button>
                <button onClick={() => handleEdit(recipe)} className="p-2 text-brand-mid hover:bg-brand-bg rounded-lg">Szerkesztés</button>
                <button onClick={() => deleteRecipe(recipe.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">Törlés</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;