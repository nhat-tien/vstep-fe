import React, { useRef, useEffect, useState } from 'react';
import styles from './styles.module.css'; 

const Audio = ({ question, onEnd, autoPlay = false, disable = false}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const preventSeek = (e) => {
      e.preventDefault();
      e.stopPropagation();
      audio.currentTime = 0;
    };

    audio.addEventListener('seeking', preventSeek);

    if(autoPlay) {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play();
      }
    }

    return () => {
      audio.removeEventListener('seeking', preventSeek);
    };
  }, [question]);

  const handlePlay = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onEnd) {
      onEnd();
    }
  };

  return (
    <div className={styles['audioContainer']}>
      {/* Thanh audio được custom CSS */}
      <audio
        ref={audioRef}
        src={question.fileUrl}
        onEnded={handleEnded}
        preload="auto"
        controls
        className={styles['audioPlayer']}
      />
      <button 
        className={`${styles['playButton']} ${isPlaying || disable ? styles.playing : ''}`} 
        onClick={handlePlay}
        disabled={isPlaying || disable}
      >
      </button>
    </div>
  );
};

export default Audio;
