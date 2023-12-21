import React from "react";
import c from "./Efficiency.module.css";
import EfficiencyData from "./EfficiencyData";
import { useSelector } from "react-redux";
import {
  filterProjectsByName,
  getEfficiencyDatas,
  getEfficiencyDay,
  getEfficiencyMonth,
  getEfficiencyYear,
  getHC,
} from "../hooks/getEfficiencyData";

const Efficiency = (p) => {
  let data = useSelector((s) => s.datas);
  const { checkBox } = useSelector((s) => s.additionalData);

  const fa = data.filter(
    (f) => f.name !== "CUTTING AREA" && f.name !== "LEAD PREP AREA"
  );
  const cutting = data.filter((f) => f.name === "CUTTING AREA");
  const lp = data.filter((f) => f.name === "LEAD PREP AREA");
  console.log(cutting, lp);

  const getEffic = (data, type) => {
    const filtredData = getEfficiencyDay(data, type);
    console.log(filtredData);
    return getEfficiencyDatas(filtredData);
  };
  const plant = (tem, type) => {
    let filtredDatacutting;
    let filtredDatalp;
    if (tem !== "year") {
      console.log("run0 start");
      const {
        prodH: prodHDfa,
        paidH: paidHDfa,
        prodT: prodTDfa,
        paidT: paidTDfa,
      } = tem==="day" ? getEffic(fa, p.day) : getEffic(fa, p.month);
      console.log("run0");
      if (tem === "day") {
        filtredDatacutting = getEfficiencyDay(cutting, p.day);
        filtredDatalp = getEfficiencyDay(lp, p.day);
        console.log(filtredDatacutting, filtredDatalp);
      }
      if (tem === "month") {
        filtredDatacutting = getEfficiencyMonth(cutting, p.month);
        filtredDatalp = getEfficiencyMonth(lp, p.month);
        console.log("MONTH", filtredDatacutting, filtredDatalp);
      }
      if (type === "act") {
        console.log("run1 start" , type, tem)

        const { prodH: prodHD, paidH: paidHD } =
        getEfficiencyDatas(filtredDatacutting);
        console.log("run1")
        console.log("run2 start")
        
          const { prodH: prodHDlp, paidH: paidHDlp } =
          getEfficiencyDatas(filtredDatalp);
          console.log("run2")

        return (
          ((prodHD * 1.443 + prodHDlp * 1.138 + prodHDfa * 1.078) /
            (paidHD + paidHDlp + paidHDfa)) *
          100
        );
      }
      if (type === "tar") {
      console.log("run3 start")

        const { prodT: prodTD, paidT: paidTD } =
          getEfficiencyDatas(filtredDatacutting);
      console.log("run3")
      console.log("run4 start")

        const { prodT: prodTDlp, paidT: paidTDlp } =
          getEfficiencyDatas(filtredDatalp);
      console.log("run4")

        return (
          ((prodTD * 1.443 + prodTDlp * 1.138 + prodTDfa * 1.078) /
            (paidTD + paidTDlp + paidTDfa)) *
          100
        );
      }
    }
    if (tem === "year") {
      const {
        prodHY: prodHYC,
        paidHY: paidHYC,
        prodTY: prodTYC,
        paidTY: paidTYC,
      } = getEfficiencyYear(cutting);
      const {
        prodHY: prodHYlp,
        paidHY: paidHYlp,
        prodTY: prodTYlp,
        paidTY: paidTYlp,
      } = getEfficiencyYear(lp);
      const {
        prodHY: prodHYfa,
        paidHY: paidHYfa,
        prodTY: prodTYfa,
        paidTY: paidTYfa,
      } = getEfficiencyYear(fa);
      console.log("year", prodHYfa, paidHYfa, prodTYfa, paidTYfa)
      if (type === "act") {
        return (
          ((prodHYC * 1.443 + prodHYlp * 1.138 + prodHYfa * 1.078) /
            (paidHYC + paidTYlp + paidHYfa)) *
          100
        );
      }
      if (type === "tar") {
        return (
          ((prodTYC * 1.443 + prodTYlp * 1.138 + prodTYfa * 1.078) /
            (paidTYC + paidHYlp + paidTYfa)) *
          100
        );
      }
    }
  };

  const esa = (totalP, tem, type) => {
    return checkBox
      ? p.title === "plant"
        ? plant(tem, type)
        : totalP * 1.078
      : totalP;
  };

  data =
    p.singleProject.trim() !== ""
      ? filterProjectsByName(data, p.singleProject)
      : p.title === "plant"
      ? data
      : fa;
  console.log(data, p.singleProject);
  //Efficiency Day
  const filtredData = getEfficiencyDay(data, p.day);
  console.log(filtredData);
  const {
    prodH: prodHD,
    paidH: paidHD,
    prodT: prodTD,
    paidT: paidTD,
  } = getEffic(data, p.day);
  console.log(prodHD, paidHD, prodTD, paidTD, p.title);
  const totalP = esa(
    paidHD === 0 ? 0 : (prodHD / paidHD) * 100,
    "day",
    "act"
  );
  const totalT = esa(
    paidTD === 0 ? 0 : (prodTD / paidTD) * 100,
    "day",
    "tar"
  );
  const gap = (totalP - totalT).toFixed(2);
  console.log(totalP, totalT, gap);
  //hc Day using filtred Day
  console.log(filtredData);
  const { hc, hcTarget } = getHC(filtredData);
  const gapHc = (hc - hcTarget).toFixed(0);

  //Efficiency Month
  const filtredDataMonth = getEfficiencyMonth(data, p.month);
  const {
    prodH: prodHM,
    paidH: paidHM,
    prodT: prodTM,
    paidT: paidTM,
  } = getEfficiencyDatas(filtredDataMonth);

  const totalPM = esa(
    paidHM === 0 ? 0 : (prodHM / paidHM) * 100,
    "month",
    "act"
  );
  const totalTM = esa(
    paidTM === 0 ? 0 : (prodTM / paidTM) * 100,
    "month",
    "tar"
  );
  const gapM = (totalPM - totalTM).toFixed(2);
  //Efficiency Year
  const { prodHY, paidHY, prodTY, paidTY } = getEfficiencyYear(data);
  let totalPY = esa(
    paidHY === 0 ? 0 : (prodHY / paidHY) * 100,
    "year",
    "act"
  );
  const totalTY = esa(
    paidTY === 0 ? 0 : (prodTY / paidTY) * 100,
    "year",
    "tar"
  );
  const gapY = (totalPY - totalTY).toFixed(2);

  // console.log(hc, hcTarget);
  // console.log(filtredData);
  // console.log(filtredDataMonth);
  // console.log(prodHD, paidHD, prodTD, paidTD);
  // console.log(prodHM, paidHM, prodTM, paidTM);
  // console.log(totalP, totalT, gap);
  // console.log(totalPM, totalTM, gapM);
  // console.log(prodHY, paidHY, prodTY, paidTY);
  return (
    <React.Fragment>
      <div
        className={c.efficiency}
        style={checkBox ? { backgroundColor: "rgb(184 0 0)" } : {}}
      >
        <div className={c.efficiencyContent}>
          <EfficiencyData
            day={p.day}
            title="last day"
            title2={p.title}
            totalP={totalP}
            totalT={totalT}
            gap={gap}
          />
          <EfficiencyData
            day={p.day}
            title="month"
            month={p.month}
            totalP={totalPM}
            totalT={totalTM}
            gap={gapM}
          />
          <EfficiencyData
            title="year"
            totalP={totalPY}
            totalT={totalTY}
            gap={gapY}
          />
          <EfficiencyData
            title="hc/day"
            hc={hc.toFixed(0)}
            totalT={hcTarget}
            gap={gapHc}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Efficiency;
