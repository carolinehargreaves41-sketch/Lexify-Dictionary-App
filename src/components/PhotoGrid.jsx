import { useState, useEffect } from "react";
import { fetchPhotos } from "../services/pexelsService";
import "./PhotoGrid.css";

function PhotoGrid({ word }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!word) return;

    async function loadPhotos() {
      setLoading(true);
      setError(null);
      setPhotos([]);

      try {
        const results = await fetchPhotos(word, 3);
        setPhotos(results);
      } catch (err) {
        setError("Couldn't load photos. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, [word]);

  if (!word) return null;

  return (
    <section
      className="photo-grid-section"
      aria-label={"Photos related to " + word}
    >
      <h2>
        Photos for <span>"{word}"</span>
      </h2>

      {loading && (
        <div
          className="photo-grid"
          aria-busy="true"
          aria-label="Loading photos"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="photo-skeleton" role="presentation" />
          ))}
        </div>
      )}

      {error && <p style={{ color: "var(--color-error)" }}>{error}</p>}

      {!loading && photos.length > 0 && (
        <div>
          <ul className="photo-grid" role="list">
            {photos.map((photo) => {
              const photographerUrl = photo.photographer_url;
              const photographerName = photo.photographer;
              const altText = photo.alt || "Photo related to " + word;

              return (
                <li key={photo.id}>
                  <figure className="photo-card">
                    <img
                      src={photo.src.medium}
                      alt={altText}
                      loading={photos.indexOf(photo) === 0 ? "eager" : "lazy"}
                      fetchpriority={
                        photos.indexOf(photo) === 0 ? "high" : "auto"
                      }
                      width={350}
                      height={350}
                      decoding="async"
                    />
                    <figcaption>
                      {"Photo by "}
                      <a
                        href={photographerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {photographerName}
                      </a>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>

          <p className="pexels-attribution">
            {"Photos from "}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pexels
            </a>
          </p>
        </div>
      )}

      {!loading && !error && photos.length === 0 && (
        <p style={{ color: "var(--color-ink-500)" }}>
          {'No photos found for "' + word + '".'}
        </p>
      )}
    </section>
  );
}

export default PhotoGrid;
