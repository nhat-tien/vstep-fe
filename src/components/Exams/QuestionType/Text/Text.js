"use client";
import React from 'react';
import styles from '@/components/Exams/QuestionType/Text/styles.module.css';

const Text = ({ question }) => {
  return (
    <div className={styles['text-question-container']}>
      <p>{question.text}</p>
    </div>
  );
};

export default Text;
