import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const token = localStorage.getItem('token');

const StaffSessionDetails = ({ courseId, session, sessionDetail }) => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  const getCourseDetails = `http://127.0.0.1:8000/api/courseDetails?filter[courseId]=${courseId}`;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(getCourseDetails, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        setCourseDetails(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleAddClick = (prop) => {
    session(prop);
  };

  const handleStudentsDetails = (courseDetail) => {
    setExpandedCourseId(expandedCourseId === courseDetail.id ? null : courseDetail.id);
    sessionDetail(courseDetail);
    session("StudentsLabDetails");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <div className="my-1">
        <div className="border rounded row mb-1  p-2 ">
          <div className="col font-weight-bold text-right">Session No:</div>
          <div className="col font-weight-bold text-right">Session Name:</div>
        </div>
        <div className="row">
          {courseDetails.data.map((courseDetail) => (
            <div key={courseDetail.id} className="col-12  mb-1">
              <div className="card p-3">
                <div className="row" onClick={() => handleStudentsDetails(courseDetail)}>
                  <div className="col text-right">{courseDetail.session_no}</div>
                  <div className="col text-right">{courseDetail.session_name}</div>
                </div>
                {expandedCourseId === courseDetail.id && (
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-outline-dark mr-2" onClick={() => handleAddClick("Update")}>Update</button>
                    <button className="btn btn-outline-dark mr-2" onClick={() => handleAddClick("Delete")}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <button className="btn btn-outline-dark mr-2" onClick={() => handleAddClick("AddSession")}>Add Session</button>
        </div>
      </div>
    </div>
  );
};

export default StaffSessionDetails;
