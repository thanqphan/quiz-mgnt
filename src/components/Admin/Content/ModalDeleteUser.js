import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/apiServices";

const ModalDeleteUser = (props) => {
  const { show, setShow, selectedUserData } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirmDeleteUser = async () => {
    let data = await deleteUser(selectedUserData.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUsers(1);
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm User Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you wanna delete this user?s
          <br />(<b>email: {selectedUserData.email}</b>)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
