// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";

// const drawerWidth = 240;

// function Layout(props) {
//   const navigate = useNavigate();
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [role, setRole] = useState();
//   const [info, setInfo] = useState();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   useEffect(() => {
//     setRole(sessionStorage.getItem("role"));
//     setInfo(JSON.parse(sessionStorage.getItem("userdata")));
//   }, []);
//   const list = [
//     {
//       name: "Home-admin",
//       path: "/admindashboard",
//     },
//     {
//       name: "Profile",
//       path: "/profile",
//     },
//   ];
//   const userList = [
//     {
//       name: "Dashboard-user",
//       path: "/home",
//     },
//     {
//       name: "About",
//       path: "/about",
//     },
//     {
//       name: "Profile",
//       path: "/myprofile",
//     },
//   ];
//   const getRoute = (text) => {
//     navigate(text.path);
//   };
//   const drawer = (
//     <div>
//       <Toolbar />
//       <List>
//         {role === "admin"
//           ? list.map((text, index) => (
//               <ListItem
//                 key={index}
//                 disablePadding
//                 onClick={() => {
//                   getRoute(text);
//                 }}
//               >
//                 <ListItemButton>
//                   <ListItemText primary={text.name} />
//                 </ListItemButton>
//               </ListItem>
//             ))
//           : userList.map((text, index) => (
//               <ListItem
//                 key={index}
//                 disablePadding
//                 onClick={() => {
//                   getRoute(text);
//                 }}
//               >
//                 <ListItemButton>
//                   <ListItemText primary={text.name} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//       </List>
//     </div>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   const sessionOut = () => {
//     sessionStorage.clear();
//     navigate("/");
//   };

//   // const splitUserName = info?.email;
//   // const userName = splitUserName?.toString().split("@", 1);
//   const userName = info?.name;
//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           // width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar sx={{ justifyContent: "space-around" }}>
//           <Typography variant="h6" noWrap component="div"
//           >
//             Welcome {""}
//             <Link
//               to={`/profile`}
//               state={role}
//               sx={{ color: "cornsilk" }}
//             >
//               {userName}
//             </Link>
//           </Typography>
//           <Typography variant="h6" noWrap component="div">
//             MERN
//           </Typography>
//           <Button onClick={sessionOut} sx={{ color: "aliceblue" }}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{
//           width: { sm: drawerWidth },
//           flexShrink: { sm: 0 },
//           backgroundColor: "#1976d2",
//           color: "aliceblue",
//         }}
//         aria-label="mailbox folders"
//       >
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // open  on mobile.
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//               backgroundColor: "#1976d2",
//               color: "aliceblue",
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//         }}
//       >
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }

// Layout.propTypes = {
//   window: PropTypes.func,
// };

// export default Layout;

///toggle drawer//
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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState();
  const [info, setInfo] = useState();

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };
  useEffect(() => {
    setRole(sessionStorage.getItem("role"));
    setInfo(JSON.parse(sessionStorage.getItem("userdata")));
  }, []);

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

  // const splitUserName = info?.email;
  // const userName = splitUserName?.toString().split("@", 1);
  const userName = info?.name;
  const list = [
    {
      name: "Home-admin",
      path: "/admindashboard",
    },
    {
      name: "Profile",
      path: "/profile",
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
  ];
  const getRoute = (text) => {
    navigate(text.path);
  };
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
          {/* <>
          <Box> */}
            <Typography variant="h6" noWrap component="div" sx={{marginInline:"100px"}}>
              Welcome {""}
              <Link to={`/profile`} state={role} sx={{ color: "cornsilk" }}>
                {userName}
              </Link>
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{margin:"auto"}}>
              MERN
            </Typography>
            <Button onClick={sessionOut} sx={{ color: "aliceblue" ,margin:"auto"}}>
              Logout
            </Button>
            {/* </Box>
          </> */}
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
        </List>
        {/* <Divider /> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
