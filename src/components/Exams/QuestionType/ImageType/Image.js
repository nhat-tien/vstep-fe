"use client";
import React from 'react';

const Picture = ({ question }) => {
  return (
    <div>
      <h3>{question.text}</h3>
      <img src={question.fileUrl} alt="Hình ảnh." style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export default Picture;