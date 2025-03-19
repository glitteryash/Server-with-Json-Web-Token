import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    CourseService.get(_id)
      .then((data) => {
        setCourseData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUser]);
  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && currentUser.role === "instructor" && (
        <div>
          <h1>Welcon to Instructor's Course Page</h1>
        </div>
      )}
    </div>
  );
};

export default Course;
