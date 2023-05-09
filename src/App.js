import React, { useState, useEffect } from "react";
import data from "./data";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import flattenData from "./components/flattenData";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import CustomLineChart from "./components/CustomLineChart";
import { useResizeDetector } from "react-resize-detector";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CircularProgress from "@mui/material/CircularProgress";
import { LineChart, CartesianGrid } from "recharts";
import styles from "./styles";
import { motion } from "framer-motion";
import "./app.css";

const flattenedData = flattenData(data);

function App() {
  const { ref, width = window.innerWidth } = useResizeDetector();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
    },
    typography: {
      fontFamily: "Arial",
      fontSize: 14,
    },
  });

  const getBackgroundColor = () => {
    return darkMode ? "#424242" : "#f5f5f5";
  };

  const appStyles = {
    ...styles.app,
    backgroundColor: getBackgroundColor(),
  };

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={styles.title}
            >
              Sedaro Nano Visualization
            </Typography>
            <IconButton
              color="inherit"
              aria-label="toggle dark mode"
              onClick={handleThemeToggle}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
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
            <UncontrolledReactSVGPanZoom
              width={width || 500}
              height={500} // Updated height value
              scaleFactorMin={1}
              scaleFactorMax={10}
            >
              <svg width={width || 500} height={500}>
                <CustomLineChart
                  width={width || 500}
                  height={500}
                  data={flattenedData}
                  darkMode={darkMode}
                  chartStyle={{ backgroundColor: getBackgroundColor() }} // Add this line
                />
              </svg>
            </UncontrolledReactSVGPanZoom>
          </motion.div>
        )}
      </motion.div>
    </ThemeProvider>
  );
}

export default App;
