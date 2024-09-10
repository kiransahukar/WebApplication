import React from "react";
import { Modal, Button } from "react-bootstrap";

const NoteView = ({ note, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{note.attributes.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{note.attributes.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteView;
