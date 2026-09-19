import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Felhasználói adatbázis (később ez mehet Firebase-be)
  const admins = [
    { 
      email: 'erikapogyor1@gmail.com', 
      password: '20150627Bence' 
    },
    { 
      email: 'n.i.pityu@gmail.com', 
      password: '20150627Erika' 
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log("Próbálkozás ezzel az emaillel:", email); // DEBUG infó
    
    const user = admins.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (user) {
      console.log("Sikeres belépés!"); // DEBUG infó
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/admin');
    } else {
      console.log("Sikertelen belépés: Hibás adatok"); // DEBUG infó
      setError('Hibás e-mail cím vagy jelszó!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 mb-20 p-10 bg-surface backdrop-blur-md rounded-[2.5rem] shadow-soft border border-brand-beige text-center relative z-10">
      <h2 className="text-2xl font-bold text-brand-dark mb-2">Admin Belépés</h2>
      <p className="text-sm text-brand-mid mb-8 opacity-70 italic">Csak Erika és Bence részére</p>
      
      <form onSubmit={handleLogin} className="space-y-4 text-left">
        <div className="space-y-1">
          <label className="text-xs font-bold text-brand-dark ml-2 uppercase opacity-60">E-mail cím</label>
          <input 
            type="email" 
            placeholder="pelda@gmail.com" 
            className="w-full p-4 rounded-2xl border border-brand-beige bg-brand-bg/20 focus:outline-none focus:border-brand-light transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-brand-dark ml-2 uppercase opacity-60">Jelszó</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full p-4 rounded-2xl border border-brand-beige bg-brand-bg/20 focus:outline-none focus:border-brand-light transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-xs py-2 px-4 rounded-xl font-bold animate-pulse">
            {error}
          </div>
        )}

        <button className="w-full bg-paprika text-on-paprika py-4 rounded-2xl font-bold hover:bg-paprika-deep transition-all shadow-md active:scale-95 mt-4">
          Belépés a vezérlőpultra
        </button>
      </form>
    </div>
  );
};

export default Login;