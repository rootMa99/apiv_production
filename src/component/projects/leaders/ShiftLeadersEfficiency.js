import { useSelector } from "react-redux";
import c from "../ProjectEfficiencySup.module.css";
import { useParams } from "react-router-dom";
import { filterProjectsByName } from "../../hooks/getEfficiencyData";
import { getShiftLeaders } from "../../hooks/EfficiencyProjectFilter";
import ShiftLeaderEfficiency from "./ShiftlLeaderEfficiency";

const ShiftLeadersEfficiency = (p) => {
  const data = useSelector((s) => s.datas);
  const date = useSelector((s) => s.additionalData);
  console.log(data);
  const params = useParams();
  console.log(params , date);
  const filtredData = filterProjectsByName(data, params.project);
  console.log(filtredData);
const shiftLeaders=getShiftLeaders(filtredData[0].data);
console.log(shiftLeaders)
shiftLeaders[0].name===null && console.log("reverse");
  return (
    <div className={c.projectEfficiencySup}>
      <h3>shift leaders data</h3>

      {shiftLeaders.map((m, i)=><ShiftLeaderEfficiency title={m.name} data={m.data} date={date} index={i} />)}
    </div>
  );
};

export default ShiftLeadersEfficiency;
