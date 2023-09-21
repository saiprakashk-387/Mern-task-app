import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import moment from 'moment';
import { userApplogin, userApplogout } from "../API/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { UserAppLoginnSelector } from "../Redux/Slice";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState();
  const [info, setInfo] = useState();
const [clockIn,setClockIn]=useState()
const [logId,setLoginId]=useState()
const { userAppLoginn } = useSelector(UserAppLoginnSelector);

  useEffect(() => {
    setRole(sessionStorage.getItem("role"));
    setLoginId(sessionStorage.getItem("logid"));
    setInfo(JSON.parse(sessionStorage.getItem("userdata")));
    setClockIn(sessionStorage.getItem("loginStatus"))
  }, [userAppLoginn]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const sessionOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const getUserName = (val) => {
    let newVal = val?.charAt(0).toUpperCase() + val?.slice(1).toLowerCase();
    return newVal;
  };
  // const splitUserName = info?.email;
  // const userName = splitUserName?.toString().split("@", 1);
  // const userName = info?.name;
  const list = [
    {
      name: "Dashboard-admin",
      path: "/admindashboard",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Attendence",
      path: "/attencence",
    },
  ];
  const userList = [
    {
      name: "Dashboard-user",
      path: "/home",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "My-Attendence",
      path: "/attendence",
    },
  ];
  const getRoute = (text) => {
    navigate(text.path);
  };
  const clockInprop=()=>{
    let data={
      inTime:moment().format('L,LTS',"HH:mm:ss a"),
      outTime:""
    };
    dispatch(userApplogin(data))
    // setClockIn(true)   
  }
 
  const clockOutprop=()=>{
    let id = logId
    let data={
      outTime:moment().format('L,LTS',"HH:mm:ss a")
    };
    dispatch(userApplogout(data,id))
    // setClockIn(false)
    localStorage.clear();
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginInline: "100px" }}
          >
            Welcome {""}
            <Link to={`/profile`} state={role} sx={{ color: "cornsilk" }}>
              {getUserName(info?.name)}
            </Link>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ margin: "auto" }}
          >
            MERN
          </Typography>
          {
            clockIn === "Active"? <Button
            onClick={clockOutprop}
            sx={{ color: "aliceblue",backgroundColor:"gray", margin: "auto" }}
          >
            Clock-Out
          </Button>:
           <Button
           onClick={ clockInprop}
           sx={{ color: "aliceblue",backgroundColor:"gray", margin: "auto" }}
         >
           Clock-In
         </Button>
          }
         
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {role === "admin"
            ? list.map((text, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  onClick={() => {
                    getRoute(text);
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              ))
            : userList.map((text, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  onClick={() => {
                    getRoute(text);
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              ))}
               <Button
            onClick={sessionOut}
            sx={{ color: "secondary", margin: "auto" }}
          >
            Logout
          </Button>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
