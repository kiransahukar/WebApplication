import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
const DeleteFile = ({filename, expandedSessionId, change}) => {
   // const [filename, setFilename] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/deleteFile/${filename}`);
            
            expandedSessionId(null);
            change(true)
        } catch (error) {
            setMessage('Error deleting file.');
        }


    };

    return (
        <div>
            <Button variant="primary" onClick={handleDelete}>
        Delete File
      </Button>
        </div>
    );
};

export default DeleteFile;
