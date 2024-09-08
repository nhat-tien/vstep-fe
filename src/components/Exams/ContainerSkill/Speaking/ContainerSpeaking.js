// components/ContainerSpeaking.js
import React, { useState, useEffect } from 'react';
import Text from '../../QuestionType/TextType/Text';
import Image from 'next/image';

const ContainerSpeaking = ({ questions, handleAnswerChange }) => {
  const [currentPhase, setCurrentPhase] = useState(1); // Phase 1 or Phase 2
  const [timeLeft, setTimeLeft] = useState(10); // thời gian cho mỗi phase (tùy chỉnh theo nhu cầu)
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (currentPhase === 1) {
        setCurrentPhase(2); // Chuyển sang phase 2
        setTimeLeft(10); // Thời gian cho phase 2
        setIsRecording(true); // Bắt đầu thu âm
      } else {
        setIsRecording(false); // Dừng thu âm khi hết phase 2
      }
    }

    return () => clearInterval(timer); // Xóa interval khi component unmount hoặc khi timeLeft thay đổi
  }, [timeLeft, currentPhase]);

  const handleRecordingStop = () => {
    // Dừng thu âm
    setIsRecording(false);
  };

  return (
    <div className="container-speaking">
      <div className="timer">
        {currentPhase === 1 ? (
          <p>Prepare to speak: {timeLeft} seconds</p>
        ) : (
          <p>Recording: {timeLeft} seconds</p>
        )}
      </div>

      {questions.map((question) => {
        if (question.questionType === 'Picture') {
          return (
            <Image
              key={question.questionId}
              question={question}
              saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
            />
          );
        }

        if (question.questionType === 'Text') {
          return (
            <Text
              key={question.questionId}
              question={question}
              saveAnswer={(answer) => handleAnswerChange(question.questionId, answer)}
            />
          );
        }

        return null; // Không hiển thị gì nếu loại câu hỏi không khớp
      })}

      {isRecording && (
        <div className="recording-indicator">
          {/* Khu vực cho nút và biểu tượng thu âm */}
          <button onClick={handleRecordingStop}>Stop Recording</button>
        </div>
      )}
    </div>
  );
};

export default ContainerSpeaking;
