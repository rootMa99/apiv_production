import React, { useState } from "react";
import {
  getFiltredProject,
  getFiltredProjectCutting,
  getFiltredProjectOther,
  getSortedData,
} from "../hooks/getEfficiencyData";
import ProjectCard from "./ProjectCard";
import c from "./Projects.module.css";
import { useSelector } from "react-redux";
import otherPic from "../../assets/other.png";
import plus from "../../assets/plus.jpg";
import OtherProjects from "./OtherProjects";
import BackDrop from "../ui/BackDrop";

const Projects = (p) => {
  const day = useSelector((s) => s.additionalData);
  const data = useSelector((s) => s.datas);
  const [other, setOther] = useState(false);
  const [cutting, setCutting] = useState(false);

  //const data = p.data;
  const datafiltred = getFiltredProject(data);

  const sortedData = getSortedData(datafiltred);
  const month = day.month[day.date.split("-")[1] - 1];

  const sortedDataot = getFiltredProjectOther(data);
  const sortedDatacut = getFiltredProjectCutting(data);

  const clickH = (e) => {
    setOther(false);
    setCutting(false);
  };

  return (
    <React.Fragment>
      {(other || cutting) && <BackDrop click={clickH} />}
      {other && (
        <OtherProjects day={day.date} month={month} sortedData={sortedDataot} />
      )}
      {cutting && (
        <OtherProjects
          day={day.date}
          month={month}
          sortedData={sortedDatacut}
        />
      )}
      <div className={c.titleContainer}>
        <h3 className={c.title}>Projects</h3>
      </div>
      <div className={c.projectsContainer}>
        <div className={c.projectCardContainer}>
          {sortedData.map((m) => (
            <ProjectCard
              key={m.name}
              title={m.name}
              data={m.data}
              day={day.date}
              month={month}
              pic={m.projectUriPic}
            />
          ))}
          <div className={c.otherP} onClick={() => setOther(true)}>
            <img src={plus} alt="other" />
            <h1>others</h1>
          </div>
          <div className={c.otherP} onClick={() => setCutting(true)}>
            <img src={otherPic} alt="other" />
            <h1>cutting</h1>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Projects;
