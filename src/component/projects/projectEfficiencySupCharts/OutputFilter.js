import {
  getDataDaysOutput,
  getDatacrapOutput,
  getMonthData,
  getOutputDataYear,
  getscrapDataYear,
} from "../../hooks/EfficiencyProjectFilter";
import MonthChart from "../MonthChart";
import c from "./OutputFilter.module.css";

const OuputFilter = (p) => {
  const month = p.date.date.split("-")[1];
  const data = p.data;

  const monthly =p.actual==="scrap"?getscrapDataYear(data[0].data, "month", p.actual, p.target) : getOutputDataYear(data[0].data, "month", p.actual, p.target);
  const filtredMonth = getMonthData(
    data[0].data,
    p.date.month[month - 1],
    p.date.month[month - 2]
  );
  const weekly =p.title==="scrap"?getscrapDataYear(filtredMonth, "week", p.actual, p.target): getOutputDataYear(filtredMonth, "week", p.actual, p.target);
  const filtredM = getMonthData(data[0].data, p.date.month[month - 1]);
  const daily = p.title==="scrap"?getDatacrapOutput(filtredM, p.actual, p.target) : getDataDaysOutput(filtredM, p.actual, p.target);
  return (
    <div className={c.chartsContainer} style={p.title!=="output" ? {'marginTop': '3rem'} : {}  }>
      <h3 className={c.title}>{p.titleH}</h3>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart monthData={monthly} title={`monthly ${p.title}`} type={p.title} />
        </div>
        <div className={c.chart}>
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
