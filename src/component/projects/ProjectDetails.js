import c from "./ProjectDetails.module.css";
import { useParams } from "react-router-dom";
import ProjectEfficiency from "./ProjectEfficiency";
import React from "react";

const ProjectDetails = (p) => {
  const { project } = useParams();

  return (
    <React.Fragment>
      <div className={c.projectContent}>
        <div className={c.aside}>
          <h1 className={c.heading}>{project}</h1>
        </div>
        <div className={c.chartContainer}>
          <ProjectEfficiency />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectDetails;
