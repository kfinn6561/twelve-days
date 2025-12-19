import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for managing audio playback with error handling
 * @returns {{playAudio: function, stopAudio: function, isPlaying: boolean, audioAvailable: boolean, error: Error|null}}
 */
export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  /**
   * Play audio from the given path
   * @param {string} audioPath - Path to the audio file
   * @returns {Promise<void>}
   */
  const playAudio = async (audioPath) => {
    try {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create new Audio instance
      const audio = new Audio(audioPath);
      audioRef.current = audio;

      // Set up event listeners
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      audio.addEventListener('error', (e) => {
        setError(e.error || new Error('Audio failed to load'));
        setAudioAvailable(false);
        setIsPlaying(false);
      });

      // Attempt to play
      await audio.play();
      setIsPlaying(true);
      setError(null);
    } catch (err) {
      // Handle autoplay policy rejection
      setError(err);
      setAudioAvailable(false);
      setIsPlaying(false);
    }
  };

  /**
   * Stop currently playing audio
   */
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    playAudio,
    stopAudio,
    isPlaying,
    audioAvailable,
    error
  };
}
