import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const token = localStorage.getItem('token');

function UserDetails({ user, show, setShow }) {
  const [courses, setCourses] = useState([]);

  const handleClose = () => {
    setShow(false);
  };

  const LAB_API = `http://127.0.0.1:8000/api/enrolledStudents?filter[userid]=${user.id}&sort=courseId&include=course`;

  useEffect(() => {
    const fetchLabDetails = async () => {
      try {
        const response = await axios.get(LAB_API, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCourses(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Failed to fetch lab details:', error);
      }
    };

    fetchLabDetails();
  }, [user.id]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-3">{user.attributes.name}</h5>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.attributes.email}</p>
        
        <h5 className="mt-4">Courses Enrolled:</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Course Id</th>
              <th>Course Name</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((lab, index) => (
              <tr key={index}>
                <td>{lab.includes.id}</td>
                <td>{lab.includes.attributes.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDetails;
