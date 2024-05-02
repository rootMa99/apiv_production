import { useSelector } from "react-redux";
import {
  getDataDays,
  getDataDaysOutput,
  getDataYear,
  getDatacrapOutput,
  getMonthData,
  getOutputDataYear,
  getWeekData,
  getscrapDataYear,
} from "../hooks/EfficiencyProjectFilter";
import MonthChart from "./MonthChart";
import c from "./CompareResult.module.css";

const ComparedResult = (p) => {
  const { date, checkBox, month } = useSelector((s) => s.additionalData);

  const months = date.split("-")[1];

  const shiftLeader = p.data.filter((f) => f.name === p.name);

  const dataBytype = () => {
    if (p.typeS === "monthly") {
      if (p.actual === "efficiency") {
        return getDataYear(shiftLeader[0].data, checkBox);
      }
      if (p.actual === "scrap") {
        return getscrapDataYear(
          shiftLeader[0].data,
          "month",
          p.actual,
          p.target
        );
      }

      return getOutputDataYear(
        shiftLeader[0].data,
        "month",
        p.actual,
        p.target
      );
    }
    if (p.typeS === "weekly") {
      if (p.actual === "efficiency") {
        return getWeekData(
          getMonthData(
            shiftLeader[0].data,
            month[months - 1],
            month[months - 2]
          ),
          checkBox
        );
      }

      const filtredMonth = getMonthData(
        shiftLeader[0].data,
        month[months - 1],
        month[months - 2]
      );
      if (p.actual === "scrap") {
        return getscrapDataYear(filtredMonth, "week", p.actual, p.target);
      }
      return getOutputDataYear(filtredMonth, "week", p.actual, p.target);
    }
    if (p.typeS === "daily") {
      const filtredM = getMonthData(shiftLeader[0].data, month[months - 1]);
      if (p.actual === "efficiency") {
        return getDataDays(filtredM, "", checkBox);
      }
      if (p.actual === "scrap") {
        return getDatacrapOutput(filtredM, p.actual, p.target);
      }
      return getDataDaysOutput(filtredM, p.actual, p.target);
    }
    if (p.typeS === "day") {
      const filtredM = shiftLeader[0].data.filter((f) => f.date === date);
      if (p.actual === "efficiency") {
        return getDataDays(filtredM, "", checkBox);
      }
      if (p.actual === "scrap") {
        return getDatacrapOutput(filtredM, p.actual, p.target, "day");
      }
      return getDataDaysOutput(filtredM, p.actual, p.target, "day");
    }
    const filtredM = shiftLeader[0].data.filter((f) => f.date === date);
    return getDataDaysOutput(filtredM, p.actual, p.target, "day");
  };

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
