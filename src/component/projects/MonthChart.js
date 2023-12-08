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
///import { useSelector } from "react-redux";

const MonthChart = (p) => {
  //const day = useSelector((s) => s.additionalData);

  const data = {
    labels: p.monthData.map((m) => m.name),
    datasets: [
      {
        type: "line",
        label: "Line Dataset",
        data: p.monthData.map((m) => m.totalTarget),
        backgroundColor: "#950101",
        pointHoverBorderColor: "#FAF0E6",
        borderColor: "#FAF0E6",
        fill: false,
        tension: 0.3,
        borderWidth: 3,
        borderCapStyle: "round",
        pointHoverBackgroundColor: "rgb(88, 3, 3)",
        pointHoverRadius: 8,
        pointBorderColor: "rgb(110, 3, 3)",
        pointBorderWidth: 3,
        pointRadius: 4,
      },
      {
        type: "bar",
        label: "Bar Dataset",
        data: p.monthData.map((m) => m.total),
        backgroundColor: "rgb(99, 3, 3)",
        hoverBackgroundColor: "#950101",
        borderColor: "#FAF0E6",
        borderWidth: 1,
      },
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
          color: "#FAF0E6",
        },
      },
      datalabels: {
        display: true,
      },
    },
    animation: {
      onComplete: (animation) => {
        const { chart } = animation;
        const ctx = chart.ctx;

        chart.data.datasets.forEach((dataset, index) => {
          const meta = chart.getDatasetMeta(index);

          meta.data.forEach((element, index) => {
            const data = dataset.data[index];
            let xPos, yPos;

            if (dataset.type === 'bar') {
              xPos = element.x;
              yPos = element.y + 100;
            } else if (dataset.type === 'line') {
              xPos = element.x;
              yPos = element.y - 10; 
            }

            ctx.save();
            ctx.textAlign = 'center';
            ctx.fillStyle = '#FAF0E6';
            ctx.font = '12px Arial';

            ctx.fillText(data, xPos, yPos);

            ctx.restore();
          });
        });
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
      <h4>monthly</h4>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthChart;
