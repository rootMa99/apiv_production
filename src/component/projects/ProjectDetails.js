import c from "./ProjectDetails.module.css";
import { useParams } from "react-router-dom";
import ProjectEfficiency from "./ProjectEfficiency";
import React from "react";

const ProjectDetails = (p) => {
  const { project } = useParams();

  return (
    <React.Fragment>
      <h1 className={c.heading}>{project}</h1>
      <div className={c.projectContent}>
        <ProjectEfficiency />
      </div>
    </React.Fragment>
  );
};

export default ProjectDetails;
