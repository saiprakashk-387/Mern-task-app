import React, {  useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { AllUsersList, deleteUserAPI } from "../../API/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { userDeleteSelector } from "../../Redux/Slice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDelete(props) {
  const dispatch = useDispatch();
  const { closeModel, model, deleteID } = props;
  const { deleteUser, isLoading, error } = useSelector(userDeleteSelector);

  useEffect(() => {
    if (deleteUser?.status === 200) {
      closeModel();
      dispatch(AllUsersList());
    }
  }, [deleteUser?.status]);

  const userDelete = async () => {
    let id = deleteID?._id;
    await dispatch(deleteUserAPI(id));
  };
  return (
    <div>
      <Dialog
        open={model}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Delete Task `}</DialogTitle>
        <DialogContent>
          '''''''''''''' Delete {deleteID?.name} ?''''''''''
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModel}>Cancel</Button>
          <Button onClick={userDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
