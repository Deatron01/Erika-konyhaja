// src/components/Recipe/VideoFacade.jsx
// "Homlokzat" minta: amíg senki nem kattint, csak egy borítókép + lejátszás gomb látszik.
// A nehéz TikTok iframe csak kattintásra töltődik be – így az oldal gyors marad.
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import RecipePoster from './RecipePoster';
import { Play } from '../UI/Icons';

const VideoFacade = ({ recipe, className = '', priority = false, posterStyle, label = 'Videó lejátszása' }) => {
  const [playing, setPlaying] = useState(false);
  const id = recipe?.tikTokId?.trim();

  return (
    <div className={`relative aspect-[9/16] w-full overflow-hidden rounded-frame bg-ink/10 shadow-card ${className}`}>
      <AnimatePresence initial={false}>
        {!playing && (
          <motion.button
            key="poster"
            type="button"
            onClick={() => id && setPlaying(true)}
            disabled={!id}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="group absolute inset-0 z-10 block h-full w-full text-left"
            aria-label={`${label}: ${recipe?.title ?? ''}`}
          >
            <RecipePoster recipe={recipe} priority={priority} className="h-full w-full" style={posterStyle} imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
            {id && (
              <span className="absolute inset-0 grid place-items-center">
                <span className="relative grid h-[72px] w-[72px] place-items-center rounded-full bg-cream/95 text-paprika shadow-lift transition-transform duration-500 ease-out group-hover:scale-110">
                  <span className="absolute inset-0 rounded-full ring-1 ring-cream/60 transition-transform duration-700 ease-out group-hover:scale-125 group-hover:opacity-0" />
                  <Play size={26} className="translate-x-[2px]" />
                </span>
              </span>
            )}
            <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[0.8rem] font-semibold text-white/95">
              <span>Nézd meg, hogyan készül</span>
              <span className="tag tag-glass">TikTok</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {playing && id && (
        <iframe
          src={`https://www.tiktok.com/embed/v2/${id}?autoplay=1`}
          title={`TikTok videó: ${recipe?.title ?? ''}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          scrolling="no"
          className="absolute inset-0 h-full w-full border-0 bg-black"
        />
      )}
    </div>
  );
};

export default VideoFacade;
