import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const token =localStorage.getItem('token');

function CreateUser() {
  const [show, setShow] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    profession: '',
    password: '',
  });

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData = { 
      data: {
        attributes:{
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
          profession:userDetails.profession
        }
      } 
    };
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/users",userData ,{
          headers: {
            Authorization:"Bearer "+ token
          }
        });

        toast.success("User added successful!");
        
      } catch (err) {
        toast.error("Failed to add User. Please try again.");
      } 
    console.log('User details:', userDetails);

    handleClose();
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={handleOpen}>
        Create User
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProfession">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="profession"
                value={userDetails.profession}
                onChange={handleChange}
                placeholder="Choose profession (Staff, Student)"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                placeholder="Enter password"
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

export default CreateUser;
