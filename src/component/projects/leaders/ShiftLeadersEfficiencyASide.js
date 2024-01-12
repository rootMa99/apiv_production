import { useSelector } from "react-redux";
import c from "./ShiftLeadersEfficiencyASide.module.css";
import {
  getEfficiencyDatas,
  getEfficiencyMonthSL,
} from "../../hooks/getEfficiencyData";
import { useNavigate } from "react-router-dom";

const ShiftLeadersEfficiencyASide = (p) => {
  const date = useSelector((s) => s.additionalData);
  const navigate = useNavigate();
  const mnt = date.date.split("-")[1];
  console.log(date.shiftLeader);
  const data = p.data === undefined ? date.shiftLeader.shiftLeader : p.data;
  console.log(data);
  const efficiency = [];
  for (let d of data) {
    if (d.name === null) {
      continue;
    }
    console.log(d.data);
    const filtredDay = getEfficiencyMonthSL(d.data, date.date, "date");
    const efficiencyDay = getEfficiencyDatas(filtredDay);
    const filtredMonth = getEfficiencyMonthSL(
      d.data,
      date.month[mnt - 1],
      "month"
    );
    const efficiencyMonth = getEfficiencyDatas(filtredMonth);
    efficiency.push({
      name: d.name,
      efficiencyDay:
        efficiencyDay.paidH === 0
          ? 0
          : ((efficiencyDay.prodH / efficiencyDay.paidH) * 100).toFixed(2),
      totalTargetDay:
        efficiencyDay.paidT === 0
          ? 0
          : ((efficiencyDay.prodT / efficiencyDay.paidT) * 100).toFixed(2),
      efficiencyMonth:
        efficiencyMonth.paidH === 0
          ? 0
          : ((efficiencyMonth.prodH / efficiencyMonth.paidH) * 100).toFixed(2),
      totalTargetMonth:
        efficiencyMonth.paidT === 0
          ? 0
          : ((efficiencyMonth.prodT / efficiencyMonth.paidT) * 100).toFixed(2),
    });
  }
  const totalEfficiency = [];
  efficiency.forEach((e) =>
    totalEfficiency.push({
      name: e.name,
      efficiencyDay: e.efficiencyDay,
      efficiencyMonth: e.efficiencyMonth,
      gapDay: (e.efficiencyDay - e.totalTargetDay).toFixed(2),
      gapMonth: (e.efficiencyMonth - e.totalTargetMonth).toFixed(2),
    })
  );
  totalEfficiency.sort((a, b) => a.gapDay - b.gapDay);
  console.log(efficiency, totalEfficiency);
  const clickHandlerLink = (name) => {
    if(p.dontNavigate){
      return;
    }
    if (p.type === "fa") {
      navigate(`/coordinator/${name}`);
      return;
    }
    if (p.coordinator === "cordinator") {
      navigate(
        `/home/project/${name}`
      );
      return;
    }
    if (p.crew === "crew") {
      navigate(
        `/home/project/${p.project}/shiftLeader/${p.shiftLeader}/teamleader/${p.teamLeader}/crew/${name}`
      );
      return;
    }
    if (p.project === undefined) {
      return;
    }

    p.data === undefined
      ? navigate(`/home/project/${p.project}/shiftLeader/${name}`)
      : navigate(
          `/home/project/${p.project}/shiftLeader/${p.sl}/teamleader/${name}`
        );
  };
  return (
    <div className={c.dataContainer}>
      <h3 className={c.title}>
        {p.data === undefined
          ? "shiftLeaders efficiency"
          : p.crew === "crew"
          ? "crews efficiency"
          : p.coordinator === "cordinator"
          ? "projects efficiency"
          : "teamleaders efficiency"}
      </h3>
      {totalEfficiency.map((m, i) => (
        <div
          className={c.content}
          key={i}
          onClick={() => clickHandlerLink(m.name)}
        >
          <h4>{m.name}</h4>
          <div className={c.contentData}>
            <span className={c.contentDataTitle}>efficiency/day :</span>
            <span className={c.contentDataEff}>{m.efficiencyDay} %</span>
          </div>
          <div className={c.contentData}>
            <span className={c.contentDataTitle}>gap/day :</span>
            <span
              className={
                m.gapDay >= 0
                  ? `${c.contentDataEff} ${c.green}`
                  : `${c.contentDataEff} ${c.red}`
              }
            >
              <div
                className={m.gapDay >= 0 ? c.triangleUP : c.triangleDown}
              ></div>{" "}
              {m.gapDay} %
            </span>
          </div>
          <div className={c.contentData}>
            <span className={c.contentDataTitle}>efficiency/month :</span>
            <span className={c.contentDataEff}>{m.efficiencyMonth} %</span>
          </div>
          <div className={c.contentData}>
            <span className={c.contentDataTitle}>gap/month :</span>
            <span
              className={
                m.gapMonth >= 0
                  ? `${c.contentDataEff} ${c.green}`
                  : `${c.contentDataEff} ${c.red}`
              }
            >
              <div
                className={m.gapMonth >= 0 ? c.triangleUP : c.triangleDown}
              ></div>
              {m.gapMonth} %
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShiftLeadersEfficiencyASide;
