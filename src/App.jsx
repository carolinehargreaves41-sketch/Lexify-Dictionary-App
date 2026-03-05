import { useState, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import DefinitionList from "./components/DefinitionList";
import { fetchDefinition } from "./services/dictionaryService";

function App() {
  const [word, setWord] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (searchTerm) => {
    setError(null);
    setMeanings([]);
    setWord("");
    setPhonetic("");
    setIsLoading(true);

    try {
      const data = await fetchDefinition(searchTerm);
      setWord(data.word || searchTerm);
      setPhonetic(data.phonetic || "");
      setMeanings(data.meanings || []);

      if (!data.meanings || data.meanings.length === 0) {
        setError(
          `We could not find a definition for "${searchTerm}". Please try another word.`,
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="gradient-bg">
      <Header word={word} phonetic={phonetic} />

      <main className="content-container" id="main-content">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        <LoadingSpinner isLoading={isLoading} />
        {!isLoading && <ErrorMessage message={error} />}
        {!isLoading && !error && meanings.length > 0 && (
          <DefinitionList meanings={meanings} />
        )}
      </main>

      <footer
        className="text-center py-4 mt-4"
        style={{ color: "--color-heading", fontSize: "0.8rem" }}
      >
        <small>
          This project was coded by{" "}
          <a
            href="https://github.com/carolinehargreaves41-sketch"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-primary)" }}
          >
            Caroline Hargreaves
          </a>
          , is{" "}
          <a
            href="https://github.com/carolinehargreaves41-sketch/Lexify-Dictionary-App"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-primary)" }}
          >
            open-sourced on GitHub
          </a>
          , and{" "}
          <a
            href="https://storied-centaur-9c1747.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-primary)" }}
          >
            hosted on Netlify.
          </a>
        </small>
        <br />
        <small> Powered by SheCodes Dictionary API</small>
      </footer>
    </div>
  );
}

export default App;
