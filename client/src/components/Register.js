import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("student");
  let [profileImage, setProfileImage] = useState(null);
  let [message, setMessage] = useState(""); //顯示Error Message
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
        window.alert("Registration success. Redirect to the login page");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
        console.error("Error Response:", error.response);
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
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <div
            onClick={handleImageClick}
            style={{
              cursor: "pointer",
              width: 150,
              height: 150,
              overflow: "hidden",
              borderRadius: "50%",
              backgroundColor: "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem",
            }}
          >
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage) // 使用URL.createObjectURL()來顯示選擇的圖片
                  : "https://res.cloudinary.com/dt5ybgxgz/image/upload/v1744768869/Default_pfp_gudyey.png"
              }
              alt="profileImage"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg, .jpeg, .png"
            name="profileImage"
            id="profileImage"
            style={{ display: "none" }}
            onChange={handleChangeProfileImage}
          />
          <br />
          <div></div>
        </div>
        <br />
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
