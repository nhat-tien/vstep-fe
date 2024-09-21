"use client"
import { useState, useRef } from 'react';
import Text from '../../QuestionType/TextType/Text';
import MultipleChoice from '../../QuestionType/SelectType/MultipleQuestion';
import styles from './styles.module.css';
import useQuestions from '@/hooks/useQuestions';

const ContainerReading = () => {
  const { questions } = useQuestions();
  const [leftWidth, setLeftWidth] = useState(60);
  const resizerRef = useRef(null);

  let multipleChoiceCount = 0;

  const paraQuestions = questions.filter((question) => question.questionType === 'para');
  const selectQuestions = questions.filter((question) => question.questionType === 'select');

  const handleMouseDown = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startLeftWidth = leftWidth;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newLeftWidth = Math.max(20, Math.min(80, startLeftWidth + deltaX / window.innerWidth * 100));
      setLeftWidth(newLeftWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={styles['container-reading-wrapper']}>
      <div className={styles['page-large']}>

        <div
          className={styles['reading-box']}
          style={{ width: `${leftWidth}%` }}
        >
          {paraQuestions.map((question) => (
            <div key={question.questionId}>
              <Text question={question} />
            </div>
          ))}
        </div>

        <div
          ref={resizerRef}
          className={styles['resizer']}
          onMouseDown={handleMouseDown}
        ></div>

        <div
          className={styles['question-box']}
          style={{ width: `${100 - leftWidth}%` }}
        >
          {selectQuestions.map((question) => {
            multipleChoiceCount += 1;
            return (
              <MultipleChoice
                key={question.questionId}
                question={question}
                skill={"reading"}
                questionNumber={multipleChoiceCount}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ContainerReading;
