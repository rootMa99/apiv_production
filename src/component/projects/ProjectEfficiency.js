import { useParams } from "react-router-dom";
import MonthChart from "./MonthChart";
import c from "./ProjectEfficiency.module.css";
import { useSelector } from "react-redux";
import { filterProjectsByName } from "../hooks/getEfficiencyData";
import { getDataDays, getDataYear, getMonthData, getWeekData } from "../hooks/EfficiencyProjectFilter";

const ProjectEfficiency = (p) => {
  const data=useSelector(s=>s.datas);
  const date=useSelector(s=>s.additionalData);
  const month=date.date.split("-")[1];
  console.log(data);
  const params=useParams();
  console.log(params);
  const filtredData= filterProjectsByName(data, params.project);
  console.log(filtredData);
  const monthData=getDataYear(filtredData[0].data);
  console.log(monthData);
  const filtredMonth= getMonthData(filtredData[0].data, date.month[month-1],date.month[month-2] );
  console.log(filtredMonth);
  const filtredWeek=getWeekData(filtredMonth);
  console.log(filtredWeek);
  const filtredMonthDays=getMonthData(filtredData[0].data, date.month[month-1]);
  console.log(filtredMonthDays);
  const dataDays= getDataDays(filtredMonthDays);
  console.log(dataDays);

  return (
    <div className={c.projectEfficiencyContainer}>
      <h3>project efficiency</h3>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart monthData={monthData} title="monthly" />
        </div>
        <div className={c.chart}>
          <MonthChart monthData={filtredWeek} title="weekly"/>
        </div>
        <div className={c.chart}>
          <MonthChart monthData={dataDays} title="daily"/>
        </div>
      </div>
    </div>
  );
};

export default ProjectEfficiency;
