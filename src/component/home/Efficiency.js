import React, { useState } from "react";
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
  const [day, setDay] = useState("2023-11-27");
  const [month, setMonth] = useState("Nov");
  let data = useSelector((s) => s.datas);
  
  const changeMonth=m=>{
    setMonth(m);
  }
  const changeDay=d=>{
    setDay(d);
  }

  data =
    p.singleProject.trim() !== ""
      ? filterProjectsByName(data, p.singleProject)
      : data;
  console.log(data);
  //Efficiency Day
  const filtredData = getEfficiencyDay(data, day);
  console.log(filtredData);
  const {
    prodH: prodHD,
    paidH: paidHD,
    prodT: prodTD,
    paidT: paidTD,
  } = getEfficiencyDatas(filtredData);
  console.log(prodHD, paidHD, prodTD, paidTD);
  const totalP = paidHD === 0 ? 0 : ((prodHD / paidHD) * 100).toFixed(2);
  const totalT = paidTD === 0 ? 0 : ((prodTD / paidTD) * 100).toFixed(2);
  const gap = (totalP - totalT).toFixed(2);
  console.log(totalP, totalT, gap);
  //hc Day using filtred Day
  console.log(filtredData);
  const { hc, hcTarget } = getHC(filtredData);
  const gapHc = hc - hcTarget;

  //Efficiency Month
  const filtredDataMonth = getEfficiencyMonth(data, month);
  const {
    prodH: prodHM,
    paidH: paidHM,
    prodT: prodTM,
    paidT: paidTM,
  } = getEfficiencyDatas(filtredDataMonth);
  const totalPM =paidHM===0 ? 0 : ((prodHM / paidHM) * 100).toFixed(2);
  const totalTM = paidTM===0 ? 0 : ((prodTM / paidTM) * 100).toFixed(2);
  const gapM = (totalPM - totalTM).toFixed(2);
  //Efficiency Year
  const { prodHY, paidHY, prodTY, paidTY } = getEfficiencyYear(data);
  const totalPY = ((prodHY / paidHY) * 100).toFixed(2);
  const totalTY = ((prodTY / paidTY) * 100).toFixed(2);
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
      <h3 className={c.title}>efficiency</h3>
      <div className={c.efficiency}>
        <div className={c.efficiencyContent}>
          <EfficiencyData
            changeDay={changeDay}
            day={day}
            title="last day"
            totalP={totalP}
            totalT={totalT}
            gap={gap}
          />
          <EfficiencyData
            changeMonth={changeMonth}
            month={month}
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
