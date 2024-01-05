import { getFiltredProjectOther } from "../hooks/getEfficiencyData";
import ProjectCard from "./ProjectCard";



const OtherProjects=p=>{


const sortedData=getFiltredProjectOther(p.data)
console.log(sortedData)
return(
    <div>
        {sortedData.map((m) => (
            <ProjectCard key={m.name} title={m.name} data={m.data}  day={p.day} month={p.month} pic={m.projectUriPic} />
          ))}
    </div>
)

}

export default OtherProjects;