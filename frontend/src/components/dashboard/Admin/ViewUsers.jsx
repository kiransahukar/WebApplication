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

  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15; 

  const filterApi = `http://127.0.0.1:8000/api/users`;

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
    setCurrentPage(1); 
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

      {currentUsers.length > 0 ? (
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
              {currentUsers.map((user) => (
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

      
      {filteredUsers.length > usersPerPage && (
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(i + 1)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="page-link">{i + 1}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

     
      {selectedUser && (
        <UserDetails user={selectedUser} show={show} setShow={setShow} />
      )}
    </div>
  );
};

export default ViewUsers;
