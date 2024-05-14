import { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { Card, Row, Col, Button } from "react-bootstrap";
import { getProfilePic, updateUserData } from "../../services/users.service";
import { uploadProfilePic } from "../../services/users.service";
import ProfilePic from "../../components/ProfilePic/ProfilePic";

export default function MyProfile() {
  const { user, userData } = useContext(AppContext);
  const ref = useRef();
  const [profilePic, setProfilePic] = useState("img/default.jpg");

  useEffect(() => {
    if (user && userData) {
      getProfilePic(userData.handle).then((url) => {
        setProfilePic(url);
      });
    }
  }, [])

  const handleChanges = async () => {
    let newData;

    if (user && userData) {
      newData = { ...userData };

      ref.current = document.getElementById("new-email").value;
      if (ref.current) newData.email = ref.current;

      ref.current = document.getElementById("new-password").value;
      newData.password = ref.current;

      ref.current = document.getElementById("new-first-name").value;
      if (ref.current) newData.firstName = ref.current;

      ref.current = document.getElementById("new-last-name").value;
      if (ref.current) newData.lastName = ref.current;

      await updateUserData(userData.handle, newData);
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop();
    
    await uploadProfilePic(fileExtension, userData.handle, file);
    location.replace("/");
  };

  return (
    <Card className="p-4">
      <Row>
        <Col xs={4}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <ProfilePic profilePic={profilePic} widthAndHeight='120px'></ProfilePic>
          <Button
            className="rounded-circle"
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
            }}
          >
            <label htmlFor="img-upload" className="custom-file-upload">
              +
              <input id="img-upload" type="file" style={{ display: "none" }} onChange={async (e) => {
                await handleUploadImage(e)
              }} />
            </label>
          </Button>
        </div>
        </Col>
        <Col className="d-flex flex-column h-full justify-content-end">
          <h2>Update your profile</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={4}>
          <span className="ms-3 mt-4 fs-3 text-muted">{userData.handle}</span>
        </Col>
        <Col xs={4}>
          <input
            type="text"
            id="new-email"
            className="form-control"
            placeholder="Email"
          />
        </Col>
        <Col xs={4}>
          <input
            type="password"
            className="form-control"
            id="new-password"
            placeholder="Password"
          />
        </Col>
      </Row>
      <Row className="mt-1">
        <Col xs={4}>
          <span className="ms-3 fs-5">
            {userData.firstName && userData.firstName + " " + userData.lastName}
          </span>
        </Col>
        <Col xs={4}>
          <input
            type="text"
            id="new-first-name"
            className="form-control"
            placeholder="First name"
          />
        </Col>
        <Col xs={4}>
          <input
            type="text"
            className="form-control"
            id="new-last-name"
            placeholder="Last name"
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="d-flex flex-row w-full justify-content-center">
          <Button onClick={handleChanges}>Update profile info</Button>
        </Col>
      </Row>
    </Card>
  );
}
