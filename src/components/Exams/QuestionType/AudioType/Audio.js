import React, { useRef, useEffect, useState } from 'react';

const Audio = ({ question, onEnd }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const preventSeek = (e) => {
      e.preventDefault();
      e.stopPropagation();
      audioRef.current.currentTime = 0;
    };

    audio.addEventListener('seeking', preventSeek);

    return () => {
      audio.removeEventListener('seeking', preventSeek);
    };
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onEnd) {
      onEnd();
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={question.fileUrl}
        onEnded={handleEnded}
        preload="auto"
        // Disable default controls to hide progress bar
      />
      {isPlaying ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handlePlay}>Play</button>
      )}
    </div>
  );
};

export default Audio;
