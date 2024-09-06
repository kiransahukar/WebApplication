import React, { useState } from "react";
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';

import CourseDetails from "../leftSection/Student/CourseDetails.jsx";
import RightComponent from "./../rightSection/RightComponent";

import { useSelector } from "react-redux";
import SessionDetails from "./Student/SessionDetails.jsx";
const StudentDashboard = () => {
  
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [isRightVisible, setIsRightVisible] = useState(false);

  const userId = useSelector((state)=>state.user.value.userId);

  const toggleLeftComponent = () => {
    setIsLeftVisible(!isLeftVisible);
  };

  const toggleRightComponent = () => {
    setIsRightVisible(!isRightVisible);
  };

  return (
    // <div>Hello here</div>
    <Container fluid>
       
      

      <Row>
        {/* <Col md={3} className={`d-flex flex-column ${isLeftVisible ? 'd-block' : 'd-none'}`}> */}
          
          {/* <CourseDetails
            isVisible={isLeftVisible}
            selectedDetails={setSelectedCourse}
            userId={userId}
          /> */}

<Col md={1}>
      <Button onClick={toggleLeftComponent} variant="outline-dark" className="flex-left m-1 ml-0">
            {isLeftVisible ? 'Hide Course Details' : 'Show Course Details'}
      </Button>
        </Col>


        {/* <Button onClick={toggleLeftComponent} variant="info" className="fixed-left m-3">
            {isLeftVisible ? 'Hide Course Details' : 'Show Course Details'}
          </Button> */}


        <Col md={9}>
          <div className="mainContent">
            <SessionDetails courseId={selectedCourse} userId={userId} />
          </div>
        </Col>

        <Col md={1}>
        <Button onClick={toggleRightComponent} variant="outline-dark" className="fixed-left m-3">
        Toggle Messages
      </Button>
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
      <Offcanvas show={isLeftVisible} onHide={toggleLeftComponent} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Messages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <CourseDetails
            isVisible={isLeftVisible}
            selectedDetails={setSelectedCourse}
            userId={userId}
          />
        </Offcanvas.Body>
      </Offcanvas>
     
    </Container>
  );
};

export default StudentDashboard;
