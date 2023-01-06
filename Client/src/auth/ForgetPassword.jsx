import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, Typography } from "@mui/material";
import { requestForgetPassword } from "../API/AuthActions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ForgetPassword() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
    }),
    onSubmit: async (value) => {
      let data = {
        email: value?.email,
      };
      console.log("dadfgdhta", data);
      await dispatch(requestForgetPassword(data));
    },
  });

  const formStyle = {
    marginBottom: "10px",
  };
  return (
    <Box
      sx={{
        m: "auto",
        width: "50%",
        marginTop: "2rem",
        backgroundColor: "#ffffe3",
        padding: "10px",
      }}
    >
      <Card
        sx={{
          boxShadow:
            "box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          padding: "10px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome Back
        </Typography>
        <form style={{ width: "40%", display: "grid", margin: "auto" }}>
          <TextField
            required
            sx={formStyle}
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email ? formik.errors.email : null}
            error={formik.touched.email ? formik.errors.email : null}
          />
        </form>
        <Typography>
          {" "}
          <Link to="/" underline="hover">
            Login with Email
          </Link>
        </Typography>
        <Typography>
          {" "}
          Not registered yet? {""}
          <Link to="/register" underline="hover">
            Create an account
          </Link>
        </Typography>
        <Button
          variant="contained"
          sx={{ width: "35%", borderRadius: "15px" }}
          onClick={formik.handleSubmit}
        >
          Get Link
        </Button>
      </Card>
    </Box>
  );
}
