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
  const totalEfficencyDay = (data.prodH / data.paidH) * 100;
  const totalEfficencyMonth = (dataM.prodH / dataM.paidH) * 100;
  const classes = mouseIn
    ? `${c.cardContainer} ${c.dt}`
    : `${c.cardContainermini}`;
  return (
    <div
      className={c.cardContainers}
      onMouseEnter={clickHandler}
      onMouseLeave={mouseLeave}
    >
      <img src={aptivbg} alt="some backGround" />
      <div className={classes}>
        <h2>{p.title} </h2>
        <div className={c.efficiency}>
          <div className={c.efficiencyData}>
            <h5>last day</h5>
            <span>{totalEfficencyDay.toFixed(2)}%</span>
          </div>
          <div className={c.efficiencyData}>
            <h5>month</h5>
            <span>{totalEfficencyMonth.toFixed(2)}% </span>
          </div>
          <div className={c.efficiencyData}>
            <h5>year</h5>
            <span>{totalEfficencyYear.toFixed(2)}%</span>
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
              <span>{data.dt.toFixed(2)} %</span>
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
