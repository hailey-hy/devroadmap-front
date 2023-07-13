import React from 'react'
import { Modal, Button}  from 'react-bootstrap'
import { BUTTON } from '../Constants';

const PaginationModal = ({ title, body, open, onClose }) => {
    
    return (
    <>
        <Modal show={open} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                {BUTTON.CLOSE}
            </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default PaginationModal