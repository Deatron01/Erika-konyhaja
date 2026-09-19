// src/pages/Admin/AdminDashboard.jsx
import React, { useState, useContext } from 'react';
import { RecipeContext } from '../../context/RecipeContext';
import { CATEGORIES, REGIONS, DIFFICULTY } from '../../data/taxonomy';

const EMPTY_FORM = {
  title: '',
  shortDescription: '',
  image: '',
  tikTokId: '',
  ingredients: [''],
  steps: [''],
  category: 'foetelek',
  region: 'magyar',
  timeMinutes: 45,
  difficulty: 1,
  servings: 4,
  tip: '',
  tags: [],
};

const AdminDashboard = () => {
  // JAVÍTVA: Itt setDailyRecipe-t kell használni, mert így neveztük el a Context-ben!
  const { recipes, addRecipe, deleteRecipe, updateRecipe, setDailyRecipe } = useContext(RecipeContext);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
  };

  const handleEdit = (recipe) => {
    setFormData({ ...EMPTY_FORM, ...recipe });
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
    <div className="max-w-5xl mx-auto space-y-12 relative z-10 px-4 pb-20 pt-32">
      {/* Fejléc kijelentkezéssel */}
      <div className="flex flex-wrap gap-3 justify-between items-center border-b border-brand-beige pb-4">
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
      <form onSubmit={handleSubmit} className="bg-surface backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-soft border border-brand-beige space-y-8">
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

        {/* Kategória, tájegység, idő, nehézség, adag – a szűrők és a kártyák ezekből dolgoznak */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <label className="space-y-2 col-span-2 md:col-span-1">
            <span className="text-sm font-bold text-brand-dark ml-1">Kategória</span>
            <select className="w-full p-3 rounded-xl border border-brand-beige bg-brand-bg/20" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-bold text-brand-dark ml-1">Tájegység</span>
            <select className="w-full p-3 rounded-xl border border-brand-beige bg-brand-bg/20" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})}>
              {Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-bold text-brand-dark ml-1">Idő (perc)</span>
            <input type="number" min="1" className="w-full p-3 rounded-xl border border-brand-beige bg-brand-bg/20" value={formData.timeMinutes || ''} onChange={e => setFormData({...formData, timeMinutes: Number(e.target.value)})} />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-bold text-brand-dark ml-1">Nehézség</span>
            <select className="w-full p-3 rounded-xl border border-brand-beige bg-brand-bg/20" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: Number(e.target.value)})}>
              {Object.entries(DIFFICULTY).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-bold text-brand-dark ml-1">Adag</span>
            <input type="number" min="1" className="w-full p-3 rounded-xl border border-brand-beige bg-brand-bg/20" value={formData.servings || ''} onChange={e => setFormData({...formData, servings: Number(e.target.value)})} />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="space-y-2">
            <span className="text-sm font-bold text-brand-dark ml-1">Címkék (vesszővel)</span>
            <input placeholder="pl. ünnepi, gyors, egytál" className="w-full p-3 rounded-xl border border-brand-beige bg-brand-bg/20"
              value={(formData.tags || []).join(', ')} onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})} />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-bold text-brand-dark ml-1">Erika tippje (nem kötelező)</span>
            <input placeholder="pl. A tésztát hagyd pihenni egy éjszakát!" className="w-full p-3 rounded-xl border border-brand-beige bg-brand-bg/20"
              value={formData.tip || ''} onChange={e => setFormData({...formData, tip: e.target.value})} />
          </label>
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
              }} className="w-full p-2 rounded-lg border border-brand-beige bg-surface/60 mb-2" placeholder={`${idx+1}. hozzávaló`} />
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
          <button type="submit" className="flex-1 bg-paprika text-on-paprika py-4 rounded-2xl font-bold hover:bg-paprika-deep transition-all shadow-md">
            {editingId ? 'Módosítások mentése' : 'Recept publikálása'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-8 py-4 border border-brand-beige rounded-2xl text-brand-dark font-bold hover:bg-surface transition-all">Mégse</button>
          )}
        </div>
      </form>

      {/* --- RECEPT LISTA --- */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
          Konyhád kincsei <span className="bg-paprika text-on-paprika text-xs px-2 py-1 rounded-full">{recipes.length}</span>
        </h2>
        <div className="grid gap-4">
          {recipes.map(recipe => (
            <div key={recipe.id} className="flex flex-wrap items-center justify-between gap-3 p-4 bg-surface/60 rounded-2xl border border-brand-beige/30">
              <div className="flex items-center gap-4">
                <span className="font-bold text-brand-dark">{recipe.title}</span>
                {recipe.isDaily && (
                  <span className="bg-paprika text-on-paprika text-[10px] px-2 py-1 rounded-full uppercase tracking-tighter">
                    Aktuális napi
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setDailyRecipe(recipe.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    recipe.isDaily 
                    ? 'bg-ink-soft text-cream shadow-inner' 
                    : 'bg-surface text-brand-mid border border-brand-mid/20 hover:bg-brand-mid/10'
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