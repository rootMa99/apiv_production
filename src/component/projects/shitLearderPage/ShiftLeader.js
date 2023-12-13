import React, { useState } from "react";
import c from "../ProjectDetails.module.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { filterProjectsByName } from "../../hooks/getEfficiencyData";
import { getShiftLeaders } from "../../hooks/EfficiencyProjectFilter";
import ShiftLeaderEfficiency from "../leaders/ShiftlLeaderEfficiency";
import { getTeamLeaders } from "../../hooks/teamLeaderEfficiency";
import TeamLeaders from "./TeamLeaders";
import ProjectEfficiencySup from "../ProjectEfficiencySup";

const ShiftLeader = (p) => {
  const data = useSelector((s) => s.datas);
  const { date, month } = useSelector((s) => s.additionalData);
  const navigate = useNavigate();
  const params = useParams();
  console.log(data, params);
  const [toggle, isToggle] = useState(false);

  const filtredData = filterProjectsByName(data, params.project);
  const shiftLeaders = getShiftLeaders(filtredData[0].data);
  const shiftLeader = shiftLeaders.filter((f) => f.name === params.shitLeader);
  const clickHandler = (e) => {
    isToggle(!toggle);
  };

  const shiftLeaderClickHandler = (e) => {
    navigate(
      `/home/project/${params.project}/shiftLeader/${params.shitLeader}`
    );
  };
  const projectClickHandler = (e) => {
    navigate(`/home/project/${params.project}`);
  };

  const teamLeader = getTeamLeaders(shiftLeader[0].data);
  console.log(shiftLeaders, shiftLeader, teamLeader);

  return (
    <React.Fragment>
      <div className={c.projectContent}>
        <div className={c.aside}>
          <h1 className={c.heading} onClick={projectClickHandler}>
            {params.project}{" "}
          </h1>
          <h1 className={c.heading} onClick={shiftLeaderClickHandler}>
            {params.shitLeader}{" "}
          </h1>
          {!toggle ? (
            <React.Fragment>
              <div className={c.maxvalues}>
                <h5>best month :</h5>
                <h6>
                  month:<span> Nov </span>
                </h6>
                <h6>
                  value:<span> 78%</span>
                </h6>
              </div>
              <div className={c.maxvalues}>
                <h5>best day :</h5>
                <h6>
                  date:<span> 12/05/2023 </span>
                </h6>
                <h6>
                  value:<span> 100 %</span>
                </h6>
              </div>
            </React.Fragment>
          ) : (
            <h1>shiftLeader tada</h1>
          )}
        </div>
        <div className={c.chartContainer}>
          <ShiftLeaderEfficiency
            title={params.shitLeader}
            data={shiftLeader[0].data}
            date={{ date, month }}
            index={1}
            project={params.project}
          />

          <button className={c.buttonToggle} onClick={clickHandler}>
            {!toggle ? "show Project details" : "hide project details"}
          </button>
          {!toggle ? (
            <React.Fragment>
              <h3 className={c.shiftLeaderTite}>TeamLeaders data</h3>
              {teamLeader.map( (m, i) => m.name !== null && (
              <ShiftLeaderEfficiency
                title={m.name}
                data={m.data}
                date={{ date, month }}
                index={i}
                project={params.project}
                shiftLeader={params.shitLeader}
              />
              ) )}
            </React.Fragment>
          ) : (
            <ProjectEfficiencySup data={shiftLeader} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShiftLeader;
