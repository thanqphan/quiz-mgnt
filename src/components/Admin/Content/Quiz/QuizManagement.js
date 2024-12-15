import { useRef, useState } from "react";
import "./QuizManagement.scss";
import Select from "react-select";
import { postCreateQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import QuizTable from "./QuizTable";
import { Accordion } from "react-bootstrap";

const QuizManagement = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleCreateNewQuiz = async () => {
    if (!name || !description) {
      toast.error("Please enter Name and Description");
      return;
    }
    let res = await postCreateQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");

      // Reset input file
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } else {
      toast.error(res.EM);
    }
  };

  const options = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HARD", label: "Hard" },
  ];
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Quiz Management</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add New Quiz:
                </legend>
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
                    placeholder="Quiz Type..."
                    value={type}
                    defaultValue={type}
                    onChange={setType}
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
                    ref={fileInputRef}
                  ></input>
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={() => {
                      handleCreateNewQuiz();
                    }}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <QuizTable />
    </div>
  );
};

export default QuizManagement;
