import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { adminUserDeleteSelector } from "../../Redux/Slice";
import { adminUsersList, deleteUserByAdmin } from "../../API/AdminActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteUser(props) {
  const dispatch = useDispatch();
  const { handleModel, opemModel, id } = props;
  const { deleteUserAdmin, isLoading, error } = useSelector(
    adminUserDeleteSelector
  );

  useEffect(() => {
    if (deleteUserAdmin?.status === 200) {
      handleModel();
      dispatch(adminUsersList());
    }
  }, [deleteUserAdmin]);
  // console.log("deleteUserAdmin?.status", deleteUserAdmin?.status);
  const userDelete = async () => {
    let userId = id?._id;
    await dispatch(deleteUserByAdmin(userId));
  };
  return (
    <div>
      <Dialog
        open={opemModel}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Delete User Account`}</DialogTitle>
        <DialogContent>
          '''''''''''''' Delete {id?.name} ?''''''''''
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModel}>Cancel</Button>
          <Button onClick={userDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
