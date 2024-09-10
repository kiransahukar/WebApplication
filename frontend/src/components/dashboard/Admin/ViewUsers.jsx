import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import UserDetails from './UserDetails';

const token = localStorage.getItem('token');

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [show, setShow] = useState(false);

  const filterApi = `http://127.0.0.1:8000/api/authors`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(filterApi, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (error) {
        toast.error('Failed to fetch users!');
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = users.filter((user) => {
      const idMatch = user.id.toString().includes(term);
      const nameMatch = user.attributes.name.toLowerCase().includes(term.toLowerCase());
      const emailMatch = user.attributes.email.toLowerCase().includes(term.toLowerCase());

      return idMatch || nameMatch || emailMatch;
    });

    setFilteredUsers(filtered);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShow(true);
  };
  
  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3 className="mb-4 text-center">User List</h3>

      <div className="row mb-4">
        <div className="col-md-12 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID, Name, or Email"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
                  <td>{user.id}</td>
                  <td>{user.attributes.name}</td>
                  <td>{user.attributes.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No users found.</p>
      )}

      {/* Modal for displaying user details */}
      {selectedUser && (
        <UserDetails user={selectedUser} show={show} setShow={setShow} />
      )}
    </div>
  );
};

export default ViewUsers;
