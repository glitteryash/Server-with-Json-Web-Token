import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import CourseService from '../services/course.service';

const Course = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();
  let [courseData, setCourseData] = useState(null);
  useEffect(() => {
    let _id;
    if (!currentUser) {
      window.alert('Please login first');
      navigate('/login');
      return;
    }
    _id = currentUser._id;

    if (currentUser.role == 'instructor') {
      CourseService.get(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (currentUser.role == 'student') {
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
    <div className="p-8">
      {currentUser && currentUser.role === 'instructor' && (
        <div className="container mx-auto my-40 flex flex-wrap items-center justify-center">
          <img
            src={currentUser.profileImage}
            className="m-4 w-full min-w-[100px] max-w-[150px]"
            alt="Instructor Profile"
          />
          <h1 className="text-xl font-semibold text-gray-800">
            {currentUser.username}さんが作成したコース
          </h1>
        </div>
      )}

      {currentUser && currentUser.role === 'student' && (
        <div className="container mx-auto my-40 flex flex-wrap items-center justify-center">
          <img
            src={currentUser.profileImage}
            className="m-4 w-full min-w-[100px] max-w-[150px]"
            alt="Student Profile"
          />
          <h1 className="text-xl font-semibold text-gray-800">
            {currentUser.username}さんが購読しているコース
          </h1>
        </div>
      )}

      {currentUser && courseData && courseData.length > 0 && (
        <div className="container mx-auto">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courseData.map((course) => (
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
                  <p className="w-fit rounded border border-blue-500 px-3 py-1 text-sm text-blue-500">
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
