import { useNavigate, useParams } from "react-router-dom";
import c from "../ProjectDetails.module.css";
import React, { useEffect, useState } from "react";
import ShiftLeaderEfficiency from "../leaders/ShiftlLeaderEfficiency";
import { useSelector } from "react-redux";
import { filterProjectsByName } from "../../hooks/getEfficiencyData";
import {
  getCrew,
  getDataDays,
  getDataYear,
  getShiftLeaders,
} from "../../hooks/EfficiencyProjectFilter";
import { getTeamLeaders } from "../../hooks/teamLeaderEfficiency";
import ProjectEfficiencySup from "../ProjectEfficiencySup";
import ShiftLeadersEfficiencyASide from "../leaders/ShiftLeadersEfficiencyASide";
import BackDrop from "../../ui/BackDrop";
import Compare from "../Compare";
import CompareResult from "../CompareResult";

const TeamLeaders = (p) => {
  const data = useSelector((s) => s.datas);
  const { date, month } = useSelector((s) => s.additionalData);
  const params = useParams();
  const [toggle, isToggle] = useState(false);
  const [oneCrew, isOneCrew] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [compareData, setCompareData] = useState(false);
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
  const comparedata = (data) => {
    setCompareData(data);
    isToggle(false);
  };
  const clickHandlerCompare = (e) => {
    setIsCompare(!isCompare);
  };

  return (
    <React.Fragment>
      {isCompare && <BackDrop click={clickHandlerCompare} />}
      {isCompare && (
        <Compare
          project={params.project}
          compare={comparedata}
          click={clickHandlerCompare}
          title="crew"
          data={crews}
        />
      )}
      <div className={c.projectContent}>
        <div className={isCompare ? `${c.aside} ${c.asideTop}` : `${c.aside}`}>
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
              data={crews}
              project={params.project}
              shiftLeader={params.shitLeader}
              teamLeader={params.teamLeader}
              crew="crew"
            />
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
          </div>
        </div>
        <div className={c.chartContainer}>
          <ShiftLeaderEfficiency
            title={params.teamLeader}
            data={teamLeader[0].data}
            date={{ date, month }}
            index={1}
            project={params.project}
            shiftLeader={params.shitLeader}
            top={true}
          />

          {!oneCrew && (
            <div className={c.btnHolder}>
              {compareData && (
                <button
                  className={c.buttonToggle}
                  onClick={() => {
                    setCompareData(false);
                  }}
                >
                  clear comparison
                </button>
              )}
              {!compareData && (
                <button
                  className={c.buttonToggle}
                  onClick={clickHandlerCompare}
                >
                  compare
                </button>
              )}

              <button className={c.buttonToggle} onClick={clickHandler}>
                {!toggle ? "show Project details" : "hide project details"}
              </button>
            </div>
          )}

          {!toggle ? (
            !compareData ? (
              <React.Fragment>
                (<h3 className={c.shiftLeaderTite}>crew data</h3>
                {crews.map((m, i) => (
                  <ShiftLeaderEfficiency
                    title={m.name}
                    data={m.data}
                    date={{ date, month }}
                    index={i}
                    project={params.project}
                    shiftLeader={params.shitLeader}
                    teamLeader={params.teamLeader}
                    crew="crew"
                    key={i}
                  />
                ))}
                )
              </React.Fragment>
            ) : (
              <CompareResult compareData={compareData} />
            )
          ) : (
            <ProjectEfficiencySup data={teamLeader} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamLeaders;
