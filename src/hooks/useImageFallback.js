import { useState, useEffect } from 'react';

/**
 * Custom hook for handling image loading with ASCII art fallback
 * @param {string} imagePath - Path to the image file
 * @param {string} asciiArt - ASCII art string to use as fallback
 * @returns {{src: string, loading: boolean, error: boolean}}
 */
export function useImageFallback(imagePath, asciiArt) {
  const [src, setSrc] = useState(imagePath);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Create a new Image object to test loading
    const img = new Image();
    let cancelled = false;

    // Reset to loading state
    setLoading(true);
    setError(false);

    img.onload = () => {
      if (!cancelled) {
        setLoading(false);
        setError(false);
        setSrc(imagePath);
      }
    };

    img.onerror = () => {
      if (!cancelled) {
        // Convert ASCII art to data URL
        const asciiDataUrl = convertAsciiToDataUrl(asciiArt);
        setLoading(false);
        setError(true);
        setSrc(asciiDataUrl);
      }
    };

    img.src = imagePath;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [imagePath, asciiArt]);

  return { src, loading, error };
}

/**
 * Convert ASCII art string to a data URL image
 * @param {string} asciiArt - ASCII art text
 * @returns {string} Data URL of the ASCII art as an image
 */
function convertAsciiToDataUrl(asciiArt) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size
  canvas.width = 200;
  canvas.height = 200;

  // Fill background
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw ASCII art
  ctx.fillStyle = '#333';
  ctx.font = '12px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const lines = asciiArt.trim().split('\n');
  const lineHeight = 15;
  const startY = (canvas.height - lines.length * lineHeight) / 2;

  lines.forEach((line, index) => {
    ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
  });

  return canvas.toDataURL();
}
