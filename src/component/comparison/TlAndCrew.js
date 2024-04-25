import { getEffByTlAndCrew } from "../hooks/newDataManpulate";
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

const TlAndCrew = (p) => {
  const tlByCrew = getEffByTlAndCrew(p.fd);
  console.log(p.fd, tlByCrew);

  const eff=tlByCrew.sort((a, b) => {
    return b.gap - a.gap;
  });
  const hdc=getEffByTlAndCrew(p.fd).sort((a, b) => {
    return b.hcGap - a.hcGap;
  });

  const bgcolor = [];
  const bgcolorHC = [];

  eff.forEach((m) => {
    m.effTar > m.eff ? bgcolor.push("#CF3335") : bgcolor.push("#00AC9E");
  });
  hdc.forEach((m) => {
    m.hcTarget < m.hc ? bgcolorHC.push("#CF3335") : bgcolorHC.push("#00AC9E");
  });

  const datac = {
    labels: eff.map((m) => m.name),
    datasets: [
      {
        type: "line",
        label: "Target",
        data: eff.map((m) => m.effTar),
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
        data: eff.map((m) => m.eff),
        backgroundColor: bgcolor,
        borderColor: "#F84018",
        borderWidth: 1,
      },
    ],
  };
  const datahc = {
    labels: hdc.map((m) => m.name),
    datasets: [
      {
        type: "line",
        label: "Target",
        data: hdc.map((m) => m.hcTarget),
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
        data: hdc.map((m) => m.hc),
        backgroundColor: bgcolorHC,
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
    <div style={{ width: "100%", height: "44rem" }}>
        <h3>Efficiency</h3>
      <Line data={datac} options={options} />
        <h3>head count</h3>
      <Bar data={datahc} options={options} />
    </div>
  );
};
export default TlAndCrew;
