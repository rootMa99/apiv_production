//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDataDays,
  getDataYear,
  getMonthData,
  getWeekData,
} from "../../hooks/EfficiencyProjectFilter";
import MonthChart from "../MonthChart";
import c from "./ShiftLeaderEfficiency.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { additionalDataAction } from "../../../store/AdditionalData";
//import { additionalDataAction } from "../../../store/AdditionalData";

const ShiftLeaderEfficiency = (p) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chartDay, chartWeek, chartmonth } = useSelector((s) => s.additionalData);
  const [toggle, isToggle] = useState(chartWeek);
  const [toggleD, isToggleD] = useState(chartDay);
  const [toggleM, isToggleM] = useState(chartmonth);
  console.log(chartDay, chartWeek, chartmonth, toggle, toggleD, toggleM);
  const monthly = getDataYear(p.data);
  const month = p.date.date.split("-")[1];
  const weekly = getWeekData(
    getMonthData(p.data, p.date.month[month - 1], p.date.month[month - 2])
  );
  const filtredM = getMonthData(p.data, p.date.month[month - 1]);

  const daily = getDataDays(filtredM);


  useEffect(()=>{
    isToggle(chartWeek);
    isToggleD(chartDay);
    isToggleM(chartmonth);
  }, [chartDay, chartWeek, chartmonth])

  const onClickHandler = (e) => {
    if (p.crew === "crew") {
      navigate(
        `/home/project/${p.project}/shiftLeader/${p.shiftLeader}/teamleader/${p.teamLeader}/crew/${p.title}`
      );
      return;
    }
    p.shiftLeader !== undefined
      ? navigate(
          `/home/project/${p.project}/shiftLeader/${p.shiftLeader}/teamleader/${p.title}`
        )
      : navigate(`/home/project/${p.project}/shiftLeader/${p.title}`);
  };
  //   dispatch(
  //     additionalDataAction.addShitLeaderEfficiency({
  //       name: p.project,
  //       shiftLeader: { name: p.title, data: [monthly, weekly, daily] },
  //     })
  //   );

  let classes;
  let classesW;
  let classesD;
  if (!toggleD && !toggle) {
    classes = { width: "100%" };
  } else if (!toggleD && toggle) {
    classes = { width: "49%" };
  } else if (toggleD && toggle) {
    classes = { width: "33%" };
  }
  if (!toggleD) {
    classesW = !toggleM ? { width: "100%" } : { width: "49%" };
  } else if ((toggleD && toggleM) || (toggleD && !toggleM)) {
    classesW = { width: "33%" };
  }

  if (!toggle) {
    classesD = !toggleM ? { width: "100%" } : { width: "66%" };
  } else if (toggleD && toggleM) {
    classesD = { width: "33%" };
  } else if (toggleD && !toggleM) {
    classesD = { width: "66%" };
  }

  return (
    <div
      className={c.chartsContainer}
      style={p.index > 0 ? { marginTop: "1.5rem" } : {}}
    >
      <h3 className={c.title} onClick={onClickHandler}>
        {p.title} efficiency
      </h3>
      <div className={c.toggleBtnContainer}>
        <button className={c.toggleBtn} onClick={() =>p.top? dispatch(additionalDataAction.editChartMonth(!chartmonth)) :isToggleM(!toggleM)}>
          {toggleM ? "hide month" : "show month"}
        </button>
        <button className={c.toggleBtn} onClick={() =>p.top? dispatch(additionalDataAction.editChartWeek(!chartWeek)) : isToggle(!toggle)}>
          {toggle ? "hide week" : "show week"}
        </button>
        <button className={c.toggleBtn} onClick={() =>p.top? dispatch(additionalDataAction.editChartDay(!chartDay)) : isToggleD(!toggleD)}>
          {toggleD ? "hide day" : "show day"}
        </button>
      </div>
      <div className={c.chartContainer}>
        {toggleM && (
          <div className={c.chart} style={classes}>
            <MonthChart monthData={monthly} title={""} />
          </div>
        )}
        {toggle && (
          <div className={c.chart} style={classesW}>
            <MonthChart monthData={weekly} title={``} />
          </div>
        )}
        {toggleD && (
          <div className={c.chart} style={classesD}>
            <MonthChart monthData={daily} title={``} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftLeaderEfficiency;
