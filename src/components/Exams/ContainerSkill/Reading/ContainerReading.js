import React, { useState, useEffect } from 'react';
import Text from '../../QuestionType/TextType/Text';
import MultipleChoice from '../../QuestionType/SelectType/MultipleQuestion';
import styles from './styles.module.css';

const ContainerReading = ({ questions = [], handleAnswerChange, skill, part }) => {
  const [answers, setAnswers] = useState({});
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`answered-${skill}-${part}`);
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
      } catch (error) {
        console.error("Lỗi trong lúc parse file json:", error);
      }
    }
  }, [skill, part]);

  useEffect(() => {
    const selectedAnswersCount = Object.keys(answers).filter(questionId => 
      questions.find(q => q.questionId === questionId && q.questionType === 'select')
    ).length;
    setAnsweredQuestionsCount(selectedAnswersCount);
  }, [answers, questions]);

  useEffect(() => {
    // Reset số câu hỏi đã chọn khi `part` thay đổi
    setAnsweredQuestionsCount(0); 
  }, [part]);

  // Đếm số câu hỏi trắc nghiệm
  const totalQuestionsCount = questions.filter(q => q.questionType === 'select').length;
  let multipleChoiceCount = 0;

  return (
    <div className={styles['container-reading-wrapper']}>
      <div className={styles['container-reading']}>
        <div className={styles["question-summary"]}>
          <p>Đã chọn: {answeredQuestionsCount} / {totalQuestionsCount} câu</p>
        </div>
        {questions.map((question) => {
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
            multipleChoiceCount += 1;
            
            return (
              <MultipleChoice
                key={question.questionId}
                question={question}
                selectedAnswer={answers[question.questionId]} 
                saveAnswer={(answer) => {
                  handleAnswerChange(question.questionId, answer);
                  setAnswers(prevAnswers => ({ ...prevAnswers, [question.questionId]: answer }));
                }}
                questionNumber={multipleChoiceCount} 
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default ContainerReading;
