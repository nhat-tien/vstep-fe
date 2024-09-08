"use client";
import React, { useState, useEffect } from 'react';
import styles from '@/components/Exams/QuestionType/SelectType/Styles.module.css';

const MultipleChoice = ({ question, selectedAnswer, saveAnswer, questionNumber }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedAnswer) {
      setSelectedOption(selectedAnswer);
    }
  }, [selectedAnswer]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    saveAnswer(value);
  };

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div className= {styles["multiple-choice"]}>
      <h3>Question {questionNumber}: {question.text}</h3>
      <ul>
        {question.selectOption && question.selectOption.length > 0 ? (
          question.selectOption.map((option, index) => (
            <li key={option.selectOptionId} className={styles["radio-button-label"]}>
              <label>
                <input
                  type="radio"
                  name={`question-${question.questionId}`}
                  value={option.selectOptionId}
                  checked={selectedOption === String(option.selectOptionId)}
                  onChange={handleOptionChange}
                  className={styles["radio-button"]}
                />
                {labels[index]}: {option.text}
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
