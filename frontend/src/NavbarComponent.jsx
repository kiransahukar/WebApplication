import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';

export const NavbarComponent = () => {
  const location = useLocation();
  const userDetails = useSelector((state) => state.user.value);

  const getButtonVariant = (path) => location.pathname === path ? 'dark' : 'outline-dark';

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Button 
            variant={getButtonVariant("/home")} 
            as={Link} 
            to="/home" 
            className="ml-2"
          >
            Home
          </Button>
          <Button 
            variant={getButtonVariant("/profile")} 
            as={Link} 
            to="/profile" 
            className="ml-2"
          >
            Profile
          </Button>
          <Button 
            variant={getButtonVariant("/notes")} 
            as={Link} 
            to="/notes" 
            className="ml-2"
          >
            Notes
          </Button>
          {userDetails.userType === "Guest" ? (
            <Button 
              variant={getButtonVariant("/login")} 
              as={Link} 
              to="/login" 
              className="ml-2"
            >
              Login
            </Button>
          ) : (
            <Button 
              variant={getButtonVariant("/logout")} 
              as={Link} 
              to="/logout" 
              className="ml-2"
            >
              Logout
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
