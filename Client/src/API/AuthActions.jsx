import axios from "axios";
import {  UserLoginAction } from "../Redux/Slice";
import { base_url } from "./Config";

export const registerAPI = (values, navigate) => {
  axios
    .post(base_url + "/register", values)
    .then((res) => {
      if (res.status === 200) {
        alert("Registration Successfull");
        navigate("/");
      }
    })
    .catch((err) => {
      alert(err.response.data);
    });
};
export const loginAPI = (values, navigate) => {
  return (dispatch) => {
    axios
      .post(base_url + "/login", values)
      .then((res) => {
        dispatch(UserLoginAction(res));
        if (res) {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userdata", JSON.stringify(res.data.data));
          sessionStorage.setItem("role", res.data.data.role);
        }
        if (res.data.data.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        alert(err.response.data.message)
      });
  };
};
