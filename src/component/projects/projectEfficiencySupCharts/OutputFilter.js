import { getOutputDataYear } from "../../hooks/EfficiencyProjectFilter";
import c from "./OutputFilter.module.css";


const OuputFilter=p=>{

    const month=p.date.date.split("-")[1];
    const data= p.data;
    console.log(month, data)

    const monthly=getOutputDataYear(data[0].data);
    console.log(monthly);

    return(
        <div className={c.chartsContainer}>
            <h4 className={c.title}>Output</h4>
            <div className={c.chartContainer}>
                <div className={c.chart}>
                
                </div>
            </div>
        </div>
    )
}

export default OuputFilter;