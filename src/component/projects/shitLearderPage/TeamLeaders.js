import { useNavigate, useParams } from "react-router-dom";
import c from "../ProjectDetails.module.css";
import React, { useEffect, useState } from "react";
import ShiftLeaderEfficiency from "../leaders/ShiftlLeaderEfficiency";
import { useSelector } from "react-redux";
import { filterProjectsByName } from "../../hooks/getEfficiencyData";
import { getCrew, getDataDays, getDataYear, getShiftLeaders } from "../../hooks/EfficiencyProjectFilter";
import { getTeamLeaders } from "../../hooks/teamLeaderEfficiency";
import ProjectEfficiencySup from "../ProjectEfficiencySup";
import ShiftLeadersEfficiencyASide from "../leaders/ShiftLeadersEfficiencyASide";

const TeamLeaders = (p) => {
  const data = useSelector((s) => s.datas);
  const { date, month } = useSelector((s) => s.additionalData);
  const params = useParams();
  const [toggle, isToggle] = useState(false);
  const [oneCrew, isOneCrew] = useState(false);
  const navigate = useNavigate();
  console.log(params);
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
  useEffect(() => {
    if (params.teamLeader === undefined) {
      console.log("params.teamLeader");

      navigate("/home");
    }
  }, [params.teamLeader, navigate]);
  const filtredData = filterProjectsByName(data, params.project);
  const shiftLeaders =
    filtredData.length !== 0 && getShiftLeaders(filtredData[0].data);
  const shiftLeader =
    shiftLeaders.length !== 0 &&
    shiftLeaders.filter((f) => f.name === params.shitLeader);
  const teamleaders =
    shiftLeader.length !== 0 &&
    getTeamLeaders(shiftLeader[0].data).filter((f) => f.name !== null);
  console.log(params);
  const teamLeader =
    teamleaders.length !== 0 &&
    teamleaders.filter((f) => f.name.trim() === params.teamLeader);
  const crews = teamLeader.length !== 0 && getCrew(teamLeader[0].data);
  console.log(
    params,
    filtredData,
    shiftLeaders,
    shiftLeader,
    teamleaders,
    teamLeader,
    crews
  );
  const monthData = getDataYear(teamLeader[0].data);
  const dataM = monthData.map((m) => ({
    name: m.name,
    total: +m.total,
  }));
  const maxObject = dataM.reduce((max, current) => {
    if (
      current.value > max.value ||
      (current.value === max.value && current.total > max.total)
    ) {
      return current;
    }
    return max;
  });
  const dataDaysYear = getDataDays(teamLeader[0].data, "allDate");
  const datan = dataDaysYear.map((m) => ({
    name: m.name,
    total: +m.total,
  }));
  const maxObjectDay = datan.reduce((max, current) => {
    if (
      current.value > max.value ||
      (current.value === max.value && current.total > max.total)
    ) {
      return current;
    }
    return max;
  });
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
          {(!toggle || oneCrew) && (
            <React.Fragment>
              <div className={c.maxvalues}>
                <h5>best month :</h5>
                <div className={c.bestData}>
                  <h6>month:</h6>
                  <span> {maxObject.name} </span>
                </div>
                <div className={c.bestData}>
                  <h6>value:</h6>
                  <span> {maxObject.total} %</span>
                </div>
              </div>
              <div className={c.maxvalues}>
                <h5>best day :</h5>
                <div className={c.bestData}>
                  <h6>date:</h6>
                  <span> {maxObjectDay.name} </span>
                </div>
                <div className={c.bestData}>
                  <h6>value:</h6>
                  <span> {maxObjectDay.total} %</span>
                </div>
              </div>
            </React.Fragment>
          )}
          {toggle && !oneCrew && <ShiftLeadersEfficiencyASide data={crews}/>}
        </div>
        <div className={c.chartContainer}>
          <ShiftLeaderEfficiency
            title={params.teamLeader}
            data={teamLeader[0].data}
            date={{ date, month }}
            index={1}
            project={params.project}
            shiftLeader={params.shitLeader}
          />

          {!oneCrew && (
            <button className={c.buttonToggle} onClick={clickHandler}>
              {!toggle ? "show Project details" : "hide project details"}
            </button>
          )}
          {!toggle ? (
            <React.Fragment>
              <h3 className={c.shiftLeaderTite}>crew data</h3>
              {crews.map((m) => (
                <ShiftLeaderEfficiency
                  title={m.name}
                  data={m.data}
                  date={{ date, month }}
                  index={1}
                  project={params.project}
                  shiftLeader={params.shitLeader}
                  crew="crew"
                />
              ))}
            </React.Fragment>
          ) : (
            <ProjectEfficiencySup data={teamLeader} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamLeaders;
