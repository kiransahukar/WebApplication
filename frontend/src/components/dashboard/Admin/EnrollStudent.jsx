import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const token =localStorage.getItem('token');
function EnrollStudent() {
  const [show, setShow] = useState(false);
  const [enrollDetails, setEnrollDetails] = useState({
    userId: null,
    courseId:null,
  });

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnrollDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData = { 
      data: {
        attributes:{
          userId: enrollDetails.userId,
          courseId: enrollDetails.courseId,
        }
      } 
    };
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/enrolledStudents",userData ,{
          headers: {
            Authorization:"Bearer "+ token
          }
        });
        toast.success("Enrolled successful!");
        setEnrollDetails({
          userId: null,
          courseId: null,
        });
      } catch (err) {
        toast.error(err.response.data.message +"  Please try again.");
      } 
  

    handleClose();
  };
  return (
    <div>
      <Button variant="primary" onClick={handleOpen}>
        Enroll Student 
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUserId">
              <Form.Label>User Id</Form.Label>
              <Form.Control
                type="number"
                name="userId"
                value={enrollDetails.userId}
                onChange={handleChange}
                placeholder="Enter User Id"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formCourseId">
              <Form.Label>course Id</Form.Label>
              <Form.Control
                type="number"
                name="courseId"
                value={enrollDetails.courseId}
                onChange={handleChange}
                placeholder="Enter Course Id"
                required
              />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EnrollStudent;
