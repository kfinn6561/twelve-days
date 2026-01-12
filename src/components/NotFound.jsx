import PropTypes from 'prop-types';

function NotFound({ onBack }) {
  return (
    <div className="error-fallback">
      <div className="error-fallback__content">
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
        <p className="error-fallback__message">Page Not Found</p>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          The page you're looking for doesn't exist.
        </p>
        <button onClick={onBack} className="error-fallback__button">
          Return to Main Page
        </button>
      </div>
    </div>
  );
}

NotFound.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default NotFound;
