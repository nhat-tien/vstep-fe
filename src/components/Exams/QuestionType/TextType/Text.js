"use client";
import React from 'react';
import styles from "@/components/Exams/QuestionType/TextType/styles.module.css"

const Text = ({ question }) => {
  return (
    <div dangerouslySetInnerHTML={{__html: question.text}} className={styles['text-question-container']}>
    </div>
  );
};

export default Text;
