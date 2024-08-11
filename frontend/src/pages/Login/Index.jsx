import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './../../App.module.css';

function Index() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div className="App">
      <nav style={styles.nav}>
        <button onClick={() => setCurrentPage('login')} >Login</button>
        <button onClick={() => setCurrentPage('register')} >Register</button>
      </nav>
      {currentPage === 'login' ? <Login /> : <Register />}
    </div>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  // navButton: {
  //   padding: '10px 20px',
  //   margin: '0 10px',
  //   border: 'none',
  //   borderRadius: '5px',
  //   backgroundColor: '#61dafb',
  //   color: 'white',
  //   cursor: 'pointer',
  // },
};

export default Index;
