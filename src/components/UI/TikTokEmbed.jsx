import React from 'react';

const TikTokEmbed = ({ videoId, asHero = false, autoplay = false }) => {
  if (!videoId) return null;

  // Stílusok borítókép nézethez vs. standard nézethez
  const containerClass = asHero 
    ? "w-full flex justify-center bg-brand-dark/10 relative z-10 h-[450px] md:h-[600px] overflow-hidden" // Borítókép stílus
    : "flex justify-center w-full my-8"; // Standard nézet a recept alján

  const iframeStyle = asHero
    ? { 
        // Borítókép nézetben megpróbáljuk a lehető legjobban kitölteni a teret
        width: '100%', 
        maxWidth: '350px', // TikTok portré arány miatt korlátozzuk a szélességet
        height: '100%', 
        border: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(1.1)' // Enyhe nagyítás a kitöltésért
      }
    : { 
        width: '100%', 
        maxWidth: '325px', 
        height: '580px', 
        border: 'none',
        borderRadius: '16px', // Kerek sarok a standard nézethez
        boxShadow: '0 4px 20px -2px rgba(41, 28, 14, 0.08)' // Soft shadow
      };

  // Az autoplay-hez gyakran szükséges a 'muted=1' paraméter a URL-ben,
  // hogy a böngészők engedélyezzék a lejátszást interakció nélkül.
  const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}${autoplay ? '?autoplay=1&muted=1' : ''}`;

  return (
    <div className={containerClass}>
      <iframe
        src={embedUrl}
        style={iframeStyle}
        allowFullScreen
        scrolling="no"
        title="TikTok Video Player"
        // Fontos engedélyezni az autoplay-t
        allow="autoplay; encrypted-media; picture-in-picture"
      />
    </div>
  );
};

export default TikTokEmbed;