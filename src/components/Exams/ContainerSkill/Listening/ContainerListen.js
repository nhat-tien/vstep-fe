"use client";
import React, { useState, useEffect } from 'react';
import Audio from '../../QuestionType/AudioType/Audio';
import MultipleChoice from '../../QuestionType/SelectType/MultipleQuestion';
import Image from '../../QuestionType/ImageType/Image';
import styles from '@/components/Exams/ContainerSkill/Listening/styles.module.css';
import Text from '../../QuestionType/TextType/Text';

const ContainerListen = ({ questions = [], handleAnswerChange, skill, part }) => {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`answered-${skill}-${part}`);
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
      } catch (error) {
        console.error("Lỗi trong lúc parse file json:", error);
      }
    }
  }, [skill, part]);

  useEffect(() => {
    const selectedAnswersCount = Object.keys(answers).filter(questionId => 
      questions.find(q => q.questionId === questionId && q.questionType === 'select')
    ).length;
    setAnsweredQuestionsCount(selectedAnswersCount);
  }, [answers, questions]);

  useEffect(() => {
    setAnsweredQuestionsCount(0); 
  }, [part]);

  const totalQuestionsCount = questions.filter(q => q.questionType === 'select').length;
  let multipleChoiceCount = 0;

  const handleAudioEnd = () => {
    setAudioPlayed(true);
  };

  return (
    <div className={styles["container-listen-wrapper"]}>
      <div className={styles["container-listen"]}>
        <div className={styles["question-summary"]}>
          <p>Đã chọn: {answeredQuestionsCount} / {totalQuestionsCount} câu</p>
        </div>
        {questions.map((question) => {
          if (question.questionType === 'image') {
            return (
              <Image 
                key={question.questionId}
                question={question}
              />
            );
          }

          if (question.questionType === 'audio' && !audioPlayed) {
            return (
              <Audio
                key={question.questionId}
                question={question}
                onEnd={handleAudioEnd}
              />
            );
          }

          if (question.questionType === 'select') {
            multipleChoiceCount += 1;
            
            return (
              <MultipleChoice
                key={question.questionId}
                question={question}
                selectedAnswer={answers[question.questionId]} 
                saveAnswer={(answer) => {
                  handleAnswerChange(question.questionId, answer);
                  setAnswers(prevAnswers => ({ ...prevAnswers, [question.questionId]: answer }));
                }}
                questionNumber={multipleChoiceCount}
              />
            );
          }

          if (question.questionType === 'para') {
            return (
              <Text
                key={question.questionId}
                question={question}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default ContainerListen;
