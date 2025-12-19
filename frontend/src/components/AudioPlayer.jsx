import { useEffect, useRef } from 'react';

/**
 * AudioPlayer component - Manages audio playback
 * @param {Object} props
 * @param {string|null} props.audioPath - Path to audio file (null = no audio)
 * @param {boolean} props.isPlaying - Whether audio should be playing
 * @param {Function} props.onError - Called when audio fails
 * @param {Function} props.onEnded - Called when audio finishes
 */
function AudioPlayer({ audioPath, isPlaying, onError, onEnded }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioPath) {
      return;
    }

    // Create new audio instance
    const audio = new Audio(audioPath);
    audioRef.current = audio;

    // Set up event listeners
    const handleEnded = () => {
      if (onEnded) {
        onEnded();
      }
    };

    const handleError = (e) => {
      if (onError) {
        onError(e.error || new Error('Audio failed to load'));
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Cleanup
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioPath, onError, onEnded]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      // Attempt to play
      audioRef.current.play().catch((err) => {
        // Handle autoplay policy rejection
        console.warn('Audio playback failed:', err);
        if (onError) {
          onError(err);
        }
      });
    } else {
      // Stop audio
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying, onError]);

  // This component doesn't render anything
  return null;
}

export default AudioPlayer;
