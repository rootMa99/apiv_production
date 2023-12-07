import c from "./ProjectDetails.module.css";
import cs from "../Home.module.css";
import { useParams } from "react-router-dom";
import Efficiency from "../home/Efficiency";

const ProjectDetails=p=>{
    const { project } = useParams();


    return (
        <div className={cs.container}>
          <div className={cs.content}>
            <h1 className={c.heading}>{project}</h1>
            <Efficiency singleProject={project} />
          </div>
        </div>
      );
}

export default ProjectDetails;