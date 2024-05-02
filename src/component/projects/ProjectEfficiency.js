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
import { useEffect } from "react";

const ProjectEfficiency = (p) => {
  const data = useSelector((s) => s.datas);
  const { date, month, chartDay, chartWeek, chartmonth, checkBox } =
    useSelector((s) => s.additionalData);
  const dispatch = useDispatch();
  // const [toggle, isToggle] = useState(false);
  // const [toggleD, isToggleD] = useState(true);
  // const [toggleM, isToggleM] = useState(true);
  const months = date.split("-")[1];
  const params = useParams();
  const filtredData = filterProjectsByName(data, params.project);
  const monthData = getDataYear(filtredData[0].data, checkBox);

  useEffect(() => {
    const dataDaysYear = getDataDays(filtredData[0].data, "allDate");
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
  }, [monthData, filtredData, dispatch]);

  const filtredMonth = getMonthData(
    filtredData[0].data,
    month[months - 1],
    month[months - 2]
  );
  const filtredWeek = getWeekData(filtredMonth, checkBox);
  const filtredMonthDays = getMonthData(filtredData[0].data, month[months - 1]);
  const dataDays = getDataDays(filtredMonthDays, "", checkBox);

  let classes;
  let classesW;
  let classesD;
  if (!chartDay && !chartWeek) {
    classes = { width: "100%" };
  } else if (!chartDay && chartWeek) {
    classes = { width: "49%" };
  } else if (chartDay && chartWeek) {
    classes = { width: "33%" };
  }
  if (!chartDay) {
    classesW = !chartmonth ? { width: "100%" } : { width: "49%" };
  } else if ((chartDay && chartmonth) || (chartDay && !chartmonth)) {
    classesW = { width: "33%" };
  }

  if (!chartWeek) {
    classesD = !chartmonth ? { width: "100%" } : { width: "66%" };
  } else if (chartDay && chartmonth) {
    classesD = { width: "33%" };
  } else if (chartDay && !chartmonth) {
    classesD = { width: "66%" };
  }

  return (
    <div className={c.projectEfficiencyContainer}>
      <h3>{p.title} efficiency</h3>
      <div className={c.toggleBtnContainer}>
        <button
          className={c.toggleBtn}
          onClick={() =>
            dispatch(additionalDataAction.editChartMonth(!chartmonth))
          }
        >
          {chartmonth ? "hide month" : "show month"}
        </button>
        <button
          className={c.toggleBtn}
          onClick={() =>
            dispatch(additionalDataAction.editChartWeek(!chartWeek))
          }
        >
          {chartWeek ? "hide week" : "show week"}
        </button>
        <button
          className={c.toggleBtn}
          onClick={() => dispatch(additionalDataAction.editChartDay(!chartDay))}
        >
          {chartDay ? "hide day" : "show day"}
        </button>
      </div>
      <div className={c.chartContainer}>
        {chartmonth && (
          <div className={c.chart} style={classes}>
            <MonthChart monthData={monthData} title="" />
          </div>
        )}
        {chartWeek && (
          <div className={c.chart} style={classesW}>
            <MonthChart monthData={filtredWeek} title="" />
          </div>
        )}
        {chartDay && (
          <div className={c.chart} style={classesD}>
            <MonthChart monthData={dataDays} title="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectEfficiency;
