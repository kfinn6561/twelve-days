import { useState, useRef } from 'react';
import GiftCard from './GiftCard';
import AudioIndicator from './AudioIndicator';
import AudioPermissionPrompt from './AudioPermissionPrompt';
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
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const audioRef = useRef(null);
  const audioEnabledRef = useRef(false);

  const handleEnableAudio = () => {
    // User has clicked - this provides the necessary gesture for audio
    audioEnabledRef.current = true;
    setShowAudioPrompt(false);
  };

  const handleGiftHover = (gift) => {
    setCurrentLyrics(gift.lyrics);
    setCurrentAudio(gift.id);

    // Don't try to play audio if user hasn't enabled it yet
    if (!audioEnabledRef.current) {
      return;
    }

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
      setCurrentAudio(null);
    });

    audio.addEventListener('error', () => {
      setAudioError(true);
    });

    // Play audio immediately (synchronously with user gesture)
    audio.play().catch((err) => {
      // Only show error for real failures, not autoplay blocks
      const isAutoplayBlock = err?.name === 'NotAllowedError' || err?.message?.includes('play() request was interrupted');
      if (!isAutoplayBlock) {
        setAudioError(true);
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

  return (
    <div className="app">
      <AudioPermissionPrompt
        show={showAudioPrompt}
        onDismiss={handleEnableAudio}
      />
      <LyricsDisplay lyrics={currentLyrics} />
      <AudioIndicator show={audioError} />

      <div className="gift-container">
        {gifts.map(gift => (
          <GiftCard
            key={gift.id}
            gift={gift}
            onHover={handleGiftHover}
            onUnhover={handleGiftUnhover}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
