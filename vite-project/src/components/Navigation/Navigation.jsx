import { Navbar, Button, Nav } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar
      expand="md"
      bg="dark"
      variant="dark"
      className="py-3"
      style={{ "--bs-body-bg": "#000000" }}
    >
      <Navbar.Brand href="#" className="d-flex align-items-center me-4">
        <img
          src="../../assets/img/logo-no-background.png"
          width="190px"
          className="ms-4"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navcol-1" className="text-bg-light">
        <span className="visually-hidden">Toggle navigation</span>
        <span
          className="navbar-toggler-icon"
          style={{ color: "var(--bs-secondary-bg)" }}
        ></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="navcol-1">
        <Nav className="me-auto">
          <Nav.Link
            href="#"
            className="active fs-5 link-light me-3 ms-4"
            style={{ fontSize: "20px" }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            href="#"
            className="fs-5 link-light me-3"
            style={{ fontSize: "20px" }}
          >
            Posts
          </Nav.Link>
          <Nav.Link
            href="#"
            className="fs-5 link-light"
            style={{ fontSize: "20px" }}
          >
            About
          </Nav.Link>
        </Nav>
        <Nav className="d-flex flex-row flex-wrap">
          <Nav.Item className="d-flex me-4" style={{ marginRight: "0px" }}>
            <Button
              variant="link"
              className="link-light me-0"
              style={{ border: "2px solid var(--bs-secondary-bg)" }}
            >
              Sign In
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button variant="light" className="me-4">
              Sign Up
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
