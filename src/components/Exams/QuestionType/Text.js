"use client";
import React from 'react';

const Text = ({ question }) => {
  return (
    <div className={styles['text-question-container']}>
      <p>{question.text}</p>
    </div>
  );
};

export default Text;