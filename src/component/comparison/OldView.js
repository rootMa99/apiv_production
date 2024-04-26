import c from "./OldView.module.css";

const OldView = (p) => {
  return (
    <div className={c.container}>
      {p.data.gap < 0 && (
        <span className={c.ngap}>{p.data.gap.toFixed(1)}</span>
      )}
      <div className={c.mainChart}>
        <div className={c.target}>
          <div className={c.colrize} style={{ width: "86%" }}>
            {p.data.effTar.toFixed(1)}
          </div>
        </div>
        <div className={c.nameContainer}> {p.data.name} </div>
        <div className={c.actual}>
          <div className={c.colrize} style={{ width: "90%" }}>
            {p.data.eff.toFixed(1)}
          </div>
        </div>
      </div>
      {p.data.gap > 0 && (
        <span className={c.pgap}>{p.data.gap.toFixed(1)}</span>
      )}
    </div>
  );
};
export default OldView;
