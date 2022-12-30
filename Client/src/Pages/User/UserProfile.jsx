import  React , {useState,useEffect} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, Typography } from "@mui/material";

export default function UserProfile() {
    const[profileInfo,setProfileInfo]=useState({name:'',email:"",mobilenumber:"",address:''});
    useEffect(()=>{
        let data = JSON.parse(sessionStorage.getItem('userdata'))
        setProfileInfo(data.data)
    },[])
    const handleinput=(e)=>{
        let data = {...profileInfo}
        data[e.target.name] = e.targte.value;
        setProfileInfo(data)
    }
    const getdata =()=>{
        console.log("data",profileInfo);
    }
    // updateUserProfile()
  return (
    <Box
      sx={{
        display: "inline-grid",
        width:"50%",
        alignItems: "center",
        "& > :not(style)": { m: 1 },
        margin: "auto",
        boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
        borderRadius:"10px"

      }}
    >
        <Typography varient='h1'>Update Profile Info</Typography>
        <TextField label="Name"  name="name" value={profileInfo?.name} onChange={(e)=>{handleinput(e)}} />
        <TextField label="Email"  name="email" value={profileInfo?.email}  onChange={(e)=>{handleinput(e)}}/>
        <TextField label="Mobile Number" name="mobilenumber" value={profileInfo?.mobilenumber} onChange={(e)=>{handleinput(e)}}/>
        <TextField label="Address"  name="address" value={profileInfo?.address} onChange={(e)=>{handleinput(e)}}/>
        <Button onClick={getdata}>Update</Button>
    </Box>
  );
}
