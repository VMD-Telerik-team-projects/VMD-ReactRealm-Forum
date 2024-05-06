import { useEffect, useState } from 'react';
import { getAllUsers } from "../../services/admin.service"
import Loader from '../../components/Loader/Loader';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const usersSnapshot = await getAllUsers();
      const usersData = usersSnapshot.val();
      const usersArray = Object.keys(usersData).map(key => ({ uid: key, ...usersData[key] }));
      
      setUsers(usersArray);
      setLoading(false);
    };
  
    fetchUsers();
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <h1 className='my-4'>Admin Dashboard</h1>
      <h3 className='mb-4'>Registered users: </h3>
      <div className='bg-white'>
        {users.map(user => {
          return (
            <div key={user.uid}>
              <h1>{user.handle}</h1>
              <p>{user.email}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}