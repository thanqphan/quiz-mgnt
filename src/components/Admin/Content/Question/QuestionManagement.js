import { useEffect, useState } from "react";
import Select from "react-select";
import "./QuestionManagement.scss";
import { BiListMinus, BiListPlus } from "react-icons/bi";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  getAllQuiz,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import Lightbox from "yet-another-react-lightbox";
import { useTranslation } from "react-i18next";

const QuestionManagement = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [previewImage, setPreviewImage] = useState(false);
  const [dataPreviewImage, setDataPreviewImage] = useState({
    title: "",
    url: "",
  });
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);
  const [quizList, setQuizList] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchListQuizzes();
  }, []);

  const fetchListQuizzes = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      let newQuizList = res.DT.map((item) => {
        return { value: item.id, label: `${item.id} - ${item.description}` };
      });
      setQuizList(newQuizList);
    } else {
      toast.error(res.EM);
    }
  };
  // console.log("list quiz", quizList);

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
  const handleOnChange = (type, questionId, data) => {
    if (type === "QUESTION") {
      let clonedQuestion = _.cloneDeep(questions);

      let index = clonedQuestion.findIndex((item) => item.id === questionId);
      if (index > -1) {
        clonedQuestion[index].description = data;
        setQuestions(clonedQuestion);
      }
    }
  };
  const handleOnChangeQuestionFile = (questionId, data) => {
    let clonedQuestion = _.cloneDeep(questions);

    let index = clonedQuestion.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      data.target &&
      data.target.files &&
      data.target.files[0]
    ) {
      clonedQuestion[index].imageFile = data.target.files[0];
      clonedQuestion[index].imageName = data.target.files[0].name;
      setQuestions(clonedQuestion);
    }
  };
  const handleAnswerData = (type, answerId, questionId, data) => {
    let clonedQuestion = _.cloneDeep(questions);
    let index = clonedQuestion.findIndex((item) => item.id === questionId);

    if (index > -1) {
      clonedQuestion[index].answers = clonedQuestion[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = data;
            }
            if (type === "INPUT") {
              answer.description = data;
            }
          }
          return answer;
        }
      );
      setQuestions(clonedQuestion);
    }
  };
  const handleSubmitQuizQuestion = async () => {
    if (_.isEmpty(selectedQuiz) || !selectedQuiz.value) {
      toast.error("Please select a quiz");
      return;
    }

    let isValidAnswer = true;
    let indexQofA = 0,
      indexA = 0;
    //validate answers
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQofA = i;
      if (!isValidAnswer) {
        break;
      }
    }

    if (!isValidAnswer) {
      toast.error(`Invalid Answer ${indexA + 1} at Question ${indexQofA + 1}`);
      return;
    }
    //validate questions
    let isValidQuestion = true;
    let indexQ = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQ = i;
        break;
      }
    }
    if (!isValidQuestion) {
      toast.error(`Invalid Question description ${indexQ + 1}`);
      return;
    }

    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );

      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }
    toast.success(`Created a new question for Quiz ${selectedQuiz.value}`);
    setQuestions(initQuestions);
  };
  const handlePreviewImage = (questionId) => {
    let clonedQuestion = _.cloneDeep(questions);
    let index = clonedQuestion.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataPreviewImage({
        title: clonedQuestion[index].imageName,
        url: URL.createObjectURL(clonedQuestion[index].imageFile),
      });
      setPreviewImage(true);
    }
  };
  return (
    <div className="question-container">
      {t("admin.question-mgnt.container")}
      <div className="title"> {t("admin.question-mgnt.title")}</div>
      <div className="add-new-question">
        <div className="col-md-6 form-control">
          <label>{t("admin.question-mgnt.select")}</label>
          <Select
            options={quizList}
            onChange={setSelectedQuiz}
            defaultValue={selectedQuiz}
          />
        </div>
        <div className="form-control">
          <label>{t("admin.question-mgnt.add")}</label>
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
                        onChange={(event) => {
                          handleOnChange(
                            "QUESTION",
                            question.id,
                            event.target.value
                          );
                        }}
                        value={question.description}
                      />
                      <label>
                        {t("admin.question-mgnt.desc")} {index + 1}
                      </label>
                    </div>
                    <div className="upload-image">
                      <label
                        htmlFor={`${question.id}`}
                        className="label-upload"
                      >
                        {t("admin.question-mgnt.upload-image")}
                      </label>
                      <input
                        id={question.id}
                        type="file"
                        hidden
                        onChange={(event) => {
                          handleOnChangeQuestionFile(question.id, event);
                        }}
                      />
                      <span style={{ cursor: "pointer" }}>
                        {question.imageName ? (
                          <span onClick={() => handlePreviewImage(question.id)}>
                            {question.imageName}
                          </span>
                        ) : (
                          "No file chosen"
                        )}
                      </span>
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
                            checked={answer.isCorrect}
                            onChange={(event) => {
                              handleAnswerData(
                                "CHECKBOX",
                                answer.id,
                                question.id,
                                event.target.checked
                              );
                            }}
                          />
                          <div className="form-floating answer-input">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Description"
                              onChange={(event) => {
                                handleAnswerData(
                                  "INPUT",
                                  answer.id,
                                  question.id,
                                  event.target.value
                                );
                              }}
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
          {questions && questions.length > 0 && (
            <div>
              <button
                className="btn btn-warning"
                onClick={() => {
                  handleSubmitQuizQuestion();
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
      {previewImage && (
        <Lightbox
          open={previewImage}
          close={() => setPreviewImage(false)}
          slides={[{ src: dataPreviewImage.url }]}
        />
      )}
    </div>
  );
};

export default QuestionManagement;
