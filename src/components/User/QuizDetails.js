import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuestionByQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./QuizDetails.scss";
import Question from "./Question";

const QuizDetails = (props) => {
  const param = useParams();
  const location = useLocation();
  const quizId = param.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

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
      setDataQuiz(data);
    }
    console.log("data quiz", dataQuiz);
  };

  const handlePrev = () => {
    if (index <= 0) return;
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
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
          <Question
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            index={index}
          />
        </div>
        <div className="quiz-footer">
          <button
            className="btn btn-secondary"
            onClick={() => {
              handlePrev();
            }}
          >
            Prev
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              handleNext();
            }}
          >
            Next
          </button>
        </div>
      </div>
      <div className="right-content">Count down</div>
    </div>
  );
};

export default QuizDetails;
