import axios from "axios";
import { UserLoginAction, UserLoginOtpAction } from "../Redux/Slice";
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
          sessionStorage.setItem("userEmail", res.data.data.email);
        }
        if (res.data.data.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
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
          alert(res.data.message);
        }
      })
      .catch((err) => {
        dispatch(UserLoginOtpAction(err.response));
        alert(err.response.data.message);
      });
  };
};
export const loginWithOtpApi = (val, navigate) => {
  return (dispatch) => {
    axios
      .post(base_url + "/verifyotp", val)
      .then((res) => {
        if (res.status === 200) {
          // console.log("otpkligo",res.data.data);
          alert(res?.data?.message);
          sessionStorage.setItem("userdata", JSON.stringify(res?.data?.data));
          sessionStorage.setItem("token", res?.data?.token);
          sessionStorage.setItem("role", res.data.data.role);
          // navigate("/home");
          sessionStorage.removeItem("number");
        }
        if (res.data.data.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log("err", err);
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
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err.response", err.response);
        //  dispatch(UserLoginOtpAction(err.response));
        alert(err.response.data.message);
      });
  };
};

export const setNewPaswordApi = (values, userId, token, navigate) => {
  return (dispatch) => {
    axios
      .post(base_url + `/resetpassword/${userId}/${token}`, values)
      .then((res) => {
        if (res.status === 200) {
          console.log("otpkligo", res.data);
          alert(res.data);
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
        alert(err?.response.data);
        // console.log("err", err?.response.data);
      });
  };
};
