import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const token = localStorage.getItem("token");

function DeleteCourse({ course }) {
  // console.log(course);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({
    courseName: null,
  });
  const [enrollType, setEnrollType] = useState("");
  const handleOpen = () => {
    setShow(true);
    setEnrollType("Staff");
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const courseApi = `http://127.0.0.1:8000/api/courses/${course.id}`;

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log("here");
    try {
      const response = await axios.delete(courseApi, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Deleted successful!");
      setDetails({
        courseName: null,
      });
    } catch (err) {
      toast.error(err.response.data.message + "  Please try again.");
    }

    handleClose();
  };
  return (
    <div>
      <Button variant="outline-danger" onClick={handleOpen}>
        Delete Course
      </Button>
      {/* <div className="d-flex justify-content-center align-items-center gap-2">
        
      </div> */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>Course Details</Card.Title>
              <Card.Text>
                <strong>Course ID:</strong> {course.id}
              </Card.Text>
              <Card.Text>
                <strong>Course Name:</strong> {course.attributes.name}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>

          <div className="col flex-row d-flex justify-content-center align-items-center mr-2">
            <div className="btn-info btn-sm me-2">
              <Button variant="outline-danger" on onClick={handleSubmit}>
                Delete
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

export default DeleteCourse;
