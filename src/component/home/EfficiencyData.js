import React from "react";
import c from "./EfficiencyData.module.css";

const EfficiencyData = (p) => {
  const classes = p.gap >= 0 ? `${c.green}` : `${c.red}`;
  const tclasses=p.gap >= 0 ? `${c.triangleUP}` : `${c.triangleDown}`;

  return (
    <div className={c.efficiencyData}>
      <h4 className={c.title}>{p.title} </h4>
      <div className={c.data}>
        <div className={c.total}>
          {p.title === "hc/day" ? (
            <React.Fragment>
              <h5 className={c.title}>total:</h5>
              <span>{p.hc} </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2 className={c.title}>{p.totalP}%</h2>
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
