import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [role, setRole] = useState('student');
  let [profileImage, setProfileImage] = useState(null);
  let [message, setMessage] = useState(''); //顯示Error Message
  const navigate = useNavigate(); //React Router v5 用useHistory()
  const fileInputRef = useRef(null); //用來觸發文件選擇框

  useEffect(() => {
    // 如果 profileImage 有值（即圖片已選擇）
    if (profileImage) {
      // 在組件卸載或者 profileImage 改變時執行這個清理函式
      return () => {
        // 檢查 profileImage 是否是 Blob 物件（表示它是一個圖片檔案）
        if (profileImage instanceof Blob) {
          // 釋放之前創建的 Object URL
          URL.revokeObjectURL(profileImage);
        }
      };
    }
  }, [profileImage]); // 這個 useEffect 依賴於 profileImage，當 profileImage 改變時會重新執行

  const handleChangeUsername = (e) => {
    return setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    return setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    return setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    return setRole(e.target.value);
  };
  const handleImageClick = () => {
    fileInputRef.current.click(); // 點擊圖片時，觸發文件選擇
  };
  const handleChangeProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // 保存選擇的檔案
    }
  };

  const handleRegister = () => {
    AuthService.register(username, email, password, role, profileImage)
      .then(() => {
        window.alert('Registration success. Redirect to the login page');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error:', error);
        console.error('Error Response:', error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div className="mx-auto w-full max-w-xl p-12">
      <div>
        {message && <div className="mb-4 rounded bg-red-100 px-4 py-3 text-red-700">{message}</div>}
        <div>
          <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            onChange={handleChangeUsername}
            type="text"
            value={username}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="username"
            id="username"
          />
        </div>
        <br />
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            onChange={handleChangeEmail}
            type="text"
            value={email}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="email"
            id="email"
          />
        </div>
        <br />
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            onChange={handleChangePassword}
            type="password"
            value={password}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="password"
            id="password"
          />
        </div>
        <br />
        <div className="relative">
          <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            onChange={handleChangeRole}
            value={role}
            className="w-full appearance-none rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="role"
            id="role"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          <div className="pointer-events-none absolute right-3 flex -translate-y-7 transform items-center text-gray-500">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
            </svg>
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="profileImage" className="mb-1 block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <div
            className="group relative m-8 mx-auto flex aspect-square w-1/3 min-w-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#ccc] hover:ring hover:ring-indigo-500"
            onClick={handleImageClick}
          >
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage) // 使用URL.createObjectURL()來顯示選擇的圖片
                  : 'https://res.cloudinary.com/dt5ybgxgz/image/upload/v1744768869/Default_pfp_gudyey.png'
              }
              alt="profileImage"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute bottom-6 right-6 rounded-full bg-white p-1 shadow group-hover:bg-indigo-100 group-hover:shadow-lg">
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
            className="hidden"
            ref={fileInputRef}
            type="file"
            accept=".jpg, .jpeg, .png"
            name="profileImage"
            id="profileImage"
            onChange={handleChangeProfileImage}
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full rounded bg-indigo-500 px-4 py-2 text-white transition duration-200 hover:bg-indigo-700"
        >
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
