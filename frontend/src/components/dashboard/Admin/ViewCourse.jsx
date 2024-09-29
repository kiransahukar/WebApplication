import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCourse from "./AddCourse";
import DeleteCourse from "./DeleteCourse";
import ViewLabs from "./ViewLabs";

const token = localStorage.getItem("token");

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 // const [reload, setReload]= useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/courses", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCourses(response.data);
       // setReload(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
    <div className="container ">
      <h2>Courses </h2>
      <div className="p-2 mb-1 border rounded bg-light ">
        <div className="d-flex flex-column">
          <div className="row font-weight-bold">
            <div className="col text-right">Course Id:</div>
            <div className="col text-right">Course Name:</div>
            <div className="col text-right"> </div>
          </div>
        </div>
      </div>
      <div>
        {courses.data.map((course) => (
          <div
            key={course.id}
            className="p-2 mb-1 border rounded bg-light"
            // onClick={() => handleExpand(course.id)}
            // onClick={(e) => {
            //   e.stopPropagation();
            //   handleExpand(courseDetail.id);
            // }}
          >
            <div className="row">
              <div className="col text-right">{course.id}</div>
              <div className="col text-right">{course.attributes.name}</div>
              <div className="col text-right d-flex align-items-center">
                <div className="btn-info btn-sm me-2">
                  <ViewLabs courseId ={course.id}/>
                </div>
                <div className="btn-info btn-sm ">
                  <DeleteCourse course ={course} />
                </div>
              </div>

            </div>
          
          </div>
        ))}
      </div>
      <div  className="col flex-row d-flex justify-content-center align-items-center mr-2 mt-3" >
        <AddCourse />
      </div>
    </div>
  );
};

export default ViewCourse;
