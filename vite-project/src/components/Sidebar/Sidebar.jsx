import { Container, Row, Col } from "react-bootstrap";


export default function Sidebar() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center m-0 py-sm-2 py-md-3 px-2 gap-3" fluid>
      <Row>
        <Col>
          <img src="img/logo-color.png" style={{width: '4dvw'}} alt="Logo" className="rounded-circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <img src="img/logo-color.png" style={{width: '4dvw'}} alt="Image 1" className="rounded-circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <img src="img/logo-color.png" style={{width: '4dvw'}} alt="Image 2" className="rounded-circle" />
        </Col>
      </Row>
      <Row>
        <Col>
          <img src="img/logo-color.png" style={{width: '4dvw'}} alt="Image 3" className="rounded-circle" />
        </Col>
      </Row>
    </Container>
  );
}
