import c from "./ProjectCard.module.css";
import aptivbg from "../../assets/k9.jpg";
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
  const clickHandler = (e) => {
    setMouseIn(true);
  };

  const mouseLeave = (e) => {
    setMouseIn(false);
  };
  console.log(p.data);

  useEffect(() => {
    setData(getEfficiencyDataByDay(p.data, "2023-11-27"));
    setDataM(getEfficiencyDataByMonth(p.data, "Nov"));
    setDataY(getEfficiencyDataByYear(p.data));
  }, [p.data]);

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
  return (
    <div
      className={c.cardContainers}
      onMouseEnter={clickHandler}
      onMouseLeave={mouseLeave}
    >
      <img src={aptivbg} alt="some backGround" />
      {!mouseIn&&<h2 className={c.toptitle}>{p.title} </h2>}

      <div className={classes}>
        {mouseIn&&<h2>{p.title} </h2>}
        <div className={c.efficiency}>
          <div className={c.efficiencyData}>
            <h5>last day</h5>
            <span className={css.cssC}>{totalEfficencyDay.toFixed(2)}%</span>
            {mouseIn && <span>{totalEfficencyDayTarget.toFixed(2)}%</span>}
            <span className={css.cssC}>{gap.toFixed(2)}%</span>
          </div>
          <div className={c.efficiencyData}>
            <h5>month</h5>
            <span className={css.cssCM}>
              {totalEfficencyMonth.toFixed(2)}%{" "}
            </span>
            {mouseIn && <span>{totalEfficencyMonthTarget.toFixed(2)}% </span>}
            <span className={css.cssCM}>{gapM.toFixed(2)}% </span>
          </div>
          <div className={c.efficiencyData}>
            <h5>year</h5>
            <span className={css.cssCY}>{totalEfficencyYear.toFixed(2)}%</span>
            {mouseIn && <span>{totalEfficencyYearTarget.toFixed(2)}%</span>}
            <span className={css.cssCY}>{gapY.toFixed(2)}%</span>
          </div>
        </div>
        {mouseIn ? (
          <div className={c.dataContainer}>
            <div className={`${c.contentData} ${c.hcday}`}>
              <h5>hc/day</h5>
              <span>{data.hc} </span>
            </div>
            <div className={`${c.contentData} ${c.abday}`}>
              <h5>ab/day</h5>
              <span>{data.ab} </span>
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
