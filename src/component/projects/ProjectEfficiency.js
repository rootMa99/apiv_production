import { useParams } from "react-router-dom";
import MonthChart from "./MonthChart";
import c from "./ProjectEfficiency.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterProjectsByName } from "../hooks/getEfficiencyData";
import {
  getDataDays,
  getDataYear,
  getMonthData,
  getWeekData,
} from "../hooks/EfficiencyProjectFilter";
import { additionalDataAction } from "../../store/AdditionalData";
import { useEffect, useState } from "react";

const ProjectEfficiency = (p) => {
  const data = useSelector((s) => s.datas);
  const { date, month } = useSelector((s) => s.additionalData);
  const dispatch = useDispatch();
  const [toggle, isToggle] = useState(false);

  const months = date.split("-")[1];
  console.log(data);
  const params = useParams();
  console.log(params);
  const filtredData = filterProjectsByName(data, params.project);
  console.log(filtredData);
  const monthData = getDataYear(filtredData[0].data);

  useEffect(() => {
    const dataDaysYear = getDataDays(filtredData[0].data, "allDate");
    console.log(dataDaysYear);
    const datan = dataDaysYear.map((m) => ({
      name: m.name,
      total: +m.total,
    }));
    const maxObject = monthData.reduce((max, current) => {
      if (
        current.value > max.value ||
        (current.value === max.value && current.total > max.total)
      ) {
        return current;
      }
      return max;
    });
    const maxObjectDay = datan.reduce((max, current) => {
      if (
        current.value > max.value ||
        (current.value === max.value && current.total > max.total)
      ) {
        return current;
      }
      return max;
    });
    dispatch(additionalDataAction.addMaxMonthValue(maxObject));
    dispatch(additionalDataAction.addMaxDayValue(maxObjectDay));
    console.log(maxObject, "max data");
  }, [monthData, filtredData, dispatch]);

  console.log(monthData);
  const filtredMonth = getMonthData(
    filtredData[0].data,
    month[months - 1],
    month[months - 2]
  );
  console.log(filtredMonth);
  const filtredWeek = getWeekData(filtredMonth);
  console.log(filtredWeek);
  const filtredMonthDays = getMonthData(filtredData[0].data, month[months - 1]);
  console.log(filtredMonthDays);
  const dataDays = getDataDays(filtredMonthDays);
  console.log(dataDays);

  return (
    <div className={c.projectEfficiencyContainer}>
      <h3>{p.title} efficiency</h3>
      <button className={c.toggleBtn} onClick={() => isToggle(!toggle)}>
        {toggle ? "hide week" : "show week"}
      </button>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart monthData={monthData} title="" />
        </div>
        {toggle && (
          <div className={c.chart}>
            <MonthChart monthData={filtredWeek} title="" />
          </div>
        )}
        <div className={toggle ? c.chart : c.chartd}>
          <MonthChart monthData={dataDays} title="" />
        </div>
      </div>
    </div>
  );
};

export default ProjectEfficiency;
