import { useSelector } from "react-redux";
import { getDataDaysOutput, getMonthData, getOutputDataYear } from "../hooks/EfficiencyProjectFilter";
import MonthChart from "./MonthChart";
import c from "./CompareResult.module.css";

const ComparedResult = (p) => {
    const date = useSelector((s) => s.additionalData);
    console.log(date, p.data, p.actual, p.target);

  const month = date.date.split("-")[1];

  const shiftLeader = p.data.filter((f) => f.name === p.name);
  console.log(month,shiftLeader);

const dataBytype=()=>{
if(p.typeS==="monthly"){
 return getOutputDataYear(
    shiftLeader[0].data,
    "month",
    p.actual,
    p.target
  );
}
if(p.typeS==="weekly"){
    const filtredMonth = getMonthData(
        shiftLeader[0].data,
        date.month[month - 1],
        date.month[month - 2]
      );
      console.log(filtredMonth);
      return getOutputDataYear(filtredMonth, "week", p.actual, p.target);
}
if(p.typeS==="daily"){
    const filtredM = getMonthData(shiftLeader[0].data, date.month[month - 1]);
  return getDataDaysOutput(filtredM, p.actual, p.target);
}
}

  const monthly = dataBytype();
  return (
    <div className={c.chartContainer}>
      <MonthChart
        monthData={monthly}
        title={`${p.typeS} ${p.actual}`}
        type={p.actual}
      />
    </div>
  );
};
export default ComparedResult;
