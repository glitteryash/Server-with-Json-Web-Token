import React, { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from './EditProfileModal';

const Profile = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();

  useEffect(() => {
    let user = AuthService.getCurrentUser();
    if (!user) {
      window.alert('Please login');
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto mt-6 px-6 sm:px-6 lg:px-8">
      {currentUser && (
        <div className="relative mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md shadow-indigo-500/35">
          <div className="flex flex-col items-center text-center">
            <button title="Edit Profile" onClick={handleModalOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-edit absolute right-4 top-4 text-gray-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </button>
            <div className="mb-4 flex h-[120px] w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 shadow-inner">
              <img
                src={currentUser.profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{currentUser.username}</h3>
            <span
              className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                currentUser.role === 'instructor'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {currentUser.role === 'instructor' ? 'Instructor' : 'Student'}
            </span>

            <div className="mt-3 flex items-center gap-2 text-gray-600">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.879 1.798l-7.371 5.729a2.25 2.25 0 01-2.622 0L3.129 8.791A2.25 2.25 0 012.25 6.993V6.75"
                />
              </svg>
              <span className="text-sm">{currentUser.email}</span>
            </div>
          </div>
        </div>
      )}
      <EditProfileModal
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default Profile;
