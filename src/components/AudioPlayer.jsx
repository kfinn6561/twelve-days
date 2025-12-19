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

    console.log('AudioPlayer: Creating new audio for path:', audioPath);

    // Create new audio instance
    const audio = new Audio(audioPath);
    audioRef.current = audio;

    // Set up event listeners
    const handleEnded = () => {
      console.log('AudioPlayer: Audio ended');
      if (onEnded) {
        onEnded();
      }
    };

    const handleError = (e) => {
      console.error('AudioPlayer: Audio load error', e);
      if (onError) {
        onError(e.error || new Error('Audio failed to load'));
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Cleanup
    return () => {
      console.log('AudioPlayer: Cleaning up audio for path:', audioPath);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioPath, onError, onEnded]);

  useEffect(() => {
    console.log('AudioPlayer: isPlaying changed to:', isPlaying, 'audioRef.current:', audioRef.current);

    if (!audioRef.current) {
      console.warn('AudioPlayer: No audio ref available');
      return;
    }

    if (isPlaying) {
      // Attempt to play
      console.log('AudioPlayer: Attempting to play audio');
      audioRef.current.play().catch((err) => {
        // Handle autoplay policy rejection
        console.warn('Audio playback failed:', err);
        if (onError) {
          onError(err);
        }
      });
    } else {
      // Stop audio
      console.log('AudioPlayer: Stopping audio');
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying, onError]);

  // This component doesn't render anything
  return null;
}

export default AudioPlayer;
