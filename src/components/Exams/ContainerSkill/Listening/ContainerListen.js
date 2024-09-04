import React, { useState } from 'react';
import Audio from '../../QuestionType/Audio/Audio';
import MultipleChoice from '../../QuestionType/MultipleChoice/MultipleChoice';

const ContainerListen = ({ questions, handleAnswerChange }) => {
  const [audioPlayed, setAudioPlayed] = useState(false);

  const handleAudioEnd = () => {
    setAudioPlayed(true);
  };

  return (
    <div className="container-listen">
      {questions.map((question) => {
        if (question.questionType === 'Audio' && !audioPlayed) {
          return (
            <Audio
              key={question.questionId}
              question={question}
              onEnd={handleAudioEnd}
              saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
            />
          );
        }

        if (question.questionType === 'MultipleChoice') {
          return (
            <MultipleChoice
              key={question.questionId}
              question={question}
              saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
            />
          );
        }

        return null; // Không hiển thị gì nếu đã nghe xong audio hoặc loại câu hỏi không khớp
      })}
    </div>
  );
};

export default ContainerListen;
