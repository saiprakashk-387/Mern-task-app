import { Button } from "@mui/material";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userApplogin, userApplogout } from "../API/UserActions";

const Stopwatch = (props) => {
  const dispatch = useDispatch();
  const { userAppLoginn } = props;
  const [clockIn, setClockIn] = useState();
  const [logId, setLoginId] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setLoginId(sessionStorage.getItem("logid"));
    setClockIn(sessionStorage.getItem("loginStatus"));
  }, [userAppLoginn]);
  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        // Update seconds, minutes, and hours as needed
        if (seconds < 59) {
          setSeconds(seconds + 1);
        } else if (minutes < 59) {
          setSeconds(0);
          setMinutes(minutes + 1);
        } else {
          setSeconds(0);
          setMinutes(0);
          setHours(hours + 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds, minutes, hours]);

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };
  const clockInprop = () => {
    setIsRunning(!isRunning);
    let data = {
      inTime: moment().format("L,LTS", "HH:mm:ss a"),
      outTime: "",
    };
    dispatch(userApplogin(data));
  };

  const clockOutprop = () => {
    let id = logId;
    let data = {
      outTime: moment().format("L,LTS", "HH:mm:ss a"),
    };
    dispatch(userApplogout(data, id));
    resetTimer();
    localStorage.clear();
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div>
      {clockIn === "Active" ? (
        <Button
          onClick={clockOutprop}
          sx={{ color: "aliceblue" }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {isHovering ? (
            <p style={{ backgroundColor: "#a0cfa3", width: "170px" }}>
              {"WEB CLOCK-OUT"}
            </p>
          ) : (
            <p style={{ width: "170px" }}>{`CLOCKED IN\n ${hours
              .toString()
              .padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} `}</p>
          )}
        </Button>
      ) : (
        <Button
          onClick={clockInprop}
          sx={{
            color: "aliceblue",
            backgroundColor: "#bf6142",
            margin: "auto",
          }}
        >
          WEB CLOCK-IN
        </Button>
      )}
    </div>
  );
};

export default Stopwatch;
