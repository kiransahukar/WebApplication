import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store.jsx'; 

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('token');

    
    dispatch(logout());

    
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Logout</h2>
      <div className="text-center">
        <p>You are about to log out. Are you sure?</p>
        <button className="btn btn-danger me-2" onClick={handleLogout}>
          Logout
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
