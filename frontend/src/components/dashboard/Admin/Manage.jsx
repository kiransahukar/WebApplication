import React, { useState } from "react";

import { Button, Container, Row, Col } from "react-bootstrap";
import CreateUser from "./CreateUser";
import Enroll from "./Enroll";
import RemoveEnroll from "./RemoveEnroll";
import EnrollStudent from "./EnrollStudent";

const Manage = () => {
  return (

        <>
          <Row className="mb-4">
            <Col md={10} className="mainContent">
              <h2>Create User</h2>
              <CreateUser />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={10} className="mainContent">
              <h2>Enroll User</h2>
              <Row className="mb-3">
                <Enroll />
              </Row>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={10} className="mainContent">
              <h2>Manage Users</h2>
              <Row className="mb-3">
                <RemoveEnroll />
              </Row>
            </Col>
          </Row>
        </>
  );
};

export default Manage;


