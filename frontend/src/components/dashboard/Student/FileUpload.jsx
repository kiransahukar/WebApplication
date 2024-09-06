import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const token =localStorage.getItem('token');
const FileUpload = ({userId, sessionId, setExpandedSessionId}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');



  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const data = {
        data:{
          attributes : {
            user_id : userId,
            session_id : sessionId,
            title :response.data.data,
            comment : "No Comments",
            status:"Pending"
        } 
        }
       
      }
      const response1 = await axios.post('http://127.0.0.1:8000/api/labsData', data, {
        headers: {
          Authorization:"Bearer "+token
        }
      });
      toast.success("File uploaded successful!");
      setExpandedSessionId(null)
     // setMessage('File uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    }
  };

  return (
    <div className="container my-5" onClick={(e) => { e.stopPropagation()}}>
      <h2 className="text-center mb-4">Upload File</h2>
      <form onSubmit={handleSubmit} onClick={(e) => { e.stopPropagation()}} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      {message && (
        <p className={`mt-3 text-center ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
