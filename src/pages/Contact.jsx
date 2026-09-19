// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Reveal, SplitHeadline } from '../components/Motion/Motion';
import { StitchRosette } from '../components/UI/Stitch';
import { TikTok, Check } from '../components/UI/Icons';
import { TIKTOK_URL } from '../components/Layout/Navbar';

const inputClass =
  'w-full rounded-2xl border border-line bg-cream px-4 py-3.5 text-ink transition-[border-color,box-shadow] placeholder:text-ink-soft/50 hover:border-ink/25 focus:border-paprika focus:outline-none focus:ring-4 focus:ring-paprika/15';


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
    <section className="relative overflow-hidden pb-[var(--section)] pt-32 md:pt-40">
      <StitchRosette className="pointer-events-none absolute -left-32 top-24 w-[520px] max-w-none text-paprika opacity-[.04]" />
      <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <Reveal as="p" className="eyebrow">Kapcsolat</Reveal>
          <SplitHeadline className="mt-5 font-display text-step-4 leading-[1] text-ink" lines={['Írj', <span className="accent-word">nekem!</span>]} />
          <Reveal as="p" delay={0.3} className="mt-6 max-w-md text-step-1 text-ink-soft">
            Kérdésed van egy recepttel kapcsolatban, elkészítetted és megosztanád, vagy csak köszönnél? Minden üzenetet elolvasok.
          </Reveal>
          <Reveal delay={0.4} className="mt-10 space-y-4">
            <p className="font-hand text-[1.7rem] leading-none text-paprika">…vagy találkozzunk a TikTokon!</p>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <TikTok size={16} /> @eranagy20
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="rounded-frame border border-line bg-surface p-6 shadow-card md:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-ink">Neved</span>
                <input type="text" name="name" required autoComplete="name" className={inputClass} placeholder="Kovács Anna" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-ink">E-mail címed</span>
                <input type="email" name="email" required autoComplete="email" className={inputClass} placeholder="anna@pelda.hu" />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-ink">Üzenet</span>
              <textarea name="message" required rows="6" className={`${inputClass} resize-none`} placeholder="Szia Erika! A tegnapi tészta isteni lett…" />
            </label>

            {status === 'success' && (
              <p role="status" className="flex items-center gap-3 rounded-2xl bg-dill/15 p-4 font-semibold text-dill">
                <Check size={18} strokeWidth={2.2} /> Köszönöm! Az üzenetedet megkaptam, hamarosan válaszolok.
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="rounded-2xl bg-paprika/10 p-4 font-semibold text-paprika">
                Hiba történt a küldés során. Kérlek, próbáld újra később!
              </p>
            )}

            <button type="submit" disabled={status === 'submitting'} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
              {status === 'submitting' ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-paprika/30 border-t-on-paprika" />
                  Küldés folyamatban…
                </>
              ) : (
                'Üzenet küldése'
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
