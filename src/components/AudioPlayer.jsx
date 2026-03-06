import { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";

function AudioPlayer({ audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [audioUrl]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent || 0);
  }

  function handleEnded() {
    setIsPlaying(false);
    setProgress(0);
  }

  if (!audioUrl) return null;

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <button
        onClick={togglePlay}
        className="audio-player__button"
        aria-label={isPlaying ? "Pause" : "Play pronunciation"}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="5" y="3" width="4" height="18" rx="1" />
            <rect x="15" y="3" width="4" height="18" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>

      <div className="audio-player__track">
        <div
          className="audio-player__progress"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="audio-player__label">
        {isPlaying ? "Playing..." : "Hear it"}
      </span>
    </div>
  );
}

export default AudioPlayer;
