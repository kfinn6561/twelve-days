import PropTypes from 'prop-types';
import '../styles/lyrics.css';

/**
 * LyricsDisplay component - Displays lyrics at the top of the screen
 * @param {Object} props
 * @param {string} props.lyrics - The lyrics text to display (empty = hide)
 */
function LyricsDisplay({ lyrics }) {
  if (!lyrics) {
    return null;
  }

  return (
    <div className="lyrics-display">
      <p className="lyrics-display__text">{lyrics}</p>
    </div>
  );
}

LyricsDisplay.propTypes = {
  lyrics: PropTypes.string,
};

export default LyricsDisplay;
