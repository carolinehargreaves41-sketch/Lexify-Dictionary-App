import { useState } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

function SearchBar({ onSearch, isLoading }) {
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = inputValue.trim();

    if (!trimmed) {
      setValidationError("Please enter a word to search.");
      return;
    }

    if (!/^[a-zA-Z\-']+$/.test(trimmed)) {
      setValidationError(
        "Please enter a valid word (letters only - no spaces).",
      );
      return;
    }

    setValidationError("");
    onSearch(trimmed);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setValidationError("");
  };

  return (
    <form
      className="search-bar"
      id="search-bar"
      onSubmit={handleSubmit}
      aria-label="Dictionary word search"
      noValidate
    >
      <div className="flex-grow-1 search-bar__input-wrapper">
        <input
          type="text"
          className="search-bar__input w-100"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (validationError) setValidationError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search a word..."
          aria-label="Enter a word to look up"
          aria-describedby={validationError ? "search-error" : undefined}
          aria-invalid={validationError ? "true" : "false"}
          disabled={isLoading}
          autoComplete="off"
          spellCheck="false"
          autoFocus
          maxLength={50}
        />

        {inputValue && !isLoading && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}

        {validationError && (
          <p id="search-error" className="text-danger small mt-1" role="alert">
            {validationError}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="search-bar__button"
        disabled={isLoading}
        aria-label={isLoading ? "Searching..." : "Search"}
      >
        {isLoading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

SearchBar.defaultProps = {
  isLoading: false,
};

export default SearchBar;
