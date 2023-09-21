import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { userAttendenceLog } from "../../API/UserActions";
import { AttendenceLogSelector } from "../../Redux/Slice";

const Attendence = () => {
  const dispatch = useDispatch();
  const { attendenceLog } = useSelector(AttendenceLogSelector);
  useEffect(() => {
    let email = sessionStorage.getItem("userEmail");
    dispatch(userAttendenceLog(email));
  }, []);
  const getloginDuration = (val, val1) => {
    let inTime = moment(val?.split(",")[1], "HH:mm:ss a");
    let outTime = moment(val1?.split(",")[1], "HH:mm:ss a");
    var hrs = moment.utc(outTime.diff(inTime)).format("HH");
    var min = moment.utc(outTime.diff(inTime)).format("mm");
    var sec = moment.utc(outTime.diff(inTime)).format("ss");
    return [hrs, min, sec].join(":");
  };
  return (
    <TableContainer component={Paper}>
      {
         attendenceLog?.data?.data.length >= 1? 
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead sx={{ backgroundColor: "gainsboro" }}>
           <TableRow>
             <TableCell>S/N</TableCell>
             <TableCell>Date</TableCell>
             <TableCell>In Time</TableCell>
             <TableCell>Out Time</TableCell>
             <TableCell>Duration(Hrs)</TableCell>
             <TableCell>Actions</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {attendenceLog?.data?.data?.map((val, i) => {
               return (
                 <TableRow key={i}>
                   <TableCell>{i+1}</TableCell>
                   <TableCell>{val?.inTime?val?.inTime.split(",")[0]:"-"}</TableCell>
                   <TableCell>{val?.inTime?val?.inTime.split(",")[1]:"-"}</TableCell>
                   <TableCell>{val?.outTime?val?.outTime.split(",")[1]:"-"}</TableCell>
                   <TableCell>{ val?.outTime? getloginDuration(val?.inTime,val?.outTime):"-"}</TableCell>
                   <TableCell>
                     <Button>
                       <BorderColorOutlinedIcon />
                     </Button>
                   </TableCell>
                 </TableRow>
               );
             })}
         </TableBody>
       </Table> :
         <Typography sx={{ color: "#10e09a" }}>{ "No Data Found"}</Typography>      
      }
    
    </TableContainer>
  );
};

export default Attendence;
