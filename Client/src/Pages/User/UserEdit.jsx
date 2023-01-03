import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { AllUsersList, singleUSerUpdate } from "../../API/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateSelector } from "../../Redux/Slice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserEdit(props) {
  const dispatch = useDispatch();
  const { closeModel, model, edit } = props;
  const [data, setData] = useState({ name: "", age: "" });
  const { userUpdate, isLoading, error } = useSelector(userUpdateSelector);
  useEffect(() => {
    setData(edit);
  }, [edit]);
  useEffect(() => {
    if (userUpdate?.status === 200) {
      closeModel();
      dispatch(AllUsersList());
    }
  }, [userUpdate?.status]);

  const handleInput = (e) => {
    let user = { ...data };
    user[e.target.name] = e.target.value;
    setData(user);
  };
  const updateUser = () => {
    let date = new Date().toISOString();
    let dataa = {
      name: data?.name,
      age: data?.age,
      updatedOn:date,
    };
    let id = data?._id;
     dispatch(singleUSerUpdate(id, dataa));
  };
  return (
    <div>
      <Dialog
        open={model}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Task"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            name="name"
            sx={{margin:1}}
            value={data?.name}
            variant="outlined"
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <TextField
            label="Status"
            name="age"
            sx={{margin:1}}
            value={data?.age}
            variant="outlined"
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModel}>Cancel</Button>
          <Button onClick={updateUser}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
