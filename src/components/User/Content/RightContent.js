const RightContent = (props) => {
  const dataQuiz = props.dataQuiz;
  console.log(dataQuiz);
  return (
    <>
      <div className="main-timer">01:11</div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return <div className="question">{index++}</div>;
          })}
      </div>
    </>
  );
};

export default RightContent;
