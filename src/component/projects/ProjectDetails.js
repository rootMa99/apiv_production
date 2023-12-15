import c from "./ProjectDetails.module.css";
import { useParams } from "react-router-dom";
import ProjectEfficiency from "./ProjectEfficiency";
import React, { useState } from "react";
import ProjectEfficiencySup from "./ProjectEfficiencySup";
import { useSelector } from "react-redux";
import ShiftLeadersEfficiency from "./leaders/ShiftLeadersEfficiency";
import ShiftLeadersEfficiencyASide from "./leaders/ShiftLeadersEfficiencyASide";

const ProjectDetails = (p) => {
  const { project } = useParams();
  const { maxMonthValue, maxDayValue } = useSelector((s) => s.additionalData);
  const [toggle, isToggle] = useState(false);
  const clickHandler = (e) => {
    isToggle(!toggle);
  };
  return (
    <React.Fragment>
      <div className={c.projectContent}>
        <div className={c.aside}>
          <h1 className={c.heading}>{project}</h1>
          {!toggle ? (
            <React.Fragment>
              <div className={c.maxvalues}>
                <h5>best month :</h5>
                <div className={c.bestData}>
                  <h6>month:</h6>
                  <span> {maxMonthValue.name} </span>
                </div>
                <div className={c.bestData}>
                  <h6>value:</h6>
                  <span> {maxMonthValue.value}%</span>
                </div>
              </div>
              <div className={c.maxvalues}>
                <h5>best day :</h5>
                <div className={c.bestData}>
                  <h6>date:</h6>
                  <span> {maxDayValue.name} </span>
                </div>
                <div className={c.bestData}>
                  <h6>value:</h6>
                  <span> {maxDayValue.value} %</span>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <ShiftLeadersEfficiencyASide project={project} />
          )}
        </div>
        <div className={c.chartContainer}>
          <ProjectEfficiency title={project} />

          <button className={c.buttonToggle} onClick={clickHandler}>
            {!toggle ? "show Project details" : "hide project details"}
          </button>
          {toggle ? <ProjectEfficiencySup /> : <ShiftLeadersEfficiency />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectDetails;
