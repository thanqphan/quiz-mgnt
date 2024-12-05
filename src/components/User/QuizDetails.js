import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuestionByQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./QuizDetails.scss";

const QuizDetails = (props) => {
  const param = useParams();
  const location = useLocation();
  const quizId = param.id;
  console.log(location);

  useEffect(() => {
    getQuestionData();
  }, [quizId]);

  const getQuestionData = async () => {
    const res = await getQuestionByQuiz(quizId);
    console.log(res);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            answers.push(item.answers);
          });
          return {
            questionId: key,
            answers,
            questionDescription,
            image,
          };
        })
        .value();
      console.log(data);
    }
  };

  return (
    <div className="quiz-detail-container">
      <div className="left-content">
        <div className="quiz-title">
          Quiz {quizId} - {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="quiz-body">
          <img></img>
        </div>
        <div className="quiz-content">
          <div className="quiz-question">How r u doin?</div>
          <div className="quiz-answer">
            <div className="quiz-answer-child">A. Fine</div>
            <div className="quiz-answer-child">B. Five</div>
            <div className="quiz-answer-child">C. I'm OK</div>
          </div>
        </div>
        <div className="quiz-footer">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content">Count down</div>
    </div>
  );
};

export default QuizDetails;
