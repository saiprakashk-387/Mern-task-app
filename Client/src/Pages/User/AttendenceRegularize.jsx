import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { FormControl, FormControlLabel, RadioGroup } from "@mui/material";
import { userAttendenceRegularize } from "../../API/UserActions";
import { useDispatch } from "react-redux";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function AttendenceRegularize(props) {
  const dispatch = useDispatch();
  const { model, attendenceInfo, closeModel } = props;
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const requestRegularize = () => {
    let user_Info = {
      user: attendenceInfo?.user,
      _id: attendenceInfo?._id,
      type: value,
    };
    dispatch(userAttendenceRegularize(user_Info));
  };
  return (
    <div>
      <Dialog
        open={model}
        onClose={closeModel}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{
            cursor: "move",
            backgroundColor: "blueviolet",
            height: "50px",
            color: "cornsilk",
            display: "flex",
            justifyContent: "center",
            justifyContent: "space-between",
          }}
          id="draggable-dialog-title"
        >
          Regularize Attendence{" "}
          <span>{attendenceInfo && attendenceInfo?.inTime?.split(",")[0]}</span>
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <div
                style={{
                  display: "flexbox",
                  width: "400px",
                  padding: "5px",
                }}
              >
                <FormControlLabel
                  value="present"
                  control={<Radio />}
                  label="Mark As present"
                />
                <FormControlLabel
                  value="leave"
                  control={<Radio />}
                  label="Mark As Leave"
                />
                <FormControlLabel
                  value="lop"
                  control={<Radio />}
                  label="Mark As LOP"
                />
                <FormControlLabel
                  value="exactTime"
                  control={<Radio />}
                  label="Mark As Exact Time"
                />
              </div>
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeModel}>
            Cancel
          </Button>
          <Button onClick={requestRegularize}>Submit(Request)</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
