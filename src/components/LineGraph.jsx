import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const LineGraph = () => {


  const [rawData, setRawData] = useState([  {
    id: 114,
    project: 2,
    name: "floor1",
    data: [[0,0],[-0.3996920883655548,0.015691684558987617],[-0.7993841767311096,0.031383369117975235],[-8.176043510437012,9.362092971801758]],
  }]);

  const [graphPoints, setGraphPoints] = useState([[0,0],[-0.3996920883655548,0.015691684558987617],[-0.7993841767311096,0.031383369117975235],[-8.176043510437012,9.362092971801758]])



  useEffect(() => {
    const fetchFloorData = async () => {
      try {
        const response = await fetch(
          "https://c432-59-97-51-97.ngrok-free.app/building/getFloorPlan/114/",
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "98547",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          // Check if result contains the necessary properties
          if (result && result[0].data) {
            console.log("feted points data", result)
            setRawData(result); // Update rawData with the fetched result
          } else {
            console.error("Invalid data format: ", result);
          }
        } else {
          console.error("Failed to fetch data: ", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch Floor data:", error);
      }
    };
  
    fetchFloorData();
  }, []);
  
  const [parsedData, setParsedData] = useState();


//   useEffect(()=> {
// console.log("data after fetch and set", rawData[0].data)
// setParsedData(rawData[0].data.map(([x, y]) => ({
//   x, // x-axis value
//   y, // y-axis value
// })))
//   }, [rawData])





  // Parse the data string into an array of objects
  

  // Event handler for point click
  const handlePointClick = (data) => {
    console.log("Clicked point:", data);
  };

  return (
    <>
    <h1>Floor Map</h1>
 <LineChart
      width={600}
      height={300}
      // data={parsedData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      {/* Hide the X and Y axes */}
      <XAxis dataKey="x" tick={false} axisLine={false} />
      <YAxis tick={false} axisLine={false} />

      {/* Add tooltips for interaction */}
      <Tooltip
        contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }} // Custom tooltip background
        cursor={false} // Disable the hover guideline
      />

      {/* The plotted curve without visible points */}
      <Line
        type="monotone"
        dataKey="y"
        stroke="#8884d8" // Curve color
        strokeWidth={2} // Curve thickness
        dot={false} // Hide the plotted points initially
        activeDot={{
          fill: "#4a90e2",
          r: 8,
          onClick: handlePointClick, // Add click handler to active dots
        }}
      />
    </LineChart>
    </>
   
  );
};

export default LineGraph;
