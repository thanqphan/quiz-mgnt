import { useState } from "react";
import Select from "react-select";
import "./QuestionManagement.scss";
import { BiListMinus, BiListPlus } from "react-icons/bi";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";

const QuestionManagement = () => {
  const [selectedQuiz, setSelectedQuiz] = useState();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
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
          <div className="question-content">
            <div className="form-floating description">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
              />
              <label>Description</label>
            </div>
            <div className="upload-image">
              <label className="label-upload">Upload Image</label>
              <input type="file" hidden />
              <span>____img.jpg</span>
            </div>
            <div className="btn-add">
              <span>
                <BiListPlus className="icon-add" />
                <BiListMinus className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input
              className="form-check-input checkbox-answer"
              type="checkbox"
            />
            <div className="form-floating answer-input">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
              />
              <label>Answer 1</label>
            </div>
            <div className="btn-add">
              <span>
                <FiPlusSquare className="icon-add" />
                <FiMinusSquare className="icon-remove" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionManagement;
