import c from "./MonthChart.module.css";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
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

  const bgcolor = [];

 ( p.type === "ab" || p.type === "hc")
    ? (p.monthData.map((m) =>
        +m.total < +m.totalTarget
          ? bgcolor.push("#005B41")
          : bgcolor.push("rgb(88, 3, 3)")
      ))
    : (p.monthData.map((m) =>
        +m.total > +m.totalTarget
          ? bgcolor.push("#005B41")
          : bgcolor.push("rgb(88, 3, 3)")
      ));

  const dataBar = {
    labels: p.monthData.map((m) => m.name),
    datasets: [
      {
        label: `Actual Data ${p.title} `,
        data: p.monthData.map((m) => m.total),
        backgroundColor: "rgb(99, 3, 3)",
        hoverBackgroundColor: "#950101",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const data = {
    labels: p.monthData.map((m) => m.name),
    datasets: [
      {
        type: "line",
        label: "Target Data",
        data: p.monthData.map((m) => m.totalTarget),
        backgroundColor: "white",
        pointHoverBorderColor: "#FAF0E6",
        borderColor: "#00A9FF",
        fill: false,
        tension: 0.3,
        borderWidth: 3,
        borderCapStyle: "round",
        pointHoverBackgroundColor: "rgb(88, 3, 3)",
        pointHoverRadius: 8,
        pointBorderColor: "#FAF0E6",
        pointBorderWidth: 1,
        pointRadius: 3,
        borderDash:[5,7]
      },
      {
        type: "bar",
        label: "Actual Data",
        data: p.monthData.map((m) => m.total),
        backgroundColor: bgcolor,
        //hoverBackgroundColor: "#950101",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  console.log(data.datasets);
  const minBarValue = Math.min(...data.datasets[1].data);

  const optionsBar = {
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
            xPos = element.x;
            yPos = element.y - 10;

            ctx.save();
            ctx.textAlign = "center";
            ctx.fillStyle = "#FAF0E6";
            ctx.font = "12px Arial";

            ctx.fillText(data, xPos, yPos);

            ctx.restore();
          });
        });
      },
    },
  };
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
        beginAtZero: false,
        suggestedMin:
          p.type === "ab" || p.type === "hc" || p.type === "dt"
            ? 0
            : minBarValue !== 0
            ? minBarValue - 10
            : minBarValue,
        //suggestedMax: 100,
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
            const data = p.type === "dt" ? `${dataset.data[index]} %` :dataset.data[index];
            let xPos, yPos;

            if (dataset.type === "bar") {
              xPos = element.x;
              yPos =
                Math.abs(data - minBarValue) <= 15
                  ? element.y + 10
                  : element.y + 90;
            } else if (dataset.type === "line" && p.title !== "daily") {
              xPos = element.x;
              yPos = element.y - 15 ;
            }

             ctx.save();
            ctx.textAlign = "center";
            ctx.fillStyle = dataset.type === "bar" ? "#FFFAD7" : "#EEEEEE";
            ctx.font = "12px Arial";

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
      <h5>{p.title}</h5>
      <div className={c.chatHolder}>
        {p.type === "ot" || p.type === "tlo" ? (
          <Bar data={dataBar} options={optionsBar} />
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default MonthChart;
