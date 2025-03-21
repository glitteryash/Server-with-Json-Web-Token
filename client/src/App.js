import React, { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Course from "./components/Course";
import PostCourse from "./components/PostCource";
import Enroll from "./components/Enroll";
import { Routes, Route } from "react-router-dom";
import AuthService from "./services/auth.service";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <div>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route
          path="login"
          element={
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="profile"
          element={
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="course"
          element={
            <Course currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="postcourse"
          element={
            <PostCourse
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="enroll"
          element={
            <Enroll currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
