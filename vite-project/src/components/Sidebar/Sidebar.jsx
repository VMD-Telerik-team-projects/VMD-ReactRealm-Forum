import { Container, Row, Col } from "react-bootstrap";
import { getActiveUsers, getProfilePic } from "../../services/users.service";
import { useState, useEffect } from "react";
import ProfilePic from "../ProfilePic/ProfilePic";

export default function Sidebar() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [profilePics, setProfilePics] = useState([]);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      const users = await getActiveUsers();
      setActiveUsers(users);
    }

    fetchActiveUsers();
  }, []);

  useEffect(() => {
    const fetchProfilePics = async () => {
      console.log(activeUsers);
      const pics = await Promise.all(activeUsers.map(async user => {
        try {
          const pic = await getProfilePic(user);
          return pic;
        } catch (error) {
          if (error.code === 'storage/object-not-found') {
            // Skip users without a profile picture
            return 'img/default.jpg';
          }
          // Re-throw any other errors
          throw error;
        }
      }));
      setProfilePics(pics.filter(pic => pic !== null)); // Filter out null values
    }
    fetchProfilePics();
  }, [activeUsers])

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center m-0 px-2 p-0 mt-4 gap-1" fluid>
      {profilePics.length > 0 ?
      (
        profilePics.map((pic, index) => {
          return (
            <Row key={index} className="d-flex flex-row justify-content-center align-items-center gap-1">
              <Col xs={12} className="d-flex justify-content-center align-items-center">
                <div style={{ position: 'relative' }}>
                  <ProfilePic profilePic={pic} widthAndHeight='4dvw' />
                  <div style={{ 
                    height: '16px', 
                    width: '16px', 
                    backgroundColor: 'green', 
                    borderRadius: '50%', 
                    position: 'absolute',
                    right: 0,
                    bottom: 0 
                  }}></div>
                </div>
              </Col>
              <Col xs={10} className="d-flex justify-content-start align-items-center">
                <p>{activeUsers[index]}</p>
              </Col>
            </Row>
          );
        })
      ) :
      (<p></p>)}
    </Container>
  );
}
