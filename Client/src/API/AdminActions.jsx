import axios from "axios";
import {
  AllUsersAdminAction,
  DeleteUserAdminAction,
  myProfileAction,
  profileImageAction,
  profileUpdateAction,
  UserSubListAction,
} from "../Redux/Slice"; 
import { ACCESS_TOKEN, base_url } from "./Config";
import { AllUsersList } from "./UserActions";

export const adminUsersList = () => {
  return (dispatch) => {
    axios
      .get(base_url + "/allusers", { 
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(AllUsersAdminAction(res?.data));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
}; 
export const deleteUserByAdmin = (userId) => {
  return (dispatch) => {
    axios
      .delete(base_url + `/deleteuser/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(DeleteUserAdminAction(res));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};

export const getProfileInfo=(_id)=>{
  return (dispatch)=>{
    axios.get(base_url+`/profile/${_id}`,{
      headers:{
        "content-Type":"application/json",
        Authorization : ACCESS_TOKEN()?`Bearer ${ACCESS_TOKEN()}`:undefined
      }
    }).then((res)=>{
      dispatch( myProfileAction(res.data.data)) 
    }).catch((err)=>{
      console.log('err',err);
    })
  }
}

export const updateProfileApi = (id, data,navigateto,navigate) => {
  return (dispatch) => {
    axios
      .put(base_url + `/profileUpdate/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(profileUpdateAction(res));
        if(res.status === 200){
          sessionStorage.setItem("profileStatus","updated")
          alert("Profile Updated Successully")
          navigate(navigateto)
          dispatch(AllUsersList());
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
};

export const userSubListApi = (email) => {
  return (dispatch) => {
    axios
      .post(base_url + `/usersublist/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ACCESS_TOKEN()
            ? `Bearer ${ACCESS_TOKEN()}`
            : undefined,
        },
      })
      .then((res) => {
        dispatch(UserSubListAction(res))
      })
      .catch((err) => {
        console.log("errr",err)
      });
  };
};

///image upload
export  const uploadImage = (image) => {
  return(dispatch)=>{
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "lisuczwe");
    data.append("cloud_name", "dignfufky");
    fetch("https://api.cloudinary.com/v1_1/dignfufky/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(profileImageAction(data));
      })
      .catch((err) => console.log(err));
  }
 
};
