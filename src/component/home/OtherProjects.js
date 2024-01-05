import { getFiltredProjectOther } from "../hooks/getEfficiencyData";
import ProjectCard from "./ProjectCard";
import c from "./OtherProjects.module.css";


const OtherProjects=p=>{


console.log(p.sortedData)
return(
    <div className={c.container} >
        {p.sortedData.map((m) => (
            <ProjectCard key={m.name} title={m.name} data={m.data}  day={p.day} month={p.month} pic={m.projectUriPic} other={true} />
          ))}
    </div>
)

}

export default OtherProjects;