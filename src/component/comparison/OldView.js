import c from "./OldView.module.css";

const OldView = (p) => {
  return (
    <div className={c.container}>
      <span className={c.ngap}>-52</span>
      <div className={c.mainChart}>
        <div className={c.target}>
          <div className={c.colrize} style={{width:"86%"}}>86%</div>
        </div>
        <div className={c.nameContainer}> BROUROU MOHAMED </div>
        <div className={c.actual}>
          <div className={c.colrize} style={{width:"90%"}}>90%</div>
        </div>
      </div>
      <span className={c.pgap}>+9</span>
    </div>
  );
};
export default OldView;
