import { useEffect, useState} from "react";
import { getAllUsers } from "../../services/admin.service";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Card, Row, Col } from "react-bootstrap";
import { Ban, Trash } from "react-bootstrap-icons";
import { deleteUserByHandle, blockUserByHandle, unblockUserByHandle } from "../../services/admin.service";
import './AdminDashboard.css';

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

  const handleDeleteUser = async (handle) => {
    try {
      await deleteUserByHandle(handle);
      setUsers(users.filter((u) => u.handle !== handle));
      alert('Deleted user');
    } catch (error) {
      console.error('Deleting user: error', error);
    }
  };

  const handleBlockUser = async (handle) => {
    try {
      await blockUserByHandle(handle);
      setUsers(users.map((u) => u.handle === handle ? { ...u, isBlocked: true } : u));
    } catch (error) {
      console.error("Blocking user: error", error);
    }
  };

  const handleUnblockUser = async (handle) => {
    try {
      await unblockUserByHandle(handle);
      setUsers(users.map((u) => u.handle === handle ? { ...u, isBlocked: false } : u));
    } catch (error) {
      console.error("Unblocking user: error", error);
    }
  };

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
      <div className="content-container">
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
                  <button title="Delete User" className="border-0 bg-transparent">
                  <Trash className="icon text-danger" onClick={() => handleDeleteUser(user.handle)} />
                  </button>
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={11}>
                    <Card.Text>
                      <b>First name:</b> {user.firstName}
                    </Card.Text>
                  </Col>
                  <Col xs={1}>
                  <button title={user.isBlocked ? "Unblock User" : "Block User"} className="border-0 bg-transparent" onClick={() => user.isBlocked ? handleUnblockUser(user.handle) : handleBlockUser(user.handle)}>
                    {user.isBlocked ? <span className=" text-success">Unblock</span> : <Ban className=" icon text-danger" />}
                    </button>
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
      </div>
    </>
  );
}
