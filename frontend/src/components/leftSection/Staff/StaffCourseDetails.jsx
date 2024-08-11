
import React, { useEffect, useState } from "react";
import axios from "axios";
import StaffSessionDetails from "./StaffSessionDetails.jsx";

const token = localStorage.getItem('token');

const StaffCourseDetails = ({ isVisible, selectedDetails, content, sessionDetail }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/courses", {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseDetails = (course) => {
    setExpandedCourseId(expandedCourseId === course.id ? null : course.id);
    selectedDetails(course.id);
    content("StudentsDetails");
  };

  const handleAddClick = () => {
    console.log("Add course");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={`container ${isVisible ? 'd-block' : 'd-none'}`}>
  <h2 className="my-2">Staff Course Details</h2>
  <p>This is about course details.</p>
  <div className="row mb-1">
    <div className="col-6 font-weight-bold text-right">Course ID:</div>
    <div className="col-6 font-weight-bold text-right">Course Name:</div>
  </div>
  <div className="row">
    {courses.data.map((course) => (
      <div key={course.id} className="col-12 mb-1">
        <div className="card p-2">
          <div className="row" onClick={() => handleCourseDetails(course)}>
            <div className="col-6 text-right">{course.id}</div>
            <div className="col-6 text-right">{course.attributes.name}</div>
          </div>
          {expandedCourseId === course.id && (
            <div className="mt-1">
              <StaffSessionDetails courseId={course.id} session={content} sessionDetail={sessionDetail} />
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
  <div className="d-flex justify-content-center mt-2">
    <button className="btn btn-primary">Add Course</button>
  </div>
  {/* <button className="btn btn-secondary mt-2">Update</button>
  <button className="btn btn-danger mt-2">Delete</button> */}
</div>


 

  );
};

export default StaffCourseDetails;


