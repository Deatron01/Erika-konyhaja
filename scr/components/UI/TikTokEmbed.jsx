import React from 'react';

const TikTokEmbed = ({ videoId }) => {
  if (!videoId) return null;

  return (
    <div className="flex justify-center w-full my-8">
      <iframe
        className="rounded-2xl shadow-soft"
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        style={{ width: '100%', maxWidth: '325px', height: '580px', border: 'none' }}
        allowFullScreen
        scrolling="no"
        title="TikTok Video Player"
      />
    </div>
  );
};

export default TikTokEmbed;