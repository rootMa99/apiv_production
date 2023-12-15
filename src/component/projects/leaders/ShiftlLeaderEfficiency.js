//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDataDays,
  getDataYear,
  getMonthData,
  getWeekData,
} from "../../hooks/EfficiencyProjectFilter";
import MonthChart from "../MonthChart";
import c from "./ShiftLeaderEfficiency.module.css";
//import { additionalDataAction } from "../../../store/AdditionalData";

const ShiftLeaderEfficiency = (p) => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(p.shiftLeader);
  const monthly = getDataYear(p.data);
  const month = p.date.date.split("-")[1];
  const weekly = getWeekData(
    getMonthData(p.data, p.date.month[month - 1], p.date.month[month - 2])
  );
  const filtredM = getMonthData(p.data, p.date.month[month - 1]);

  const daily = getDataDays(filtredM);
  console.log((daily.length / 2 - 0.3).toFixed(0));

  const onClickHandler = (e) => {
    if(p.crew!==undefined){
      return;
    }
    p.shiftLeader !== undefined
      ? navigate(`/home/project/${p.project}/shiftLeader/${p.shiftLeader}/teamleader/${p.title}`)
      : navigate(`/home/project/${p.project}/shiftLeader/${p.title}`);
  };
  //   dispatch(
  //     additionalDataAction.addShitLeaderEfficiency({
  //       name: p.project,
  //       shiftLeader: { name: p.title, data: [monthly, weekly, daily] },
  //     })
  //   );

  return (
    <div
      className={c.chartsContainer}
      style={p.index > 0 ? { marginTop: "1.5rem" } : {}}
    >
      <h3 className={c.title} onClick={onClickHandler}>
        {p.title} efficiency
      </h3>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart monthData={monthly} title={""} />
        </div>
        <div className={c.chart}>
          <MonthChart monthData={weekly} title={``} />
        </div>
        <div className={c.chart}>
          <MonthChart monthData={daily} title={``} />
        </div>
      </div>
    </div>
  );
};

export default ShiftLeaderEfficiency;
