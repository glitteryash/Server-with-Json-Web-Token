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
      {/* {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <button class="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            Take me to login page.
          </button>
        </div>
      )} */}
      {/* {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )} */}
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
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {searchResult.map((course) => (
              <div
                key={course._id}
                className="card"
                style={{ width: "18rem", margin: "1rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p>Price: {course.price}</p>
                  <p>Student: {course.students.length}</p>
                  {course.students.includes(currentUser._id) ? ( //確認是否已經選課
                    <p
                      className="btn btn-outline-secondary"
                      style={{ cursor: "default" }}
                    >
                      Already enrolled
                    </p>
                  ) : (
                    <a
                      href="#"
                      onClick={handleEnroll}
                      className="btn btn-primary"
                      id={course._id}
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
