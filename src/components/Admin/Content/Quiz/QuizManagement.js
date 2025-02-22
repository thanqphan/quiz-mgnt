import { useEffect, useRef, useState } from "react";
import "./QuizManagement.scss";
import Select from "react-select";
import { getAllQuiz, postCreateQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import QuizTable from "./QuizTable";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

const QuizManagement = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [listQuizzes, setListQuizzes] = useState([]);

  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [selectedQuizData, setselectedQuizData] = useState({});

  const [key, setKey] = useState("manage");

  //set input tag value selected
  const fileInputRef = useRef(null);
  const handleUploadImage = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    fetchListQuizzes();
  }, []);

  const fetchListQuizzes = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      setListQuizzes(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const handleClickBtnUpdateQuiz = (user) => {
    setShowModalUpdateQuiz(true);
    setselectedQuizData(user);
  };
  const handleClickBtnDeleteQuiz = (user) => {
    setShowModalDeleteQuiz(true);
    setselectedQuizData(user);
  };

  const resetselectedQuizData = () => {
    setselectedQuizData({});
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

      fetchListQuizzes();
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
      <Tabs
        id="quiz-management-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        justify
      >
        <Tab eventKey="manage" title="Quiz Management">
          <div className="add-new">
            <fieldset className="border rounded-3 p-3">
              <legend className="float-none w-auto px-3">Add New Quiz:</legend>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name of the quiz"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <label>Name of the quiz</label>
              </div>
              <div className="form-floating mb-3">
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
                  onChange={handleUploadImage}
                  ref={fileInputRef}
                />
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-warning"
                  onClick={handleCreateNewQuiz}
                >
                  Save
                </button>
              </div>
            </fieldset>
          </div>
          <div className="tbl-quiz-container mt-4">
            <QuizTable
              listQuizzes={listQuizzes}
              handleClickBtnUpdateQuiz={handleClickBtnUpdateQuiz}
              handleClickBtnDeleteQuiz={handleClickBtnDeleteQuiz}
            />
          </div>
        </Tab>

        <Tab eventKey="updateQA" title="Update Q&A Quiz">
          <QuizQA />
        </Tab>

        <Tab eventKey="assign" title="Assign to Users">
          <AssignQuiz />
        </Tab>
      </Tabs>

      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        selectedQuizData={selectedQuizData}
        resetselectedQuizData={resetselectedQuizData}
        fetchListQuizzes={fetchListQuizzes}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        selectedQuizData={selectedQuizData}
        fetchListQuizzes={fetchListQuizzes}
      />
    </div>
  );
};

export default QuizManagement;
