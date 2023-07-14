import React from "react";
import { Modal, Button } from "react-bootstrap";
import { BUTTON } from "../Constants";

const ConfirmModal = ({ title, body, open, onClose, onConfirm, okMsg }) => {
  return (
    <>
      <Modal show={open} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onConfirm}>
            {okMsg}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal;
