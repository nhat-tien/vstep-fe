"use client";
import React from 'react';
import Text from '../../QuestionType/TextType/Text';
import styles from '@/components/Exams/ContainerSkill/Writing/styles.module.css';

const ContainerWriting = ({ questions = [], handleAnswerChange }) => {
  return (
    <div className={styles['container-Writing-Wrapper']}>
      <div className={styles['container-Writing']}>
        {questions.map((question) => {
          if (question.questionType === 'para') {
            return (
              <div key={question.questionId} className={styles['writing-box']}>
                <Text
                  question={question}
                  saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
                />
                <textarea
                  rows="10"
                  onChange={(e) => handleAnswerChange(question.questionId, e.target.value)}
                  placeholder="Write your essay here..."
                  className={styles['textarea']}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ContainerWriting;
