import Text from '../../QuestionType/TextType/Text';
import MultipleChoice from '../../QuestionType/SelectType/MultipleQuestion';
import styles from './styles.module.css';

const ContainerReading = ({ questions = []}) => {

  let multipleChoiceCount = 0;

  return (
    <div className={styles['container-reading-wrapper']}>
      <div className={styles['container-reading']}>
        {questions.map((question) => {
          if (question.questionType === 'para') {
            return (
              <div key={question.questionId} className={styles['readingBox']}>
                <Text
                  question={question}
                />
              </div>
            );
          }

          if (question.questionType === 'select') {
            multipleChoiceCount += 1;
            
            return (
              <MultipleChoice
                key={question.questionId}
                question={question}
                skill={"reading"}
                questionNumber={multipleChoiceCount} 
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default ContainerReading;
