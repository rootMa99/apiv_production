import { useNavigate, useParams } from "react-router-dom";
import c from "../ProjectDetails.module.css";
import React from "react";
import { useSelector } from "react-redux";
import { filterProjectsByName } from "../../hooks/getEfficiencyData";
import { getCrew, getShiftLeaders } from "../../hooks/EfficiencyProjectFilter";
import { getTeamLeaders } from "../../hooks/teamLeaderEfficiency";
import ShiftLeadersEfficiencyASide from "../leaders/ShiftLeadersEfficiencyASide";
import ShiftLeaderEfficiency from "../leaders/ShiftlLeaderEfficiency";
import ProjectEfficiencySup from "../ProjectEfficiencySup";

const Crew = (p) => {
  const data = useSelector((s) => s.datas);
  const { date, month } = useSelector((s) => s.additionalData);
  const params = useParams();
  const navigate = useNavigate();

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
  const crew = crews.filter((f) => f.name === params.crew);
  console.log(
    params,
    filtredData,
    shiftLeaders,
    shiftLeader,
    teamleaders,
    teamLeader,
    crews,
    crew
  );

  const projectClickHandler = (e) => {
    navigate(`/home/project/${params.project}`);
  };
  const shiftLeaderClickHandler = (e) => {
    navigate(
      `/home/project/${params.project}/shiftLeader/${params.shitLeader}`
    );
  };
  return (
    <React.Fragment>
      <div className={c.projectContent}>
        <div className={c.aside}>
          <h3 className={c.headingS}>project details</h3>
          <div className={c.asideins}>
            <h1 className={c.heading} onClick={projectClickHandler}>
              {params.project}
            </h1>
            <h3 className={c.heading} onClick={shiftLeaderClickHandler}>
              {params.shitLeader}
            </h3>
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
            <ShiftLeadersEfficiencyASide
              data={crews.filter((f) => f.name !== params.crew)}
              project={params.project}
              shiftLeader={params.shitLeader}
              teamLeader={params.teamLeader}
              crew="crew"
            />
          </div>
        </div>
        <div className={c.chartContainer}>
          <ShiftLeaderEfficiency
            title={params.crew}
            data={crew[0].data}
            date={{ date, month }}
            index={1}
            project={params.project}
            shiftLeader={params.shitLeader}
          />
          <ProjectEfficiencySup data={crew} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Crew;
