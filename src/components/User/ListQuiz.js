import { useEffect, useState } from "react";
import { getQuizByParticipant } from "../../services/apiServices";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByParticipant();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  return (
    <div className="list-quiz-container">
      {listQuiz &&
        listQuiz.length > 0 &&
        listQuiz.map((quiz, index) => {
          return (
            <div
              key={`${index}- quiz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                src={`data:image/jpeg;base64,${quiz.image}`}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    });
                  }}
                >
                  Start Now
                </button>
              </div>
            </div>
          );
        })}
      {listQuiz && listQuiz.length === 0 && (
        <div>You don't have any quiz available</div>
      )}
    </div>
  );
};

export default ListQuiz;
