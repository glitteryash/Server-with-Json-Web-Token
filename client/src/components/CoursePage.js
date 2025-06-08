import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseService from '../services/course.service';

const CoursePage = ({ currentUser, setCurrentUser }) => {
  const [courseData, setCourseData] = useState(null);
  const navigate = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    if (!currentUser) {
      window.alert('Please login first');
      navigate('/login');
      return;
    }
    CourseService.getCourseByID(_id)
      .then((data) => {
        console.log(data);
        setCourseData(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUser]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[3/1] lg:aspect-[4/1]">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-lg">
          <img className="h-full w-full object-cover" alt="" src={courseData?.courseImage} />
          <div className="absolute inset-0 bg-gray-700/50 backdrop-blur-sm"></div>
        </div>
        <h1 className="absolute left-1/2 top-1/2 z-10 w-[90%] -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-white drop-shadow-2xl sm:text-4xl">
          {courseData?.title}
        </h1>
        <p className="absolute bottom-4 right-4 z-10 text-sm text-white drop-shadow-2xl sm:text-xl">
          購読人数：{courseData?.students.length}
        </p>
      </div>
      <div className="my-5 grid grid-cols-1 gap-4">
        <h2 className="bg-indigo-100 px-4 py-2 text-xl">説明・Description</h2>
        <p className="leading-relaxed">{courseData?.description}</p>
      </div>
    </div>
  );
};

export default CoursePage;
