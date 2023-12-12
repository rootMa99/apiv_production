//import { useDispatch } from "react-redux";
import {
  getDataDays,
  getDataYear,
  getMonthData,
  getWeekData,
} from "../../hooks/EfficiencyProjectFilter";
import MonthChart from "../MonthChart";
import c from "../ProjectEfficiency.module.css";
//import { additionalDataAction } from "../../../store/AdditionalData";

const ShiftLeaderEfficiency = (p) => {
  //const dispatch = useDispatch();
  const monthly = getDataYear(p.data);
  const month = p.date.date.split("-")[1];
  const weekly = getWeekData(
    getMonthData(p.data, p.date.month[month - 1], p.date.month[month - 2])
  );
  const filtredM = getMonthData(p.data, p.date.month[month - 1]);

  const daily = getDataDays(filtredM);

  //   dispatch(
  //     additionalDataAction.addShitLeaderEfficiency({
  //       name: p.project,
  //       shiftLeader: { name: p.title, data: [monthly, weekly, daily] },
  //     })
  //   );

  return (
    <div
      className={c.chartsContainer}
      style={p.index > 0 ? { marginTop: "3rem" } : {}}
    >
      <h3 className={c.title}>{p.title} efficiency</h3>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart monthData={monthly} title={`monthly ${p.title}`} />
        </div>
        <div className={c.chart}>
          <MonthChart monthData={weekly} title={`weekly ${p.title}`} />
        </div>
        <div className={c.chart}>
          <MonthChart monthData={daily} title={`daily ${p.title}`} />
        </div>
      </div>
    </div>
  );
};

export default ShiftLeaderEfficiency;
