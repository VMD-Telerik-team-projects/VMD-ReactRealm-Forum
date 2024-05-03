import { Navbar, Button, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

//  TODO: Change p tags to Links
export default function Navigation() {
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
      <Navbar.Collapse className="align-items-center">
        <Nav className="me-auto">
          <Link to="/" className="fs-5 me-3 ms-4 text-white" style={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/posts" className="fs-5 me-3 ms-4 text-white" style={{ textDecoration: 'none' }}>
            Posts
          </Link>
          <Link to="/about" className="fs-5 me-3 ms-4 text-white" style={{ textDecoration: 'none' }}>
            About
          </Link>
        </Nav>
        <Nav className="d-flex flex-row flex-wrap align-items-center">
          <Nav.Item className="d-flex me-4">
            <Link to="/signin">
              <Button className="light me-0 bg-transparent" style={{ border: "2px solid var(--bs-secondary-bg)" }}>
                Sign In
              </Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/signup">
              <Button variant="light" className="me-4">
                Sign Up
              </Button>
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}