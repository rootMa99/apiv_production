import React from "react";
import c from "./EfficiencyData.module.css";
import { useDispatch } from "react-redux";
import { additionalDataAction } from "../../store/AdditionalData";

const EfficiencyData = (p) => {
  const dispatch = useDispatch();

  const changeDayhandler = (e) => {
    dispatch(additionalDataAction.addDate(e.target.value));
  };

  const classes =
    p.title !== "hc/day"
      ? p.gap >= 0
        ? `${c.green}`
        : `${c.red}`
      : p.gap >= 0
      ? `${c.red}`
      : `${c.green}`;
  const tclasses =
    p.title !== "hc/day"
      ? p.gap >= 0
        ? `${c.triangleUP}`
        : `${c.triangleDown}`
      : p.gap >= 0
      ? `${c.triangleUPHC}`
      : `${c.triangleDownHC}`;

  // if(p.title !== "hc/day"){
  //   classes= p.gap >= 0 ? `${c.green}` : `${c.red}`
  // }else{
  //   classes= p.gap >= 0 ? `${c.red}` :  `${c.green}`
  // }
  return (
    <div className={c.efficiencyData}>
      {p.title !== "last day" && (
        <h4 className={c.title}>{p.title === "month" ? p.month : p.title} </h4>
      )}
      {p.title === "last day" && (
        <div className={c.eff}>
          <h3 className={c.titles}>{p.title2}:</h3>

          <input
            className={c.titles}
            type="date"
            value={p.day}
            onChange={changeDayhandler}
          />
        </div>
      )}
      <div className={c.data}>
        <div className={c.total}>
          {p.title === "hc/day" ? (
            <React.Fragment>
              {p.gap > 50 && <span style={{ color: "#a30202" }}>{p.hc} </span>}
              {p.gap < 50 && p.gap >= 0 && (
                <span style={{ color: "#d1962a" }}>{p.hc} </span>
              )}
              {p.gap < 0 && <span style={{ color: "#008500" }}>{p.hc} </span>}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {p.gap <= 0 && p.gap >= -2 && (
                <h2 className={c.title} style={{ color: "#d1962a" }}>
                  {p.totalP}%
                </h2>
              )}
              {p.gap <= -2 && (
                <h2 className={c.title} style={{ color: "#a30202" }}>
                  {p.totalP}%
                </h2>
              )}
              {p.gap > 0 && (
                <h2 className={c.title} style={{ color: "#008500" }}>
                  {p.totalP}%
                </h2>
              )}

              <progress value={p.totalP} max="100"></progress>
            </React.Fragment>
          )}
        </div>
        <div className={c.addData}>
          <div className={c.gap}>
            <h5 className={c.title}>gap:</h5>
            <span className={classes}>
              <div className={tclasses}></div>{" "}
              {p.title === "hc/day" ? Math.abs(p.gap) : p.gap}
            </span>
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
