import { useNavigate, useParams } from "react-router-dom";
import c from "../ProjectDetails.module.css";
import React, { useEffect, useState } from "react";
import ShiftLeaderEfficiency from "../leaders/ShiftlLeaderEfficiency";
import { useSelector } from "react-redux";
import { filterProjectsByName } from "../../hooks/getEfficiencyData";
import { getCrew, getShiftLeaders } from "../../hooks/EfficiencyProjectFilter";
import { getTeamLeaders } from "../../hooks/teamLeaderEfficiency";

const TeamLeaders = (p) => {
  const data = useSelector((s) => s.datas);
  const { date, month } = useSelector((s) => s.additionalData);
  const params = useParams();
  const [toggle, isToggle] = useState(false);
  const [oneCrew, isOneCrew] = useState(false);
  const navigate = useNavigate();
  console.log(params)
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
  if (params.teamLeader===undefined) {
  console.log("params.teamLeader")

    navigate("/home");
  }
  const filtredData = filterProjectsByName(data, params.project);
  const shiftLeaders = getShiftLeaders(filtredData[0].data);
  const shiftLeader = shiftLeaders.filter((f) => f.name === params.shitLeader);
  const teamleaders = getTeamLeaders(shiftLeader[0].data);

  const teamLeader = teamleaders.filter((f) => f.name === params.teamLeader);
  const crews = getCrew(teamLeader[0].data);
  console.log(
    params,
    filtredData,
    shiftLeaders,
    shiftLeader,
    teamleaders,
    teamLeader,
    crews
  );
 
  useEffect(() => {
    if (crews.length === 1) {
      isToggle(true);
      isOneCrew(true);
    }
  }, [crews]);
  console.log("oneCre<", oneCrew, crews.length);
  return (
    <React.Fragment>
      <div className={c.projectContent}>
        <div className={c.aside}>
          <h1 className={c.heading} onClick={projectClickHandler}>
            {params.project}
          </h1>
          <h1 className={c.heading} onClick={shiftLeaderClickHandler}>
            {params.shitLeader}
          </h1>
          {shiftLeaders.map(
            (m, i) =>
              m.name !== null &&
              m.name !== params.shitLeader && (
                <h4
                  key={i}
                  className={c.heading}
                  onClick={() => {
                    navigate(
                      `/home/project/${params.project}/shiftLeader/${m.name}`
                    );
                  }}
                >
                  {m.name}
                </h4>
              )
          )}
          <h3
            className={c.heading}
            onClick={() => {
              navigate(
                `/home/project/${params.project}/shiftLeader/${params.shitLeader}/teamleader/${params.teamLeader}`
              );
            }}
          >
            {params.teamLeader}
          </h3>
          {teamleaders.map(
            (m, i) =>
              m.name !== null &&
              m.name !== params.teamLeader && (
                <h6
                  key={i}
                  className={c.heading}
                  onClick={() => {
                    navigate(
                      `/home/project/${params.project}/shiftLeader/${params.shitLeader}/teamleader/${m.name}`
                    );
                  }}
                >
                  {m.name}
                </h6>
              )
          )}
          {!toggle ? (
            <React.Fragment>
              <div className={c.maxvalues}>
                <h5>best month :</h5>
                <div className={c.bestData}>
                  <h6>month:</h6>
                  <span> Jan </span>
                </div>
                <div className={c.bestData}>
                  <h6>value:</h6>
                  <span> 89%</span>
                </div>
              </div>
              <div className={c.maxvalues}>
                <h5>best day :</h5>
                <div className={c.bestData}>
                  <h6>date:</h6>
                  <span> 4/02/2023 </span>
                </div>
                <div className={c.bestData}>
                  <h6>value:</h6>
                  <span> 57 %</span>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <h1>data title </h1>
          )}
        </div>
        <div className={c.chartContainer}>
          {/* <ShiftLeaderEfficiency
              title={params.shitLeader}
              data={shiftLeader[0].data}
              date={{ date, month }}
              index={1}
              project={params.project}
            /> */}

          {!oneCrew && (
            <button className={c.buttonToggle} onClick={clickHandler}>
              {!toggle ? "show Project details" : "hide project details"}
            </button>
          )}
          {!toggle ? (
            <React.Fragment>
              <h3 className={c.shiftLeaderTite}>crew data</h3>
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamLeaders;
