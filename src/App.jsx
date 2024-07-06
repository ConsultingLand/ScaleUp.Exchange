import { ThemeProvider, responsiveFontSizes, Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { createCustomTheme } from "./theme";
import Navbar from "./Navbar";

import RoadMap from "./component/RoadMap/roadmap";
import KafaNetwork from "./component/KafaNetwork/KafaNetwork";
import PresaleTabs from "./component/Presale/PresaleTabs";
import Footer from "./component/Footer/Footer";
import Staking from "./component/Staking/Staking";
function App() {
  const [mode, setMode] = useState(false);
  let theme = createCustomTheme(mode ? "light" : "dark");
  theme = responsiveFontSizes(theme);

  const themeToggler = () => {
    setMode(!mode);
  };

  return (
    <Box sx={{ backgroundColor: mode ? "#E0F7FA" : "#1A1D23" }}>
      <ThemeProvider theme={theme}>
        <Routes>
          {/* <Route
            path="/"
            element={
              <>
                <Box
                  sx={{
                    background: mode ? "#E0F7FA" : "#1A1D23",
                    minHeight: "100vh",
                  }}
                >
                  <Navbar mode={mode} themeToggler={themeToggler} />
                  <KafaNetwork mode={mode} themeToggler={themeToggler} />
                  <PresaleTabs mode={mode} themeToggler={themeToggler} />
                  <RoadMap mode={mode} themeToggler={themeToggler} />
                  <Footer mode={mode} themeToggler={themeToggler} />
                </Box>
              </>
            }
          /> */}
          <Route
            path="/RoadMap"
            element={
              <>
                <Box
                  sx={{
                    background: mode ? "#E0F7FA" : "#1A1D23",
                    minHeight: "100vh",
                  }}
                >
                  <Navbar mode={mode} themeToggler={themeToggler} />
                  <RoadMap mode={mode} themeToggler={themeToggler} />
                  <Footer mode={mode} themeToggler={themeToggler} />
                </Box>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Box
                  sx={{
                    background: mode ? "#E0F7FA" : "#1A1D23",
                    minHeight: "100vh",
                  }}
                >
                  <Navbar mode={mode} themeToggler={themeToggler} />
                  <KafaNetwork mode={mode} themeToggler={themeToggler} />
                  <Staking mode={mode} themeToggler={themeToggler} />
                  <RoadMap mode={mode} themeToggler={themeToggler} />
                  <Footer mode={mode} themeToggler={themeToggler} />
                </Box>
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    </Box>
  );
}

export default App;
