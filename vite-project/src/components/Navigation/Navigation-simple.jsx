import { Navbar, Button, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function NavigationSimple() {
  return (
    <Navbar
      expand="md"
      bg="dark"
      variant="dark"
      className="py-3"
    >
      <Navbar.Brand href="#" className="d-flex align-items-center me-4">
        <img
          src="assets/img/logo-no-background.png"
          width="190px"
          className="ms-4"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="me-auto fs-3">
          <Link to="/home" className="fs-5 link-light me-3 ms-4"> 
            Home
          </Link>
          <Link to="/posts" className="fs-5 link-light me-3 ms-4"> 
            Posts
          </Link>
          <Link to="/about" className="fs-5 link-light me-3 ms-4"> 
            About
          </Link>
        </Nav>
        <Nav className="d-flex flex-row flex-wrap">
          <Nav.Item className="d-flex me-4">
            <Link to='/login'>
              <Button style={{ border: "2px solid var(--bs-secondary-bg)" }}>
                Sign In
              </Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/register'>
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