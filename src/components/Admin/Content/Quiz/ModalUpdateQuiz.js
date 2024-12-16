import { useEffect, useState } from "react";
import { putUpdateQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import _ from "lodash";
import { Button, Modal } from "react-bootstrap";
import { PiUploadSimple } from "react-icons/pi";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, selectedQuizData } = props;

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPreviewImage("");
    props.resetselectedQuizData();
  };

  const handleUploadImage = (event) => {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  const handleSubmitUpdateQuiz = async () => {
    let data = await putUpdateQuiz(
      selectedQuizData.id,
      description,
      name,
      type,
      image
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchListQuizzes();
    } else {
      toast.error(data.EM);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(selectedQuizData)) {
      setDescription(selectedQuizData.description);
      setName(selectedQuizData.name);
      setType(selectedQuizData.difficulty);
      setImage("");
      setPreviewImage(
        selectedQuizData.image
          ? `data:image/jpeg;base64,${selectedQuizData.image}`
          : ""
      );
    }
  }, [props.selectedQuizData]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="model-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quiz Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Quiz Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label className="form-label">Type</label>
                <select
                  id="inputType"
                  className="form-control"
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value={"EASY"}>Easy</option>
                  <option value={"MEDIUM"}>Medium</option>
                  <option value={"HARD"}>Hard</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label
                  className="form-label label-upload"
                  htmlFor="uploadImage"
                >
                  <PiUploadSimple />
                  Upload File Image
                </label>
                <input
                  type="file"
                  hidden
                  id="uploadImage"
                  onChange={(event) => handleUploadImage(event)}
                ></input>
              </div>
              <div className="col-md-12 img-preview">
                {previewImage ? (
                  <img src={previewImage}></img>
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitUpdateQuiz}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
