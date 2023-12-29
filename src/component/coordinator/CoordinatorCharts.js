import c from "../projects/ProjectDetails.module.css";
import ShiftLeaderEfficiency from "../projects/leaders/ShiftlLeaderEfficiency";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ShiftLeadersEfficiencyASide from "../projects/leaders/ShiftLeadersEfficiencyASide";

const CoordinatorChart = (p) => {
  const { name } = useParams();
  const { date, month } = useSelector((s) => s.additionalData);

  return (
    <div className={c.projectContent}>
      <div className={`${c.aside} ${c.asideall}`}> 
        <div className={c.asideins}>
          <ShiftLeadersEfficiencyASide
            data={p.dataCoordinator}
            project={name}
            coordinator="cordinator"
          />
        </div>
      </div>

      <div className={c.chartContainer}>
        {p.dataCoordinator.map((m, i) => (
          <ShiftLeaderEfficiency
            title={m.name}
            data={m.data}
            date={{ date, month }}
            index={1}
            project={m.name}
            //shiftLeader={params.shitLeader}
            top={true}
            key={i}
            coordinator={true}
          />
        ))}
      </div>
    </div>
  );
};

export default CoordinatorChart;
