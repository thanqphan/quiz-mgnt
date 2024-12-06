import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, setShow, dataResult } = props;

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
          <Button variant="secondary" onClick={handleClose}>
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
