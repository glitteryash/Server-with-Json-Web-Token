import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
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
          console.log("Login success", response);
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: response.data.user.email,
              username: response.data.user.username,
              _id: response.data.user._id,
            })
          );
          localStorage.setItem("token", response.data.token);
          window.alert("Login success! Redirect to the profile");
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.error("Error!", error.response);
        setMessage(error.response.data);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
            value={email}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
            value={password}
            onKeyDown={handleKeyDown}
          />
        </div>
        <br />
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={handleLogin}>
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
