import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import FileUpload from "./FileUpload";

const token = localStorage.getItem("token");

const SessionDetails = ({ courseId, userId }) => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [labDetails, setLabDetails] = useState({});
  const [labDetailLength, setLabDetailLength] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSessionId, setExpandedSessionId] = useState(null);
  const [view, setView] = useState(false);

  const getCourseDetails = `http://127.0.0.1:8000/api/courseDetails?filter[courseId]=${courseId}`;
  //const getDetails='http://127.0.0.1:8000/api/enrolledStudents?filter[userid]=1&sort=courseId&include=course'
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(getCourseDetails, {
          headers: {
            Authorization: "Bearer " + token,
          },
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
    setView(false);
    setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);

    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/labsData?filter[sessionId]=${sessionId}&filter[userId]=${userId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.data.length === 1) {
          setLabDetailLength(1);
          setLabDetails(response.data.data[0]);
        } else {
          setLabDetailLength(0);
          setLabDetails([]);
        }

        //console.log(response.data.data.length);
        console.log(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  };

  const handleButtonClick = (message, sessionId) => {
    console.log(message, sessionId);

    if (view === true) {
      setView(false);
    } else {
      setView(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container ">
      <h2>Student Dashboard </h2>
      <div className="p-2 mb-1 border rounded bg-light ">
        <div className="d-flex flex-column">
          <div className="row font-weight-bold">
            <div className="col text-right">Session No:</div>
            <div className="col text-right">Session Name:</div>
            <div className="col text-right">Other Information:</div>
          </div>
        </div>
      </div>
      <div>
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
                {labDetailLength === 1 ? (
                  <>
                    <p>
                      Uploaded At:{" "}
                      {new Date(
                        labDetails.attributes.updatedAt
                      ).toLocaleDateString()}{" , "}
                      {new Date(
                        labDetails.attributes.updatedAt
                      ).toLocaleTimeString()}
                    </p>

                    <p>Comment : {labDetails.attributes.comment}</p>
                    <p>Status : {labDetails.attributes.status}</p>
                  </>
                ) : (
                  <>
                    {view === true && (
                      <FileUpload
                        userId={userId}
                        sessionId={courseDetail.id}
                        setExpandedSessionId={setExpandedSessionId}
                      />
                    )}

                    <Button
                      variant="outline-dark"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleButtonClick("hello", courseDetail.id);
                      }}
                    >
                      {view === false ? <>Upload</> : <>Cancel</>}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionDetails;
