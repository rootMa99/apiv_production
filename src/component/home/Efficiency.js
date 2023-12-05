import React from "react";
import c from "./Efficiency.module.css";
import EfficiencyData from "./EfficiencyData";

const Efficiency = (p) => {
  return (
    <React.Fragment>
      <h3 className={c.title}>efficiency</h3>
      <div className={c.efficiency}>
        <div className={c.efficiencyContent}>
          <EfficiencyData title="last day" />
          <EfficiencyData title="month" />
          <EfficiencyData title="year" />
          <EfficiencyData title="hc/day" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Efficiency;
