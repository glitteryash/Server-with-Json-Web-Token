import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Navbar = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleLogout = () => {
    const result = AuthService.logout();
    if (result) {
      window.alert("Logout success! Redirect to homepage");
      setCurrentUser(null);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-primary fw-bold"
                        : "nav-link text-secondary"
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                {!currentUser && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link text-primary fw-bold"
                          : "nav-link text-secondary"
                      }
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                )}
                {!currentUser && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link text-primary fw-bold"
                          : "nav-link text-secondary"
                      }
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link text-primary fw-bold"
                          : "nav-link text-secondary"
                      }
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link text-primary fw-bold"
                          : "nav-link text-secondary"
                      }
                      to="/course"
                    >
                      Course
                    </NavLink>
                  </li>
                )}
                {currentUser && currentUser.role == "instructor" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/postcourse">
                      Post Course
                    </NavLink>
                  </li>
                )}
                {currentUser && currentUser.role == "student" && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link text-primary fw-bold"
                          : "nav-link text-secondary"
                      }
                      to="/enroll"
                    >
                      Enroll
                    </NavLink>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <span
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                    >
                      Logout
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default Navbar;
