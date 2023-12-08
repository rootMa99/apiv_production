import c from "./ProjectCard.module.css";
import aptivbg from "../../assets/k9.jpg";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  getEfficiencyDataByDay,
  getEfficiencyDataByMonth,
  getEfficiencyDataByYear,
} from "../hooks/getEfficiencyData";

const ProjectCard = (p) => {
  const [mouseIn, setMouseIn] = useState(false);
  const [data, setData] = useState({});
  const [dataM, setDataM] = useState({});
  const [dataY, setDataY] = useState({});
  const navigate= useNavigate();


  const clickHandler=e=>{
    console.log('card clicked', p.title);
    navigate(`/home/project/${p.title}`);
  }

  const mouseEnter = (e) => {
    setMouseIn(true);
  };

  const mouseLeave = (e) => {
    setMouseIn(false);
  };
 
  useEffect(() => {
    setData(getEfficiencyDataByDay(p.data, p.day));
    setDataM(getEfficiencyDataByMonth(p.data, p.month));
    setDataY(getEfficiencyDataByYear(p.data));
  }, [p.data, p]);

  const totalEfficencyYear = (dataY.prodH / dataY.paidH) * 100;
  const totalEfficencyYearTarget = (dataY.prodHT / dataY.paidHT) * 100;
  const gapY = totalEfficencyYear - totalEfficencyYearTarget;
  const totalEfficencyDay = (data.prodH / data.paidH) * 100;
  const totalEfficencyDayTarget = (data.prodHT / data.paidHT) * 100;
  const gap = totalEfficencyDay - totalEfficencyDayTarget;
  const totalEfficencyMonth = (dataM.prodH / dataM.paidH) * 100;
  const totalEfficencyMonthTarget = (dataM.prodHT / dataM.paidHT) * 100;
  const gapM = totalEfficencyMonth - totalEfficencyMonthTarget;
  const totalDt = (data.dt / data.paidH) * 100;
  const classes = mouseIn
    ? `${c.cardContainer} ${c.dt}`
    : `${c.cardContainermini}`;

  const css = {
    cssC: "",
    cssCY: "",
    cssCM: "",
  };
  if (gap >= 0) {
    css.cssC = `${c.green}`;
  } else if (gap < 0 && gap >= -1) {
    css.cssC = `${c.orange}`;
  } else {
    css.cssC = `${c.red}`;
  }
  if (gapY >= 0) {
    css.cssCY = `${c.green}`;
  } else if (gapY < 0 && gapY >= -1) {
    css.cssCY = `${c.orange}`;
  } else {
    css.cssCY = `${c.red}`;
  }
  if (gapM >= 0) {
    css.cssCM = `${c.green}`;
  } else if (gapM < 0 && gapM >= -1) {
    css.cssCM = `${c.orange}`;
  } else {
    css.cssCM = `${c.red}`;
  }
  const tclasses = gapY >= 0 ? `${c.triangleUP}` : `${c.triangleDown}`;
  const tclassesM = gapM >= 0 ? `${c.triangleUP}` : `${c.triangleDown}`;
  const tclassesD = gap >= 0 ? `${c.triangleUP}` : `${c.triangleDown}`;
const selecyedDay= p.day.split("-");

  return (
    <div
      className={c.cardContainers}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={clickHandler}
    >
      <img src={aptivbg} alt="some backGround" />
      {!mouseIn&&<h2 className={c.toptitle}>{p.title} </h2>}

      <div className={classes}>
        {mouseIn&&<h2>{p.title} </h2>}
        <div className={c.efficiency}>
          <div className={c.efficiencyData}>
            <h5>date: {selecyedDay[2]}-{selecyedDay[1]}</h5>
            <span className={css.cssC}>{totalEfficencyDay.toFixed(2)}%</span>
            {mouseIn && <span>{totalEfficencyDayTarget.toFixed(2)}%</span>}
            <span className={`${css.cssC} ${c.gaps}`}><div className={tclassesD}></div>{gap.toFixed(2)}%</span>
          </div>
          <div className={c.efficiencyData}>
            <h5>{p.month}</h5>
            <span className={css.cssCM}>
              {totalEfficencyMonth.toFixed(2)}%
            </span>
            {mouseIn && <span>{totalEfficencyMonthTarget.toFixed(2)}% </span>}
            <span className={`${css.cssCM} ${c.gaps}`}><div className={tclassesM}></div> {gapM.toFixed(2)}% </span>
          </div>
          <div className={c.efficiencyData}>
            <h5>year</h5>
            <span className={css.cssCY}>{totalEfficencyYear.toFixed(2)}%</span>
            {mouseIn && <span>{totalEfficencyYearTarget.toFixed(2)}%</span>}
            <span className={`${css.cssCY} ${c.gaps}`}><div className={tclasses}></div>{gapY.toFixed(2)}%</span>
          </div>
        </div>
        {mouseIn ? (
          <div className={c.dataContainer}>
            <div className={`${c.contentData} ${c.hcday}`}>
              <h5>hc/day</h5>
              <span>{(data.hc).toFixed(0)} </span>
            </div>
            <div className={`${c.contentData} ${c.abday}`}>
              <h5>ab/day</h5>
              <span>{(data.ab).toFixed(0)} </span>
            </div>
            <div className={`${c.contentData} ${c.tloday}`}>
              <h5>tlo/day</h5>
              <span>{data.tlo} </span>
            </div>
            <div className={`${c.contentData} ${c.dt}`}>
              <h5>dt/day</h5>
              <span>{totalDt.toFixed(2)} %</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
