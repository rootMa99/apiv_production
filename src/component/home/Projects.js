import React from "react";
import { getFiltredProject, getSortedData } from "../hooks/getEfficiencyData";
import ProjectCard from "./ProjectCard";
import c from "./Projects.module.css";
import { useSelector } from "react-redux";

const Projects = (p) => {
  const day= useSelector(s=>s.additionalData);
  const data= useSelector(s=>s.datas);

  //const data = p.data;
  const datafiltred = getFiltredProject(data);

  const sortedData= getSortedData(datafiltred);
  const month = day.month[day.date.split("-")[1] - 1];
  console.log(datafiltred);

  return (
    <React.Fragment>
      <div className={c.titleContainer}>
        <h3 className={c.title}>Projects</h3>
      </div>
      <div className={c.projectsContainer}>
        <div className={c.projectCardContainer}>
          {sortedData.map((m) => (
            <ProjectCard key={m.name} title={m.name} data={m.data}  day={day.date} month={month} pic={m.projectUriPic} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Projects;
