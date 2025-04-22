import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourse = ({ currentUser, setCurrentUser }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  let [courseImage, setCourseImage] = useState(null);
  let navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!currentUser) {
      window.alert("Please login before posting a new course");
      navigate("/login");
    } else if (currentUser.role !== "instructor") {
      window.alert("Only instructors can post a new course");
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    // 如果 profileImage 有值（即圖片已選擇）
    if (courseImage) {
      // 在組件卸載或者 courseImage 改變時執行這個清理函式
      return () => {
        // 檢查 courseImage 是否是 Blob 物件
        if (courseImage instanceof Blob) {
          // 釋放之前創建的 Object URL
          URL.revokeObjectURL(courseImage);
        }
      };
    }
  }, [courseImage]);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const postCourse = () => {
    CourseService.post(title, description, price, courseImage)
      .then(() => {
        window.alert("New course has been created");
        navigate("/course");
      })
      .catch((error) => {
        console.error("Error:", error);
        console.error("Error Response:", error.response);
        setMessage(error.response.data);
      });
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleChangeCourseImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseImage(file);
    }
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
            <label htmlFor="courseImage">Image</label>
            <div
              onClick={handleImageClick}
              style={{
                cursor: "pointer",
                width: 600,
                height: 400,
                overflow: "hidden",
                borderRadius: "25px",
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1rem 0rem",
              }}
            >
              <img
                src={
                  courseImage
                    ? URL.createObjectURL(courseImage)
                    : "https://res.cloudinary.com/dt5ybgxgz/image/upload/v1744774225/image-1_2x_ejjbqe.jpg"
                }
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                alt="courseImage"
              />
            </div>
            <input
              onChange={handleChangeCourseImage}
              id="courseImage"
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
            />
            <p style={{ fontSize: "0.8rem", color: "gray" }}>
              対応ファイル形式：JPG・PNG（600×400px以上）
            </p>
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
