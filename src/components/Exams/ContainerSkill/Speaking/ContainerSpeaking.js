"use client";
import React, { useState, useEffect, useRef } from 'react';
import Text from '../../QuestionType/TextType/Text';
import Image from "../../QuestionType/ImageType/Image";
import styles from '@/components/Exams/ContainerSkill/Speaking/styles.module.css';
import WaveSurfer from 'wavesurfer.js';
import { useRouter } from 'next/navigation';

const ContainerSpeaking = ({ questions = [], handleAnswerChange }) => {
  const [showMicCheck, setShowMicCheck] = useState(true);
  const [micCheckTimeLeft, setMicCheckTimeLeft] = useState(60);
  const [currentPart, setCurrentPart] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRecording, setIsRecording] = useState(false);

  const waveformRef = useRef(null);
  const router = useRouter();

  // Đếm ngược cho phần kiểm tra mic
  useEffect(() => {
    if (micCheckTimeLeft > 0) {
      const micTimer = setInterval(() => {
        setMicCheckTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(micTimer);
    } else {
      setShowMicCheck(false);
    }
  }, [micCheckTimeLeft]);

  // Đếm ngược cho các phase, chỉ bắt đầu khi hết kiểm tra mic
  useEffect(() => {
    if (!showMicCheck) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      if (timeLeft <= 0) {
        clearInterval(timer);

        if (currentPhase === 1) {
          setCurrentPhase(2);
          setTimeLeft(15); // Thiết lập thời gian cho phase 2
          setIsRecording(true); // Bắt đầu ghi âm
        } else {
          if (currentPart < 2) {
            setCurrentPart(currentPart + 1);
            setCurrentPhase(1); // Quay lại phase 1 cho phần mới
            setTimeLeft(10); // Thiết lập thời gian cho phase 1 của phần mới
            setIsRecording(false); // Dừng ghi âm khi vào phase 1 của phần mới
          } else {
            setIsRecording(false);
            router.push('/submit');
          }
        }
      }

      return () => clearInterval(timer);
    }
  }, [timeLeft, currentPart, currentPhase, showMicCheck, router]);

  // Khởi tạo Wavesurfer khi ghi âm
  useEffect(() => {
    if (isRecording) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        height: 100
      });
      wavesurfer.load('');
      return () => wavesurfer.destroy();
    }
  }, [isRecording]);

  return (
    <div className={styles['container-Speaking-Wrapper']}>
      {showMicCheck && (
        <div className={styles['micCheckModal']}>
          <div className={styles['micCheckContent']}>
            <h2>Vui lòng kiểm tra và đeo mic</h2>
            <p>Bài thi nói bắt đầu sau: {micCheckTimeLeft} giây</p>
          </div>
        </div>
      )}

      {!showMicCheck && (
        <div className={styles['container-Speaking']}>
          <div className={styles['timer']}>
            <p>
              {isRecording
                ? `Recording Part ${currentPart + 1} - Phase ${currentPhase}: ${timeLeft} seconds`
                : `Prepare for Part ${currentPart + 1} - Phase ${currentPhase}: ${timeLeft} seconds`}
            </p>
          </div>

          {questions[currentPart]?.questionType === 'image' && (
            <Image key={questions[currentPart].questionId} question={questions[currentPart]} />
          )}

          {questions[currentPart]?.questionType === 'para' && (
            <Text key={questions[currentPart].questionId} question={questions[currentPart]} />
          )}

          {isRecording && (
            <div className={styles.recordingIndicator}>
              <div ref={waveformRef} className={styles.waveform}></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContainerSpeaking;
