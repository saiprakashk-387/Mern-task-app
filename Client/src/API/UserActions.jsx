// persons
import axios from "axios";
import {
  AddUserAction,
  AllPersonsAction,
  AttendenceLogAction,
  UserAppLoginnAction,
  UserDeleteAction,
  UserUpdateAction,
} from "../Redux/Slice";
import { ACCESS_TOKEN, base_url } from "./Config";

export const AllUsersList = () => {
  return (dispatch) => {
    axios
      .get(base_url + "/persons", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(AllPersonsAction(res?.data?.data));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
};

export const CreateUser = (data) => {
  return (dispatch) => {
    axios
      .post(base_url + "/createperson", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(AddUserAction(res));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
};
export const singleUSerUpdate = (id, dataa) => {
  return (dispatch) => {
    axios
      .put(base_url + `/updateperson/${id}`, dataa, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(UserUpdateAction(res));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
};
export const deleteUserAPI = (id) => {
  return (dispatch) => {
    axios
      .delete(base_url + `/deletepersons/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(UserDeleteAction(res));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
};

export const updateUserProfile = (data) => {
  return (dispatch) => {
    axios
      .post(base_url + `/myprofileupdate`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};
export const userAttendenceLog = (email) => {
  return (dispatch) => {
    axios
      .get(base_url + `/myattendence/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(AttendenceLogAction(res));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};
export const userApplogin = (data) => {
  let email = sessionStorage.getItem("userEmail");
  return (dispatch) => {
    axios
      .post(base_url + `/clock-in`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(UserAppLoginnAction(res));
        if (res?.status === 200) {
          dispatch(userAttendenceLog(email));
          sessionStorage.setItem("loginStatus", "Active");
          sessionStorage.setItem("logid", res?.data?._id);
          sessionStorage.setItem("login_at", data?.inTime);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};
export const userApplogout = (data, id) => {
  let email = sessionStorage.getItem("userEmail");
  return (dispatch) => {
    axios
      .put(base_url + `/clock-out/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          dispatch(UserAppLoginnAction(res));
          dispatch(userAttendenceLog(email));
          sessionStorage.setItem("loginStatus", "InActive");
          sessionStorage.setItem("AttendenceStatus", "Marked");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};
export const userAttendenceRegularize = (user_Info) => {
  return (dispatch) => {
    axios
      .put(base_url + `/reguarize-request`, user_Info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          dispatch(userAttendenceLog());
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};
