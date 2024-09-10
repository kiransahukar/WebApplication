import React, { useEffect, useState } from "react";
import axios from "axios";
import NotesList from "./NotesList";
import NoteForm from "./NoteForm";
import NoteView from "./NoteView";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

//const token = localStorage.getItem('token');
const token = "70|R3BHFMwxHcE7GI0uNyJQkhBWXpc2GgZd5wZeMOiUb0879bf9";
function Notes() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null); // Note to be edited
  const [viewNote, setViewNote] = useState(null); // Note to be viewed in the modal
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const USER_ID = useSelector((state) => state.user.value.userId);
  const API_URL = `http://127.0.0.1:8000/api/authors/${USER_ID}/tickets`;

  const fetchNotes = async () => {
    
    try {
      const response = await axios.get(`${API_URL}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      
      console.log(response.data.data);
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add or Update Note
  const handleSaveNote = async (note) => {
    if (currentNoteId) {
      const data ={
              data : {
                attributes:{
                  user_id:USER_ID,
                  title:note.title,
                  description:note.description,
                  status:"A"
                }
              }
      }


      try {
        const response = await axios.patch(`${API_URL}/${currentNoteId}`,data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        toast.success("Updated successful!");
        fetchNotes();
      } catch (error) {
        toast.error("Error updating note:");
      }
    } else {

      const data = {
        data: {
          attributes: {
            user_id: USER_ID,
            title: note.title,
            description: note.description,
            status: "A",
          },
        },
      };

      console.log(data);

      try {
        const response = await axios.post(`${API_URL}`, data,{
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        toast.success("Added successful!");
        fetchNotes();
        //toast.success("Updated successful!");
      } catch (error) {
        toast.error("Error adding note:");
      }
    }
    setCurrentNote(null);
  };

  // Delete Note
  const handleDeleteNote = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`,{
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Deleted successful!");
      fetchNotes();
      
    } catch (error) {
      toast.error("Error deleting note:");
    }
  };

  const handleViewNote = (note) => {
    setViewNote(note);
  };

  // Close Modal
  const handleCloseModal = () => {
    setViewNote(null);
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Notes</h1>
      <NoteForm
        setCurrentNoteId={setCurrentNoteId}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        onSaveNote={handleSaveNote}
      />
      <NotesList
        notes={notes}
        onEditNote={setCurrentNote}
        onDeleteNote={handleDeleteNote}
        onViewNote={handleViewNote}
      />
      {viewNote && <NoteView note={viewNote} onClose={handleCloseModal} />}
    </div>
  );
}

export default Notes;
