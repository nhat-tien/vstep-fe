import React from 'react';
import Text from '../../QuestionType/Text/Text';
import MultipleChoice from '../../QuestionType/MultipleChoice/MultipleChoice';

const ContainerReading = ({ questions, handleAnswerChange }) => {
  return (
    <div className="container-reading">
      {questions.map((question) => {
        if (question.questionType === 'Text') {
          return (
            <div key={question.questionId} className="reading-box">
              <Text
                question={question}
                saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
              />
            </div>
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

        return null; // Không hiển thị gì nếu loại câu hỏi không khớp
      })}
    </div>
  );
};

export default ContainerReading;
