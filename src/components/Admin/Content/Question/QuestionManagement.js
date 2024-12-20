import { useState } from "react";
import Select from "react-select";
import "./QuestionManagement.scss";
import { BiListMinus, BiListPlus } from "react-icons/bi";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const QuestionManagement = () => {
  const [selectedQuiz, setSelectedQuiz] = useState();
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "answer 2",
          isCorrect: false,
        },
      ],
    },
  ]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      let newQuestion = {
        id: uuidv4(),
        description: "question",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "answer 1",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let clonedQuestion = _.cloneDeep(questions);
      clonedQuestion = clonedQuestion.filter((x) => x.id !== id);
      setQuestions(clonedQuestion);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let clonedQuestion = _.cloneDeep(questions);
    if (type === "ADD") {
      let newAnswer = {
        id: uuidv4(),
        description: "answer ",
        isCorrect: false,
      };

      let index = clonedQuestion.findIndex((item) => item.id === questionId);
      clonedQuestion[index].answers.push(newAnswer);
      setQuestions(clonedQuestion);
    }
    if (type === "REMOVE") {
      let index = clonedQuestion.findIndex((item) => item.id === questionId);
      clonedQuestion[index].answers = clonedQuestion[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(clonedQuestion);
    }
  };
  return (
    <div className="question-container">
      QuestionManagement
      <div className="title">Question management</div>
      <div className="add-new-question">
        <div className="col-md-6 form-control">
          <label>Select Quiz</label>
          <Select options={options} />
        </div>
        <div className="form-control">
          <label>Add new question</label>
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <div key={question.id} className="question-main mb-3">
                  <div className="question-content">
                    <div className="form-floating description">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={question.description}
                      />
                      <label>Question's Description {index + 1}</label>
                    </div>
                    <div className="upload-image">
                      <label className="label-upload">Upload Image</label>
                      <input type="file" hidden />
                      <span>____img.jpg</span>
                    </div>
                    <div className="btn-add">
                      <span>
                        <BiListPlus
                          className="icon-add"
                          onClick={() => {
                            handleAddRemoveQuestion("ADD", "");
                          }}
                        />
                        {questions.length > 1 && (
                          <BiListMinus
                            className="icon-remove"
                            onClick={() => {
                              handleAddRemoveQuestion("REMOVE", question.id);
                            }}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  {question.answers &&
                    question.answers.length > 0 &&
                    question.answers.map((answer, index) => {
                      return (
                        <div key={answer.id} className="answers-content">
                          <input
                            className="form-check-input checkbox-answer"
                            type="checkbox"
                          />
                          <div className="form-floating answer-input">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Description"
                              value={answer.description}
                            />
                            <label>Answer {index + 1}</label>
                          </div>
                          <div className="btn-add">
                            <span>
                              <FiPlusSquare
                                className="icon-add"
                                onClick={() => {
                                  handleAddRemoveAnswer("ADD", question.id, "");
                                }}
                              />
                              {question.answers.length > 1 && (
                                <FiMinusSquare
                                  className="icon-remove"
                                  onClick={() => {
                                    handleAddRemoveAnswer(
                                      "REMOVE",
                                      question.id,
                                      answer.id
                                    );
                                  }}
                                />
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default QuestionManagement;
