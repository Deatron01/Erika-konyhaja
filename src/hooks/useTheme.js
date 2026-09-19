// src/hooks/useTheme.js
// Világos/sötét mód. Alapból a rendszerbeállítást követi; kattintásra felülírható (localStorage).
import { useEffect, useState } from 'react';

const KEY = 'erika_theme';
const media = () => window.matchMedia('(prefers-color-scheme: dark)');

const readStored = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export const useTheme = () => {
  const [stored, setStored] = useState(readStored);
  const [systemDark, setSystemDark] = useState(() => media().matches);

  useEffect(() => {
    const mq = media();
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const isDark = stored ? stored === 'dark' : systemDark;

  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    setStored(next);
  };

  return { isDark, toggle };
};
