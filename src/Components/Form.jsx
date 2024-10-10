import React, { useState } from 'react';
import './Form.css';

function DataEntryForm() {
  const [userData, setUserData] = useState({ username: '', userId: '' });
  const [usersList, setUsersList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Add user
  const handleAdd = () => {
    if (userData.username && userData.userId) {
      setUsersList([...usersList, userData]);
      setUserData({ username: '', userId: '' });
    }
  };

  // Edit user
  const handleEdit = (index) => {
    const user = usersList[index];
    setUserData(user);
    setIsEdit(true);
    setEditIndex(index);
  };

  // Update user after editing
  const handleUpdate = () => {
    const updatedList = [...usersList];
    updatedList[editIndex] = userData;
    setUsersList(updatedList);
    setUserData({ username: '', userId: '' });
    setIsEdit(false);
    setEditIndex(null);
  };

  return (
    <div className="form-container">
      <h2>Data Entry Form</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
      </div>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={userData.userId}
          onChange={handleChange}
          placeholder="Enter user ID"
        />
      </div>
      <div>
        {isEdit ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      <h3>Users List</h3>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Username</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.length === 0 ? (
            <tr>
              <td colSpan="3">No Users Added</td>
            </tr>
          ) : (
            usersList.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.userId}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataEntryForm;
