import React from "react";
import c from "./EfficiencyData.module.css";

const MONTH=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const EfficiencyData = (p) => {

  const changeMonthHandler=e=>{
    p.changeMonth(e.target.value);
  }
  const changeDayhandler=e=>{
    p.changeDay(e.target.value);
  }

  const classes = p.gap >= 0 ? `${c.green}` : `${c.red}`;
  const tclasses=p.gap >= 0 ? `${c.triangleUP}` : `${c.triangleDown}`;

  return (
    <div className={c.efficiencyData}>
      { (p.title!=="last day" && p.title!=="month" ) &&<h4 className={c.title}>{p.title} </h4>}
      {p.title==="last day" && <input className={c.title} type="date" value={p.day} onChange={changeDayhandler}/>}
      {p.title==="month" && <select className={c.title} value={p.month} onChange={changeMonthHandler}>{MONTH.map(m=><option className={c.option}>{m}</option> ) }</select>}
      <div className={c.data}>
        <div className={c.total}>
          {p.title === "hc/day" ? (
            <React.Fragment>
              {(p.gap>50)&& <span style={{color:"#008500"}}>{p.hc} </span>}
              {(p.gap<50 && p.gap>0)&& <span style={{color:"#d1962a"}}>{p.hc} </span>}
              {(p.gap<0)&& <span style={{color:"#a30202"}}>{p.hc} </span>}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {(p.gap<=0 && p.gap>=-2) && <h2 className={c.title} style={{color:"#d1962a"}}>{p.totalP}%</h2>}
              {p.gap<=-2 && <h2 className={c.title} style={{color:"#a30202"}}>{p.totalP}%</h2>}
              {p.gap>0 && <h2 className={c.title} style={{color:"#008500"}}>{p.totalP}%</h2>}

              <progress value={p.totalP} max="100"></progress>
            </React.Fragment>
          )}
        </div>
        <div className={c.addData}>
          <div className={c.gap}>
            <h5 className={c.title}>gap:</h5>
            <span className={classes}><div className={tclasses}></div> {p.gap}</span>
          </div>
          <div className={c.target}>
            <h5 className={c.title}>target:</h5>
            <span>
              {p.totalT} {p.title !== "hc/day" && "%"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyData;
