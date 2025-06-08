import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../services/auth.service';

const EditProfileModal = ({ currentUser, setCurrentUser, isOpen, setModalOpen }) => {
  const [userName, setUserName] = useState(currentUser?.username ?? null);
  const [email, setEmail] = useState(currentUser?.email ?? null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage ?? null);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = () => {
    AuthService.updateUser(userName, password, confirmPassword, file)
      .then((response) => {
        const updateUser = {
          email: response.data.data.email,
          username: response.data.data.username,
          _id: response.data.data._id,
          role: response.data.data.role,
          profileImage: response.data.data.profileImage,
        };
        localStorage.setItem('user', JSON.stringify(updateUser));
        setCurrentUser(updateUser);
        window.alert('Update Success');
        console.log('Update Success', response.data);
        setModalOpen(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        console.error('Error Response:', error.response);
        setMessage(error.response.data);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (currentUser?.profileImage) {
      setProfileImage(currentUser.profileImage);
    }
  }, [currentUser?.profileImage]);

  useEffect(() => {
    if (isOpen) {
      setMessage('');
      setUserName(currentUser?.username ?? null);
      setPassword('');
      setConfirmPassword('');
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mx-2 flex w-full max-w-md flex-col items-center justify-center rounded-xl bg-white p-10 shadow-lg md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <button className="absolute right-3 top-3" onClick={() => setModalOpen(false)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5"></circle>{' '}
              <path
                d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>{' '}
            </g>
          </svg>
        </button>
        <h2 className="mb-4 text-xl font-semibold">個人情報編集</h2>
        <div
          onClick={handleClick}
          className="group relative mb-4 flex max-h-[200px] max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 shadow-inner transition duration-300 hover:ring hover:ring-indigo-500"
        >
          <svg
            className="absolute z-10 h-10 w-10 cursor-pointer rounded-full bg-gray-300 text-gray-600 transition duration-200 group-hover:opacity-0"
            viewBox="-3 -3 30 30"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <title>pic_line</title>{' '}
              <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                {' '}
                <g id="File" transform="translate(-912.000000, 0.000000)" fillRule="nonzero">
                  {' '}
                  <g id="pic_line" transform="translate(912.000000, 0.000000)">
                    {' '}
                    <path
                      d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                      id="MingCute"
                      fillRule="nonzero"
                    >
                      {' '}
                    </path>{' '}
                    <path
                      d="M20,3 C21.0543909,3 21.9181678,3.81587733 21.9945144,4.85073759 L22,5 L22,19 C22,20.0543909 21.18415,20.9181678 20.1492661,20.9945144 L20,21 L4,21 C2.94563773,21 2.08183483,20.18415 2.00548573,19.1492661 L2,19 L2,5 C2,3.94563773 2.81587733,3.08183483 3.85073759,3.00548573 L4,3 L20,3 Z M9.87852,12.0503 L4.22166,17.7071 C4.15418,17.7746 4.07946,17.8304 4,17.8746 L4,19 L20,19 L20,17.8747 C19.9204,17.8305 19.8456,17.7747 19.778,17.7071 L16.9496,14.8787 L16.2425,15.5858 L16.4496,15.7929 C16.8401,16.1834 16.8401,16.8166 16.4496,17.2071 C16.0591,17.5976 15.4259,17.5976 15.0354,17.2071 L9.87852,12.0503 Z M20,5 L4,5 L4,15.1003 L8.99463,10.1057 C9.450246,9.65009333 10.1700264,9.61971956 10.6608969,10.0145787 L10.7624,10.1057 L14.8283,14.1716 L16.0657,12.9341 C16.5213533,12.47854 17.2411276,12.4481693 17.731997,12.842988 L17.8335,12.9341 L20,15.1007 L20,5 Z M15.5,7 C16.3284,7 17,7.67157 17,8.5 C17,9.32843 16.3284,10 15.5,10 C14.6716,10 14,9.32843 14,8.5 C14,7.67157 14.6716,7 15.5,7 Z"
                      id="形状"
                      fill="#09244B"
                    >
                      {' '}
                    </path>{' '}
                  </g>{' '}
                </g>{' '}
              </g>{' '}
            </g>
          </svg>
          <img
            className="h-full w-full object-cover contrast-50 transition duration-300 hover:contrast-100"
            src={file ? previewUrl : profileImage}
            alt="profileImage"
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleChangeProfileImage}
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-[130px_1fr] items-center gap-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              className="w-full rounded border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              value={userName}
              onChange={handleChangeUserName}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="grid grid-cols-[130px_1fr] items-center gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              className="w-full rounded border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              value={password}
              onChange={handleChangePassword}
              onKeyDown={handleKeyDown}
            />
          </div>
          {password && (
            <div className="grid grid-cols-[130px_1fr] items-center gap-2">
              <label htmlFor="confirm password" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirm password"
                className="w-full rounded border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          {/* {password && confirmPassword && password !== confirmPassword && (
            <div className="bg-red-100 text-red-500">
              <p className="text-center">Password is not the same</p>
            </div>
          )} */}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-2/3 rounded bg-indigo-500 px-4 py-2 text-white transition duration-200 hover:bg-indigo-700"
        >
          Submit
        </button>
        <div>
          {message && (
            <div className="mb-4 rounded bg-red-100 px-4 py-3 text-red-700">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
