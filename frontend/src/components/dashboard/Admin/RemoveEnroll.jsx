import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const token =localStorage.getItem('token');

function RemoveEnroll() {
  const [show, setShow] = useState(false);
  const [enrollDetails, setEnrollDetails] = useState({
    userId: 0,
    courseId:0,
  });
  const [enrollType, setEnrollType] = useState("");
  const handleOpen = () => {

    setShow(true);
    setEnrollType("Staff");
  }
  const handleOpen1 = () => {

    setShow(true);
    setEnrollType("Student");
  }
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnrollDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const staff="http://127.0.0.1:8000/api/enrolledStaff";
  const student="http://127.0.0.1:8000/api/enrolledStudents";
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData = { 
      data:{
        attributes:{
          userId: enrollDetails.userId,
          courseId: enrollDetails.courseId,
        }
      } 
    };
      try {
        const response = await axios.delete(enrollType === "Staff"?  staff : student,{
            headers: {
              Authorization:"Bearer "+ token
            },
            params: userData,
          });
        toast.success("Deleted successful!");
        setEnrollDetails({
          userId: null,
          courseId: null,
        });
      } catch (err) {
        console.log(err)
        console.log(err.response.data.message)
        toast.error(err.response.data.message +" Please try again.");
      } 
  

    handleClose();
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <Button variant="outline-danger" onClick={handleOpen}>
          Delete Staff
        </Button>
        <Button variant="outline-danger" onClick={handleOpen1}>
          Delete Student
        </Button>
      </div>

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

export default RemoveEnroll;
