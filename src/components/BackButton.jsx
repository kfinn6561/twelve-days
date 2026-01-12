import PropTypes from 'prop-types';

function BackButton({ onClick }) {
  return (
    <button
      className="back-button"
      onClick={onClick}
      aria-label="Return to main page"
    >
      ← Back
    </button>
  );
}

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BackButton;
