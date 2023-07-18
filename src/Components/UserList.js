import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='background'>
    <div>
      <h1>User List</h1>
      <div className='user'>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
      />
      </div>
      <div className='user-list'>
      {filteredUsers.map(user => (
        <div key={user.id} className='user-item'>
          <img src={user.avatar} alt={user.first_name} />
          <p className='id'>ID: {user.id}</p>
          <p className='name'>First Name: {user.first_name}</p>
        </div>
    
      ))}
      </div>
    </div>
    </div> 
  );
};

export default UserList;
