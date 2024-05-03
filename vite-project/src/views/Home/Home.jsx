import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="container d-flex flex-column justify-content-xl-center align-items-xl-center justify-content-xxl-center align-items-xxl-center main-container">
      <h1 className="fs-1 mb-5" style={{ color: "rgb(33,37,41)" }}>
        Sign in or register to access all posts
      </h1>
      <div>
        <Button
          variant="lg"
          className="me-4"
          style={{ border: "1px solid #000000" }}
        >
          Sign In
        </Button>
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
      </div>
      <h5 className="fw-bold mt-4" style={{ color: "rgba(33,37,41,0.4)" }}>
        or browse our top posts anonymously
      </h5>
    </div>
  );
}
