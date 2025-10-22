import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateFakeData = () => {
  const numPoints = 20; // fewer points for simplicity
  const labels = Array.from({ length: numPoints }, (_, i) => i * (100 / (numPoints - 1)));
  const data = labels.map(x => Math.sin((x / 100) * 2 * Math.PI)); // sine wave
  return {
    labels,
    datasets: [
      {
        label: "Performance",
        data,
        borderColor: "#007bff",
        backgroundColor: "rgba(0,123,255,0.2)",
        fill: true,
        tension: 0.4, // smooth curve
      },
    ],
  };
};

const DummyChart: React.FC = () => (
  <div style={{ width: "100%", maxWidth: "350px", height: "150px", margin: "10px auto" }}>
    <Line
      data={generateFakeData()}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "top" },
          title: { display: false },
        },
        scales: {
          x: { ticks: { maxTicksLimit: 6 } },
          y: { min: -1, max: 1 },
        },
      }}
    />
  </div>
);

export default DummyChart;