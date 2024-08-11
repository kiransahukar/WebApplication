import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const token = localStorage.getItem("token");

const StudentsLabDetails = ({ sessionId }) => {
  const [labsData, setLabsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSessionId, setExpandedSessionId] = useState(null);
  const [comments, setComments] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);

  const getCourseDetails = `http://127.0.0.1:8000/api/labsData?filter[sessionId]=${sessionId.session_no}`;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(getCourseDetails, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setLabsData(response.data);
        //console.log(labsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [sessionId]);

  const handleExpand = (sessionId) => {
    setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
  };

  const handleButtonClick = (message, sessionId) => {
    console.log(message, sessionId);
  };

  const handleCommentChange = (e, labId) => {
    setComments({ ...comments, [labId]: e.target.value });
  };

  const handleCommentSubmit = async (labId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/updateComment`,
        {
          labId: labId,
          comment: comments[labId] || "",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("Comment submitted successfully", response.data);
      setEditingCommentId(null);
    } catch (err) {
      console.error("Error submitting comment:", err.message);
    }
  };

  const toggleEditComment = (labId) => {
    setEditingCommentId(editingCommentId === labId ? null : labId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Student Lab Data</h2>
      <h3>No of Students Submitted: {labsData.meta.to}</h3>
      <h3>Other info</h3>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No:</th>
              <th>User ID:</th>
              <th>Other Information:</th>
            </tr>
          </thead>
          <tbody>
            {labsData.data.map((labData, index) => (
              <React.Fragment key={labData.id}>
                <tr
                  className="table-light"
                  onClick={() => handleExpand(labData.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>{labData.attributes.userId}</td>
                  <td>Null</td>
                </tr>
                {expandedSessionId === labData.id && (
                  <tr>
                    <td colSpan="3">
                      <div className="p-3">
                        <p>Created At: {new Date(labData.attributes.createdAt).toLocaleString()}</p>
                        <p>Updated At: {new Date(labData.attributes.updatedAt).toLocaleString()}</p>
                        <p>Comment: </p>
                        {editingCommentId === labData.id ? (
                          <>
                            <textarea
                              className="form-control mb-2"
                              value={comments[labData.id] || ""}
                              onChange={(e) => handleCommentChange(e, labData.id)}
                              placeholder="Add or edit comment"
                            />
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCommentSubmit(labData.id);
                              }}
                            >
                              Save Comment
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleEditComment(labData.id);
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <p>{comments[labData.id] || "No comment available"}</p>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleEditComment(labData.id);
                              }}
                            >
                              {comments[labData.id] ? "Edit Comment" : "Add Comment"}
                            </button>
                          </>
                        )}
                        <p>Status: {labData.attributes.status}</p>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleButtonClick("Accept", labData);
                          }}
                        >
                          Accept
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsLabDetails;
