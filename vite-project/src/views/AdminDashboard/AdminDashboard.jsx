import { useEffect, useState } from 'react';
import { getAllUsers } from "../../services/admin.service"

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getAllUsers();
      // Convert the snapshot to a JavaScript object
      const usersData = usersSnapshot.val();
      // Convert the object to an array of user objects
      const usersArray = Object.keys(usersData).map(key => ({ uid: key, ...usersData[key] }));
      setUsers(usersArray);
    };
  
    fetchUsers();
  }, []);

  console.log(users);

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