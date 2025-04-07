import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const Course = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();
  let [courseData, setCourseData] = useState(null);
  useEffect(() => {
    let _id;
    if (!currentUser) {
      window.alert("Please login first");
      navigate("/login");
      return;
    }
    _id = currentUser._id;

    if (currentUser.role == "instructor") {
      CourseService.get(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (currentUser.role == "student") {
      CourseService.getEnrolledCourses(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentUser]);
  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && currentUser.role === "instructor" && (
        <div>
          <h1>Welcon to Instructor's Course Page</h1>
        </div>
      )}
      {currentUser && currentUser.role === "student" && (
        <div>
          <h1>Welcon to Student's Course Page</h1>
        </div>
      )}

      {currentUser && courseData && courseData.length > 0 && (
        <div>
          <p>Courses you are involved in</p>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {courseData.map((course) => (
              <div
                key={course._id}
                className="card"
                style={{ width: "18rem", margin: "1rem" }}
              >
                <div className="card-body" style={{ margin: "1rem" }}>
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p
                    className="btn btn-outline-primary"
                    style={{ cursor: "default" }}
                  >
                    ${course.price}
                  </p>
                  <p>Student Count {course.students.length}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
