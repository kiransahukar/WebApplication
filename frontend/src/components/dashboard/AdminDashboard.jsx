import React, { useState } from "react";

import { Button, Container, Row, Col } from "react-bootstrap";
import CreateUser from "./Admin/CreateUser";
import Enroll from "./Admin/Enroll";
import RemoveEnroll from "./Admin/RemoveEnroll";
import EnrollStudent from "./Admin/EnrollStudent";
import Manage from "./Admin/Manage";
import ViewUsers from "./Admin/ViewUsers";
import ViewCourse from "./Admin/ViewCourse";
import Filter from "../Filter/Filter";

const AdminDashboard = () => {

  const [mainContent, setMainContent] = useState("Manage");


const handelMainContent=(content) =>{
  setMainContent(content);
}


  return (
    <Container fluid>
      <Row >
        <Col xs={3} className="bg-light">
          <div className="d-flex flex-column">
            <Button variant="outline-dark" className="m-1" onClick={(e) => {
                                e.stopPropagation();
                                handelMainContent("Manage");
                              }}>
              Manage
            </Button>
            <Button variant="outline-dark" className="m-1" onClick={(e) => {
                                e.stopPropagation();
                                handelMainContent("Course");
                              }}>
              Course
            </Button>
            <Button variant="outline-dark" className="m-1" onClick={(e) => {
                                e.stopPropagation();
                                handelMainContent("Users");
                              }}>
              Users
            </Button>
          </div>
        </Col>

        <Col xs={12} md={9} className="p-3 border  bg-light">
          {mainContent === "Manage" && <Manage />}
          {mainContent === "Course" && <ViewCourse />}
          {mainContent === "Users" && <ViewUsers />}
         
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;


