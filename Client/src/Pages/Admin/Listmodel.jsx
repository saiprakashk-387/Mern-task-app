import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { userSubListApi } from "../../API/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import { userSubListSelector } from "../../Redux/Slice";
import { parseDate } from "../../Constants";

export default function Listmodel(props) {
  const dispatch = useDispatch();
  const { email, openlistModel, handleListModel } = props;
  const { userSubList, isLoading, error } = useSelector(userSubListSelector);
  useEffect(() => {
    email && dispatch(userSubListApi(email));
  }, [email]);

  const list = userSubList?.data?.data;
  const userName = email?.toString().split("@", 1);
  const count = list?.length;
  return (
    <div>
      <Dialog open={openlistModel} onClose={handleListModel}>
        <DialogTitle>
          {" "}
          {userName}'s Task list ({count})
        </DialogTitle>
        <DialogContent>
          {list?.length >= 1 ? (
            <DialogContentText>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "gainsboro" }}>
                  <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell>TaskTitle </TableCell>
                    <TableCell>Task Status</TableCell>
                    <TableCell>Created On</TableCell>
                    <TableCell>Updated On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list?.map((val, index) => {
                    let createdDate = parseDate(val.createdAt);
                    let updatedDate = parseDate(val.updatedOn);
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell scope="row">{index + 1}</TableCell>
                        <TableCell scope="row">{val.name}</TableCell>
                        <TableCell>{val.age}</TableCell>
                        <TableCell>{createdDate}</TableCell>
                        <TableCell>
                          {val.updatedOn ? updatedDate : createdDate}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </DialogContentText>
          ) : (
            <DialogContentText>No users found /yet to Add .</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleListModel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
