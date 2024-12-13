import { useState } from "react";
import "./QuizManagement.scss";
import Select from "react-select";

const QuizManagement = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);

  const handleUploadImage = (event) => {};

  const options = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HARD", label: "Hard" },
  ];
  return (
    <div className="quiz-container">
      <div className="title">Quiz Management</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz:</legend>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Name of the quiz"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>Name of the quiz</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Quiz description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="my-3">
            <Select
              value={type}
              // onChange={this.handleChange}
              options={options}
            />
          </div>
          <div className="more-actions">
            <label className="mb-1">Upload image</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => {
                handleUploadImage(event);
              }}
            ></input>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default QuizManagement;
