import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserLoginAction, UserLoginOtpAction } from "../Redux/Slice";
import { base_url } from "./Config";

export const registerAPI = (values, navigate) => {
  axios
    .post(base_url + "/register", values)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Registration Successfull");
        navigate("/");
      }
    })
    .catch((err) => {
      toast.error(`${err.response.data.message}`);
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
          sessionStorage.setItem("userEmail", res.data.data.email);
          toast.success("Login Succesfully");
        }
        if (res.data.data.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        dispatch(UserLoginAction(err));
        toast.error(`${err.response.data.message}`);
      });
  };
};

export const getOtpApi = (values) => {
  return (dispatch) => {
    axios
      .post(base_url + "/sendotp", values)
      .then((res) => {
        if (res.status === 200) {
          dispatch(UserLoginOtpAction(res));
          sessionStorage.setItem("number", JSON.stringify(values));
          toast.success(`${res.data.message}`);
        }
      })
      .catch((err) => {
        dispatch(UserLoginOtpAction(err.response));
        toast.error(`${err.response.data.message}`);
      });
  };
};
export const loginWithOtpApi = (val, navigate) => {
  return (dispatch) => {
    axios
      .post(base_url + "/verifyotp", val)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`${res.data.message}`);
          sessionStorage.setItem("userdata", JSON.stringify(res?.data?.data));
          sessionStorage.setItem("token", res?.data?.token);
          sessionStorage.setItem("role", res.data.data.role);
          sessionStorage.removeItem("number");
        }
        if (res.data.data.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`);
      });
  };
};
export const requestForgetPassword = (data) => {
  return (dispatch) => {
    axios
      .post(base_url + "/requestpasswordreset", data)
      .then((res) => {
        if (res.status === 200) {
          console.log("res", res);
          // dispatch(UserLoginOtpAction(res));
          //  sessionStorage.setItem("number", JSON.stringify(res));
          toast.success(`${res.data.message}`);
        }
      })
      .catch((err) => {
        //  dispatch(UserLoginOtpAction(err.response));
        toast.error(`${err.response.data.message}`);
      });
  };
};

export const setNewPaswordApi = (values, userId, token, navigate) => {
  return (dispatch) => {
    axios
      .post(base_url + `/resetpassword/${userId}/${token}`, values)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`${res.data.message}`);
          navigate("/");
          // sessionStorage.setItem("userdata", JSON.stringify(res?.data?.data));
          // sessionStorage.setItem("token", res?.data?.token);
          // sessionStorage.setItem("role", res.data.data.role)
        }
        // if (res.data.data.role === "admin") {
        //   navigate("/admindashboard");
        // } else {
        //   navigate("/home");
        // }
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`);
      });
  };
};
