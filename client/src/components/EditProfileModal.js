import React, { useState } from 'react';

const EditProfileModal = ({ currentUser, setCurrentUser }) => {
  const [userName, setUserName] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(null);
  const [profileImage, setProfileImage] = useState(currentUser.profileImage);
  const [message, setMessage] = useState('');
  return (
    <div className="h-screen w-full bg-indigo-200">
      <div className="fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50"></div>
    </div>
  );
};

export default EditProfileModal;
