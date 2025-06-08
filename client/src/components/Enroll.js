import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from '../services/course.service';

const Enroll = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState('');
  let [searchResult, setSearchResult] = useState(null);
  let [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      window.alert('Please login before enroll a new course');
      navigate('/login');
    } else if (currentUser.role !== 'student') {
      window.alert('Only students can enroll a new course');
      navigate('/login');
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
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  let handleEnroll = (e) => {
    CourseService.enroll(e.target.id, currentUser._id)
      .then((data) => {
        console.log(data);
        window.alert('You have successfully enrolled in the course');
        navigate('/course');
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  return (
    <div className="container mx-auto px-4">
      {currentUser && currentUser.role == 'student' && (
        <div className="my-40 flex w-full flex-col items-center justify-center gap-4">
          <input
            onChange={handleChangeInput}
            type="text"
            placeholder="Search for a course"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-2/3"
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            className="w-full rounded bg-indigo-500 px-4 py-2 text-white transition duration-200 hover:bg-indigo-700 md:w-1/3"
          >
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length > 0 && (
        <div className="container mx-auto">
          {/* <p>Data we got back from API.</p> */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchResult.map((course) => (
              <div
                key={course._id}
                className="h-[580px] overflow-hidden rounded-lg border bg-white shadow-md"
              >
                <div className="h-[300px] w-full overflow-hidden bg-gray-300">
                  <img
                    src={course.courseImage}
                    className="h-full w-full object-cover"
                    alt="Course"
                  />
                </div>
                <div className="flex h-[calc(100%-300px)] flex-col justify-around p-4">
                  <p className="w-fit rounded border border-indigo-500 px-3 py-1 text-sm text-indigo-500">
                    ${course.price}
                  </p>
                  <div className="mb-4">
                    <h3 className="min-h-[3rem] text-lg font-bold text-gray-800">{course.title}</h3>
                    <p className="text-md line-clamp-3 leading-relaxed text-gray-600">
                      {course.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">人数 {course.students.length}</p>
                  </div>
                  {course.students.includes(currentUser._id) ? ( //確認是否已經選課
                    <p className="mx-auto w-1/2 rounded-lg bg-gray-100 px-4 py-2 text-center text-sm text-gray-600">
                      購読済み
                    </p>
                  ) : (
                    <a
                      href="#"
                      onClick={handleEnroll}
                      className="mx-auto w-1/3 rounded-lg bg-indigo-500 px-4 py-2 text-center text-white transition duration-200 hover:bg-indigo-700"
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
