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
      number:"",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"), 
       number: yup
      .string()
      .required("Mobile Number is required")
      .min(10, "should be 10 digits")
      .max(10, "10 digits required"),
      confirmPassword: yup
        .string()
        .required("Confirm Password must be required")
        .oneOf([yup.ref("password"), null], "Password not match"),
    }),
    onSubmit: async (data) => {
      let value = {
        name: data.name,
        email: data.email,
        password: data.password,
        number:data.number,
        role: "user",
      };
      // console.log("value", value);
      await registerAPI(value, navigate);
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
           <TextField
              sx={formStyle}
              type="number"
              name="number"
              InputProps={{ inputProps: { min: 0 } }}
              placeholder="Mobile Number"
              value={formik.values.number}
              onChange={formik.handleChange}
              helperText={formik.touched.number ? formik.errors.number : null}
              error={formik.touched.number ? formik.errors.number : null}
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
