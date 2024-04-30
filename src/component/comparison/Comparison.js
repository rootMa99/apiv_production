import { useSelector } from "react-redux";
import { destractData } from "../hooks/newDataManpulate";
import TlAndCrew from "./TlAndCrew";
import { useState } from "react";
import c from "./TlAndCrew.module.css";
import Teamleader from "./Teamleader";

function getStartOfMonth(date) {
  const d=date.split('-');
  return `${d[0]}-${d[1]}-1`;
}

function filterDataByDateRange(startDate, endDate, data) {
  return data.filter(
    (item) =>
      item.date >= startDate && item.date <= endDate && item.teamLeader !== null
  );
}

const Comparison = (p) => {
  let data = useSelector((s) => s.datas);
  const { date } = useSelector((s) => s.additionalData);
  const [control, setControl] = useState("tlc");
  const [daily, setDaily] = useState(true);
  let fd = daily
    ? destractData(data).filter((f) => f.date === date && f.teamLeader !== null)
    : filterDataByDateRange(getStartOfMonth(date), date, destractData(data));

  console.log(fd);
  return (
    <div style={{ width: "100%" }}>
      <ul className={c.underList}>
        <li
          style={
            control === "tlc"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
          onClick={(e) => setControl("tlc")}
        >
          teamLeader by crew
        </li>

        <li
          style={
            control === "tl"
              ? { opacity: 1, borderBottom: "2px solid white" }
              : {}
          }
          onClick={(e) => setControl("tl")}
        >
          Teamleader
        </li>
      </ul>
      <div>
        <input
          type="checkbox"
          id="month"
          name="cm"
          onChange={(e) => setDaily((p) => !p)}
        />
        <label htmlFor="month"> Comule per month</label>
      </div>
      {control === "tlc" && <TlAndCrew fd={fd} />}
      {control === "tl" && <Teamleader fd={fd} />}
    </div>
  );
};

export default Comparison;
