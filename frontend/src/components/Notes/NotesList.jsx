import React from "react";
import { Modal, Button, Form } from 'react-bootstrap';

const NotesList = ({ notes, onEditNote, onDeleteNote,onViewNote }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Your Notes</h5>
        <ul className="list-group list-group-flush">
          {notes.map((note) => (
            <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{note.attributes.title}</span>
              <div>
              <Button  variant="outline-info" className="btn-sm me-2" onClick={() => onViewNote(note)}>
                  View
                </Button>
                <Button  variant="outline-primary" className="btn-sm me-2" onClick={() => onEditNote(note)}>
                  Edit
                </Button>
                <Button   variant="outline-danger" className=" btn-sm" onClick={() => onDeleteNote(note.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotesList;
