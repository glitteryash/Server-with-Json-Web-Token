import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Profile = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();

  useEffect(() => {
    let user = AuthService.getCurrentUser();
    if (!user) {
      window.alert("Please login");
      navigate("/login");
    } else {
      setCurrentUser(user);
    }
  }, []);
  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && (
        <div>
          <h1>Profile</h1>
          <header className="jumbotron">
            <div
              style={{
                cursor: "pointer",
                width: 300,
                height: 300,
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
                src={currentUser.profileImage}
                alt="profileImage"
                style={{
                  width: "155%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
            <h3>
              <strong>{currentUser.username}</strong>
            </h3>
            <h5>{currentUser.role}</h5>
            <h5>{currentUser.email}</h5>
          </header>
        </div>
      )}
    </div>
  );
};

export default Profile;
