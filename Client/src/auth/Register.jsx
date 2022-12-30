import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, Typography } from "@mui/material";
import { registerAPI } from "../API/AuthActions";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

export default function Register() {
  const navigate = useNavigate();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      // )
      confirmPassword: yup
        .string()
        .required("Confirm Password must be required")
        .oneOf([yup.ref("password"), null], "Password not match"),
    }),
    onSubmit: async (data) => {
      // setLoading(true);
      let value = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "user",
      };
      console.log("value", value);
      await registerAPI(value, navigate);
      // if (createMemberShip?.data?.status === 200) {
      //   setLoading(false);
      // }
    },
  });
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
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
        <Typography
          variant="h5"
          color="primary"
          sx={{ marginBottom: "1rem", marginTop: "0rem" }}
        >
          Create Account
        </Typography>
        <form style={{ width: "40%", display: "grid", margin: "auto" }}>
          <TextField
            required
            sx={formStyle}
            type="text"
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            helperText={formik.touched.name ? formik.errors.name : null}
            error={formik.touched.name ? formik.errors.name : null}
          />{" "}
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
          <OutlinedInput
            name="password"
            sx={formStyle}
            placeholder="Password"
            type={secureTextEntry ? "password" : "text"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password ? formik.errors.password : null}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleSecureEntry}
                  edge="end"
                >
                  {secureTextEntry ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error>
            {formik.touched.password ? formik.errors.password : null}
          </FormHelperText>
          <OutlinedInput
            name="confirmPassword"
            sx={formStyle}
            placeholder="Confirm Password"
            type={secureTextEntry ? "password" : "text"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : null
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleSecureEntry}
                  edge="end"
                >
                  {secureTextEntry ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error>
            {formik.touched.confirmPassword
              ? formik.errors.confirmPassword
              : null}
          </FormHelperText>
        </form>
        <Typography varient="h6" sx={{ marginBottom: "1rem" }}>
          {" "}
          Already have an account? {""}
          <Link to="/" underline="hover">
            Login
          </Link>
        </Typography>
        {/* {loading ? (
                <LoadingButton
                  color="primary"
                  loading
                  fullWidth
                  size="large"
                  loadingPosition="start"
                  sx={{ color: "blue", width: "50%", borderRadius: "15px" }}
                  variant="contained"
                >{``}</LoadingButton>
              ) : ( */}
        <Button
          variant="contained"
          sx={{ width: "35%", borderRadius: "15px" }}
          onClick={formik.handleSubmit}
        >
          SignUp
        </Button>
        {/* )} */}
      </Card>
    </Box>
  );
}
