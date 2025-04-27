import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const Enroll = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  let [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      window.alert("Please login before enroll a new course");
      navigate("/login");
    } else if (currentUser.role !== "student") {
      window.alert("Only students can enroll a new course");
      navigate("/login");
    }
  }, [currentUser]);

  let handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  let handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
        setHasSearched(true);
      })
      .catch((err) => {
        setSearchResult(null);
        setHasSearched(true);
        console.error(err);
      });
  };
  let handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  let handleEnroll = (e) => {
    CourseService.enroll(e.target.id, currentUser._id)
      .then((data) => {
        console.log(data);
        window.alert("You have successfully enrolled in the course");
        navigate("/course");
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && currentUser.role == "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            className="form-control"
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length > 0 && (
        <div>
          <p>Data we got back from API.</p>
          <div
            style={{
              maxWidth: "2000px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {searchResult.map((course) => (
              <div
                key={course._id}
                className="card"
                style={{
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <p
                      className="btn btn-outline-primary"
                      style={{ cursor: "default", marginRight: "1rem" }}
                    >
                      ${course.price}
                    </p>
                    <p>人数 {course.students.length}</p>
                  </div>
                  {course.students.includes(currentUser._id) ? ( //確認是否已經選課
                    <p
                      className="btn btn-outline-secondary"
                      style={{
                        display: "block",
                        cursor: "default",
                        margin: "0 auto",
                        width: "100px",
                      }}
                    >
                      購読済み
                    </p>
                  ) : (
                    <a
                      href="#"
                      onClick={handleEnroll}
                      className="btn btn-primary"
                      id={course._id}
                      style={{
                        display: "block",
                        margin: "0 auto",
                        width: "100px",
                        // textAlign: "center",
                      }}
                    >
                      Enroll
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {currentUser && hasSearched && !searchResult && (
        <div>
          <p>No course found.</p>
        </div>
      )}
    </div>
  );
};

export default Enroll;
