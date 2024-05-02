import React from "react";
import c from "./Efficiency.module.css";
import EfficiencyData from "./EfficiencyData";
import { useSelector } from "react-redux";
import {
  effMonth,
  filterProjectsByName,
  getEfficiencyDatas,
  getEfficiencyDay,
  //getEfficiencyMonth,
  getEfficiencyYear,
  getEfficiencyYearUntil,
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


  const getEffic = (data, type, month) => {
    const filtredData =
      month === "month" ? effMonth(data, type) : getEfficiencyDay(data, type);
    return getEfficiencyDatas(filtredData);
  };
  const plant = (tem, type) => {
    let filtredDatacutting;
    let filtredDatalp;
    if (tem !== "year") {
      const {
        prodH: prodHDfa,
        paidH: paidHDfa,
        prodT: prodTDfa,
        paidT: paidTDfa,
      } = tem === "day" ? getEffic(fa, p.day) : getEffic(fa, p.day, "month");
      if (tem === "day") {
        filtredDatacutting = getEfficiencyDay(cutting, p.day);
        filtredDatalp = getEfficiencyDay(lp, p.day);

      }
      if (tem === "month") {
        filtredDatacutting = effMonth(cutting, p.day);
        filtredDatalp = effMonth(lp, p.day);
      }
      if (type === "act") {
        const { prodH: prodHD, paidH: paidHD } =
          getEfficiencyDatas(filtredDatacutting);
        const { prodH: prodHDlp, paidH: paidHDlp } =
          getEfficiencyDatas(filtredDatalp);
        return paidHD + paidHDlp + paidHDfa !== 0
          ? ((prodHD * 1.443 + prodHDlp * 1.138 + prodHDfa * 1.078) /
              (paidHD + paidHDlp + paidHDfa)) *
              100
          : 0;
      }
      if (type === "tar") {
        const { prodT: prodTD, paidT: paidTD } =
          getEfficiencyDatas(filtredDatacutting);

        const { prodT: prodTDlp, paidT: paidTDlp } =
          getEfficiencyDatas(filtredDatalp);
        return paidTD + paidTDlp + paidTDfa !== 0
          ? ((prodTD * 1.443 + prodTDlp * 1.138 + prodTDfa * 1.078) /
              (paidTD + paidTDlp + paidTDfa)) *
              100
          : 0;
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
      if (type === "act") {
        return paidHYC + paidTYlp + paidHYfa !== 0
          ? ((prodHYC * 1.443 + prodHYlp * 1.138 + prodHYfa * 1.078) /
              (paidHYC + paidTYlp + paidHYfa)) *
              100
          : 0;
      }
      if (type === "tar") {
        return paidTYC + paidHYlp + paidTYfa !== 0
          ? ((prodTYC * 1.443 + prodTYlp * 1.138 + prodTYfa * 1.078) /
              (paidTYC + paidHYlp + paidTYfa)) *
              100
          : 0;
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
  //Efficiency Day
  const filtredData = getEfficiencyDay(data, p.day);
  const {
    prodH: prodHD,
    paidH: paidHD,
    prodT: prodTD,
    paidT: paidTD,
  } = getEffic(data, p.day);
  const totalP = esa(
    paidHD === 0 ? 0 : (prodHD / paidHD) * 100,
    "day",
    "act"
  ).toFixed(2);
  const totalT = esa(
    paidTD === 0 ? 0 : (prodTD / paidTD) * 100,
    "day",
    "tar"
  ).toFixed(2);
  const gap = (totalP - totalT).toFixed(2);

  //hc Day using filtred Day
  const { hc, hcTarget } = getHC(filtredData);
  const gapHc = (hc - hcTarget).toFixed(0);

  //Efficiency Month
  const filtredDataMonth = effMonth(data, p.day);
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
  ).toFixed(2);
  const totalTM = esa(
    paidTM === 0 ? 0 : (prodTM / paidTM) * 100,
    "month",
    "tar"
  ).toFixed(2);
  const gapM = (totalPM - totalTM).toFixed(2);
  //Efficiency Year
  const dataYR = effMonth(data, p.day, "year");
  const { prodHY, paidHY, prodTY, paidTY } = getEfficiencyYearUntil(dataYR);
  let totalPY = esa(
    paidHY === 0 ? 0 : (prodHY / paidHY) * 100,
    "year",
    "act"
  ).toFixed(2);
  const totalTY = esa(
    paidTY === 0 ? 0 : (prodTY / paidTY) * 100,
    "year",
    "tar"
  ).toFixed(2);
  const gapY = (totalPY - totalTY).toFixed(2);
  return (
    <React.Fragment>
      <div className={c.efficiency}>
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
