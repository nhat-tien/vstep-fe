"use client";
// import Text from '../../QuestionType/TextType/Text';
import styles from '@/components/Exams/ContainerSkill/Writing/styles.module.css';
import Image from "@/components/Exams/QuestionType/ImageType/Image";
import TextBoxAnswer from '@/components/TextBoxAnswer/TextBoxAnswer';
import { useAppStore } from '@/stores/app-store-provider';
import useQuestions from '@/hooks/useQuestions';
import { useParams } from 'next/navigation';

const ContainerWriting = () => {
  const { questions } = useQuestions();
  const { part } = useParams();
  const answers = useAppStore(state => state[`writingAnswers${part}`]);
  
  const wordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className={styles['container-Writing-Wrapper']}>
      <div className={styles['container-Writing']}>
        {questions.map((question) => {
          if (question.questionType === 'image') {
            const currentText = answers[question.questionId] || '';
            const currentWordCount = wordCount(currentText);

            return (
              <div key={question.questionId} className={styles['readingBox']}>
                <Image 
                  key={question.questionId}
                  question={question}
                />
                <div className={styles['wordCountBox']}>
                  <p>Words count: {currentWordCount}</p>
                </div>
                <TextBoxAnswer questionId={question.questionId} part={question.part}/>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ContainerWriting;
