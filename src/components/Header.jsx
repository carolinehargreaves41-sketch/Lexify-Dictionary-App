import PropTypes from "prop-types";
import "./Header.css";

function Header({ word, phonetic }) {
  return (
    <header className="app-header" role="banner">
      <h1 className="app-header__title">Lexi Dictionary App</h1>

      <p className="app-header__tagline">Define. Discover.</p>

      {word && (
        <div style={{ marginTop: "var(--space-md)" }} aria-live="polite">  
          <p className="app-header__word">{word}</p>
          {phonetic && <p className="app-header__phonetic">{phonetic}</p>}
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  word: PropTypes.string,
  phonetic: PropTypes.string,
};

Header.defaultProps = {
  word: "",
  phonetic: "",
};

export default Header;
