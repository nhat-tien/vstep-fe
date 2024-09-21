"use client";
import React, { useState, useEffect } from 'react';
import styles from '@/components/Exams/QuestionType/SelectType/Styles.module.css';
import { useAppStore } from '@/stores/app-store-provider';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

const MultipleChoice = ({ question, questionNumber, skill}) => {
  const answers = useAppStore(state => state[`${skill}Answers${question.part}`])
  const setAnswers = useAppStore(state => state[`set${capitalizeFirstLetter(skill)}Answers`]);


  const handleOptionChange = (event) => {
    setAnswers(question.questionId, event.target.value, question.part);
  };

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div className= {styles["multiple-choice"]}>
      <h3 className={styles["question"]}>QUESTION {questionNumber}: {question.text}</h3>
      <ul>
        {question.selectOption && question.selectOption.length > 0 ? (
          question.selectOption.map((option, index) => (
            <li key={option.selectOptionId} className={styles["radio-button-label"]}>
              <label>
                <input
                  type="radio"
                  name={`question-${question.questionId}`}
                  value={option.selectOptionId}
                  // checked={selectedOption === String(option.selectOptionId)}
                  checked={answers[question.questionId] == option.selectOptionId}
                  onChange={handleOptionChange}
                  className={styles["radio-button"]}
                />
                <strong>{labels[index]}.</strong> {" "}
                <span>{option.text}</span>
              </label>
            </li>
          ))
        ) : (
          <p>Không có lựa chọn nào.</p>
        )}
      </ul>
    </div>
  );
};

export default MultipleChoice;
