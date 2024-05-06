import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import './Home.css';

export default function Home() {
  const { user } = useContext(AppContext);

  return (
    <div className="container d-flex flex-column justify-content-xl-center align-items-xl-center justify-content-xxl-center align-items-xxl-center main-container">
      <h1 className="fs-1 mb-5" style={{ color: "rgb(0, 0, 0)" }}>
        {user ? "You can now freely browse our ReactRealm!" : "Sign in or register to access all posts"}
      </h1>
      {!user && (
        <div className="d-flex align-items-center">
          <NavLink to="/signin">
            <Button
              variant="lg"
              className="me-4 bg-white"
              style={{ border: "1px solid #000000" }}
            >
              Sign In
            </Button>
          </NavLink>
          <img
            src="/img/PP.png"
            width="300px"
            style={{ marginRight: "20px" }} 
            alt="Placeholder"
          />
          <NavLink to="/signup">
            <Button
              variant="lg"
              style={{
                color: "rgb(255,255,255)",
                background: "#000000",
                border: "2px solid #000000",
              }}
            >
              Sign Up
            </Button>
          </NavLink>
        </div>
      )}
      {user && (
        <div className="d-flex align-items-center">
          <img className="coding-gif"
            src="/img/coding.gif"
            width="500px"
            style={{ marginRight: "50px" }} 
            alt="Authenticated Image"
          />
        </div>
      )}
      {!user && (
        <h5 className="fw-bold mt-4" style={{ color: "rgba(0, 0, 0, 0.7)" }}>
          or browse our top posts anonymously
        </h5>
      )}
      {user && (
        <h5 className="fw-bold mt-4" style={{ color: "rgba(0, 0, 0, 0.7)" }}>
          or add comments and create posts
        </h5>
      )}
    </div>
  );
}