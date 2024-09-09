import React from 'react';
import Text from '../../QuestionType/TextType/Text';
import MultipleChoice from '../../QuestionType/SelectType/MultipleQuestion';
import styles from './styles.module.css';

const ContainerReading = ({ questions = [], handleAnswerChange }) => {
  return (
    <div className={styles.containerReading}>
      {questions.map((question, index) => {
        if (question.questionType === 'para') {
          return (
            <div key={question.questionId} className={styles['readingBox']}>
              <Text
                question={question}
              />
            </div>
          );
        }

        if (question.questionType === 'select') {
          return (
            <MultipleChoice
              key={question.questionId}
              question={question}
              saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
              questionNumber={index + 1} 
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default ContainerReading;
