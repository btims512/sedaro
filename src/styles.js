const styles = {
  app: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
  logo: {
    width: "273px",
    "@media (max-width: 768px)": {
      width: "200px",
    },
    "@media (max-width: 576px)": {
      width: "150px",
    },
  },
  toolbar: {
    minHeight: "105px",
    "@media (max-width: 768px)": {
      minHeight: "80px",
    },
    "@media (max-width: 576px)": {
      minHeight: "60px",
    },
  },
  chartContainer: {
    position: "relative",
    width: "100%",
    height: "110vh",
    overflow: "hidden",
    "@media (max-width: 768px)": {
      height: "100vh",
    },
    "@media (max-width: 576px)": {
      height: "85vh",
    },
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  lineChart: {},
  buttons: {
    position: "absolute",
    backgroundColor: "#4d68bd",
    right: "20px",
    bottom: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "@media (max-width: 768px)": {
      right: "10px",
      bottom: "10px",
    },
    "@media (max-width: 576px)": {
      right: "5px",
      bottom: "5px",
    },
  },
};

export default styles;
