import React, { useEffect, useMemo, useState } from "react";
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
import AttendenceRegularize from "./AttendenceRegularize";

const Attendence = () => {
  const dispatch = useDispatch();
  const { attendenceLog } = useSelector(AttendenceLogSelector);
  const [model, setModel] = useState(false);
  const [attendenceInfo, setAttendenceInfo] = useState();
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
  const regularizeAttendence = (val) => {
    setModel(true);
    setAttendenceInfo(val);
  };
  const closeModel = () => {
    setModel(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        {attendenceLog?.data?.data.length >= 1 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "gainsboro" }}>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>In Time</TableCell>
                <TableCell>Out Time</TableCell>
                <TableCell>Duration(Hrs)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendenceLog?.data?.data?.map((val, i) => {
                let date = moment(`${val.inTime.split(",")[0]}`).format(
                  "DD/MM/YYYY"
                );
                let cellColor = val.status
                  ? "blue"
                  : getloginDuration(val?.inTime, val?.outTime) >= "09:00:00"
                  ? "green"
                  : "red";
                return (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{val?.inTime ? date : "-"}</TableCell>
                    <TableCell style={{ color: `${cellColor}` }}>
                      {val?.status
                        ? val.status
                        : getloginDuration(val?.inTime, val?.outTime) >=
                          "09:00:00"
                        ? "Present"
                        : "Absent"}
                    </TableCell>
                    <TableCell>
                      {val?.inTime ? val?.inTime.split(",")[1] : "-"}
                    </TableCell>
                    <TableCell>
                      {val?.outTime ? val?.outTime.split(",")[1] : "-"}
                    </TableCell>
                    <TableCell>
                      {val?.status ? (
                        <span>Approved</span>
                      ) : val?.outTime ? (
                        getloginDuration(val?.inTime, val?.outTime)
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          regularizeAttendence(val);
                        }}
                      >
                        <BorderColorOutlinedIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <Typography sx={{ color: "#10e09a" }}>{"No Data Found"}</Typography>
        )}
      </TableContainer>
      <AttendenceRegularize
        model={model}
        attendenceInfo={attendenceInfo}
        closeModel={closeModel}
      />
    </>
  );
};

export default Attendence;
