import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiServices";
import { Button, Modal } from "react-bootstrap";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, selectedQuizData } = props;

  const handleClose = () => setShow(false);

  const handleConfirmDeleteQuiz = async () => {
    let data = await deleteQuiz(selectedQuizData.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchListQuizzes();
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Quiz Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you wanna delete this quiz?
          <br />(<b>Id: {selectedQuizData.id}</b>)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmDeleteQuiz}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
