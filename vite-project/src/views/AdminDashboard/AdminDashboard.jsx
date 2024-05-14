import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/admin.service";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Card, Row, Col } from "react-bootstrap";
import { Ban, ExclamationTriangleFill } from "react-bootstrap-icons";
import {
  blockUserByHandle,
  unblockUserByHandle,
} from "../../services/admin.service";
import { getProfilePic } from "../../services/users.service";
import ProfilePic from "../../components/ProfilePic/ProfilePic";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [profilePics, setProfilePics] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const usersSnapshot = await getAllUsers();
      const usersData = usersSnapshot.val();
      const usersArray = Object.keys(usersData).map((key) => ({
        uid: key,
        ...usersData[key],
      }));

      setUsers(usersArray);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProfilePic = async () => {
      setLoading(true);
      if (!users) return;

      users.map(async (user) => {
        const pic = await getProfilePic(user.handle);
        setProfilePics((prevProfilePics) => {
          return {...prevProfilePics, [user.handle]: pic}
        });
        setLoading(false);
      });

    };

    fetchProfilePic();
  }, [users]);

  const handleBlockUser = async (handle) => {
    try {
      await blockUserByHandle(handle);
      setUsers(
        users.map((u) => (u.handle === handle ? { ...u, isBlocked: true } : u))
      );
    } catch (error) {
      console.error("Blocking user: error", error);
    }
  };

  const handleUnblockUser = async (handle) => {
    try {
      await unblockUserByHandle(handle);
      setUsers(
        users.map((u) => (u.handle === handle ? { ...u, isBlocked: false } : u))
      );
    } catch (error) {
      console.error("Unblocking user: error", error);
    }
  };

  
  const handleSearchChange = (search) => {
    setSearchTerm(search);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.handle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) {
    return (
      <div className="min-vw-100 min-vh-100 d-flex flex-row justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }
  
  return (
    <>
      <h1 className="my-4">Admin Dashboard</h1>
      <h3 className="mb-4">Registered users: </h3>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <div className="content-container">
        <div className="bg-white my-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              return (
                <Card key={user.uid} className="p-4 my-3">
                  <Row>
                    <Col xs={1} className="me-0" style={{maxWidth: '90px'}}>
                      {Object.keys(profilePics).length > 0 && (
                        Object.keys(profilePics).map((uHandle, index) => {
                          if(uHandle === user.handle) {
                            const pic = profilePics[uHandle];
                            
                            return (
                              <ProfilePic key={index} profilePic={pic} widthAndHeight="72px" />
                            );
                          }
                        })
                      )}
                    </Col>
                    <Col xs={11} className="ms-0">
                      <Card.Title className="text-muted fs-2 my-2 ms-0">
                        {user.handle}
                      </Card.Title>
                    </Col>
                  </Row>
                  <Card.Body className="fw-light fs-5">
                    <Row className="my-2">
                      <Col xs={11}>
                        <Card.Text>
                          <b>Email:</b> {user.email}
                        </Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={11}></Col>
                      <Col xs={1}>
                        <button
                          title={user.isBlocked ? "Unblock User" : "Block User"}
                          className="border-0 bg-transparent"
                          onClick={() =>
                            user.isBlocked
                              ? handleUnblockUser(user.handle)
                              : handleBlockUser(user.handle)
                          }
                        >
                          {user.isBlocked ? (
                            <span className=" text-success">Unblock</span>
                          ) : (
                            <Ban className=" icon text-danger" />
                          )}
                        </button>
                      </Col>
                    </Row>
                    <Row className="my-2">
                      <Col xs={11}>
                        <Card.Text>
                          <b>First name:</b> {user.firstName}
                        </Card.Text>
                      </Col>
                    </Row>
                    <Row className="my-2">
                      <Card.Text>
                        <b>Last name:</b> {user.lastName}
                      </Card.Text>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div
              className="no-users-found"
              style={{ textAlign: "center", padding: "20px", color: "red" }}
            >
              <ExclamationTriangleFill size={32} color="red" />
              <h2>No users found</h2>
              <p>
                Try adjusting your search to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
