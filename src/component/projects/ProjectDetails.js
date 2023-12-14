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
  const {maxMonthValue, maxDayValue} = useSelector((s) => s.additionalData);
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
                <h6>
                  month:<span> {maxMonthValue.name} </span>
                </h6>
                <h6>
                  value:<span> {maxMonthValue.value} %</span>
                </h6>
              </div>
              <div className={c.maxvalues}>
                <h5>best day :</h5>
                <h6>
                  date:<span> {maxDayValue.name} </span>
                </h6>
                <h6>
                  value:<span> {maxDayValue.value} %</span>
                </h6>
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
