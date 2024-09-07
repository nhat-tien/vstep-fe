"use client";
import React, { useState } from 'react';
import { useEffect } from 'react';

const MultipleChoice = ({ question, selectedAnswer, saveAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if(selectedAnswer) {
      setSelectedOption(selectedAnswer)
    }
  }, [selectedAnswer]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    saveAnswer(value);
  };

  return (
    <div className="multiple-choice">
      <h3>{question.text}</h3>
      <ul>
        {question.selectOption && question.selectOption.length > 0 ? (
          question.selectOption.map((option) => (
            <li key={option.selectOptionId}>
              <label>
                <input
                  type="radio"
                  name={`question-${question.questionId}`}
                  value={option.selectOptionId}
                  checked={selectedOption === String(option.selectOptionId)} // Đảm bảo giá trị là kiểu string
                  onChange={handleOptionChange}
                />
                {option.text}
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
