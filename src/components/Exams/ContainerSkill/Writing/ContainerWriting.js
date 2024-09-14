"use client";
import React, { useState } from 'react';
import Text from '../../QuestionType/TextType/Text';
import styles from '@/components/Exams/ContainerSkill/Writing/styles.module.css';
import Image from "@/components/Exams/QuestionType/ImageType/Image";

const ContainerWriting = ({ questions = [], handleAnswerChange }) => {
  const [textValues, setTextValues] = useState({});

  // Tính số từ
  const wordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  // Cập nhật giá trị textarea và số từ
  const handleTextChange = (questionId, value) => {
    setTextValues((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    handleAnswerChange(questionId, value);
  };

  return (
    <div className={styles['container-Writing-Wrapper']}>
      <div className={styles['container-Writing']}>
        {questions.map((question) => {
          if (question.questionType === 'image') {
            const currentText = textValues[question.questionId] || '';
            const currentWordCount = wordCount(currentText);

            return (
              <div key={question.questionId} className={styles['readingBox']}>
                <Image 
                  key={question.questionId}
                  question={question}
                />
                <div className={styles['wordCountBox']}>
                  <p>Words count: {currentWordCount}</p>
                </div>
                <textarea
                  rows="10"
                  value={currentText}
                  onChange={(e) => handleTextChange(question.questionId, e.target.value)}
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
