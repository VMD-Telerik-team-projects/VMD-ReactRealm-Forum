import { useEffect, useState } from 'react';
import { getAllUsers } from "../../services/admin.service"
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearchChange = (search) => {
    setSearchTerm(search);
  };

  const filteredUsers = users.filter(user => 
    (user.handle?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <h1 className='my-4'>Admin Dashboard</h1>
      <h3 className='mb-4'>Registered users: </h3>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <div className='bg-white my-4'>
        {filteredUsers.map(user => {
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