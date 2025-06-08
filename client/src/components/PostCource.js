import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from '../services/course.service';

const PostCourse = ({ currentUser, setCurrentUser }) => {
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState('');
  let [courseImage, setCourseImage] = useState(null);
  let navigate = useNavigate();
  const fileInputRef = useRef(null);
  let [file, setFile] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      window.alert('Please login before posting a new course');
      navigate('/login');
    } else if (currentUser.role !== 'instructor') {
      window.alert('Only instructors can post a new course');
      navigate('/login');
    }
  }, [currentUser]);

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setCourseImage(objectUrl);

    // 清理函式
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

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
        window.alert('New course has been created');
        navigate('/course');
      })
      .catch((error) => {
        console.error('Error:', error);
        console.error('Error Response:', error.response);
        setMessage(error.response.data);
      });
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleChangeCourseImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      // setCourseImage(file);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl p-12">
      {!currentUser && (
        <div>
          <p>Please login before posting a new course</p>
        </div>
      )}
      {currentUser && currentUser.role == 'instructor' && (
        <div>
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              onChange={handleChangeTitle}
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="title"
              id="title"
              value={title}
            />
          </div>

          <br />

          <div className="form-group">
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              onChange={handleChangeDescription}
              type="password"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="description"
              id="description"
              value={description}
            />
          </div>

          <br />
          <div className="form-group">
            <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              onChange={handleChangePrice}
              type="number"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="price"
              id="price"
              value={price}
            />
          </div>
          <br />
          <div className="group relative">
            <label htmlFor="courseImage" className="mb-1 block text-sm font-medium text-gray-700">
              Image
            </label>
            <div
              onClick={handleImageClick}
              className="my-4 flex aspect-[3/2] w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl bg-[#ccc] hover:ring hover:ring-indigo-500"
            >
              <img
                className="h-full w-full object-cover"
                src={
                  file
                    ? courseImage
                    : 'https://res.cloudinary.com/dt5ybgxgz/image/upload/v1744774225/image-1_2x_ejjbqe.jpg'
                }
                alt="courseImage"
              />
              <div className="absolute bottom-12 right-4 rounded-full bg-white p-1 shadow hover:cursor-pointer group-hover:bg-indigo-100 group-hover:shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="3 0 20 20"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13h3l6-6a1.5 1.5 0 00-2.121-2.121l-6 6v3z"
                  />
                </svg>
              </div>
            </div>
            <input
              onChange={handleChangeCourseImage}
              id="courseImage"
              ref={fileInputRef}
              type="file"
              className="hidden"
            />
            <p style={{ fontSize: '0.8rem', color: 'gray' }}>
              対応ファイル形式：JPG・PNG（600×400px以上）
            </p>
          </div>
          <br />
          <div>
            <button
              className="mx-auto w-full rounded bg-indigo-500 px-4 py-2 font-bold text-white transition duration-200 hover:bg-indigo-700"
              onClick={postCourse}
            >
              <span>Submit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCourse;
