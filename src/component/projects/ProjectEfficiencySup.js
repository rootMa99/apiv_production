import { useSelector } from "react-redux";
import c from "./ProjectEfficiencySup.module.css";
import { useParams } from "react-router-dom";
import { filterProjectsByName } from "../hooks/getEfficiencyData";
import OuputFilter from "./projectEfficiencySupCharts/OutputFilter";

const ProjectEfficiencySup = (p) => {

    const data=useSelector(s=>s.datas);
  const date=useSelector(s=>s.additionalData);
  console.log(data);
  const params=useParams();
  console.log(params);
  const filtredData= filterProjectsByName(data, params.project);
  console.log(filtredData);

  return (
    <div className={c.projectEfficiencySup}>
      <h3>addional data</h3>
        <OuputFilter data={filtredData} date={date} title="output" actual="output" target="outputTarget"/>
        <OuputFilter data={filtredData} date={date} title="hc" actual="hc" target="hcTarget"/>
        <OuputFilter data={filtredData} date={date} title="ab" actual="ab" target="absTarget"/>
        <OuputFilter data={filtredData} date={date} title="ot" actual="ot" target=""/>
        <OuputFilter data={filtredData} date={date} title="tlo" actual="tlo" target=""/>
    </div>
  );
};

export default ProjectEfficiencySup;
