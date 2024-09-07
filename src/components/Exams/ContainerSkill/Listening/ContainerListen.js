import React, { useState } from 'react';
import Audio from '../../QuestionType/Audio';
import MultipleChoice from '../../QuestionType/MultipleQuestion';
import { useEffect } from 'react';
import Image from '../../QuestionType/Image';

const ContainerListen = ({ questions = [] , handleAnswerChange, skill, part }) => {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`answered-${skill}-${part}`);
    console.log('Storage trong Container: ',savedAnswers);
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        if (parsedAnswers) {
          console.log("Storage: ", parsedAnswers);
          setAnswers(parsedAnswers);
        }
      } catch (error) {
        console.error("Lỗi trong lúc parse file json:", error);
      }
    }
  }, [skill, part])

  const handleAudioEnd = () => {
    setAudioPlayed(true);
  };

  return (
    <div className="container-listen">
      {questions.map((question) => {
        if (question.questionType === 'image') {
            return (
            <Image 
              key={question.questionId}
              question={question}
            />
          );
        }

        if (question.questionType === 'audio' && !audioPlayed) {
          return (
            <Audio
              key={question.questionId}
              question={question}
              onEnd={handleAudioEnd}
              saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
            />
          );
        }

        if (question.questionType === 'select') {
          return (
            <MultipleChoice
              key={question.questionId}
              question={question}
              selectedAnswer={answers[question.questionId]} 
              saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default ContainerListen;