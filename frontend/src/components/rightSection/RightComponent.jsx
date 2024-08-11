import React from 'react';
import { Offcanvas } from 'react-bootstrap';

const RightComponent = ({ isVisible, onHide }) => {
  return (
    <Offcanvas show={isVisible} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Right Component</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p>This is about messaging.</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default RightComponent;
