import { getFiltredProject } from "../hooks/getEfficiencyData";
import ProjectCard from "./ProjectCard";
import c from "./Projects.module.css";

const Projects = (p) => {
    const data=p.data;
    const datafiltred= getFiltredProject(data);
    console.log(datafiltred);

  return (
    <div className={c.projectsContainer}>
      <h3 className={c.title}>Projects</h3>

      <div className={c.projectCardContainer}>
      {
        datafiltred.map(m=><ProjectCard key={m.name} title={m.name} data={m.data} />)
      }
        
        
      </div>
    </div>
  );
};
export default Projects;
