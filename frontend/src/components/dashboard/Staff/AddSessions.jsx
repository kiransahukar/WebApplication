// src/components/AddCourse.js
import React, { useState } from 'react';
import axios from 'axios';

const token =localStorage.getItem('token');
const AddSessions = ({courseId, content}) => {
  const [sessionNo, setSessionNo] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [message, setMessage] = useState('');
  const [sessions, setSessions] = useState([]);

  //console.log(courseId)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionNo || !sessionName) {
      setMessage('Both Session No and Session Name are required.');
      return;
    }
    
    // Add the new session
    const newSession = { sessionNo, sessionName };
    
    setSessions([ newSession]);
    // const data = { 
    //     session_no : sessionNo ,
    //     session_name: sessionName
    //  }
    const  data= {
            data:{
                attributes: {
                    
                    session_no : sessionNo,
                    session_name : sessionName
                } 
            } 
}
     console.log(data)
     
     
    const postApi = "http://127.0.0.1:8000/api/courses/" + courseId +"/courseDetails";
    console.log(postApi)
    try {
      const response = await axios.post(postApi,  data , {
        headers: {
            Authorization:"Bearer "+token
          }
      }); // Replace with your API endpoint
      setMessage('Session added successfully!');
      setSessionNo('');
      setSessionName('');
      
    } catch (err) {
        setMessage('An error occurred. Please try again.');
    }
    //  finally {
    //   setLoading(false);
    // }
  };

  const handelOnClick=(prop)=>{
    content(prop);
  }
 
  return (
    <div className="container p-4 bg-white rounded shadow-sm">
      <h2 className="text-center text-dark">Add Session</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group mb-3">
          <label htmlFor="sessionNo" className="form-label">Session No:</label>
          <input
            type="text"
            id="sessionNo"
            value={sessionNo}
            onChange={(e) => setSessionNo(e.target.value)}
            placeholder="Enter session number"
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="sessionName" className="form-label">Session Name:</label>
          <input
            type="text"
            id="sessionName"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder="Enter session name"
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Add Session</button>
          <button type="button" onClick={() => handelOnClick("StudentsDetails")} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
      {message && (
        <p className={`mt-3 text-center ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>
          {message}
        </p>
      )}
      <div className="mt-4">
        <ul className="list-group">
          {sessions.map((session, index) => (
            <li key={index} className="list-group-item">
              {session.sessionNo} - {session.sessionName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

};



export default AddSessions;
