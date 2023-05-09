import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CustomLineChart = ({ data, width, height, darkMode, chartStyle }) => {
  const chartBackgroundColor = darkMode ? "#424242" : "#ffffff";

  return (
    <svg width={width} height={height}>
      <foreignObject x="0" y="0" width={width} height={height}>
        <LineChart
          width={width}
          height={height}
          data={data}
          style={{ backgroundColor: chartBackgroundColor }}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="planetX"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="planetY" stroke="#82ca9d" />
          <Line type="monotone" dataKey="satelliteX" stroke="#ffc658" />
          <Line type="monotone" dataKey="satelliteY" stroke="#ff7300" />
        </LineChart>
      </foreignObject>
    </svg>
  );
};

export default CustomLineChart;
