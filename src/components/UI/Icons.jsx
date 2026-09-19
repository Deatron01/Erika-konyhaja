// src/components/UI/Icons.jsx
// Egyszerű, vonalas ikonok (1.6px vonal, currentColor), hogy illeszkedjenek a hímzett motívumokhoz.
import React from 'react';

const Svg = ({ children, size = 20, className = '', strokeWidth = 1.6, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...rest}
  >
    {children}
  </svg>
);

export const ArrowRight = (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>;
export const ArrowLeft = (p) => <Svg {...p}><path d="M19 12H5M11 18l-6-6 6-6" /></Svg>;
export const Clock = (p) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Svg>;
export const Users = (p) => <Svg {...p}><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" /><path d="M15.5 5.6a3 3 0 0 1 0 5.8M17.5 14.6c1.6.6 2.7 2.1 3 4.4" /></Svg>;
export const Search = (p) => <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></Svg>;
export const Close = (p) => <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>;
export const Menu = (p) => <Svg {...p}><path d="M4 8h16M4 16h10" /></Svg>;
export const Sun = (p) => <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></Svg>;
export const Moon = (p) => <Svg {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></Svg>;
export const Check = (p) => <Svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>;
export const Minus = (p) => <Svg {...p}><path d="M6 12h12" /></Svg>;
export const Plus = (p) => <Svg {...p}><path d="M12 6v12M6 12h12" /></Svg>;
export const Pan = (p) => <Svg {...p}><circle cx="10" cy="13" r="6.5" /><path d="M16.5 13H22M7.5 11.5c.6-1.2 1.6-1.9 3-2" /></Svg>;

export const Play = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" fill="currentColor" />
  </svg>
);

export const Heart = ({ filled, ...p }) => (
  <Svg {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" />
  </Svg>
);

export const TikTok = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      fill="currentColor"
      d="M16.6 3c.3 2.3 1.6 3.7 3.9 3.9v2.6c-1.4.1-2.6-.3-3.9-1.1v5.3c0 6.7-7.3 8.8-10.2 4-1.9-3.1-.7-8.5 5.4-8.7v2.8c-.5.1-1 .2-1.4.3-1.4.5-2.2 1.3-2 2.8.4 2.9 5.7 3.8 5.3-1.9V3h2.9Z"
    />
  </svg>
);

// ── Kategória ikonok ──
export const CategoryIcon = ({ name, ...p }) => {
  switch (name) {
    case 'pot':
      return <Svg {...p}><path d="M4 10h16v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-5Z" /><path d="M2 10h2M20 10h2M9 6.5c0-1 1-1.2 1-2.2M13 6.5c0-1 1-1.2 1-2.2" /></Svg>;
    case 'plate':
      return <Svg {...p}><circle cx="12" cy="13" r="6.5" /><circle cx="12" cy="13" r="3.5" /><path d="M3 4v5.5M1.8 4v3.2a1.2 1.2 0 0 0 2.4 0V4M21 4c-1.3 1-1.6 3-1.6 5h1.6v11" /></Svg>;
    case 'wheat':
      return <Svg {...p}><path d="M12 21V9" /><path d="M12 9c-2.4 0-3.5-1.6-3.5-4 2.4 0 3.5 1.6 3.5 4ZM12 9c2.4 0 3.5-1.6 3.5-4-2.4 0-3.5 1.6-3.5 4ZM12 14c-2.4 0-3.5-1.6-3.5-4 2.4 0 3.5 1.6 3.5 4ZM12 14c2.4 0 3.5-1.6 3.5-4-2.4 0-3.5 1.6-3.5 4ZM12 19c-2.4 0-3.5-1.6-3.5-4 2.4 0 3.5 1.6 3.5 4ZM12 19c2.4 0 3.5-1.6 3.5-4-2.4 0-3.5 1.6-3.5 4Z" /></Svg>;
    case 'cake':
      return <Svg {...p}><path d="M4 20h16M5 20v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" /><path d="M5 15.5c1.2 1 2.3 1 3.5 0s2.3-1 3.5 0 2.3 1 3.5 0 2.3-1 3.5 0M12 12V8.5M12 6.5c-.8-.7-.8-1.7 0-3 .8 1.3.8 2.3 0 3Z" /></Svg>;
    case 'bowl':
      return <Svg {...p}><path d="M3 11h18a9 9 0 0 1-18 0Z" /><path d="M8 11c0-2 1.2-3.5 3-3.5M13.5 11c.2-2.6 2-4.5 4.5-4.8M10 7.5c.5-1.8 1.8-3 3.5-3.3" /></Svg>;
    case 'stitch':
      return <Svg {...p}><path d="m5 5 4 4M9 5 5 9M15 5l4 4M19 5l-4 4M10 10l4 4M14 10l-4 4M5 15l4 4M9 15l-4 4M15 15l4 4M19 15l-4 4" /></Svg>;
    case 'star':
      return <Svg {...p}><path d="m12 3.5 2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.4l-5.1 2.8L8 13.5l-4.3-4 5.8-.7L12 3.5Z" /></Svg>;
    case 'all':
      return <Svg {...p}><rect x="4" y="4" width="6.5" height="6.5" rx="2" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="2" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="2" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2" /></Svg>;
    case 'heart':
      return <Heart {...p} />;
    default:
      return null;
  }
};

export const DifficultyDots = ({ level = 1, className = '' }) => (
  <span className={`inline-flex gap-[3px] ${className}`} aria-hidden="true">
    {[1, 2, 3].map((i) => (
      <span key={i} className={`h-1.5 w-1.5 rounded-full ${i <= level ? 'bg-current' : 'bg-current opacity-25'}`} />
    ))}
  </span>
);
