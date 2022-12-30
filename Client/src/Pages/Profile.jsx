import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfileInfo, updateProfileApi } from "../API/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import { profileSelector, profileUpdateSelector } from "../Redux/Slice";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { updateSessionInfo } from "../API/Config";

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    profile_url: "",
  });
  const [image, setImage] = useState("");
  const [role, setRole] = useState();
  const [status, setStatus] = useState("");
  const { myProfile } = useSelector(profileSelector);
  const { profileUpdate } = useSelector(profileUpdateSelector);

  useEffect(() => {
    setProfileInfo(JSON.parse(sessionStorage.getItem("userdata")));
  }, [status]);
  // const _id = "63515040bcb3a8f99a12ad8c";
  const _id = profileInfo?._id
  ;
  useEffect(() => {
    dispatch(getProfileInfo(_id));
    setProfileInfo(JSON.parse(sessionStorage.getItem("userdata")));
    if (location?.state == null) {
      setRole(sessionStorage.getItem("role"));
    } else {
      setRole(location?.state);
    }
  }, []);

  console.log("profileInfo", profileInfo);
  console.log("myProfile", myProfile);
  useEffect(() => {
    if (profileUpdate.status === 200) {
      setStatus(sessionStorage.getItem("profileStatus"));
      updateSessionInfo(profileUpdate.data);
    }
  }, [profileUpdate]);

  const closeModel = (val) => {
    if (val === "user") {
      navigate("/home");
    } else {
      navigate("/admindashboard");
    }
  };

  const handleInput = (e) => {
    let user = { ...profileInfo };
    user[e.target.name] = e.target.value;
    setProfileInfo(user);
  };

  const updateProfileInfo = async () => {
    let navigateto = "";
    if (location?.state === "user") {
      navigateto = "/home";
    } else {
      navigateto = "/admindashboard";
    }
    let id = profileInfo?._id;
    let data = {
      email: profileInfo?.email,
      address: profileInfo?.address,
      name: profileInfo?.name,
      number: profileInfo?.number,
      // profile_url: image,
    };
    console.log("data",data);
    await dispatch(updateProfileApi(id, data, navigateto, navigate));
  };
  const Input = styled("input")({
    display: "none",
  });

  const imageHandler = (e) => {
    ///base64 conversion
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log("called: ", reader);
      setImage(reader.result);
    };
  };

  return (
    <Box
      sx={{
        display: "inline-grid",
        width: "50%",
        alignItems: "center",
        "& > :not(style)": { m: 1 },
        margin: "auto",
        boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
        borderRadius: "10px",
      }}
    >
      <Typography varient="h1">Update Profile Info</Typography>
      <TextField
        label="Name"
        name="name"
        value={profileInfo?.name}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <TextField
        label="Email"
        name="email"
        value={profileInfo?.email}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <TextField
        label="Mobile Number"
        type="number"
        name="number"
        value={profileInfo?.number}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <TextField
        label="Address"
        name="address"
        value={profileInfo?.address}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      {/* <Stack direction="row" spacing={2}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <label htmlFor="icon-button-file">
              <Input
                // accept="image/*"
                id="icon-button-file"
                type="file"
                multiple
                // onChange={(e) => setImage(e.target.files[0])}
                onChange={imageHandler}
              />
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera sx={{ width: 50, height: 50 }} />
              </IconButton>
            </label>
          }
        >
          {!image ? (
            <Avatar
              alt="Travis Howard"
              src={profileInfo?.profile_url}
              sx={{ width: 200, height: 200 }}
            />
          ) : (
            <Avatar
              alt="Travis Howard"
              src={image}
              sx={{ width: 200, height: 200 }}
            />
          )}
        </Badge>
      </Stack>{" "} */}
      <br />
      <Button
        onClick={() => {
          closeModel(role);
        }}
      >
        Cancle
      </Button>
      <Button onClick={updateProfileInfo}>Update</Button>
    </Box>
  );
}

///clodinary///
// const { cloudImage } = useSelector(addUserSelector);
// const handleImageUpload = () => { //cloudinary image upload
//   dispatch(uploadImage(image));
// };

// {image && (
//       <span onClick={handleImageUpload}>
//         {cloudImage?.url ? (
//           <Button color="success">Photo Uploaded</Button>
//         ) : (
//           <Button variant="outlined">Upload Photo</Button>
//         )}
//       </span>
//     )}

// let url = URL.createObjectURL(image);
// const imageBlobLink = image && URL.createObjectURL(image); ///blob conversion
// console.log("blob", imageBlobLink);
