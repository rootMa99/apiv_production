import { useSelector } from "react-redux";
import { destractData, getEffByTlAndCrew } from "../hooks/newDataManpulate";
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

const Comparison = (p) => {
  let data = useSelector((s) => s.datas);
  const { date, month } = useSelector((s) => s.additionalData);
  const fd = destractData(data).filter((f) => f.date === date);
  const tlByCrew = getEffByTlAndCrew(fd);
  console.log(fd, tlByCrew);

  const bgcolor = [];

  tlByCrew.map((m) =>
    m.effTar > m.eff ? bgcolor.push("#CF3335") : bgcolor.push("#00AC9E")
  );

  const datac = {
    // labels: [
    //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    //   22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    // ],
    labels: tlByCrew.map((m) => m.name),
    datasets: [
      {
        type: "line",
        label: "Target",
        data: tlByCrew.map((m) => m.effTar),
        backgroundColor: "#F84018",
        pointHoverBorderColor: "#FAF0E6",
        borderColor: "#3BC6EB",
        fill: false,
        tension: 0.3,
        borderWidth: 3,
        borderCapStyle: "round",
        pointHoverBackgroundColor: "rgb(88, 3, 3)",
        pointHoverRadius: 8,
        pointBorderColor: "#3BC6EB",
        pointBorderWidth: 8,
        pointRadius: 1,
        borderDash: [5, 7],
      },
      {
        type: "bar",
        label: "Actual",
        data: tlByCrew.map((m) => m.eff),
        backgroundColor: bgcolor,
        borderColor: "#F84018",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
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
          display: p.home === undefined ? false : true,
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
        display: false,
      },
      datalabels: {
        display: true,
      },
    },
    // animation: p.home === undefined && {
    //   onComplete: (animation) => {
    //     const { chart } = animation;
    //     const ctx = chart.ctx;
    //     chart.data.datasets.forEach((dataset, index) => {
    //       const meta = chart.getDatasetMeta(index);
    //       meta.data.forEach((element, index) => {
    //         // const data = `${dataset.data[index]}%`;
    //         const data = `${dataset.data[index]}`;
    //         let xPos, yPos;
    //         if (dataset.type === "bar") {
    //           xPos = element.x;
    //           yPos = element.y + element.height / 2;
    //         } else if (dataset.type === "line") {
    //           xPos = element.x;
    //           yPos = element.y - 20;
    //         }
    //         ctx.save();
    //         ctx.textAlign = "center";
    //         ctx.fillStyle = dataset.type === "bar" ? "#FFFAD7" : "#EEEEEE";
    //         ctx.font = "17px Arial";
    //         ctx.fillText(data, xPos, yPos);
    //         ctx.restore();
    //       });
    //     });
    //   },
    // },
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
    <div style={{width:"100%", height:"44rem"}}>
      <Line data={datac} options={options} />
    </div>
  );
};

export default Comparison;
