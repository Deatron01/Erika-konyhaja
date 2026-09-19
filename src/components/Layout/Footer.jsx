// src/components/Layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, NAV_LINKS, TIKTOK_URL } from './Navbar';
import { StitchDivider } from '../UI/Stitch';
import { TikTok } from '../UI/Icons';

const Footer = () => (
  <footer className="linen mt-auto">
    <div className="container-site pb-10 pt-16">
      <StitchDivider className="mb-14" />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-ink-soft">
            Kárpátaljai és magyar házi receptek – úgy, ahogy nálunk otthon készülnek. Szívvel-lélekkel, videóval.
          </p>
          <p className="font-hand text-[1.6rem] leading-none text-paprika">Jó étvágyat! – Erika</p>
        </div>

        <div>
          <p className="eyebrow mb-4 text-ink-soft">Oldalak</p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-draw text-ink transition-colors hover:text-paprika">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-ink-soft">Főzzünk együtt</p>
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <TikTok size={16} /> @eranagy20
          </a>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-step-n1 text-ink-soft md:flex-row">
        <p>© {new Date().getFullYear()} Pógyor Erika – Erika Konyhája</p>
        <Link to="/login" className="rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.3em] opacity-40 transition-opacity hover:opacity-100">
          Adminisztráció
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
