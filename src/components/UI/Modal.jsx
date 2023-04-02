import React, {useState} from 'react'
import { Modal, Button}  from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useModal } from '../hooks/useModal';
import { BUTTON } from '../UI/Constants';

const Alerts = () => {
    const {modalState, openModal, closeModal} = useModal();
    const handleClose = () => {
        closeModal();
    }
    const title = useSelector((state) => state.modalTitle);
    const body = useSelector((state) => state.modalBody);
    return (
    <div>
        <Modal show={modalState} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            {BUTTON.CLOSE}
            </Button>
        </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Alerts