import React from "react";
import c from "./Efficiency.module.css";
import EfficiencyData from "./EfficiencyData";
import { useSelector } from "react-redux";
import {
  getEfficiencyDatas,
  getEfficiencyDay,
  getEfficiencyMonth,
  getEfficiencyYear,
  getHC,
} from "../hooks/getEfficiencyData";

const Efficiency = (p) => {
  const data = useSelector((s) => s.datas);
  //Efficiency Day
  const filtredData = getEfficiencyDay(data, "2023-11-27");
  const {
    prodH: prodHD,
    paidH: paidHD,
    prodT: prodTD,
    paidT: paidTD,
  } = getEfficiencyDatas(filtredData);
  const totalP = ((prodHD / paidHD) * 100).toFixed(2);
  const totalT = ((prodTD / paidTD) * 100).toFixed(2);
  const gap = (totalT - totalP).toFixed(2);
  //hc Day using filtred Day
  const { hc, hcTarget } = getHC(filtredData);
  const gapHc = (hcTarget - hc).toFixed(2);
  //Efficiency Month
  const filtredDataMonth = getEfficiencyMonth(data, "Nov");
  const {
    prodH: prodHM,
    paidH: paidHM,
    prodT: prodTM,
    paidT: paidTM,
  } = getEfficiencyDatas(filtredDataMonth);
  const totalPM = ((prodHM / paidHM) * 100).toFixed(2);
  const totalTM = ((prodTM / paidTM) * 100).toFixed(2);
  const gapM = (totalTM - totalPM).toFixed(2);
  //Efficiency Year
  const { prodHY, paidHY, prodTY, paidTY } = getEfficiencyYear(data);
  const totalPY = ((prodHY / paidHY) * 100).toFixed(2);
  const totalTY = ((prodTY / paidTY) * 100).toFixed(2);
  const gapY = (totalTY - totalPY).toFixed(2);

  console.log(hc, hcTarget);
  console.log(filtredData);
  console.log(filtredDataMonth);
  console.log(prodHD, paidHD, prodTD, paidTD);
  console.log(prodHM, paidHM, prodTM, paidTM);
  console.log(totalP, totalT, gap);
  console.log(totalPM, totalTM, gapM);
  console.log(prodHY, paidHY, prodTY, paidTY);
  return (
    <React.Fragment>
      <h3 className={c.title}>efficiency</h3>
      <div className={c.efficiency}>
        <div className={c.efficiencyContent}>
          <EfficiencyData
            title="last day"
            totalP={totalP}
            totalT={totalT}
            gap={gap}
          />
          <EfficiencyData
            title="month"
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
            hc={hc}
            totalT={hcTarget}
            gap={gapHc}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Efficiency;
