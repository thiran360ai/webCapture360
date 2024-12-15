import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const LineGraph = ({ setCurrentIndexLeft, setCurrentIndexRight, maxFrames, id }) => {
  const [rawData, setRawData] = useState([]);
  const [parsedData, setParsedData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchFloorData = async () => {
      console.log(id);
      try {
        const response = await fetch(
          `https://aa53-59-97-51-97.ngrok-free.app/building/getFloorPlan/${id}/`,
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "98547",
            },
          }
        );
        const res_data = await response.json();
        setRawData(JSON.parse(res_data[0].data));
      } catch (error) {
        console.error("Failed to fetch Floor data:", error);
      }
    };
    fetchFloorData();
  }, [id]);

  // Parse and add point numbers to the data
  useEffect(() => {
    if (rawData) {
      const parsed = rawData.map(([x, y], index) => ({
        x, // x-axis value
        y, // y-axis value
        pointNumber: index + 1, // Consecutive point number
      }));
      setParsedData(parsed);
    } else {
      setParsedData([]);
    }
  }, [rawData]);

  // Handle point click event
  const fetchByPoint = (pointNumber) => {
    console.log("Fetching data for point:", pointNumber);
    const newIndex = Math.min(pointNumber - 1, maxFrames - 1);
    setCurrentIndexLeft(newIndex);
    setCurrentIndexRight(newIndex);
  };

  // const handlePointClick = (e) => {
  //   console.log("clicked", e)
  //   if (e && e.r) {
  //     fetchByPoint(e.r);
  //   }
  // };

  // Custom Tooltip to display point numbers
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { pointNumber } = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p>Point: {pointNumber}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h1 style={{ marginTop: "30px" }}>Floor Map</h1>
      <LineChart
        width={600}
        height={300}
        data={parsedData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="x" tick={false} axisLine={false} />
        <YAxis tick={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Line
  type="monotone"
  dataKey="y"
  stroke="#8884d8"
  strokeWidth={2}
  dot={false}
  activeDot={{
    fill: "#4a90e2",
    r: 8,
    onClick: (event, payload) => {
      if (payload && payload.index !== undefined) {
        fetchByPoint(payload.index + 1); // Add 1 to match your frame numbering
      }
    },
  }}
/>

      </LineChart>
    </>
  );
};

export default LineGraph;
