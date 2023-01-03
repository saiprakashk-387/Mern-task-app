import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, Typography } from "@mui/material";
import { loginAPI } from "../API/AuthActions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  // test@yopmail.com  admin@yopmail.com   123456
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (data) => {
      await dispatch(loginAPI(data, navigate));
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
        <Typography variant="h4" gutterBottom>
          Welcome Back
        </Typography>
        <form style={{ width: "35%", display: "grid", margin: "auto" }}>
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
        </form>
        <Typography>
          {""}
          <Link to="/login" underline="hover">
            Login With OTP
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
          sx={{ width: "30%", borderRadius: "15px" }}
          onClick={formik.handleSubmit}
        >
          Login
        </Button>
      </Card>
    </Box>
  );
}
