import {
  getDtEfficiency,
  getMonthData,
} from "../../hooks/EfficiencyProjectFilter";
import MonthChart from "../MonthChart";
import c from "./OutputFilter.module.css";

const Dt = (p) => {

  const monthly = getDtEfficiency(p.data[0].data, "month");
  const filtredMonth = getMonthData(
    p.data[0].data,
    p.date.month[p.date.date.split("-")[1] - 1],
    p.date.month[p.date.date.split("-")[1] - 2]
  );
  const weekly = getDtEfficiency(filtredMonth, "week");
    const dailyf=getMonthData(p.data[0].data ,p.date.month[(p.date.date.split("-")[1]) - 1]);
    const daily=getDtEfficiency(dailyf, "date");
  return (
    <div
      className={c.chartsContainer}
      style={p.title !== "output" ? { marginTop: "3rem" } : {}}
    >
      <h3 className={c.title}>{p.titleH}</h3>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart
            monthData={monthly}
            title={`monthly ${p.title}`}
            type={p.title}
          />
        </div>
        <div className={c.chart}>
          <MonthChart
            monthData={weekly}
            title={`weekly ${p.title}`}
            type={p.title}
          />
        </div>
      </div>
      <div className={c.chartd}>
      <MonthChart
            monthData={daily}
            title={`daily ${p.title}`}
            type={p.title}
          />
      </div>
    </div>
  );
};
export default Dt;
