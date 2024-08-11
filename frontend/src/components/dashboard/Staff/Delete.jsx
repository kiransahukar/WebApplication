import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

const token = localStorage.getItem('token');

const Update = ({ sessionDetail, content }) => {
  const [sessionNo, setSessionNo] = useState(sessionDetail.session_no);
  const [sessionName, setSessionName] = useState(sessionDetail.session_name);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      data: {
        attributes: {
          id: sessionDetail.id,
          session_no: sessionNo,
          session_name: sessionName,
        },
      },
    };

    const postApi = 'http://127.0.0.1:8000/api/courseDetails';
    try {
     const response= await axios.patch(postApi, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
     // console.log(response.data.data);
      setMessage('Session Deleted successfully!');
     

      // if(sessions.length>0) {
      //   toast.success("Update successful!");
      // }
      setSessionNo('');
      setSessionName('');
      //content("StudentsDetails");
      
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleOnClick = (prop) => {
    content(prop);
  };

  return (
    <Container className="my-4 p-4 bg-white rounded shadow-sm">
      <h2 className="text-center mb-4">Delete Session</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="sessionNo" className="mb-3">
          <Form.Label>Session No:</Form.Label>
          <Form.Control
           // type="text"
           // value={sessionNo}
            onChange={(e) => setSessionNo(e.target.value)}
            placeholder={sessionNo}
          />
        </Form.Group>
        <Form.Group controlId="sessionName" className="mb-3">
          <Form.Label>Session Name:</Form.Label>
          <Form.Control
            //type="text"
           // value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder={sessionName}
          />
        </Form.Group>
        <div className="d-flex">
         <Button variant="outline-dark" type="submit" className="me-2">Delete</Button>
        <Button variant="outline-dark" className="ms-2" onClick={() => handleOnClick("StudentsDetails")}>Cancel</Button>
      </div>

      </Form>
      {message && (
        
        <Alert variant={message.includes('successfully') ? 'success' : 'danger'} className="mt-3">
          {message}
        </Alert>

      )}
    
    </Container>
  );
};

export default Update;
