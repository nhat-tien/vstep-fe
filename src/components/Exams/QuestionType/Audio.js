"use client";
import React from 'react';

const Audio = ({ question }) => {
  return (
    <div>
      <h3>{question.text}</h3>
      <audio controls>
        <source src={question.fileUrl} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default Audio;