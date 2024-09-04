"use client";
import React, { useState } from 'react';

const MultipleChoice = ({ question, saveAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    saveAnswer(value);  // Lưu lại câu trả lời với hàm saveAnswer truyền vào từ props
  };

  return (
    <div>
      <h3>{question.text}</h3>
      {question.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`option-${index}`}
            name={`question-${question.questionId}`}
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          <label htmlFor={`option-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoice;
