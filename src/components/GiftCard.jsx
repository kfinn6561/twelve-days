import { useState, useEffect, useRef } from 'react';
import { useImageFallback } from '../hooks/useImageFallback';
import '../styles/animations.css';
import '../styles/layout.css';

/**
 * GiftCard component - Individual interactive gift element
 * @param {Object} props
 * @param {Object} props.gift - Gift data object
 * @param {Function} props.onHover - Callback when hover/touch starts
 * @param {Function} props.onUnhover - Callback when hover/touch ends
 * @param {Function} props.onNavigate - Callback when gift is clicked for navigation
 */
function GiftCard({ gift, onHover, onUnhover, onNavigate }) {
  const { src, loading, error } = useImageFallback(gift.imagePath, gift.asciiArt);
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Stop any current hover effects
    setIsHovered(false);
    if (onUnhover) {
      onUnhover();
    }

    // Start spin animation
    setIsSpinning(true);

    // Navigate after animation
    if (onNavigate) {
      timeoutRef.current = setTimeout(() => {
        onNavigate(gift.id);
      }, 500); // Match animation duration
    }
  };

  const style = {
    left: `${gift.position.x}%`,
    top: `${gift.position.y}%`,
    transform: 'translate(-50%, -50%)',
    cursor: onNavigate ? 'pointer' : 'default'
  };

  const className = `gift ${isHovered ? 'gift--animating' : ''} ${isSpinning ? 'gift--spinning' : ''}`;

  return (
    <div
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
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
