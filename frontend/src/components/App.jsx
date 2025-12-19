import { useState } from 'react';
import GiftCard from './GiftCard';
import AudioPlayer from './AudioPlayer';
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

  const handleGiftHover = (gift) => {
    setCurrentLyrics(gift.lyrics);
    setCurrentAudio(gift.id);
  };

  const handleGiftUnhover = () => {
    setCurrentLyrics('');
    setCurrentAudio(null);
  };

  const handleAudioError = (error) => {
    console.error('Audio error:', error);
    setAudioError(true);
    setAudioAvailable(false);
  };

  const handleAudioEnded = () => {
    // Audio finished playing naturally
    // Keep currentAudio set so visual state remains
  };

  // Find currently playing gift
  const playingGift = gifts.find(g => g.id === currentAudio);

  return (
    <div className="app">
      <LyricsDisplay lyrics={currentLyrics} />
      <AudioIndicator show={audioError} />

      <AudioPlayer
        audioPath={playingGift ? playingGift.audioPath : null}
        isPlaying={currentAudio !== null}
        onError={handleAudioError}
        onEnded={handleAudioEnded}
      />

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
