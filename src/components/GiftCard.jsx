import { useState } from 'react';
import { useImageFallback } from '../hooks/useImageFallback';
import '../styles/animations.css';
import '../styles/layout.css';

/**
 * GiftCard component - Individual interactive gift element
 * @param {Object} props
 * @param {Object} props.gift - Gift data object
 * @param {Function} props.onHover - Callback when hover/touch starts
 * @param {Function} props.onUnhover - Callback when hover/touch ends
 * @param {boolean} props.isPlaying - Whether this gift's audio is currently playing
 */
function GiftCard({ gift, onHover, onUnhover, isPlaying = false }) {
  const { src, loading, error } = useImageFallback(gift.imagePath, gift.asciiArt);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover(gift);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onUnhover) {
      onUnhover();
    }
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsHovered(true);
    if (onHover) {
      onHover(gift);
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsHovered(false);
    if (onUnhover) {
      onUnhover();
    }
  };

  const style = {
    left: `${gift.position.x}%`,
    top: `${gift.position.y}%`,
    transform: 'translate(-50%, -50%)'
  };

  const className = `gift ${isHovered ? 'gift--animating' : ''}`;

  return (
    <div
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-testid={`gift-${gift.id}`}
    >
      {loading ? (
        <div className="gift__loading">Loading...</div>
      ) : (
        <img
          src={src}
          alt={gift.name}
          className="gift__image"
          title={gift.name}
        />
      )}
      {error && (
        <div className="gift__fallback-label" style={{ fontSize: '10px', textAlign: 'center', marginTop: '4px' }}>
          {gift.shortName}
        </div>
      )}
      <div className="gift__day-number">Day {gift.id}</div>
    </div>
  );
}

export default GiftCard;
