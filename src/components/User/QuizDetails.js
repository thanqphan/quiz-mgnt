import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuestionByQuiz, postQuizSubmit } from "../../services/apiServices";
import _ from "lodash";
import "./QuizDetails.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const QuizDetails = (props) => {
  const param = useParams();
  const location = useLocation();
  const quizId = param.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModelResult, setDataModelResult] = useState({});

  useEffect(() => {
    getQuestionData();
  }, [quizId]);

  const getQuestionData = async () => {
    const res = await getQuestionByQuiz(quizId);
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
            item.answers.isSelected = false;
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
  };

  const handlePrev = () => {
    if (index <= 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleFinishQuiz = async () => {
    console.log("dataQuiz finished", dataQuiz);
    let payload = {
      quizId: +quizId,
      answers: [],
    };

    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        //todo: user answer id
        question.answers.forEach((answer) => {
          if (answer.isSelected) {
            userAnswerId.push(answer.id);
          }
        });

        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answers;

      let res = await postQuizSubmit(payload);
      console.log(res);
      if (res && res.EC === 0) {
        setIsShowModalResult(true);
        setDataModelResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
      } else {
        alert("An error occurred");
      }
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      let tmp = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answers = tmp;
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };
  return (
    <div className="quiz-detail-container">
      <div className="left-content">
        <div className="quiz-title">
          Quiz {quizId} - {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="quiz-body"></div>
        <div className="quiz-content">
          <Question
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            index={index}
            handleCheckBox={handleCheckBox}
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
          <button
            className="btn btn-warning"
            onClick={() => {
              handleFinishQuiz();
            }}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent dataQuiz={dataQuiz} />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataResult={dataModelResult}
      />
    </div>
  );
};

export default QuizDetails;
