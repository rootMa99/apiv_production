import { useSelector } from "react-redux";
import c from "../ProjectEfficiencySup.module.css";
import { useParams } from "react-router-dom";
import { filterProjectsByName } from "../../hooks/getEfficiencyData";

const ShiftLeadersEfficiency = (p) => {
  const data = useSelector((s) => s.datas);
  const date = useSelector((s) => s.additionalData);
  console.log(data);
  const params = useParams();
  console.log(params);
  const filtredData = filterProjectsByName(data, params.project);
  console.log(filtredData);

  return (
    <div className={c.projectEfficiencySup}>
      <h3>shift leaders data</h3>
    </div>
  );
};

export default ShiftLeadersEfficiency;
