import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'https://flask-nosql-backend.onrender.com/api/add_users';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [updateUserData, setUpdateUserData] = useState({ id: '', name: '', email: '' });
  const [deleteUserId, setDeleteUserId] = useState('');

  // Fetch all users from the backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(baseUrl);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post(baseUrl, newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers(); // Refresh the user list after adding a new user
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`${baseUrl}/${updateUserData.id}`, updateUserData);
      setUpdateUserData({ id: '', name: '', email: '' });
      fetchUsers(); // Refresh the user list after updating a user
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${baseUrl}/${deleteUserId}`);
      setDeleteUserId('');
      fetchUsers(); // Refresh the user list after deleting a user
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Add User Section */}
      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* Update User Section */}
      <div>
        <h2>Update User</h2>
        <input
          type="text"
          placeholder="User ID"
          value={updateUserData.id}
          onChange={(e) => setUpdateUserData({ ...updateUserData, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="New Name"
          value={updateUserData.name}
          onChange={(e) => setUpdateUserData({ ...updateUserData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="New Email"
          value={updateUserData.email}
          onChange={(e) => setUpdateUserData({ ...updateUserData, email: e.target.value })}
        />
        <button onClick={handleUpdateUser}>Update User</button>
      </div>

      {/* Delete User Section */}
      <div>
        <h2>Delete User</h2>
        <input
          type="text"
          placeholder="User ID"
          value={deleteUserId}
          onChange={(e) => setDeleteUserId(e.target.value)}
        />
        <button onClick={handleDeleteUser}>Delete User</button>
      </div>

      {/* Display All Users */}
      <div>
        <h2>All Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              ID: {user.id} - {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
