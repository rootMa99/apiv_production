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
import BackDrop from "../../ui/BackDrop";
import Compare from "../Compare";
import CompareResult from "../CompareResult";

const ShiftLeader = (p) => {
  const data = useSelector((s) => s.datas);
  const { date, month } = useSelector((s) => s.additionalData);
  const navigate = useNavigate();
  const params = useParams();
  console.log(data, params);
  const [toggle, isToggle] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [compareData, setCompareData] = useState(false);

  const filtredData = filterProjectsByName(data, params.project);
  const shiftLeaders = getShiftLeaders(filtredData[0].data);
  console.log(shiftLeaders);
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

  let teamLeader = [];
  try {
    teamLeader = getTeamLeaders(shiftLeader[0].data);
  } catch (e) {
    alert(e);
  }

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
          title="team leader"
          data={teamLeader}
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
            <ShiftLeadersEfficiencyASide
              data={teamLeader}
              project={params.project}
              sl={params.shitLeader}
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
                  <span> {maxObject.total}%</span>
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
            title={params.shitLeader}
            data={shiftLeader[0].data}
            date={{ date, month }}
            index={1}
            project={params.project}
            top={true}
          />
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
              <button className={c.buttonToggle} onClick={clickHandlerCompare}>
                compare
              </button>
            )}
            <button className={c.buttonToggle} onClick={clickHandler}>
              {!toggle ? "show Project details" : "hide project details"}
            </button>
          </div>

          {!toggle ? (
            !compareData ? (
              <React.Fragment>
                <h3 className={c.shiftLeaderTite}>TeamLeaders data</h3>
                {teamLeader.map(
                  (m, i) =>
                    (m.name === null ||
                      m.data.filter(
                        (f) => f.month === month[date.split("-")[1] - 1]
                      ).length > 0) && (
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
              <CompareResult compareData={compareData} />
            )
          ) : (
            <ProjectEfficiencySup data={shiftLeader} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShiftLeader;
