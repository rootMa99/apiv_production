import c from "../projects/ProjectDetails.module.css";
import ShiftLeaderEfficiency from "../projects/leaders/ShiftlLeaderEfficiency";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ShiftLeadersEfficiencyASide from "../projects/leaders/ShiftLeadersEfficiencyASide";
import React from "react";

const CoordinatorChart = (p) => {
  const { name } = useParams();
  const { date, month } = useSelector((s) => s.additionalData);

  return (
    <div className={c.projectContent}>
      {p.level !== "teamleader"&&<div className={`${c.aside} ${c.asideall}`}>
        <div className={c.asideins}>
          <ShiftLeadersEfficiencyASide
            data={p.dataCoordinator}
            project={name}
            coordinator="cordinator"
            type={p.type}
            dontNavigate={p.dontNavigate}
          />
        </div>
      </div>}

      <div className={c.chartContainer} style={p.level === "teamleader"? {margin:"auto"}:{ marginTop: "2rem" }}>
        {p.level === "teamleader" ? (
          <React.Fragment>
          <ShiftLeaderEfficiency
                title={p.dataCoordinator.name}
                data={p.dataCoordinator.data}
                date={{ date, month }}
                project={p.dataCoordinator.name}
                //shiftLeader={params.shitLeader}
                top={true}
                coordinator={true}
                type={p.type}
                dontNavigate={p.dontNavigate}
              />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {p.dataCoordinator.map((m, i) => (
              <ShiftLeaderEfficiency
                title={m.name}
                data={m.data}
                date={{ date, month }}
                project={m.name}
                //shiftLeader={params.shitLeader}
                top={true}
                key={i}
                coordinator={true}
                type={p.type}
                dontNavigate={p.dontNavigate}
              />
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default CoordinatorChart;
