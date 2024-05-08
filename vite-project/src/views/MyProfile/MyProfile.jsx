import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Card, Row, Col, Button } from "react-bootstrap";

export default function MyProfile() {
  const { userData } = useContext(AppContext);

  return (
    <Card className="p-4">
      <Row>
        <Col xs={4}>
          <img
            src="img/logo-color.png"
            style={{ width: "120px" }}
            className="rounded-circle m-0"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={4}>
          <span className="ms-3 mt-4 fs-3 text-muted">{userData.handle}</span>
        </Col>
        <Col xs={4}>
          <input type="text" className="form-control" placeholder="New email" />
        </Col>
        <Col xs={4}>
          <input
            type="text"
            className="form-control"
            placeholder="New password"
          />
        </Col>
      </Row>
      <Row className="mt-1">
        <Col xs={4}>
          <span className="ms-3 fs-5">
            {userData.firstName && userData.firstName + " " + userData.lastName}
          </span>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={4} />
        <Col xs={8}>
          <Button>Update profile info</Button>
        </Col>
      </Row>
    </Card>
  );
}
