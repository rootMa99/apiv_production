import c from "./MonthChart.module.css";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { useSelector } from "react-redux";

const MonthChart = (p) => {
  const day = useSelector((s) => s.additionalData);

  const data = {
    labels: day.month,
    datasets: [
      
      {
        type: "line",
        label: "Line Dataset",
        data: [5, 70, 80, 30, 5, 70, 80, 30, 5, 70, 80, 30],
        backgroundColor: "#950101",
        pointHoverBorderColor: "#FAF0E6",
        borderColor: "#FAF0E6",
        fill: false,
        tension: 0.3,
        borderWidth: 3,
        borderCapStyle: "round",
        //borderDash: [5, 5],
        pointHoverBackgroundColor: "rgb(88, 3, 3)",
        pointHoverRadius: 8,
        pointBorderColor: "rgb(110, 3, 3)",
        pointBorderWidth: 3,
        pointRadius: 4,
      },
      {
        type: "bar",
        label: "Bar Dataset",
        data: [10, 20, 30, 40, 5, 70, 80, 30, 5, 70, 80, 30],
        backgroundColor: "rgb(99, 3, 3)",
        hoverBackgroundColor: "#950101",
        borderColor: "#FAF0E6",
        borderWidth: 1,
      }
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "#f3f3f34f",
        },
        ticks: {
          color: "white",
          fontWeight: "bold",
        },
      },
      y: {
        grid: {
          color: "#f3f3f34f",
        },
        ticks: {
          color: "white",
          fontWeight: "bold",
        },
        y: {
          stacked: true,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      datalabels: {
        display: true,
      },
    },
  };
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    BarElement
  );
  return (
    <div className={c.chart}>
      <h2>monthly</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthChart;
