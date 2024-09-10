import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const token =localStorage.getItem('token');


function AddCourse() {
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({
    courseName:null,
  });
  const handleOpen = () => {
    setShow(true);
  }

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  
  const courseApi="http://127.0.0.1:8000/api/courses";

  const handleSubmit = async(e) => {
    e.preventDefault();
    const courseData = { 
      data: {
        attributes:{
          course_name: details.courseName,
        }
      } 
    };
      try {

        const response = await axios.post(courseApi,courseData ,{
          headers: {
            Authorization:"Bearer "+ token,
          }
        });
        toast.success("Added successful!");
        setDetails({
          courseName: null,
        });
        //reload(true);
      } catch (err) {
        toast.error(err.response.data.message +"  Please try again.");
      } 
  

    handleClose();
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <Button variant="outline-primary" onClick={handleOpen}>
          Add Course
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="courseName"
                value={details.courseName}
                onChange={handleChange}
                placeholder="Enter Course Name"
                required
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <div className="col flex-row d-flex justify-content-center align-items-center mr-2">
            <div className="btn-info btn-sm me-2">
              <Button variant="outline-success" on onClick={handleSubmit}>
                Submit
              </Button>
            </div>
            <div className="btn-info btn-sm ">
              <Button variant="outline-secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddCourse;
