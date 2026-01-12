import PropTypes from 'prop-types';
import '../styles/layout.css';

/**
 * AudioPermissionPrompt - Prompts user to click to enable audio
 * Required because browsers don't allow audio on hover without a prior click
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the prompt
 * @param {Function} props.onDismiss - Called when user clicks to dismiss
 */
function AudioPermissionPrompt({ show, onDismiss }) {
  if (!show) {
    return null;
  }

  return (
    <div className="audio-permission-overlay" onClick={onDismiss}>
      <div className="audio-permission-prompt">
        <h2>🎵 Welcome to Twelve Days of Christmas!</h2>
        <p>Hover over gifts to hear the carol and see lyrics.</p>
        <button className="audio-permission-button" onClick={onDismiss}>
          Click to Enable Audio
        </button>
      </div>
    </div>
  );
}

AudioPermissionPrompt.propTypes = {
  show: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default AudioPermissionPrompt;
