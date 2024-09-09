"use client";
import React, { useState, useEffect } from 'react';
import Text from '../../QuestionType/TextType/Text';
import Image from 'next/image';
import styles from '@/components/Exams/ContainerSkill/Speaking/styles.module.css';

const ContainerSpeaking = ({ questions = [], handleAnswerChange }) => {
  const [currentPhase, setCurrentPhase] = useState(1); // Phase 1 or Phase 2
  const [timeLeft, setTimeLeft] = useState(10); // Thời gian cho mỗi phase (tùy chỉnh theo nhu cầu)
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (currentPhase === 1) {
        setCurrentPhase(2); 
        setIsRecording(true); 
      } else {
        setIsRecording(false); 
      }
    }

    return () => clearInterval(timer); 
  }, [timeLeft, currentPhase]);

  const handleRecordingStop = () => {
    setIsRecording(false);
  };

  return (
    <div className={styles['container-Speaking-Wrapper']}>
      <div className={styles['container-Speaking']}>
        <div className={styles['timer']}>
          {currentPhase === 1 ? (
            <p>Prepare to speak: {timeLeft} seconds</p>
          ) : (
            <p>Recording: {timeLeft} seconds</p>
          )}
        </div>

        {questions.map((question, index) => {
          if (question.questionType === 'Picture') {
            return (
              <Image
                key={question.questionId}
                src={question.imageUrl} 
                alt={`Question ${question.questionId}`}
                width={500} 
                height={300}
                className={styles['image']}
              />
            );
          }

          if (question.questionType === 'Text') {
            return (
              <Text
                key={question.questionId}
                question={question}
                saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
              />
            );
          }

          return null;
        })}

        {isRecording && (
          <div className={styles.recordingIndicator}>
            <button onClick={handleRecordingStop}>Stop Recording</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContainerSpeaking;
