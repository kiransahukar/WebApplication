import React, { useState } from "react";
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import Header from "./../header/Header";
import CourseDetails from "../leftSection/Student/CourseDetails.jsx";
import RightComponent from "./../rightSection/RightComponent";
import SessionDetails from "./Student/SessionDetails.jsx";

const StudentDashboard = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [isRightVisible, setIsRightVisible] = useState(false);

  const userId = 1;

  const toggleLeftComponent = () => {
    setIsLeftVisible(!isLeftVisible);
  };

  const toggleRightComponent = () => {
    setIsRightVisible(!isRightVisible);
  };

  return (
    <Container fluid>
      <Header onNavigate={setCurrentPage} />

      <Row>
        <Col md={3} className={`d-flex flex-column ${isLeftVisible ? 'd-block' : 'd-none'}`}>
          <Button onClick={toggleLeftComponent} variant="info" className="mb-3">
            {isLeftVisible ? 'Hide Course Details' : 'Show Course Details'}
          </Button>
          <CourseDetails
            isVisible={isLeftVisible}
            selectedDetails={setSelectedCourse}
            userId={userId}
          />
        </Col>

        <Col md={9}>
          <div className="mainContent">
            <StudentDashboard courseId={selectedCourse} />
          </div>
        </Col>
      </Row>

      <Offcanvas show={isRightVisible} onHide={toggleRightComponent} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Messages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <RightComponent />
        </Offcanvas.Body>
      </Offcanvas>

      <Button onClick={toggleRightComponent} variant="info" className="fixed-bottom m-3">
        Toggle Messages
      </Button>
    </Container>
  );
};

export default StudentDashboard;
