import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Hidden,
  ListItemButton,
  Paper,
  Stack,
  SwipeableDrawer,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { NavLink, useLocation } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import logo from "./assets/logo.jpg";
import logo1 from "./assets/logo1.jpg";

const Navbar = ({ themeToggler, mode }) => {
  const theme = useTheme();
  useMediaQuery("(max-width:1200px)");

  const [openDrawer, setOpenDrawer] = useState(false);
  let location = useLocation();
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: "200px" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <ListItemButton
          to="/"
          sx={{
            color:
              location.pathname === "/BuyCrypto"
                ? "#B97D05"
                : mode
                ? "#000"
                : "#fff",
          }}
          component={NavLink}
        >
          <img src={mode ? logo1 : logo} alt="logo" style={{ width: "50px" }} />
        </ListItemButton>
        <ListItemButton
          to="/"
          sx={{
            color: mode ? "#000" : "#fff",
            fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
            fontSize: "15px",
            fontWeight: "bold",
            "&:hover": {
              color: "#E0F7FA",
            },
          }}
          component={NavLink}
        >
          presale
        </ListItemButton>
        <ListItemButton
          to="/RoadMap"
          sx={{
            color: mode ? "#000" : "#fff",
            fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
            textTransform: "uppercase",
            fontSize: "15px",
            fontWeight: "bold",
            "&:hover": {
              color: "#E0F7FA",
            },
          }}
          component={NavLink}
        >
          RoadMap
        </ListItemButton>
        <ListItemButton
          to="/Staking"
          sx={{
            color: mode ? "#000" : "#fff",
            fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
            textTransform: "uppercase",
            fontSize: "15px",
            fontWeight: "bold",
            "&:hover": {
              color: "#E0F7FA",
            },
          }}
          component={NavLink}
        >
          Staking
        </ListItemButton>
        <Button
          onClick={themeToggler}
          sx={{
            color: "theme.palette.success.main",
            backgroundColor: "#070C0E",
            ":hover": {
              backgroundColor: "#070C0E",
            },
          }}
        >
          {mode ? <Brightness4 /> : <Brightness7 />}
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar id="main-navbar" position="fixed" elevation={0} component="nav">
        <Toolbar sx={{ justifyContent: "space-evenly" }}>
          <Container maxWidth="xl">
            <Hidden lgDown>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <ListItemButton
                    to="/"
                    sx={{
                      color:
                        location.pathname === "/"
                          ? "#B97D05"
                          : mode
                          ? "#000"
                          : "#fff",
                      fontFamily: ["Open Sans Variable", "sans-serif"].join(
                        ","
                      ),
                      textTransform: "uppercase",
                    }}
                    component={NavLink}
                  >
                    <img
                      src={mode ? logo1 : logo}
                      alt="logo"
                      style={{ width: "50px" }}
                    />
                  </ListItemButton>
                </Box>
                <Box
                  display="flex"
                  justifyContent=" start"
                  alignItems="center"
                  gap={1}
                >
                  <ListItemButton
                    to="/"
                    sx={{
                      color: mode ? "#000" : "#fff",
                      fontFamily: ["Open Sans Variable", "sans-serif"].join(
                        ","
                      ),
                      textTransform: "uppercase",
                      fontSize: "15px",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "#E0F7FA",
                      },
                    }}
                    component={NavLink}
                  >
                    presale
                  </ListItemButton>

                  <ListItemButton
                    to="/RoadMap"
                    sx={{
                      color: mode ? "#000" : "#fff",
                      fontFamily: ["Open Sans Variable", "sans-serif"].join(
                        ","
                      ),
                      textTransform: "uppercase",
                      fontSize: "15px",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "#E0F7FA",
                      },
                    }}
                    component={NavLink}
                  >
                    RoadMap
                  </ListItemButton>
                  <ListItemButton
                    to="/Staking"
                    sx={{
                      color: mode ? "#000" : "#fff",
                      fontFamily: ["Open Sans Variable", "sans-serif"].join(
                        ","
                      ),
                      textTransform: "uppercase",
                      fontSize: "15px",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "#E0F7FA",
                      },
                    }}
                    component={NavLink}
                  >
                    Staking
                  </ListItemButton>

                  <Button
                    onClick={themeToggler}
                    sx={{
                      color: "theme.palette.success.main",
                      backgroundColor: "#070C0E",
                      py: 1.4,
                      borderRadius: "10px",
                      ":hover": {
                        backgroundColor: "#070C0E",
                      },
                    }}
                  >
                    {mode ? <Brightness4 /> : <Brightness7 />}
                  </Button>
                </Box>
              </Box>
            </Hidden>
            <Hidden lgUp>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <ListItemButton
                  to="/"
                  sx={{
                    color:
                      location.pathname === "/"
                        ? "#B97D05"
                        : mode
                        ? "#000"
                        : "#fff",
                    fontFamily: ["Open Sans Variable", "sans-serif"].join(","),
                  }}
                  component={NavLink}
                >
                  <img
                    src={mode ? logo1 : logo}
                    alt="logo"
                    style={{ width: "50px" }}
                  />
                </ListItemButton>
                <Button onClick={toggleDrawer(true)}>
                  <MenuIcon
                    style={{
                      fontSize: "38px",
                      cursor: "pointer",
                      color: mode ? "#000" : "#fff",
                    }}
                  />
                </Button>
              </Stack>
              <Paper style={{ background: mode ? "#00AEEF" : "#070C0E" }}>
                <SwipeableDrawer
                  PaperProps={{
                    sx: {
                      background: mode ? "#00AEEF" : "#070C0E",
                      justifyContent: "center",
                    },
                  }}
                  anchor="left"
                  open={openDrawer}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  {list()}
                </SwipeableDrawer>
              </Paper>
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />{" "}
      {/* This Toolbar component is used to offset the fixed AppBar */}
      <Divider color={mode ? "#283134" : "#ffffff"} />
    </>
  );
};
export default Navbar;
