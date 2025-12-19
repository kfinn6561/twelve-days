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

export default BackButton;
