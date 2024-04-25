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
import c from "./TlAndCrew.module.css";
import { getdataCTl } from "../hooks/newDataManpulate";
const Teamleader=p=>{
    const tlByCrew = getdataCTl(p.fd);
    console.log(p.fd, tlByCrew);
  
    const eff = tlByCrew.sort((a, b) => {
      return b.gap - a.gap;
    });
  
    const hdc = [...tlByCrew].sort((a, b) => {
      return b.hcGap - a.hcGap;
    });
  
    const outp = [...tlByCrew].sort((a, b) => {
      return b.outputGap - a.outputGap;
    });
  
    const abs = [...tlByCrew].sort((a, b) => {
      return b.absGap - a.absGap;
    });
    const wsd = [...tlByCrew].sort((a, b) => {
      return b.wsd - a.wsd;
    });
    const tlo = [...tlByCrew].sort((a, b) => {
      return b.tlo - a.tlo;
    });
  
    const bgcolor = [];
    const bgcoloroutput = [];
    const bgcolorHC = [];
    const bgcolorAB = [];
  
    eff.forEach((m) => {
      m.effTar > m.eff ? bgcolor.push("#CF3335") : bgcolor.push("#00AC9E");
    });
    hdc.forEach((m) => {
      m.hcTarget < m.hc ? bgcolorHC.push("#CF3335") : bgcolorHC.push("#00AC9E");
    });
  
    outp.forEach((m) => {
      m.output < m.outputT
        ? bgcoloroutput.push("#CF3335")
        : bgcoloroutput.push("#00AC9E");
    });
    abs.forEach((m) => {
      m.abs > m.abst ? bgcolorAB.push("#CF3335") : bgcolorAB.push("#00AC9E");
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
    const dataOutput = {
      labels: outp.map((m) => m.name),
      datasets: [
        {
          type: "line",
          label: "Target",
          data: outp.map((m) => m.outputT),
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
          data: outp.map((m) => m.output),
          backgroundColor: bgcoloroutput,
          borderColor: "#F84018",
          borderWidth: 1,
        },
      ],
    };
    const dataAB = {
      labels: abs.map((m) => m.name),
      datasets: [
        {
          type: "line",
          label: "Target",
          data: abs.map((m) => m.abst),
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
          data: abs.map((m) => m.abs),
          backgroundColor: bgcolorAB,
          borderColor: "#F84018",
          borderWidth: 1,
        },
      ],
    };
    const datawsd = {
      labels: wsd.map((m) => m.name),
      datasets: [
        {
          type: "bar",
          label: "Actual",
          data: wsd.map((m) => m.wsd),
          backgroundColor: "#00AC9E",
          borderColor: "#F84018",
          borderWidth: 1,
        },
      ],
    };
    const datatlo = {
      labels: tlo.map((m) => m.name),
      datasets: [
        {
          type: "bar",
          label: "Actual",
          data: tlo.map((m) => m.tlo),
          backgroundColor: "#00AC9E",
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
      <div className={c.wrapper}>
        <div className={c.chart}>
          <h3>Efficiency</h3>
          <Line data={datac} options={options} />
        </div>
        <div className={c.chart}>
          <h3>output</h3>
          <Bar data={dataOutput} options={options} />
        </div>
        <div className={c.chart}>
          <h3>head count</h3>
          <Bar data={datahc} options={options} />
        </div>
        <div className={c.chart}>
          <h3>ab</h3>
          <Bar data={dataAB} options={options} />
        </div>
        <div className={c.chart}>
          <h3>wsd</h3>
          <Bar data={datawsd} options={options} />
        </div>
        <div className={c.chart}>
          <h3>tlo</h3>
          <Bar data={datatlo} options={options} />
        </div>
      </div>
    );
}

export default Teamleader;