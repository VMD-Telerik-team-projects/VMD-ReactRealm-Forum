import { useContext, useState } from "react"; // Import useContext instead of createContext
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { registerUser } from "../../services/auth.service";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getUserByHandle,
  createUserHandle,
} from "../../services/users.service";
import Loader from "../../components/Loader/Loader";

export default function SignIn() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    priviliges: 0,
    isBlocked: false,
  });

  const { user, setAppState } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (user) {
    //alert('registration completed');
    navigate("/");
  }

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const signup = async () => {
    setLoading(true);

    if (form.firstName.length < 4 || form.firstName.length > 32) {
      toast.error("First name should be between 4 and 32 characters long!");
      return;
    }

    if (form.lastName.length < 4 || form.lastName.length > 32) {
      toast.error("Last name should be between 4 and 32 characters long!");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    try {
      const user = await getUserByHandle(form.username);
      if (user.exists()) {
        toast.error("User with this username already exists!");
        return setLoading(false);
      }
      const credential = await registerUser(form.email, form.password);
      await createUserHandle(
        form.firstName,
        form.lastName,
        form.username,
        credential.user.uid,
        credential.user.email,
        2,
        false
      );
      setAppState({ user: credential.user, userData: null });
      // console.log("about to redirect");
      navigate("/Home" || "/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }

    return setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Card>
      <Card.Body className="p-5 d-flex flex-column justify-content-center align-items-center text-start fw-light">
        <Card.Title className="mb-5 fs-1 fw-light">
          Sign up with email
        </Card.Title>
        <Card.Text>
          <Container className="fs-4">
            <Row className="mb-3">
              <Col>
                <label htmlFor="firstName">First Name: </label>
              </Col>
              <Col>
                <input
                  value={form.firstName}
                  onChange={updateForm("firstName")}
                  type="text"
                  name="firstName"
                  id="firstName"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="lastName">Last Name: </label>
              </Col>
              <Col>
                <input
                  value={form.lastName}
                  onChange={updateForm("lastName")}
                  type="text"
                  name="lastName"
                  id="lastName"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="username">Username: </label>
              </Col>
              <Col>
                <input
                  value={form.username}
                  onChange={updateForm("username")}
                  type="text"
                  name="username"
                  id="username"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="email">Email: </label>
              </Col>
              <Col>
                <input
                  value={form.email}
                  onChange={updateForm("email")}
                  type="text"
                  name="email"
                  id="email"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="password">Password: </label>
              </Col>
              <Col>
                <input
                  value={form.password}
                  onChange={updateForm("password")}
                  type="password"
                  name="password"
                  id="password"
                />
              </Col>
            </Row>
          </Container>
        </Card.Text>
        <Row className="mb-3">
          <Col>
            <Button onClick={signup} className="btn-dark px-5 py-2 fs-4">
              Sign Up
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
