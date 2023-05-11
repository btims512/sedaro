import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import { useResizeDetector } from "react-resize-detector";
import { motion } from "framer-motion";

import data from "./data";
import sedaroLogo from "./assets/sedaro-logo.webp";
import backgroundImage from "./assets/background.png";
import flattenData from "./components/flattenData";
import CustomLineChart from "./components/CustomLineChart";

import styles from "./styles";
import "./app.css";

const CustomButton = styled(Button)(({ theme }) => ({
  minWidth: 181,
  height: 55,
  borderRadius: 4,
  backgroundColor: "#5D83BE",
  color: "#000000",
  textTransform: "none",
  fontWeight: 600,
  fontSize: 16,
  letterSpacing: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  "&:hover": {
    backgroundColor: "#15171f",
    transition: "all 0.4s",
    color: "#FFFFFF",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    border: "1px solid white",
  },
}));

const flattenedData = flattenData(data);

function App() {
  const {
    ref,
    width = window.innerWidth,
    height = window.innerHeight,
  } = useResizeDetector();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [graphHeight, setGraphHeight] = useState(
    window.innerWidth < 576 ? window.innerHeight * 0.5 - 50 : 500
  );

  const headersRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setGraphHeight(width < 576 ? height * 0.5 - 50 : 500);
  }, [width, height]);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#4d68bd",
      },
      secondary: {
        main: "#f50057",
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 14,
    },
  });

  const getBackgroundStyles = () => {
    if (darkMode) {
      return {
        backgroundColor: "rgb(66, 66, 66)",
        backgroundImage: "none",
        backgroundRepeat: "round",
      };
    } else {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "round",
      };
    }
  };

  const appStyles = {
    ...styles.app,
    ...getBackgroundStyles(),
    paddingBottom: window.innerWidth <= 768 ? "50px" : "0px",
  };

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
      >
        <AppBar position="static">
          <Toolbar style={styles.toolbar}>
            <img src={sedaroLogo} alt="Company logo" style={styles.logo} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={styles.title}
            ></Typography>
            <IconButton
              color="inherit"
              aria-label="toggle dark mode"
              onClick={handleThemeToggle}
              sx={{ fontSize: "1.3em" }}
            >
              {darkMode ? (
                <Brightness7Icon
                  sx={{ fontSize: "1.3em", width: "1.3em", height: "1.3em" }}
                />
              ) : (
                <Brightness4Icon
                  sx={{ fontSize: "1.3em", width: "1.3em", height: "1.3em" }}
                />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </motion.div>
      <motion.div
        className={`App ${loading ? "animatedBackground" : ""}`}
        style={appStyles}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <div style={styles.spinnerContainer}>
            <CircularProgress />
          </div>
        ) : (
          <motion.div
            ref={ref}
            style={styles.chartContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="hero">
              <div className="headers" ref={headersRef}>
                <h1 style={{ color: darkMode ? "#FFFFFF" : "#DDDDDD" }}>
                  Digital Twins and the Engineering Multiverse
                </h1>
                <h2 style={{ color: darkMode ? "#FFFFFF" : "#DDDDDD" }}>
                  Enabling breakthrough designs and optimized performance
                </h2>
                <div className="button">
                  <CustomButton variant="contained">
                    <p>Learn More</p>
                  </CustomButton>
                </div>
              </div>
            </div>
            <div className="wrapper" style={{ marginTop: "30px" }}>
              {" "}
              <UncontrolledReactSVGPanZoom
                width={
                  headersRef.current ? headersRef.current.clientWidth : width
                }
                height={graphHeight}
                scaleFactorMin={1}
                scaleFactorMax={10}
              >
                <svg
                  width={
                    headersRef.current ? headersRef.current.clientWidth : width
                  }
                  height={graphHeight}
                >
                  <CustomLineChart
                    width={
                      headersRef.current
                        ? headersRef.current.clientWidth
                        : width
                    }
                    height={graphHeight}
                    data={flattenedData}
                    darkMode={darkMode}
                    chartStyle={getBackgroundStyles()}
                  />
                </svg>
              </UncontrolledReactSVGPanZoom>
            </div>
          </motion.div>
        )}
      </motion.div>
    </ThemeProvider>
  );
}

export default App;
