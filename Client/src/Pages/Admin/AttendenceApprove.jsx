import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getAttendenceApproval,
  getAttendenceRequests,
} from "../../API/AdminActions";
import { Box, Button, Typography } from "@mui/material";
import { attendenceRequestSelector } from "../../Redux/Slice";

const AttendenceApprove = () => {
  const dispatch = useDispatch();
  const { attendenceRequest } = useSelector(attendenceRequestSelector);
  useEffect(() => {
    dispatch(getAttendenceRequests());
  }, []);
  // getAttendenceApproval()
  const approveRequest = async (val) => {
    const updatedObject = await {
      ...val,
      status: val.regularizeType,
      approveStatus: "approved",
    };
    dispatch(getAttendenceApproval(updatedObject));
  };
  return (
    <div>
      {attendenceRequest?.length >= 1 ? (
        <TableContainer component={Paper}>
          <Typography sx={{ color: "#10e09a" }}>All Requests</Typography>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "gainsboro" }}>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>InTime</TableCell>
                <TableCell>OutTime</TableCell>
                <TableCell>Req Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendenceRequest?.map((val, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell scope="row">{val?.user}</TableCell>
                  <TableCell scope="row">{val?.inTime}</TableCell>
                  <TableCell scope="row">
                    {val?.outTime ? val?.outTime : "-"}
                  </TableCell>
                  <TableCell scope="row">{val?.regularizeType}</TableCell>
                  <TableCell scope="row">{val?.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => approveRequest(val)}>Approve</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Typography>{`No Requests Found`}</Typography>
        </Box>
      )}
    </div>
  );
};

export default AttendenceApprove;
