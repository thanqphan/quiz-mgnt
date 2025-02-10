import CountDown from "./CountDown";

const RightContent = (props) => {
  const dataQuiz = props.dataQuiz;
  const onTimeUp = () => {
    props.handleFinishQuiz();
  };
  console.log(dataQuiz);
  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div key={`question-number-${index++}`} className="question">
                {index++}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
