import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = ({
  show,
  setShow,
  dataResult,
  setShowAnswers,
  setIsFinished,
}) => {
  const handleShowAnswers = () => {
    setShowAnswers(true);
    setIsFinished(true);
    setShow(false);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your Quiz result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Questions: <b>{dataResult.countTotal}</b>
          </div>
          <div>
            Total Correct Answers: <b>{dataResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowAnswers}>
            Show answer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
