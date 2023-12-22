import { useSelector } from "react-redux";
import c from "./ProjectEfficiencySup.module.css";
import { useParams } from "react-router-dom";
import { filterProjectsByName } from "../hooks/getEfficiencyData";
import OuputFilter from "./projectEfficiencySupCharts/OutputFilter";
import Dt from "./projectEfficiencySupCharts/Dt";

const ProjectEfficiencySup = (p) => {

    const data=useSelector(s=>s.datas);
  const date=useSelector(s=>s.additionalData);
  console.log(data);
  const params=useParams();
  console.log(params);
  const filtredData=p.data===undefined? filterProjectsByName(data, params.project) : p.data;
  console.log(filtredData);

  return (
    <div className={c.projectEfficiencySup}>
      <h3>addional data</h3>
        <OuputFilter data={filtredData} date={date} titleH="output" title="output" actual="output" target="outputTarget"/>
        <OuputFilter data={filtredData} date={date} titleH="head count"  title="hc" actual="hc" target="hcTarget"/>
        <OuputFilter data={filtredData} date={date} titleH="scrap"  title="scrap" actual="scrap" target="scrapTarget"/>
        <OuputFilter data={filtredData} date={date} titleH="ab" title="ab" actual="ab" target="absTarget"/>
        <OuputFilter data={filtredData} date={date} titleH="over time" title="ot" actual="ot" target=""/>
        <OuputFilter data={filtredData} date={date} titleH="tlo" title="tlo" actual="tlo" target=""/>
        <Dt data={filtredData} date={date} titleH="down time"  title="dt"/>
    </div>
  );
};

export default ProjectEfficiencySup;
