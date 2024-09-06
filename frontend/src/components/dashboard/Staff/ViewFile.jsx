
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ViewFile({ filename }) {

    console.log(filename);
  const [show, setShow] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('');

  
  const handleOpen = () => setShow(true);

  
  const handleClose = () => setShow(false);

  
  const fetchFile = async () => {
    try {
      
      const url = `http://127.0.0.1:8000/api/getfile/${filename}`;

      setFileUrl(url);

      const extension = filename.split('.').pop().toLowerCase();

      if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        setFileType('image');
      } else if (extension === 'pdf') {
        setFileType('pdf');
      } else {
        setFileType('unsupported');
      }
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  useEffect(() => {
    fetchFile();
  }, []);

  return (
    <div>
      <Button variant="primary" onClick={handleOpen}>
        View File
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="p-0">
          {fileType === "image" && (
            <img
              src={fileUrl}
              alt="Fetched"
              className="img-fluid w-100"
              style={{ borderRadius: "5px" }}
            />
          )}
          {fileType === "pdf" && (
            <iframe
              src={fileUrl}
              title="PDF File"
              className="w-100"
              style={{ height: "500px", border: "none" }}
            />
          )}
          {fileType === "unsupported" && (
            <p className="text-center p-3">
              This file format is not supported for preview.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <a
            href={fileUrl}
            download
            className="btn btn-primary position-absolute bottom-0 start-0 m-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewFile;
