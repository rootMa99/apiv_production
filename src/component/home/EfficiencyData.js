import React from "react";
import c from "./EfficiencyData.module.css";

const EfficiencyData = (p) => {
  return (
    <div className={c.efficiencyData}>
      <h4 className={c.title}>{p.title} </h4>
      <div className={c.data}>
        <div className={c.total}>
          {p.title === "hc/day" ? (
            <React.Fragment>
              <h5 className={c.title}>total</h5>
              <span>67</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h4 className={c.title}>70%</h4>
              <progress value="70" max="100"></progress>
            </React.Fragment>
          )}
        </div>
        <div className={c.addData}>
          <div className={c.gap}>
            <h5 className={c.title}>gap:</h5>
            <span>67</span>
          </div>
          <div className={c.target}>
            <h5 className={c.title}>target:</h5>
            <span>67</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyData;
