import PropTypes from "prop-types";
import "./LoadingSpinner.css";

function LoadingSpinner({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="loading-wrapper" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <span className="visually-hidden">Loading definition…</span>
    </div>
  );
}

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingSpinner;
