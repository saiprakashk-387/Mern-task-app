import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Admin/Dashboard";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { userLoginSelector } from "../Redux/Slice";
import UserDashboard from "../Pages/User/UserDashboard";
import Layout from "../Layout/Layout";
import About from "../Pages/Admin/About";
import AboutPage from "../Pages/User/AboutPage";
import UserProfile from "../Pages/User/UserProfile";
import Profile from "../Pages/Profile";

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
        {/* {auth === null && (
          <> */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        {/* </>
        )} */}
        {/* {auth && (
          <> */}
        <Route element={<Layout />}>
          <Route path="/home" element={<UserDashboard />} />
          <Route path="/admindashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myprofile" element={<UserProfile />} />
        </Route>
        {/* </>
        )} */}
        {/* <Route path="*" element={<Navigate to={auth ? "/home" : "/"} />} /> */}
      </Routes>
    </div>
  );
};

export default MainRoute;
