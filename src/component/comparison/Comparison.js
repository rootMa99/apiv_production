import { useSelector } from "react-redux";
import { destractData } from "../hooks/newDataManpulate";
import TlAndCrew from "./TlAndCrew";
import { useState } from "react";
import c from "./TlAndCrew.module.css";
import Teamleader from "./Teamleader";

function getStartOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

const Comparison = (p) => {
  let data = useSelector((s) => s.datas);
  const { date } = useSelector((s) => s.additionalData);
  const fd = destractData(data).filter(
    (f) => f.date === date && f.teamLeader !== null
  );
  const [control, setControl] = useState("tlc");
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
        <input type="checkbox" id="month" name="vehicle1" value="Bike" />
        <label htmlFor="month"> Comule per month</label>
        <br></br>
      </div>
      {control === "tlc" && <TlAndCrew fd={fd} />}
      {control === "tl" && <Teamleader fd={fd} />}
    </div>
  );
};

export default Comparison;
