import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Navbar = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleLogout = () => {
    const result = AuthService.logout();
    if (result) {
      window.alert('Logout success! Redirect to homepage');
      setCurrentUser(null);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white bg-white/65 backdrop-blur">
      <nav>
        <div className="bg-light px-10 py-6">
          <div className="container mx-auto flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="min-w-[100px]">
              <NavLink to="/">
                <img src="/learning system_logo.png" className="h-10 w-auto sm:h-12" alt="" />
              </NavLink>
            </div>
            <div className="flex flex-wrap justify-center gap-6 sm:justify-end">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'font-bold text-indigo-500' : 'text-gray-500'
                }
                to="/"
              >
                Home
              </NavLink>

              {!currentUser && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-indigo-500' : 'text-gray-500'
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              )}

              {!currentUser && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-indigo-500' : 'text-gray-500'
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              )}

              {currentUser && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-indigo-500' : 'text-gray-500'
                  }
                  to="/profile"
                >
                  Profile
                </NavLink>
              )}

              {currentUser && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-indigo-500' : 'text-gray-500'
                  }
                  to="/course"
                >
                  Course
                </NavLink>
              )}

              {currentUser && currentUser.role === 'instructor' && (
                <NavLink className="text-gray-500" to="/postcourse">
                  Post Course
                </NavLink>
              )}

              {currentUser && currentUser.role === 'student' && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-indigo-500' : 'text-gray-500'
                  }
                  to="/enroll"
                >
                  Enroll
                </NavLink>
              )}

              {currentUser && (
                <span
                  onClick={handleLogout}
                  style={{ cursor: 'pointer' }}
                  className="text-gray-500"
                >
                  Logout
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
