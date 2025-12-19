import '../styles/layout.css';

/**
 * AudioIndicator component - Visual indicator when audio is unavailable
 * @param {Object} props
 * @param {boolean} props.show - Whether to display the indicator
 */
function AudioIndicator({ show }) {
  if (!show) {
    return null;
  }

  return (
    <div className="audio-indicator">
      <span className="audio-indicator__icon">🔇</span>
      <span className="audio-indicator__text">
        Audio unavailable - animations and visuals still work!
      </span>
    </div>
  );
}

export default AudioIndicator;
