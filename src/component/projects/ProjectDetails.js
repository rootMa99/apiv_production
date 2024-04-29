import c from "./ProjectDetails.module.css";
import { useParams } from "react-router-dom";
import ProjectEfficiency from "./ProjectEfficiency";
import React, { useState } from "react";
import ProjectEfficiencySup from "./ProjectEfficiencySup";
import { useSelector } from "react-redux";
import ShiftLeadersEfficiency from "./leaders/ShiftLeadersEfficiency";
import ShiftLeadersEfficiencyASide from "./leaders/ShiftLeadersEfficiencyASide";
import BackDrop from "../ui/BackDrop";
import Compare from "./Compare";
import CompareResult from "./CompareResult";

const ProjectDetails = (p) => {
  const { project } = useParams();
  const { maxMonthValue, maxDayValue } = useSelector((s) => s.additionalData);
  const [toggle, isToggle] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [compareData, setCompareData] = useState(false);
  const clickHandlerCompare = (e) => {
    setIsCompare(!isCompare);
  };
  const clickHandler = (e) => {
    isToggle(!toggle);
  };
  const comparedata = (data) => {
    setCompareData(data);
    isToggle(false);
  };

  console.log(compareData);
  return (
    <React.Fragment>
      <div className={c.projectContent}>
        {isCompare && <BackDrop click={clickHandlerCompare} />}
        {isCompare && (
          <Compare
            project={project}
            compare={comparedata}
            click={clickHandlerCompare}
            title="shift leader"
          />
        )}

        <div className={isCompare ? `${c.aside} ${c.asideTop}` : `${c.aside}`}>
          <h3 className={c.headingS}>project details</h3>
          <div className={c.asideins}>
            <h1 className={c.heading}>{project}</h1>
            <ShiftLeadersEfficiencyASide project={project} />
            <h2 className={c.headingba}>
              b<span>est</span> a<span>chievement</span>
            </h2>
            <React.Fragment>
              <div className={c.maxvalues}>
                <h5>best month :</h5>
                <div className={c.bestData}>
                  <span> {maxMonthValue.name} </span>
                  <span> {maxMonthValue.value}%</span>
                </div>
                <h5>best day :</h5>
                <div className={c.bestData}>
                  <span>
                    {maxDayValue.name.split("-")[2] +
                      "/" +
                      maxDayValue.name.split("-")[1]}
                  </span>
                  <span> {maxDayValue.value} %</span>
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
        <div className={c.chartContainer}>
          <ProjectEfficiency title={project} />
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
          {toggle ? (
            <ProjectEfficiencySup />
          ) : !compareData ? (
            <ShiftLeadersEfficiency />
          ) : (
            <CompareResult compareData={compareData} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectDetails;
