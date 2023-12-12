import {
  getDataDays,
  getDataYear,
  getMonthData,
  getWeekData,
} from "../../hooks/EfficiencyProjectFilter";
import MonthChart from "../MonthChart";
import c from "../projectEfficiencySupCharts/OutputFilter.module.css";

const ShiftLeaderEfficiency = (p) => {
  const monthly = getDataYear(p.data);
  const month = p.date.date.split("-")[1];
  const weekly = getWeekData(
    getMonthData(p.data, p.date.month[month - 1], p.date.month[month - 2])
  );
  const filtredM = getMonthData(p.data, p.date.month[month - 1]);

  const daily = getDataDays(filtredM);
  return (
    <div className={c.chartsContainer} style={p.index>0 ? {'marginTop': '3rem'} : {}  }>
      <h3 className={c.title}>{p.title} efficiency</h3>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart monthData={monthly} title={`monthly ${p.title}`} />
        </div>
        <div className={c.chart}>
          <MonthChart monthData={weekly} title={`weekly ${p.title}`} />
        </div>
      </div>
      <div className={c.chartd}>
        <MonthChart monthData={daily} title={`daily ${p.title}`} />
      </div>
    </div>
  );
};

export default ShiftLeaderEfficiency;
