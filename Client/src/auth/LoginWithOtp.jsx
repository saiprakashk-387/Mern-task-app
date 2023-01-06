import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, Typography } from "@mui/material";
import { getOtpApi, loginWithOtpApi } from "../API/AuthActions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { userLoginOtpSelector } from "../Redux/Slice";

export default function LoginWithOtp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const { getLoginOtp, isLoading, error } = useSelector(userLoginOtpSelector);
   useEffect(() => {
    if (getLoginOtp?.status === 200) {
      setLoading(true);
    }
  }, [getLoginOtp]);

  const formik = useFormik({
    initialValues: {
      number: "",
      password: "",
    },
    validationSchema: yup.object({
      number: yup
        .string()
        .required("Mobile Number is required")
        .min(10, "should be 10 digits")
        .max(10, "10 digits required"),
    }),
    onSubmit: async (data) => {
      let userNumber = JSON.parse(sessionStorage.getItem("number"));
      // setLoading(true);
      let values = {
        number: data?.number,
      };
      let val = {
        number: userNumber?.number,
        otp: data?.password,
      };

      if (data?.password) {
        dispatch(loginWithOtpApi(val, navigate));
       } else {
        dispatch(getOtpApi(values));
       }
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
      {!loading ? (
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
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              name="number"
              placeholder="Enter Mobile Number"
              value={formik.values.number}
              onChange={formik.handleChange}
              helperText={formik.touched.number ? formik.errors.number : null}
              error={formik.touched.number ? formik.errors.number : null}
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
            Get OTP
          </Button>
        </Card>
      ) : (
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
            Login
          </Button>
        </Card>
      )}
    </Box>
  );
}
