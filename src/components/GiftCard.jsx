import { useState, useEffect, useRef } from 'react';
import { useImageFallback } from '../hooks/useImageFallback';
import '../styles/animations.css';
import '../styles/sparkles.css';
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
  const [sparkles, setSparkles] = useState([]);
  const timeoutRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Clean up sparkles after animation
  useEffect(() => {
    if (sparkles.length > 0) {
      const timer = setTimeout(() => {
        setSparkles([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [sparkles]);

  const createSparkles = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newSparkles = [];
    const particleCount = 12;
    const angleStep = (2 * Math.PI) / particleCount;

    // Create particles in a circle
    for (let i = 0; i < particleCount; i++) {
      const angle = i * angleStep;
      const distance = 50 + Math.random() * 30;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      newSparkles.push({
        id: `particle-${Date.now()}-${i}`,
        type: 'particle',
        x,
        y,
        delay: i * 0.02
      });
    }

    // Add star sparkles
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const distance = 40 + Math.random() * 40;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      newSparkles.push({
        id: `star-${Date.now()}-${i}`,
        type: 'star',
        x,
        y,
        delay: i * 0.03
      });
    }

    // Add expanding ring
    newSparkles.push({
      id: `ring-${Date.now()}`,
      type: 'ring',
      x: centerX,
      y: centerY,
      delay: 0
    });

    setSparkles(newSparkles);
  };

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

    // Create sparkles at click position
    createSparkles(e);

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
      ref={cardRef}
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

      {/* Sparkles container */}
      {sparkles.length > 0 && (
        <div className="sparkle">
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className={`sparkle-${sparkle.type}`}
              style={{
                left: `${sparkle.x}px`,
                top: `${sparkle.y}px`,
                animationDelay: `${sparkle.delay}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GiftCard;
