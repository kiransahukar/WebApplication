import React, { useState } from "react";
import RightComponent from "./../rightSection/RightComponent";
import AddSessions from "./Staff/AddSessions";
import StaffCourseDetails from "../leftSection/Staff/StaffCourseDetails";
import AddCourseDetails from "./Staff/AddCourseDetails";
import StudentsDetails from "./Staff/StudentsDetails";
import Update from "./Staff/Update";
import StudentsLabDetails from "./Staff/StudentsLabDetails";
import { Button, Container, Row, Col, Offcanvas } from 'react-bootstrap';
import Delete from "./Staff/Delete";
import GroupChat from "../Chat/GroupChat";
import { useSelector } from "react-redux";

const StaffDashboard = () => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(1);
  const [selectedSession, setSelectedSession] = useState();
  const [mainContent, setMainContent] = useState("StudentsDetails");
  const [sessionDetails, setSessionDetail] = useState(null);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const userId = useSelector((state)=>state.user.value.userId);
  const toggleLeftComponent = () => {
    setIsLeftVisible(!isLeftVisible);
  };

  const toggleRightComponent = () => {
    setIsRightVisible(!isRightVisible);
  };

  return (
    <Container fluid>

    <Row>
      <Col md={1}>
      <Button onClick={toggleLeftComponent} variant="outline-dark" className="flex-left m-1 ml-0">
            {isLeftVisible ? 'Hide Course Details' : 'Show Course Details'}
      </Button>

      </Col>
      

      
      <Col md={10} className="mainContent">
          {mainContent === "StudentsDetails" && <StudentsDetails courseId={selectedCourse} />}
          {mainContent === "StudentsLabDetails" && <StudentsLabDetails sessionId={sessionDetails} />}
          {mainContent === "AddCourse" && <AddCourseDetails />}
          {mainContent === "AddSession" && <AddSessions courseId={selectedCourse} content={setMainContent} />}
          {mainContent === "Update" && <Update sessionDetail={sessionDetails} content={setMainContent} />}
          {mainContent === "Delete" && <Delete sessionDetail={sessionDetails} content={setMainContent} />}
        </Col>
     

        <Col md={1}>
        <Button onClick={toggleRightComponent} variant="outline-dark" className="fixed-left m-3">
        Toggle Messages
      </Button>
        </Col>

        </Row>

        <Offcanvas show={isLeftVisible} onHide={toggleLeftComponent} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Staff </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <StaffCourseDetails
            isVisible={isLeftVisible}
            selectedDetails={setSelectedCourse}
            content={setMainContent}
            sessionDetail={setSessionDetail}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={isRightVisible} onHide={toggleRightComponent} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Messages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <GroupChat
          isVisible={isRightVisible}
          currentUser={userId}/>
        </Offcanvas.Body>
      </Offcanvas>

     
    </Container>
    

  );
};

export default StaffDashboard;
