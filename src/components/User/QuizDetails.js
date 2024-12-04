import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionByQuiz } from "../../services/apiServices";
import _ from "lodash";

const QuizDetails = (props) => {
  const param = useParams();
  const quizId = param.id;

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

  return <div>details</div>;
};

export default QuizDetails;
