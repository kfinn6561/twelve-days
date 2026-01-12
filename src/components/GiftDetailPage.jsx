import { useState, useEffect } from 'react';
import { useContentLoader } from '../hooks/useContentLoader';
import { gifts } from '../data/gifts';
import BackButton from './BackButton';
import GiftDetailContent from './GiftDetailContent';
import { useImageFallback } from '../hooks/useImageFallback';
import ErrorFallback from './ErrorFallback';
import '../styles/sparkles.css';

function GiftDetailPage({ giftId, onBack }) {
  const gift = gifts.find(g => g.id === giftId);
  const { content, error } = useContentLoader(giftId);
  const { src, error: imageError } = useImageFallback(gift?.imagePath, gift?.asciiArt);
  const [sparkles, setSparkles] = useState([]);

  // Create full-page sparkles on mount
  useEffect(() => {
    const createPageSparkles = () => {
      const newSparkles = [];
      const sparkleCount = 60; // Lots of sparkles!

      for (let i = 0; i < sparkleCount; i++) {
        // Random position across the entire viewport
        const x = Math.random() * 100; // 0-100%
        const y = Math.random() * 100; // 0-100%

        // Random float direction and distance
        const floatX = (Math.random() - 0.5) * 200; // -100 to 100px
        const floatY = -50 - Math.random() * 100; // Float upward

        // Random sparkle type
        const types = ['particle', 'star', 'large'];
        const type = types[Math.floor(Math.random() * types.length)];

        // Stagger the animations
        const delay = Math.random() * 0.8;

        newSparkles.push({
          id: `page-sparkle-${i}`,
          type,
          x,
          y,
          floatX,
          floatY,
          delay
        });
      }

      setSparkles(newSparkles);

      // Clean up after animations complete
      const timer = setTimeout(() => {
        setSparkles([]);
      }, 3000);

      return () => clearTimeout(timer);
    };

    createPageSparkles();
  }, [giftId]); // Recreate sparkles when gift changes

  if (error || !content || !gift) {
    return (
      <ErrorFallback
        message="Content unavailable for this gift"
        onBack={onBack}
      />
    );
  }

  return (
    <div className="detail-page">
      <BackButton onClick={onBack} />

      {/* Full page sparkles */}
      {sparkles.length > 0 && (
        <div className="page-sparkles">
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className={`page-sparkle-${sparkle.type}`}
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                '--float-x': `${sparkle.floatX}px`,
                '--float-y': `${sparkle.floatY}px`,
                animationDelay: `${sparkle.delay}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="detail-page__hero">
        {imageError ? (
          <pre className="detail-page__ascii">{gift.asciiArt}</pre>
        ) : (
          <img
            className="detail-page__image"
            src={src}
            alt={gift.name}
          />
        )}
      </div>

      <GiftDetailContent content={content} />
    </div>
  );
}

export default GiftDetailPage;
