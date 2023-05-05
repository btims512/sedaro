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
import data from "./data";

function flattenData(data) {
  return data.map(([_, __, entry]) => {
    const { Planet = {}, Satellite = {} } = entry;

    return {
      time: Planet.time || Satellite.time,
      planetX: Planet.x || 0,
      planetY: Planet.y || 0,
      satelliteX: Satellite.x || 0,
      satelliteY: Satellite.y || 0,
    };
  });
}

function App() {
  const flattenedData = flattenData(data);

  return (
    <div className="App">
      <h1>Sedaro Nano Visualization</h1>
      <LineChart
        width={500}
        height={300}
        data={flattenedData}
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
    </div>
  );
}

export default App;
