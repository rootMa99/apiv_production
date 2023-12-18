import {
  getDataDaysOutput,
  getMonthData,
  getOutputDataYear,
} from "../../hooks/EfficiencyProjectFilter";
import MonthChart from "../MonthChart";
import c from "./OutputFilter.module.css";

const OuputFilter = (p) => {
  const month = p.date.date.split("-")[1];
  const data = p.data;
  console.log(month, data);

  const monthly = getOutputDataYear(data[0].data, "month", p.actual, p.target);
  const filtredMonth = getMonthData(
    data[0].data,
    p.date.month[month - 1],
    p.date.month[month - 2]
  );
  console.log(filtredMonth);
  const weekly = getOutputDataYear(filtredMonth, "week", p.actual, p.target);
  console.log("week", weekly);
  const filtredM = getMonthData(data[0].data, p.date.month[month - 1]);
  const daily = getDataDaysOutput(filtredM, p.actual, p.target);
  console.log("daily", daily);
  return (
    <div className={c.chartsContainer} style={p.title!=="output" ? {'marginTop': '3rem'} : {}  }>
      <h3 className={c.title}>{p.titleH}</h3>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart monthData={monthly} title={`monthly ${p.title}`} type={p.title} />
        </div>
        <div className={c.chartw}>
          <MonthChart monthData={weekly} title={`weekly ${p.title}`} type={p.title} />
        </div>
      </div>
        <div className={c.chartd}>
          <MonthChart monthData={daily} title={`daily ${p.title}`} type={p.title} />
        </div>
    </div>
  );
};

export default OuputFilter;
