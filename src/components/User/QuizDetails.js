import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionByQuiz } from "../../services/apiServices";

const QuizDetails = (props) => {
  const param = useParams();
  const quizId = param.id;

  useEffect(() => {
    getQuestionData();
  }, [quizId]);

  const getQuestionData = async () => {
    const res = await getQuestionByQuiz(quizId);
    console.log(res);
  };

  return <div>details</div>;
};

export default QuizDetails;
