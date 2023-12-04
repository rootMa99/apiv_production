import ProjectCard from "./ProjectCard";
import c from "./Projects.module.css";
import aptivbg from "../../assets/aptivbg.jpg";

const Projects=p=>{

    return(
        <div className={c.projectsContainer} >
            <h3>Projects</h3>
            <img src={aptivbg} alt="some backGround" />
            <div className={c.projectCardContainer}>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
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