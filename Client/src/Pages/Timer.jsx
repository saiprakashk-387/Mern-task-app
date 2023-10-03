import { Button } from "@mui/material";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userApplogin, userApplogout } from "../API/UserActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stopwatch = (props) => {
  const dispatch = useDispatch();
  const { userAppLoginn } = props;
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [clockIn, setClockIn] = useState();
  const [logId, setLoginId] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [userLogTime, setUserlogTime] = useState();
  const [attendenceStatus, setAttendenceStatus] = useState();
  useEffect(() => {
    setLoginId(sessionStorage.getItem("logid"));
    setClockIn(sessionStorage.getItem("loginStatus"));
    setUserlogTime(sessionStorage.getItem("login_at"));
    setAttendenceStatus(sessionStorage.getItem("AttendenceStatus"));
  }, [userAppLoginn]);

  useEffect(() => {
    let interval;
    if (userLogTime) {
      continueTimerFrom(getloginDuration());
    }
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = { ...prevTime };
          newTime.seconds++;

          if (newTime.seconds === 60) {
            newTime.seconds = 0;
            newTime.minutes++;

            if (newTime.minutes === 60) {
              newTime.minutes = 0;
              newTime.hours++;
            }
          }

          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, userLogTime]);

  const startTimer = () => {
    if (attendenceStatus) {
      toast.warn("Attendence Marked ");
    } else {
      setIsRunning(!isRunning);
      let data = {
        inTime: moment().format("L,LTS", "HH:mm:ss a"),
        outTime: "",
      };
      dispatch(userApplogin(data));
      setIsActive(true);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
    let id = logId;
    let data = {
      outTime: moment().format("L,LTS", "HH:mm:ss a"),
    };
    dispatch(userApplogout(data, id));
    resetTimer();
    // sessionStorage.clear("login_at");
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const continueTimerFrom = (newTime) => {
    setIsActive(false);
    setTime({
      hours: newTime?.split?.(":")[0],
      minutes: newTime?.split?.(":")[1],
      seconds: newTime?.split?.(":")[2],
    });
    setIsActive(true);
  };
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const getloginDuration = () => {
    let val = "10/03/2023,10:16:06 AM";
    let val1 = moment().format("L,LTS", "HH:mm:ss a");
    let inTime = moment(val?.split(",")[1], "HH:mm:ss a");
    let outTime = moment(val1?.split(",")[1], "HH:mm:ss a");
    var hrs = moment.utc(outTime.diff(inTime)).format("HH");
    var min = moment.utc(outTime.diff(inTime)).format("mm");
    var sec = moment.utc(outTime.diff(inTime)).format("ss");
    let time = [hrs, min, sec].join(":");
    return time;
  };
  return (
    <div>
      {clockIn === "Active" ? (
        <Button
          onClick={stopTimer}
          sx={{ color: "aliceblue" }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {isHovering ? (
            <p style={{ backgroundColor: "#a0cfa3", width: "170px" }}>
              {"WEB CLOCK-OUT"}
            </p>
          ) : (
            <p style={{ width: "170px" }}>{`CLOCKED IN\n ${String(
              time.hours
            ).padStart(2, "0")}:${String(time.minutes).padStart(
              2,
              "0"
            )}:${String(time.seconds).padStart(2, "0")} `}</p>
          )}
        </Button>
      ) : (
        <Button
          onClick={startTimer}
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
