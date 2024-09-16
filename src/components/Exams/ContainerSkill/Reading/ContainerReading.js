import Text from '../../QuestionType/TextType/Text';
import MultipleChoice from '../../QuestionType/SelectType/MultipleQuestion';
import styles from './styles.module.css';

const ContainerReading = ({ questions = [] }) => {

  let multipleChoiceCount = 0;

  const paraQuestions = questions.filter((question) => question.questionType === 'para');
  const selectQuestions = questions.filter((question) => question.questionType === 'select');

  return (
    <div className={styles['container-reading-wrapper']}>
      <div className={styles['page-large']}>

        <div className={`${styles['page-small']} ${styles['reading-box']}`}>
          {paraQuestions.map((question) => (
            <div key={question.questionId}>
              <Text question={question} />
            </div>
          ))}
        </div>
        <div className={`${styles['page-small']} ${styles['question-box']}`}>
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
