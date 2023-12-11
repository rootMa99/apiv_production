import c from "./OutputFilter.module.css";

const Dt = (p) => {

    console.log(p.data, p.date, "down time")
    

  return(<div
    className={c.chartsContainer}
    style={p.title !== "output" ? { marginTop: "3rem" } : {}}
  >
    <h3 className={c.title}>{p.titleH}</h3>
    <div className={c.chartContainer}>
      <div className={c.chart}></div>
      <div className={c.chart}></div>
    </div>
    <div className={c.chartd}></div>
  </div>)
};
export default Dt;
