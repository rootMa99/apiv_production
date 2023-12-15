import React, { useState } from "react";
import c from "../ProjectDetails.module.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { filterProjectsByName } from "../../hooks/getEfficiencyData";
import {
  getDataDays,
  getDataYear,
  getShiftLeaders,
} from "../../hooks/EfficiencyProjectFilter";
import ShiftLeaderEfficiency from "../leaders/ShiftlLeaderEfficiency";
import { getTeamLeaders } from "../../hooks/teamLeaderEfficiency";
import ProjectEfficiencySup from "../ProjectEfficiencySup";
import ShiftLeadersEfficiencyASide from "../leaders/ShiftLeadersEfficiencyASide";

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
  const monthData = getDataYear(shiftLeader[0].data);
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
  const dataDaysYear = getDataDays(shiftLeader[0].data, "allDate");
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
  console.log(
    shiftLeaders,
    shiftLeader,
    teamLeader,
    dataDaysYear,
    maxObjectDay,
    maxObject
  );

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
            (m) =>
              m.name !== null &&
              m.name !== params.shitLeader && (
                <h4
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
          {!toggle ? (
            <React.Fragment>
              <div className={c.maxvalues}>
                <h5>best month :</h5>
                <div className={c.bestData}>
                  <h6>
                    month:
                  </h6>
                  <span> {maxObject.name} </span>
                </div>
                <div className={c.bestData}>
                  <h6>
                    value:
                  </h6>
                  <span> {maxObject.total}%</span>
                </div>
              </div>
              <div className={c.maxvalues}>
                <h5>best day :</h5>
                <div className={c.bestData}>
                  <h6>
                    date:
                  </h6>
                  <span> {maxObjectDay.name} </span>
                </div>
                <div className={c.bestData}>
                  <h6>
                    value:
                  </h6>
                  <span> {maxObjectDay.total} %</span>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <ShiftLeadersEfficiencyASide
              data={teamLeader}
              project={params.project}
              sl={params.shitLeader}
            />
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
              {teamLeader.map(
                (m, i) =>
                  m.name !== null && (
                    <ShiftLeaderEfficiency
                      title={m.name}
                      data={m.data}
                      date={{ date, month }}
                      index={i}
                      project={params.project}
                      shiftLeader={params.shitLeader}
                      key={i}
                    />
                  )
              )}
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
