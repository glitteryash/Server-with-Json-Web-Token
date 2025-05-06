import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Login = () => {
  const navigate = useNavigate();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState('');
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        if (response.data.token) {
          console.log('Login success', response.data);
          localStorage.setItem(
            'user',
            JSON.stringify({
              email: response.data.user.email,
              username: response.data.user.username,
              _id: response.data.user._id,
              role: response.data.user.role,
              profileImage: response.data.user.profileImage,
            })
          );
          localStorage.setItem('token', response.data.token);
          window.alert('Login success! Redirect to the profile');
          navigate('/profile');
        }
      })
      .catch((error) => {
        console.error('Error!', error.response);
        setMessage(error.response.data);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl p-12">
      <div>
        {message && (
          <div className="mb-4 rounded bg-red-100 px-4 py-3 text-red-700" role="alert">
            {message}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            onChange={handleChangeEmail}
            type="text"
            name="email"
            value={email}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            onChange={handleChangePassword}
            type="password"
            name="password"
            value={password}
            onKeyDown={handleKeyDown}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <button
            onClick={handleLogin}
            className="w-full rounded bg-indigo-500 px-4 py-2 text-white transition duration-200 hover:bg-indigo-700"
          >
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
