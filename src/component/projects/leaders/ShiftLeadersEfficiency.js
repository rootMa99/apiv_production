import { useDispatch, useSelector } from "react-redux";
import c from "../ProjectEfficiencySup.module.css";
import { useParams } from "react-router-dom";
import { filterProjectsByName } from "../../hooks/getEfficiencyData";
import { getShiftLeaders } from "../../hooks/EfficiencyProjectFilter";
import ShiftLeaderEfficiency from "./ShiftlLeaderEfficiency";
import { additionalDataAction } from "../../../store/AdditionalData";

const ShiftLeadersEfficiency = (p) => {
  const data = useSelector((s) => s.datas);
  const dispatch = useDispatch();
  const {date, month} = useSelector((s) => s.additionalData);
  console.log(data);
  const params = useParams();
  console.log(params, date);
  const filtredData = filterProjectsByName(data, params.project);
  console.log(filtredData);
  const shiftLeaders = getShiftLeaders(filtredData[0].data);
  console.log(shiftLeaders);
  shiftLeaders[0].name === null && shiftLeaders.reverse();
  console.log(shiftLeaders);
  dispatch(
    additionalDataAction.addShitLeaderEfficiency({
      name: params.project,
      shiftLeader:  shiftLeaders ,
    })
  );
  return (
    <div className={c.projectEfficiencySup}>
      <h3>shift leaders data</h3>

      {shiftLeaders.map(
        (m, i) =>
          m.name !== null && (
            <ShiftLeaderEfficiency
              title={m.name}
              data={m.data}
              date={{date, month}}
              index={i}
              project={params.project}
            />
          )
      )}
    </div>
  );
};

export default ShiftLeadersEfficiency;
