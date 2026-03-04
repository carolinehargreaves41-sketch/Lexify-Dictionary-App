import PropTypes from "prop-types";

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-message" role="alert" aria-atomic="true">
      <span aria-hidden="true">😕 </span>
      {message}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: "",
};

export default ErrorMessage;
