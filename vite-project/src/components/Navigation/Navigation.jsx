import { Navbar, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

export default function Navigation() {
  const { user, userData } = useContext(AppContext);
  
  return (
    <Navbar expand="xl" bg="dark" variant="dark" className="py-3 bg-black">
      <Navbar.Brand className="me-4">
        <img
          src="/img/logo-no-background.png"
          width="160px"
          className="ms-4"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navcol-1" className="me-4">
        <span className="visually-hidden">Toggle navigation</span>
        <span className="navbar-toggler-icon"></span>
      </Navbar.Toggle>
      <Navbar.Collapse className="align-items-center my-3 my-md-0">
        <Nav className="me-auto">
          <Link
            to="/"
            className="fs-5 me-3 ms-4 mb-2 mb-md-0 text-white"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            to="/posts"
            className="fs-5 me-3 ms-4 mb-2 mb-md-0 text-white"
            style={{ textDecoration: "none" }}
          >
            Posts
          </Link>
          <Link
            to="/about"
            className="fs-5 me-3 ms-4 mb-2 mb-md-0 text-white"
            style={{ textDecoration: "none" }}
          >
            About
          </Link>
          {user && <Link
            to="/create-post"
            className="fs-5 me-3 ms-4 mb-2 mb-md-0 text-white"
            style={{ textDecoration: "none" }}
          >
            Create a New Post
          </Link>}
          {user && userData && userData.priviliges === 0 && <Link
            to="/dashboard"
            className="fs-5 me-3 ms-4 mb-2 mb-md-0 text-white"
            style={{ textDecoration: "none" }}
          >
            Dashboard
          </Link>}
          </Nav>
        {user ? null : (
          <Nav className="d-flex flex-row flex-wrap align-items-center ms-4 mt-3 mt-md-0">
            <Nav.Item className="d-flex me-4">
              <Link to="/signin">
                <Button
                  className="light me-0 bg-transparent"
                  style={{ border: "2px solid var(--bs-secondary-bg)" }}
                >
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
        )}
        <Header/>
      </Navbar.Collapse>
    </Navbar>
  );
}
