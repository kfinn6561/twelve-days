import { useState, useRef } from 'react';
import GiftCard from './GiftCard';
import GiftDetailPage from './GiftDetailPage';
import AudioIndicator from './AudioIndicator';
import AudioPermissionPrompt from './AudioPermissionPrompt';
import LyricsDisplay from './LyricsDisplay';
import { gifts } from '../data/gifts';
import { useRouter, matchRoute } from '../hooks/useRouter';
import '../styles/layout.css';
import '../styles/backButton.css';
import '../styles/detailPage.css';

/**
 * App component - Root component managing global state, layout, and routing
 */
function App() {
  const [currentLyrics, setCurrentLyrics] = useState('');
  const [audioError, setAudioError] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const audioRef = useRef(null);
  const audioEnabledRef = useRef(false);

  // Routing
  const { currentPath, navigate } = useRouter();
  const route = matchRoute(currentPath);

  const handleEnableAudio = () => {
    // User has clicked - this provides the necessary gesture for audio
    audioEnabledRef.current = true;
    setShowAudioPrompt(false);
  };

  const handleGiftHover = (gift) => {
    setCurrentLyrics(gift.lyrics);

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
      // Audio ended
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

    // Stop audio on unhover (desktop behavior)
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleGiftNavigate = (giftId) => {
    // Stop any playing audio before navigation
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentLyrics('');
    navigate(`/gift/${giftId}`);
  };

  // Detail page route
  if (route.type === 'detail') {
    return (
      <GiftDetailPage
        giftId={route.id}
        onBack={() => navigate('/')}
      />
    );
  }

  // 404 route
  if (route.type === 'notfound') {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Page Not Found</h1>
        <button onClick={() => navigate('/')}>
          Return to Main Page
        </button>
      </div>
    );
  }

  // Home page route (main gift gallery)
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
            onNavigate={handleGiftNavigate}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
