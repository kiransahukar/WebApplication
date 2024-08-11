
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const userDetails=useSelector((state)=>state.user.value);

  console.log(userDetails)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile'); // Replace with your API endpoint
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setPasswordMessage('New passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/change-password', {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        setPasswordMessage('Password changed successfully!');
      } else {
        setPasswordMessage('Failed to change password.');
      }
    } catch (error) {
      setPasswordMessage('Error: ' + error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Profile Details</h2>
      <div style={styles.profileItem}>
        <strong>Type:</strong> {userDetails.userType}
      </div>
      <div style={styles.profileItem}>
        <strong>Id:</strong> {userDetails.userId}
      </div>
      <div style={styles.profileItem}>
        <strong>Name:</strong> {profile.name}
      </div>
      <div style={styles.profileItem}>
        <strong>Email:</strong> {profile.email}
      </div>
      <div style={styles.profileItem}>
        <strong>Phone:</strong> {profile.phone}
      </div>
      <div style={styles.profileItem}>
        <strong>Address:</strong> {profile.address}
      </div>

      <button onClick={() => setShowChangePassword(!showChangePassword)} style={styles.button}>
        Change Password
      </button>

      {showChangePassword && (
        <div style={styles.changePasswordForm}>
          <h3>Change Password</h3>
          <form onSubmit={handleChangePassword} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="confirmNewPassword">Confirm New Password:</label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div>
            <button type="submit" style={styles.button}>Submit</button>
            <button  onClick={() => setShowChangePassword(!showChangePassword)} style={styles.button}>Cancel</button>
            </div>
            
          </form>
          {passwordMessage && <p style={styles.message}>{passwordMessage}</p>}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  profileItem: {
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  changePasswordForm: {
    marginTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  message: {
    marginTop: '10px',
    color: 'red',
  },
};

export default Profile;
