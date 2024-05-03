import { Navbar, Button, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

//  TODO: Change p tags to Links
export default function NavigationSimple() {
  return (
    <Navbar
      expand="md"
      bg="dark"
      variant="dark"
      className="py-3"
    >
      <Navbar.Brand className="me-4">
        <img
          src="../../../../public/img/logo-no-background.png"
          width="160px"
          className="ms-4"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navcol-1" className="me-4">
        <span className="visually-hidden">Toggle navigation</span>
        <span
          className="navbar-toggler-icon"
        ></span>
      </Navbar.Toggle>
      <Navbar.Collapse>
        <Nav className="me-auto">
          <p className="fs-5 link-light me-3 ms-4">
            Home
          </p>
          <p className="fs-5 link-light me-3 ms-4"> 
            Posts
          </p>
          <p className="fs-5 link-light me-3 ms-4"> 
            About
          </p>
        </Nav>
        <Nav className="d-flex flex-row flex-wrap">
          <Nav.Item className="d-flex me-4">
            <p>
              <Button className="light me-0 bg-transparent" style={{ border: "2px solid var(--bs-secondary-bg)" }}>
                Sign In
              </Button>
            </p>
          </Nav.Item>
          <Nav.Item>
            <p>
              <Button variant="light" className="me-4">
                Sign Up
              </Button>
            </p>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}