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
    <div style={{ padding: "2rem" }}>
      {currentUser && currentUser.role === "instructor" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            flexWrap: "wrap",
            justifyContent: "center",
            margin: "10rem auto",
          }}
        >
          <img
            src={currentUser.profileImage}
            style={{ maxWidth: "150px", minWidth: "100px", margin: "1rem" }}
            alt=""
          />
          <h1>{currentUser.username}さんが作成したコース</h1>
        </div>
      )}
      {currentUser && currentUser.role === "student" && (
        <div>
          <h1>{currentUser.username}さんが購読しているコース</h1>
        </div>
      )}

      {currentUser && courseData && courseData.length > 0 && (
        <div>
          <div
            style={{
              maxWidth: "2000px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {courseData.map((course) => (
              <div
                key={course._id}
                className="card"
                style={{
                  // width: "600px",
                  height: "600px",
                  margin: "1rem 0rem",
                }}
              >
                <div className="card-body" style={{ margin: "1rem" }}>
                  <div
                    style={{
                      overflow: "hidden",
                      width: "100%",
                      height: "300px",
                      borderRadius: "0px",
                      backgroundColor: "#ccc",
                      marginBottom: "1rem",
                    }}
                  >
                    <img
                      src={course.courseImage}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      marginBottom: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3 className="card-title">{course.title}</h3>
                    <p
                      className="card-text"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        "-webkit-line-clamp": "3",
                        "-webkit-box-orient": "vertical",
                      }}
                    >
                      {course.description}
                    </p>
                  </div>
                  <p
                    className="btn btn-outline-primary"
                    style={{ cursor: "default" }}
                  >
                    ${course.price}
                  </p>
                  <p>人数 {course.students.length}</p>
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
