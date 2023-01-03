import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { adminUsersList } from "../../API/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import { adminUsersSelector } from "../../Redux/Slice";
import { parseDate } from "../../Constants";
import { Button, Typography } from "@mui/material";
import DeleteUser from "./DeleteUser";
import Listmodel from "./Listmodel";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [opemModel, setOpenModel] = useState(false);
  const [openlistModel, setOpenListModel] = useState(false);
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const { allusers } = useSelector(adminUsersSelector);

  useEffect(() => {
    dispatch(adminUsersList());
   }, []);
  const dleteUser = (val) => {
    setOpenModel(true);
    setId(val);
  };
  const handleModel = () => {
    setOpenModel(false);
  };
  const viewUsersList = (val) => {
    setOpenListModel(true);
    setEmail(val.email);
  };
  const handleListModel = () => {
    setOpenListModel(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Typography sx={{ color: "#10e09a" }}>All Members</Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "gainsboro" }}>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Location</TableCell>
               <TableCell>Role</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allusers?.map((val, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell scope="row">{val.name}</TableCell>
                  <TableCell>{val.email}</TableCell>
                  <TableCell scope="row">
                    {val.number === undefined ? "Update Profile" : val.number}
                  </TableCell>
                  <TableCell>
                    {!val.address ? "Update Profile" : val.address}
                  </TableCell>
                   <TableCell>{val.role}</TableCell>
                  <TableCell>{parseDate(val.createdAt)}</TableCell>
                  {val.role === "admin" ? (
                    <TableCell>
                      <Button disabled>
                        <PersonRemoveOutlinedIcon />
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Button
                        onClick={() => {
                          dleteUser(val);
                        }}
                      >
                        <PersonRemoveOutlinedIcon />
                      </Button>
                      <Button
                        onClick={() => {
                          viewUsersList(val);
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteUser id={id} opemModel={opemModel} handleModel={handleModel} />
      <Listmodel
        handleListModel={handleListModel}
        openlistModel={openlistModel}
        email={email}
      />
    </>
  );
}
