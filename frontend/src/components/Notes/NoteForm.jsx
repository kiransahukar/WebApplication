import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

const NoteForm = ({ setCurrentNoteId,currentNote,setCurrentNote, onSaveNote }) => {
  const [note, setNote] = useState({ title: " ", description: " "});

  useEffect(() => {
    if (currentNote) {
      setNote(currentNote.attributes);
      setCurrentNoteId(currentNote.id)
    } else {
      setNote({ title: " ", description: " " });
      setCurrentNoteId(0);
    }
  }, [currentNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title && note.description) {
      onSaveNote(note);
    }
  };

  const handleClose = (e) => {

    setNote({ title: " ", description: " " });
    setCurrentNote(null);
   
  }

  return (
    <div className="mb-4">
      <h5>{currentNote ? "Edit Note" : "Add Note"}</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Note Title"
          />
        </div>
        <div className="mb-3">
          <textarea
            name="description"
            value={note.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="Note description"
          ></textarea>
        </div>
        
      </form>

      <div className="col flex-row d-flex justify-content-center align-items-center mr-2">
            <div className="btn-info btn-sm me-2">
              <Button variant="outline-success" on onClick={handleSubmit}>
              {currentNote ? "Update Note" : "Add Note"}
              </Button>
            </div>
            <div className="btn-info btn-sm ">
              <Button variant="outline-secondary" className="me-2" onClick={(e) => { e.stopPropagation(); handleClose() }}>
                Close
              </Button>
            </div>
          </div>
      
    </div>
  );
};

export default NoteForm;
