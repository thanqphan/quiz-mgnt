import _ from "lodash";
import "./QuizDetails.scss";

const Question = (props) => {
  const { data, index } = props;
  const handleCheckCheckBox = (event, aId, qId) => {
    props.handleCheckBox(aId, qId);
  };

  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <>
      {data.image ? (
        <div className="question-image">
          <img src={`data:image/jpeg;base64,${data.image}`} />
        </div>
      ) : (
        <div className="question-image"></div>
      )}
      <div className="quiz-question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="quiz-answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((answer, index) => {
            return (
              <div key={`answer-${index}`} className="quiz-answer-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={(event) => {
                      handleCheckCheckBox(event, answer.id, data.questionId);
                    }}
                    checked={answer.isSelected}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {answer.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
