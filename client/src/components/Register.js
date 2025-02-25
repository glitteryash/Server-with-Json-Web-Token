import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("student");
  let [message, setMessage] = useState(""); //顯示Error Message
  const navigate = useNavigate(); //React Router v5 用useHistory()

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

  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("Registration success. Redirect to the login page");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            value={username}
            className="form-control"
            name="username"
            id="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            value={email}
            className="form-control"
            name="email"
            id="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangePassword}
            type="password"
            value={password}
            className="form-control"
            name="password"
            id="password"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            onChange={handleChangeRole}
            value={role}
            className="form-control"
            name="role"
            id="role"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
