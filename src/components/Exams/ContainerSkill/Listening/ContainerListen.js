"use client";
import React, { useState } from 'react';
import Audio from '../../QuestionType/AudioType/Audio';
import MultipleChoice from '../../QuestionType/SelectType/MultipleQuestion';
import Image from '../../QuestionType/ImageType/Image';
import styles from '@/components/Exams/ContainerSkill/Listening/styles.module.css';
import Text from '../../QuestionType/TextType/Text';
import useQuestions from '@/hooks/useQuestions';

const ContainerListen = () => {
  const { questions } = useQuestions();
  const [audioPlayed, setAudioPlayed] = useState(false);
  
  let multipleChoiceCount = 0;

  const handleAudioEnd = () => {
    setAudioPlayed(true);
  };

  return (
    <div className={styles["container-listen-wrapper"]}>
      <div className={styles["container-listen"]}>
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
                skill={"listening"}
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
