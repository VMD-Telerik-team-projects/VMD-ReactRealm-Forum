import { Card, Container, Row, Col, Button } from "react-bootstrap"

export default function SignIn() {
  const updateForm = () => { };
  const login = () => { };
  const form = {};

  return (
    <Card>
      <Card.Body className="p-5 d-flex flex-column justify-content-center align-items-center text-start fw-light">
        <Card.Title className="mb-5 fs-1 fw-light">Sign in with email</Card.Title>
        <Card.Text>
          <Container className="fs-4">
            <Row className="mb-3">
              <Col>
                <label htmlFor="email">Email: </label>
              </Col>
              <Col>
                <input value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="password">Password: </label>
              </Col>
              <Col>
                <input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" />
              </Col>
            </Row>
          </Container>
        </Card.Text>
        <Row className="mb-3">
          <Col>
            <Button onClick={login} className="px-5 py-2 fs-4">Sign In</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
