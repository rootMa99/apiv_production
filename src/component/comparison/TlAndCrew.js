import { getCrews, getEffByTlAndCrew } from "../hooks/newDataManpulate";
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
import React, { useState } from "react";
import OldView from "./OldView";
import Select from "react-select";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "auto",
    height: "3rem",
    fontWeight: "600",
    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol"`,
    letterSpacing: "2px",
    textAlign: "center",
    outline: "none",
    border: "2px solid #ecf0f162",
    backgroundColor: "rgba(24, 13, 13, 0.37)",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid rgb(255, 255, 255)",
      backgroundColor: "rgba(100, 98, 98, 0.37)",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "100%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#474b4d",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "350px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "9px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#8a0101",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};

const TlAndCrew = (p) => {
  const [control, setControl] = useState("tlc");
  const [compareb, setCompareb] = useState([]);
  const tlByCrew = getEffByTlAndCrew(p.fd);
  const cs = getCrews(p.fd);

  const handleSelectChange = (e) => {
    setCompareb(e);
  };

  // const filteredArray = array1.filter(element => filterArray.includes(element));
  console.log(cs, p.fd, tlByCrew, compareb);

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
  const dataGap = {
    labels: eff.map((m) => m.gap.toFixed(1)),
    datasets: [
      {
        type: "bar",
        label: "Actual",
        data: eff.map((m) => m.gap),
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
    <React.Fragment>
      <div className={c.selectm}>
        <Select
          options={cs.map(m=>({label:m, value:m}))}
          isMulti
          id="multiSelect"
          onChange={handleSelectChange}
          styles={customStyles}
        />
      </div>
      <ul className={c.underList}>
        <li
          style={
            control === "tlc"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
          onClick={(e) => setControl("tlc")}
        >
          charts
        </li>

        <li
          style={
            control === "tl"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
          onClick={(e) => setControl("tl")}
        >
          old view
        </li>
      </ul>
      {control === "tlc" && (
        <div className={c.wrapper}>
          <div className={c.chart}>
            <h3>Efficiency</h3>
            <Line data={datac} options={options} />
          </div>
          <div className={c.chart} style={{ height: "10rem" }}>
            <Bar data={dataGap} options={options} />
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
      )}
      {control === "tl" && (
        <React.Fragment>
          <div className={c.wrapper} style={{ flexDirection: "row" }}>
            <div className={c.chartO}>
              <h3>Efficiency</h3>
              {eff.map((m) => (
                <OldView data={m} type="gap" tar="effTar" act="eff" />
              ))}
            </div>
            <div className={c.chartO}>
              <h3>head count</h3>
              {hdc.map((m) => (
                <OldView data={m} type="hcGap" tar="hcTarget" act="hc" />
              ))}
            </div>
            <div className={c.chartO}>
              <h3>output</h3>
              {outp.map((m) => (
                <OldView data={m} type="outputGap" tar="outputT" act="output" />
              ))}
            </div>
          </div>
          <div className={c.wrapper} style={{ flexDirection: "row" }}>
            <div className={c.chartO}>
              <h3>abs</h3>
              {abs.map((m) => (
                <OldView data={m} type="absGap" tar="abst" act="abs" />
              ))}
            </div>
            <div className={c.chartO}>
              <h3>wsd</h3>
              {wsd.map((m) => (
                <OldView data={m} type="0" tar={0} act="wsd" />
              ))}
            </div>
            <div className={c.chartO}>
              <h3>tlo</h3>
              {tlo.map((m) => (
                <OldView data={m} type="0" tar={0} act="tlo" />
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default TlAndCrew;
