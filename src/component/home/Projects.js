import ProjectCard from "./ProjectCard";
import c from "./Projects.module.css";

const Projects=p=>{

    return(
        <div className={c.projectsContainer} >
            <h3 className={c.title}>Projects</h3>
            
            <div className={c.projectCardContainer}>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
             

            </div>
        </div>
    )

}
export default Projects;