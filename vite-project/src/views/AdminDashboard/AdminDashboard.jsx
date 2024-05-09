import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/admin.service";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Card, Row, Col } from "react-bootstrap";
import { Ban, Trash } from "react-bootstrap-icons";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  if (loading) {
    return <Loader />;
  }

  const handleSearchChange = (search) => {
    setSearchTerm(search);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.handle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="my-4">Admin Dashboard</h1>
      <h3 className="mb-4">Registered users: </h3>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <div className="bg-white my-4">
        {filteredUsers.map((user) => {
          return (
            <Card key={user.uid} className="p-4 my-3">
              <Card.Title className="text-muted fs-2">{user.handle}</Card.Title>
              <Card.Body className="fw-light fs-5">
                <Row className="my-2">
                  <Col xs={11}>
                    <Card.Text>
                      <b>Email:</b> {user.email}
                    </Card.Text>
                  </Col>
                  <Col xs={1}>
                    <Trash className="text-danger" />
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={11}>
                    <Card.Text>
                      <b>First name:</b> {user.firstName}
                    </Card.Text>
                  </Col>
                  <Col xs={1}>
                    <Ban className="text-danger" />
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
        })}
      </div>
    </>
  );
}
