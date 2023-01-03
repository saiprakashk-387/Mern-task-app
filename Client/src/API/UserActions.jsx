// persons
import axios from "axios";
import {
  AddUserAction,
  AllPersonsAction,
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
        console.log("rers", res);
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
      .post(base_url + `/myprofileupdate`,data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        console.log("res",res);
      })
      .catch((err) => {
        console.log("err",err);
      });
  };
};
