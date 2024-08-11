import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCourseDetails = () => {
  const [courses, setCourses] = useState([
    { courseName: '', sessions: [{ sessionNo: '', sessionName: '' }] },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCourseChange = (index, event) => {
    const { name, value } = event.target;
    const newCourses = [...courses];
    newCourses[index][name] = value;
    setCourses(newCourses);
  };

  const handleSessionChange = (courseIndex, sessionIndex, event) => {
    const { name, value } = event.target;
    const newCourses = [...courses];
    newCourses[courseIndex].sessions[sessionIndex][name] = value;
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { courseName: '', sessions: [{ sessionNo: '', sessionName: '' }] }]);
  };

  const addSession = (courseIndex) => {
    const newCourses = [...courses];
    newCourses[courseIndex].sessions.push({ sessionNo: '', sessionName: '' });
    setCourses(newCourses);
  };

  const deleteSession = (courseIndex, sessionIndex) => {
    const newCourses = [...courses];
    newCourses[courseIndex].sessions.splice(sessionIndex, 1);
    setCourses(newCourses);
  };

  const deleteCourse = (courseIndex) => {
    const newCourses = [...courses];
    newCourses.splice(courseIndex, 1);
    setCourses(newCourses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/courses', { courses });
      setSuccess('Courses added successfully!');
      setCourses([{ courseName: '', sessions: [{ sessionNo: '', sessionName: '' }] }]);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Add Courses</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        {courses.map((course, courseIndex) => (
          <div key={courseIndex} className="mb-4">
            <div className="mb-3">
              <label htmlFor={`courseName-${courseIndex}`} className="form-label">Course Name</label>
              <input
                type="text"
                id={`courseName-${courseIndex}`}
                name="courseName"
                value={course.courseName}
                onChange={(e) => handleCourseChange(courseIndex, e)}
                required
                className="form-control"
              />
            </div>
            {course.sessions.map((session, sessionIndex) => (
              <div key={sessionIndex} className="mb-3 ms-4">
                <div className="mb-3">
                  <label htmlFor={`sessionNo-${courseIndex}-${sessionIndex}`} className="form-label">Session No</label>
                  <input
                    type="text"
                    id={`sessionNo-${courseIndex}-${sessionIndex}`}
                    name="sessionNo"
                    value={session.sessionNo}
                    onChange={(e) => handleSessionChange(courseIndex, sessionIndex, e)}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`sessionName-${courseIndex}-${sessionIndex}`} className="form-label">Session Name</label>
                  <input
                    type="text"
                    id={`sessionName-${courseIndex}-${sessionIndex}`}
                    name="sessionName"
                    value={session.sessionName}
                    onChange={(e) => handleSessionChange(courseIndex, sessionIndex, e)}
                    required
                    className="form-control"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => deleteSession(courseIndex, sessionIndex)}
                  className="btn btn-danger me-2"
                >
                  Delete Session
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSession(courseIndex)}
              className="btn btn-success me-2"
            >
              Add Session
            </button>
            <button
              type="button"
              onClick={() => deleteCourse(courseIndex)}
              className="btn btn-danger"
            >
              Delete Course
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addCourse}
          className="btn btn-success me-2"
        >
          Add Course
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
      {success && <p className="text-success mt-3">{success}</p>}
    </div>
  );
};

export default AddCourseDetails;
