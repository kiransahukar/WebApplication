import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const token =localStorage.getItem('token');


function ViewLabs({courseId}) {
  const [show, setShow] = useState(false);
  const [labData, setLabData] = useState();


  const handleOpen = () => {setShow(true);};
  const handleClose = () => setShow(false);

  
  //console.log(courseId)
  const LAB_API=`http://127.0.0.1:8000/api/courseDetails?filter[courseId]=${courseId}`;

  useEffect(() => {
    const fetchLabDetails = async () => {
      try {
        const response = await axios.get(LAB_API, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
       setLabData(response.data.data);
        console.log(response.data.data);
      } catch (err) {
       console.log(err)
      }
    };

    fetchLabDetails();
  },[courseId]);
  return (
    <div >
       
      <div className="d-flex justify-content-center align-items-center gap-2">
      <Button variant="outline-secondary"  onClick={handleOpen}>
          View Labs 
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          
        <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Lab No</th>
          <th scope="col">Lab Name</th>
        </tr>
      </thead>
      <tbody>
        {labData && (labData.map((lab, index) => (
          <tr key={index}>
            <td>{lab.session_no}</td>
            <td>{lab.session_name}</td>
          </tr>
        )))}   
      </tbody>
    </table>
        </Modal.Body>
        <Modal.Footer>
            <div  className="d-flex flex-row justify-content-center mr-2">
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
            </div>
        
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewLabs;
