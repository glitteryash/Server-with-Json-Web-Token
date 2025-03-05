import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Course = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      window.alert("Please login first");
      navigate("/login");
    }
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
