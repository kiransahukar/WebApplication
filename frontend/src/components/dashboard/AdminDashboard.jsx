import React, { useState } from "react";

import { Button, Container, Row, Col } from "react-bootstrap";
import CreateUser from "./Admin/CreateUser";
import EnrollStaff from "./Admin/EnrollStaff";
import EnrollStudent from "./Admin/EnrollStudent";

const AdminDashboard = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={10} className="mainContent">
          <h2>Create User</h2>
          <CreateUser />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={10} className="mainContent">
          <h2>Enroll User</h2>
          {/* <EnrollStaff />
      <EnrollStudent /> */}
          <Row className="mb-3">
            <EnrollStaff />
          </Row>
          <Row className="mb-3">
            <EnrollStudent />
          </Row>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={10} className="mainContent">
          <h2>Manage Users</h2>
          {/* <SeeUsers />
      <DeleteUser /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
