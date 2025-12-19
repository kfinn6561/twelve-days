import BackButton from './BackButton';

function ErrorFallback({ message, onBack }) {
  return (
    <div className="error-fallback">
      <BackButton onClick={onBack} />
      <div className="error-fallback__content">
        <p className="error-fallback__message">{message}</p>
        <button onClick={onBack} className="error-fallback__button">
          Return to Main Page
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
