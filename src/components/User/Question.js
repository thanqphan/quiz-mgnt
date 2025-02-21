import _ from "lodash";
import "./QuizDetails.scss";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

const Question = (props) => {
  const { data, index, isFinished, dataResult } = props;
  const [previewImage, setPreviewImage] = useState(false);

  const getAnswerClass = (answer) => {
    const questionResult = dataResult?.find(
      (q) => q.questionId === +data.questionId
    );
    if (!questionResult) return "";
    const correctAnswers = questionResult.systemAnswers || [];

    const isCorrect = correctAnswers.some(
      (sysAns) => sysAns.id === answer.id && sysAns.correct_answer
    );

    const isSelected = answer.isSelected;
    if (isCorrect && isSelected) return "answer-correct";
    if (!isCorrect && isSelected) return "answer-incorrect";
    if (isCorrect && !isSelected) return "answer-highlight";

    return "";
  };

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
          <img
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPreviewImage(true);
            }}
            src={`data:image/jpeg;base64,${data.image}`}
          />
          {previewImage && (
            <Lightbox
              open={previewImage}
              close={() => setPreviewImage(false)}
              slides={[{ src: `data:image/jpeg;base64,${data.image}` }]}
            />
          )}
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
              <div
                key={`answer-${index}`}
                className={`quiz-answer-child ${getAnswerClass(answer)}`}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={`answer-${answer.id}`}
                    onChange={(event) => {
                      handleCheckCheckBox(event, answer.id, data.questionId);
                    }}
                    checked={answer.isSelected}
                    disabled={isFinished}
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
