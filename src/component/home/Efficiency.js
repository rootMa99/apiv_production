import c from "./Efficiency.module.css";
import EfficiencyData from "./EfficiencyData";


const Efficiency=p=>{


    return(
        <div className={c.efficiency}>
          <h3>efficiency</h3>
          <div className={c.efficiencyContent}>
            <EfficiencyData title="last day" />      
            <EfficiencyData title="month" />  
            <EfficiencyData title="year" />      
            <EfficiencyData title="hc/day" />      

          </div>
        </div>
    )
}

export default Efficiency;