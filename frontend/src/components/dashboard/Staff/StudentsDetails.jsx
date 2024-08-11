import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../../Filter/Filter";
import 'bootstrap/dist/css/bootstrap.min.css';

const token = localStorage.getItem('token');

const StudentsDetails = ({ courseId }) => {
  const rootApi = 'http://127.0.0.1:8000/api/enrolledStudents?sort=userId&filter[courseId]=';
  const [api, setApi] = useState(`http://127.0.0.1:8000/api/enrolledStudents?sort=userId&filter[courseId]=${courseId}`);
  const [studentsDetails, setStudentsDetails] = useState([]);
  const [addFilter, setAddFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFilteredDetails = "http://127.0.0.1:8000/api/enrolledStudents?sort=userId&filter[courseId]=" + courseId;
   //http://127.0.0.1:8000/api/enrolledStudents?filter[userid]=5&filter[courseId]=1&include=course
  useEffect(() => {
    const fetchStudentsDetails = async () => {
      try {
        const response = await axios.get(getFilteredDetails + addFilter, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        setStudentsDetails(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsDetails();
  }, [courseId, addFilter]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="card shadow-lg rounded-2 border-dark mt-1">

      <div className="card-body">
      <h2>Students Details</h2>
      <h3>No of Students Enrolled: {studentsDetails.meta.to}</h3>
      <h3>Other info</h3>
      </div>
      
      <div className="card-body">
        <div className="row mb-2 rounded-2 border p-2 bg-light">
          <div className="col">
            <div className="d-flex justify-content-between">
              <span className="fw-bold">No:</span>
              <span className="fw-bold">Student Id :</span>
            </div>
          </div>
        </div>
        {studentsDetails.data.map((studentsDetail,index) => (
          <div key={studentsDetail.id} className="row mb-2 rounded-2 border p-2 bg-light">
            <div className="col ">
              <div className="d-flex justify-content-between">
                <span>{index+1}</span>
                <span>{studentsDetail.attributes.userId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsDetails;
