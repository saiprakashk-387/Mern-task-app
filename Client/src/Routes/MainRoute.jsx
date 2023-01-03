import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Admin/Dashboard";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { userLoginSelector } from "../Redux/Slice";
import UserDashboard from "../Pages/User/UserDashboard";
import Layout from "../Layout/Layout";
 import AboutPage from "../Pages/User/AboutPage";
import UserProfile from "../Pages/User/UserProfile";
import Profile from "../Pages/Profile";
import LoginWithOtp from "../auth/LoginWithOtp";

const MainRoute = () => {
  const { userLogin, isLoading, error } = useSelector(userLoginSelector);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("token");
    user ? setAuth(user) : setAuth(null);
  }, [userLogin]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<LoginWithOtp />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<UserDashboard />} />
          <Route path="/admindashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myprofile" element={<UserProfile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default MainRoute;
