import React from 'react';
import Text from '../../QuestionType/Text/Text';

const ContainerWriting = ({ questions, handleAnswerChange }) => {
  return (
    <div className="container-writing">
      {questions.map((question) => {
        if (question.questionType === 'Text') {
          return (
            <div key={question.questionId} className="writing-box">
              <Text
                question={question}
                saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
              />
              <textarea
                rows="10"
                cols="50"
                onChange={(e) => handleAnswerChange(question.questionId, e.target.value)}
                placeholder="..."
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ContainerWriting;
