import { useParams } from "react-router-dom";
import MonthChart from "./MonthChart";
import c from "./ProjectEfficiency.module.css";
import { useSelector } from "react-redux";
import { filterProjectsByName } from "../hooks/getEfficiencyData";
import { getDataYear } from "../hooks/EfficiencyProjectFilter";

const ProjectEfficiency = (p) => {
  const data=useSelector(s=>s.datas);
  console.log(data);
  const params=useParams();
  console.log(params);
  const filtredData= filterProjectsByName(data, params.project);
  console.log(filtredData);
  const monthData=getDataYear(filtredData[0].data);
  console.log(monthData);
  return (
    <div className={c.projectEfficiencyContainer}>
      <h3>project efficiency</h3>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart monthData={monthData} />
        </div>
        <div className={c.chart}>
          <MonthChart monthData={monthData}/>
        </div>
        <div className={c.chart}>
          <MonthChart monthData={monthData}/>
        </div>
      </div>
    </div>
  );
};

export default ProjectEfficiency;
