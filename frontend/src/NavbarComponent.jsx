import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';

export const NavbarComponent = () => {
  const userDetails = useSelector((state) => state.user.value);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/home">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link as={Link} to="/home">Home</Nav.Link> */}
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/notification">Notification</Nav.Link>
          {userDetails.userType === "Guest" ? (
            <Button variant="outline-dark" as={Link} to="/login" className="ml-2">Login</Button>
          ) : (
            <Button variant="outline-dark" as={Link} to="/logout" className="ml-2">Logout</Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
