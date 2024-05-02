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
  const { date, month } = useSelector((s) => s.additionalData);
  const params = useParams();
  const filtredData = filterProjectsByName(data, params.project);
  const shiftLeaders = getShiftLeaders(filtredData[0].data);
  shiftLeaders[0].name === null && shiftLeaders.reverse();
  dispatch(
    additionalDataAction.addShitLeaderEfficiency({
      name: params.project,
      shiftLeader: shiftLeaders,
    })
  );
  return (
    <div className={c.projectEfficiencySup}>
      <h3 className={c.shiftLeaderTite}>shift leaders data</h3>

      {shiftLeaders.map(
        (m, i) =>
          (m.name !== null &&
            m.data.filter((f) => f.month === month[date.split("-")[1] - 1])
              .length > 0) && (
            <ShiftLeaderEfficiency
              title={m.name}
              data={m.data}
              date={{ date, month }}
              index={i}
              project={params.project}
              key={i}
            />
          )
      )}
    </div>
  );
};

export default ShiftLeadersEfficiency;
