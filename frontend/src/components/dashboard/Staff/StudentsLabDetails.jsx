import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import ViewFile from "./ViewFile";

const token = localStorage.getItem("token");


const StudentsLabDetails = ({ sessionId }) => {
  const [labsData, setLabsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSessionId, setExpandedSessionId] = useState(null);
  const [comments, setComments] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);

  const [acceptButton, setAcceptButton]=useState();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleViewFileClick = (e) => {
    e.stopPropagation();
    setModalOpen(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };




  const getCourseDetails = `http://127.0.0.1:8000/api/labsData?filter[sessionId]=${sessionId.id}`;

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

  const handleExpand = (sessionId, labData) => {
    setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
    setAcceptButton(labData.attributes.status);
  };

  const handleButtonClick = async (message, labdata) => {
    console.log(message, labdata);
    const id=labdata.id;
    console.log(id);
    const data = {
      data:{
        attributes : {
          id : id,
          status : "Completed"
      } 
      }
    }
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/labsData`, data,{
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setAcceptButton("Completed");
     // toast.success("Comment submitted successfully");
      console.log(" submitted successfully", response.data);
    } catch (err) {
       toast.error("Error submitting comment:", err.message);
    }
  };


  const handleCommentChange = (e, labId) => {
    setComments({ ...comments, [labId]: e.target.value });

  };

  const handleCommentSubmit = async (labdata) => {
    
    const id=labdata.id;
    console.log(id);
    const data = {
      data:{
        attributes : {
          id : id,
          comment : comments[id]
      } 
      }
    }
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/labsData`, data,{
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Comment submitted successfully");
      console.log("Comment submitted successfully", response.data);
      setEditingCommentId(null);
    } catch (err) {
      toast.error("Error submitting comment:", err.message);
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
                  onClick={() => handleExpand(labData.id, labData)}
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
                                handleCommentSubmit(labData);
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
                        <p>Status: {acceptButton} </p>

                        {(acceptButton.includes('Request')||acceptButton.includes('Pending')) && (
                          <button
                          className="btn btn-success btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleButtonClick("Accept", labData);
                          }}
                        >
                          Accept
                        </button>
                        )}
                        
                          <ViewFile filename={labData.attributes.title}/>
   
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
