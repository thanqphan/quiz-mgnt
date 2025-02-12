import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const refDiv = useRef([]);
  const dataQuiz = props.dataQuiz;
  const onTimeUp = () => {
    props.handleFinishQuiz();
  };
  // console.log(dataQuiz);
  const getClassName = (question) => {
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(
        (answers) => answers.isSelected === true
      );
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };
  const handleCLickedQuestion = (question, index) => {
    props.setIndex(index);
    if (refDiv && refDiv.current) {
      refDiv.current.forEach((question) => {
        if (question && question.className === "question clicked") {
          question.className = "question";
        }
      });
    }
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(
        (answers) => answers.isSelected === true
      );
      if (isAnswered) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };
  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((question, index) => {
            return (
              <div
                key={`question-number-${index + 1}`}
                className={getClassName(question)}
                onClick={() => {
                  handleCLickedQuestion(question, index);
                }}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
