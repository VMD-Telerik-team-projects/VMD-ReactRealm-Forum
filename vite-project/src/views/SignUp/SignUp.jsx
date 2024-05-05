import { useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap"
import { registerUser } from "../../services/auth.service";

export default function SignIn() {
  const [form, setForm] = useState({
    userName: '',
    password: '',
    email: '',
  })
 
  const updateForm = prop => e => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const signup = async() => {
    if (form.password.length < 6) {
      alert('Password should be at least 6 characters long');
      return;
    }

    try {
      const credential = await registerUser(form.email, form.password);
      console.log(credential.user);
    } catch (error) {
      if (error.message.includes('auth/email-already-in-use')) {
        alert('User has already been registered!');
      }
    }
  };

  return (
    <Card>
      <Card.Body className="p-5 d-flex flex-column justify-content-center align-items-center text-start fw-light">
        <Card.Title className="mb-5 fs-1 fw-light">Sign up with email</Card.Title>
        <Card.Text>
          <Container className="fs-4">
            <Row className="mb-3">
              <Col>
                <label htmlFor="username">Username: </label>
              </Col>
              <Col>
                <input value={form.username} onChange={updateForm('username')} type="text" name="username" id="username" />
              </Col>
            </Row>
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
            <Button onClick={signup} className="px-5 py-2 fs-4">Sign Up</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
