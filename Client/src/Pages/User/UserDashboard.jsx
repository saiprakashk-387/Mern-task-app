import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { userPersonsSelector } from "../../Redux/Slice";
import { AllUsersList } from "../../API/UserActions";
import { Button, Typography } from "@mui/material";
import UserEdit from "./UserEdit";
import AddUser from "./AddUser";
import UserDelete from "./UserDelete";
import { Box } from "@mui/system";
import { parseDate } from "../../Constants";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function UserDashboard() {
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const [addmodel, setAddModel] = useState(false);
  const [deletemodel, setDeleteModel] = useState(false);
  const [edit, setUserEdit] = useState();
  const [deleteID, setUserDeleteID] = useState();
  const { allPresons } = useSelector(userPersonsSelector);
  useEffect(() => {
    dispatch(AllUsersList());
  }, []);
  ///edit model
  const editUserDetils = (val) => {
    setModel(true);
    setUserEdit(val);
  };
  //close model
  const closeModel = () => {
    setModel(false);
    setAddModel(false);
    setDeleteModel(false);
  };
  //addd model
  const addUser = () => {
    setAddModel(true);
  };
  ///delete model
  const userDeleteDetils = (val) => {
    setDeleteModel(true);
    setUserDeleteID(val);
  };

  // const myData = []
  //   .concat(allPresons)
  //   .sort((a, b) => a.createdAt - b.createdAt )
  //   .map((item, i) => {
  //     return item;
  //   });

  return (
    <>
      <TableContainer component={Paper}>
        <Typography sx={{ color: "#10e09a" }}></Typography>
        {allPresons?.length >= 1 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "gainsboro" }}>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell>Updated On</TableCell>
                <TableCell>
                  Actions{" "}
                  <span>
                    <Button varient="outlined" onClick={addUser}>
                      Add <AddBoxOutlinedIcon />
                    </Button>
                  </span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                allPresons?.map((val, index) => {
                  let createdDate = parseDate(val.createdAt);
                  let updatedDate = parseDate(val.updatedOn);
                  console.log("val.updatedOn", val.updatedOn);
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell scope="row">{index + 1}</TableCell>
                      <TableCell scope="row">{val.name}</TableCell>
                      <TableCell>{val.age}</TableCell>
                      <TableCell>{createdDate}</TableCell>
                      <TableCell>
                        {val.updatedOn ? updatedDate : createdDate}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            editUserDetils(val);
                          }}
                        >
                          <BorderColorOutlinedIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            userDeleteDetils(val);
                          }}
                        >
                          <DeleteOutlinedIcon color="red" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
                // .reverse()
              }
            </TableBody>
          </Table>
        ) : (
          <Box>
            <Typography>
              {`No Data Found`}
              <Button varient="outlined" onClick={addUser}>
                Add +
              </Button>
            </Typography>
          </Box>
        )}
      </TableContainer>
      <UserEdit model={model} edit={edit} closeModel={closeModel} />
      <AddUser model={addmodel} closeModel={closeModel} />
      <UserDelete
        model={deletemodel}
        deleteID={deleteID}
        closeModel={closeModel}
      />
    </>
  );
}
