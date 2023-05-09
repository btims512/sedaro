import React from "react";

const MapWrapper = React.memo(({ flattenedData }) => {
  return (
    <div
      style={{ width: "100%", height: "40vh", backgroundColor: "lightgray" }}
    >
      {flattenedData.map((item, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${item.planetX}px`,
            top: `${item.planetY}px`,
            backgroundColor: "red",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
});

export default MapWrapper;
