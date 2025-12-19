import { useState, useRef } from 'react';
import GiftCard from './GiftCard';
import AudioIndicator from './AudioIndicator';
import LyricsDisplay from './LyricsDisplay';
import { gifts } from '../data/gifts';
import '../styles/layout.css';

/**
 * App component - Root component managing global state and layout
 */
function App() {
  const [currentLyrics, setCurrentLyrics] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioError, setAudioError] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const audioRef = useRef(null);

  const handleGiftHover = (gift) => {
    setCurrentLyrics(gift.lyrics);
    setCurrentAudio(gift.id);

    // Reset audio error state when user interacts
    if (audioError) {
      setAudioError(false);
    }

    // Stop previous audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Create and play new audio SYNCHRONOUSLY within user gesture
    const audio = new Audio(gift.audioPath);
    audioRef.current = audio;

    // Set up event listeners
    audio.addEventListener('ended', () => {
      console.log('Audio ended');
      setCurrentAudio(null);
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio load error:', e);
      setAudioError(true);
      setAudioAvailable(false);
    });

    // Play audio immediately (synchronously with user gesture)
    audio.play().catch((err) => {
      console.error('Audio playback failed:', err);
      // Only show error for real failures, not autoplay blocks
      const isAutoplayBlock = err?.name === 'NotAllowedError' || err?.message?.includes('play() request was interrupted');
      if (!isAutoplayBlock) {
        setAudioError(true);
        setAudioAvailable(false);
      }
    });
  };

  const handleGiftUnhover = () => {
    setCurrentLyrics('');
    setCurrentAudio(null);

    // Stop audio on unhover (desktop behavior)
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Find currently playing gift
  const playingGift = gifts.find(g => g.id === currentAudio);

  return (
    <div className="app">
      <LyricsDisplay lyrics={currentLyrics} />
      <AudioIndicator show={audioError} />

      <div className="gift-container">
        {gifts.map(gift => (
          <GiftCard
            key={gift.id}
            gift={gift}
            onHover={handleGiftHover}
            onUnhover={handleGiftUnhover}
            isPlaying={currentAudio === gift.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
