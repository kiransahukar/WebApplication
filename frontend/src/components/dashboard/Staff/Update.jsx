import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const token = localStorage.getItem('token');

const Update = ({ sessionDetail, content }) => {
  const [sessionNo, setSessionNo] = useState(sessionDetail.session_no);
  const [sessionName, setSessionName] = useState(sessionDetail.session_name);
  const [message, setMessage] = useState('');
  const [sessions, setSessions] = useState([]);

  const [responseData, setResponseData] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionNo || !sessionName) {
      setMessage('Both Session No and Session Name are required.');
      return;
    }

    const newSession = { sessionNo, sessionName };
    setSessions([newSession]);

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
      setMessage('Session Updated successfully!');
      setResponseData(response.data.data);

      if(sessions.length>0) {
        toast.success("Update successful!");
      }
     
      //content("StudentsDetails");
      setSessionNo(response.data.data.session_no);
      setSessionName(response.data.data.session_name);
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleOnClick = (prop) => {
    content(prop);
  };

  return (
    <Container className="my-4 p-4 bg-white rounded shadow-sm">
      <h2 className="text-center mb-4">Update Session</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="sessionNo" className="mb-3">
          <Form.Label>Session No:</Form.Label>
          <Form.Control
            type="text"
            value={sessionNo}
            onChange={(e) => setSessionNo(e.target.value)}
            placeholder="Enter session number"
          />
        </Form.Group>
        <Form.Group controlId="sessionName" className="mb-3">
          <Form.Label>Session Name:</Form.Label>
          <Form.Control
            type="text"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder="Enter session name"
          />
        </Form.Group>
        <div className="d-flex">
         <Button variant="outline-dark" type="submit" className="me-2">Update</Button>
        <Button variant="outline-dark" className="ms-2" onClick={() => handleOnClick("StudentsDetails")}>Cancel</Button>
      </div>

      </Form>
      {message && (
        <>
        <Alert variant={message.includes('successfully') ? 'success' : 'danger'} className="mt-3">
          {message}
        </Alert>

       
         <div className="mt-4">
          <h4>Sessions </h4>
          <ListGroup>
            <ListGroup.Item >
              <div>
                Session No : {responseData.session_no}
              </div>
                <div>
                Session name : {responseData.session_name}
                </div>
               
            </ListGroup.Item>

             </ListGroup>
          </div>
          </>
      )}
    
    </Container>
  );
};

export default Update;
