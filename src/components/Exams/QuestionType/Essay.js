import React from 'react';

const EssayQuestion = ({ question }) => {
    return (
        <div>
            <h3>{question.text}</h3>
            <textarea rows="4" cols="50"></textarea>
        </div>
    );
};
export default EssayQuestion;