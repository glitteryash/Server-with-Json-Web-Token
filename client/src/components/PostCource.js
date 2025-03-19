import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourse = ({ currentUser, setCurrentUser }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      window.alert("Please login before posting a new course");
      navigate("/login");
    } else if (currentUser.role !== "instructor") {
      window.alert("Only instructors can post a new course");
      navigate("/login");
    }
  }, [currentUser]);
  let handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  let handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  let handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  let postCourse = () => {
    CourseService.post(title, description, price)
      .then(() => {
        window.alert("New course has been created");
        navigate("/course");
      })
      .catch((error) => {
        console.error("Error!", error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {!currentUser && (
        <div>
          <p>Please login before posting a new course</p>
        </div>
      )}
      {currentUser && currentUser.role == "instructor" && (
        <div>
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              onChange={handleChangeTitle}
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={title}
            />
          </div>

          <br />

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={handleChangeDescription}
              type="password"
              className="form-control"
              name="description"
              id="description"
              value={description}
            />
          </div>

          <br />
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              onChange={handleChangePrice}
              type="number"
              className="form-control"
              name="price"
              id="price"
              value={price}
            />
          </div>
          <br />
          <div className="form-group">
            <button className="btn btn-primary btn-block" onClick={postCourse}>
              <span>Submit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCourse;
