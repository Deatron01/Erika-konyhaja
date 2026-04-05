import React, { useState, useEffect, useRef } from 'react';

const TikTokEmbed = ({ videoId, asHero = false, autoplay = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Megfigyelő beállítása: Figyeli, mikor érünk a videó közelébe
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Ha egyszer betöltött, nem kell többször figyelni
        }
      },
      { 
        rootMargin: '300px', // Már 300px-el azelőtt elkezdi tölteni, hogy a képernyőre érne
        threshold: 0.1 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!videoId) return null;

  // Stílusok (maradtak a te pixelpontos beállításaid)
  const containerClass = asHero 
    ? "w-full flex justify-center bg-brand-dark/10 relative z-10 h-[580px] md:h-[650px] overflow-hidden rounded-[2rem]" 
    : "flex justify-center w-full my-8 min-h-[580px]";

  const iframeStyle = asHero
    ? { 
        width: '100%', 
        maxWidth: '360px', 
        height: '100%', 
        minHeight: '580px', 
        border: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }
    : { 
        width: '100%', 
        maxWidth: '325px', 
        height: '580px', 
        border: 'none',
        borderRadius: '16px',
        boxShadow: '0 4px 20px -2px rgba(21, 0, 22, 0.08)'
      };

  const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}${autoplay ? '?autoplay=1&muted=1' : ''}`;

  return (
    <div ref={containerRef} className={containerClass}>
      {isVisible ? (
        <iframe
          src={embedUrl}
          style={iframeStyle}
          allowFullScreen
          scrolling="no"
          title="TikTok Video Player"
          allow="autoplay; encrypted-media; picture-in-picture"
          className="animate-in fade-in duration-700" // Finom áttűnés a betöltéskor
        />
      ) : (
        /* Helyőrző (Placeholder), amíg nem görgetünk oda */
        <div className="flex flex-col items-center justify-center opacity-20">
            <div className="w-10 h-10 border-4 border-brand-mid border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-dark">Recept betöltése...</p>
        </div>
      )}
    </div>
  );
};

export default TikTokEmbed;