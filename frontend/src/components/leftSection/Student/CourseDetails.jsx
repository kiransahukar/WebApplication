
import React, { useEffect, useState } from "react";
import axios from "axios";


const token = localStorage.getItem('token');

const CourseDetails = ({ isVisible, selectedDetails, userId }) => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //   const getSortedWithCourseDetails="http://127.0.0.1:8000/api/enrolledStudents?filter["+userId+"]=1&sort=courseId&include=course"
//   //const getSortedCourseDetails ="http://127.0.0.1:8000/api/enrolledStudents?sort=courseId&filter[userId]=1"
//  // const getCourseDetails ="http://127.0.0.1:8000/api/enrolledStudents?filter[userId]=1"
const getDetails=`http://127.0.0.1:8000/api/enrolledStudents?filter[userid]=${userId}&sort=courseId&include=course`;
  const handelCourseDetails = (course) => {
    selectedDetails(course.attributes.courseId);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(getDetails, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        setCourses(response.data.data);
        console.log(response.data.data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [userId]);


if (loading) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className=" text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

if (error) {
  return (
    <div className="alert alert-danger" role="alert">
      Error: {error}
    </div>
  );
}

  return (
    <div className={isVisible ? 'd-block' : 'd-none'}>
      <div className="card shadow-lg">
        <div className="card-header p-1 mb-0 mt-1  border rounded font-weight-bold text-black">
        <h2 className="mb-1">Left Component</h2>
        <p>This is about course details.</p>

        </div>
       
        <div className="card-body">
          <div className="p-1 mb-1 border rounded bg-light">
            <div className="row font-weight-bold ">
              <div className="col text-right">Course ID:</div>
              <div className="col text-right">Course Name:</div>
            </div>
          </div>

          <div >
            {courses.map((course) => (
              <div key={course.id} className="p-2 mb-1 border rounded bg-light"  onClick={() => handelCourseDetails(course)}>
                <div className="row">
                  <div className="col text-right">{course.attributes.courseId}</div>
                  <div className="col text-right">{course.includes.attributes.name}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

