import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import {
  AllUsersList,
  CreateUser,
 } from "../../API/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { addUserSelector } from "../../Redux/Slice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddUser(props) {
  const dispatch = useDispatch();
  const { closeModel, model } = props;
  const [data, setData] = useState({ name: "", age: "" });
  const { adduser, isLoading, error } = useSelector(addUserSelector);
   useEffect(() => {
    if (adduser?.status === 200) {
      closeModel();
      dispatch(AllUsersList());
    }
  }, [adduser?.status]);
  const handleInput = (e) => {
    let user = { ...data };
    user[e.target.name] = e.target.value;
    setData(user);
  };
  const addUser = async () => {
     await dispatch(CreateUser(data));
  };
  return (
    <div>
      <Dialog
        open={model}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{" Add New Task "}</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            name="name"
            sx={{margin:"20px"}}
            value={data.name}
            variant="outlined"
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <TextField
            label="Task Status"
            name="age"
            sx={{margin:"20px"}}
            value={data.age}
            variant="outlined"
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModel}>Cancel</Button>
          <Button onClick={addUser}>Add </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
