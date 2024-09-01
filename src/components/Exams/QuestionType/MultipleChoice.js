import React from "react";

const MultipleChoiceQuestion = ({ question }) => {
    return (
        <div>
            <h3>{question.text}</h3>
            {question.options.map(option => (
                <div key={option.id}>
                    <input type="radio" name={question.id} value={option.id} />
                    <label>{option.text}</label>
                </div>
            ))}
        </div>
    );
};

export default MultipleChoiceQuestion;