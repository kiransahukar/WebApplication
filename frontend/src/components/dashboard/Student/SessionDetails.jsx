
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';

const token = localStorage.getItem('token');

const SessionDetails = ({ courseId }) => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSessionId, setExpandedSessionId] = useState(null);

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

  const handleExpand = (sessionId) => {
    setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
  };

  const handleButtonClick = (message, sessionId) => {
    console.log(message, sessionId);
    // Handle button click logic here
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container " >
      <h2>Student Dashboard</h2>
      <div className="p-2 mb-1 border rounded bg-light ">
        <div className="d-flex flex-column">
          <div className="row font-weight-bold">
            <div className="col text-right">Session No:</div>
            <div className="col text-right">Session Name:</div>
            <div className="col text-right">Other Information:</div>
          </div>
        </div>
      </div>
      <div >
        {courseDetails.data.map((courseDetail) => (
          <div
            key={courseDetail.id}
            className="p-2 mb-1 border rounded bg-light"
            onClick={() => handleExpand(courseDetail.id)}
          >
            <div className="row">
              <div className="col text-right">{courseDetail.session_no}</div>
              <div className="col text-right">{courseDetail.session_name}</div>
              <div className="col text-right">null</div>
            </div>
            {expandedSessionId === courseDetail.id && (
              <div className="mt-2">
                <p>Detail 1: {courseDetail.detail1}</p>
                <p>Detail 2: {courseDetail.detail2}</p>
                <p>Detail 3: {courseDetail.detail3}</p>
                <Button
                  variant="outline-dark"
                  onClick={(e) => { e.stopPropagation(); handleButtonClick("hello", courseDetail.id); }}
                >
                  hello
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionDetails;

