// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { StitchRosette } from '../components/UI/Stitch';

const NotFound = () => (
  <div className="container-site flex min-h-[80vh] flex-col items-center justify-center pt-28 text-center">
    <StitchRosette className="w-24 text-paprika opacity-60" />
    <p className="mt-6 font-hand text-[1.9rem] leading-none text-paprika">Ez a lap odaégett…</p>
    <h1 className="mt-3 font-display text-step-3 text-ink">Az oldal nem található</h1>
    <Link to="/" className="btn btn-primary mt-8">Vissza a kezdőlapra</Link>
  </div>
);

export default NotFound;
