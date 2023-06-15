import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  AllUsersList,
  CreateUser,
} from "../../API/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { addUserSelector } from "../../Redux/Slice";
import { mainCategoryCourseList, subCategoryList } from "../../Constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCourse(props) {
  const dispatch = useDispatch();
  const { closeModel, model } = props;
  const { adduser, isLoading, error } = useSelector(addUserSelector);

  ////added for addcourse section /////
  const [dataa, setDataa] = useState({ name: "", age: "" });
  const [first, setfirst] = useState()

  const handleChange = (e) => {
    let user = { ...dataa };
    user[e.target.name] = e.target.value;
    setDataa(user);
    getDropdown(e.target.value)
  }
  const handleChangee = (e) => {
    let user = { ...dataa };
    user[e.target.name] = e.target.value;
    setDataa(user);
  }
  const getDropdown = (d) => {
    if (d == 'database') {
      setfirst(subCategoryList[0])
    } else if (d == 'frontend') {
      setfirst(subCategoryList[1])
    } else if (d == 'backend') {
      setfirst(subCategoryList[2])
    } else {
      setfirst(subCategoryList[3])
    }
  }
  ////addcourse section ends

  const addUser = async () => {
    await dispatch(CreateUser(dataa)); ///addcourse
  };
  return (
    <div>
      <Dialog
        open={model}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{" Add New Course "}</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Main Category</InputLabel>
            <Select
              name="age"
              value={dataa?.age}
              label="Main Category"
              onChange={handleChange}
            >
              <MenuItem >
                <em>None</em>
              </MenuItem>
              {mainCategoryCourseList?.map((val) => {
                return <MenuItem value={val?.value}>{val?.name}</MenuItem>
              })}

            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Sub Category</InputLabel>
            <Select
              name="name"
              value={dataa?.name}
              label="Sub Category"
              onChange={handleChangee}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {first?.map((val) => {
                return <MenuItem value={val?.value}>{val?.name}</MenuItem>
              })
              }

            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={closeModel}>Cancel</Button>
          <Button onClick={addUser}>Add </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
