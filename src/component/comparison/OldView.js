import c from "./OldView.module.css";

const OldView = (p) => {
  console.log(p.type, p.data[p.type]);
  return (
    <div className={c.container}>
      {p.data[p.type] < 0 && (
        <span
          className={c.ngap}
          style={p.act === "abs" ? { color: "green" } : {}}
        >
          {p.data[p.type].toFixed(1)}
        </span>
      )}
      <div className={c.mainChart}>
        {p.tar !== 0 && (
          <div className={c.target}>
            <div className={c.colrize} style={{ width: `${p.data[p.tar]}%` }}>
              {p.data[p.tar].toFixed(1)}
            </div>
          </div>
        )}
        <div className={c.nameContainer}> {p.data.name} </div>
        <div className={c.actual}>
          <div
            className={c.colrize}
            style={
              p.data[p.type] > 0 || p.data[p.type] === undefined
                ? { width: `${p.data[p.act]}%` }
                : { width: `${p.data[p.act]}%`, backgroundColor: "#CF3335" }
            }
          >
            {p.data[p.act].toFixed(1)}
          </div>
        </div>
      </div>
      {p.data[p.type] > 0 && (
        <span
          className={c.pgap}
          style={p.act === "abs" ? { color: "red" } : {}}
        >
          {p.data[p.type].toFixed(1)}
        </span>
      )}
    </div>
  );
};
export default OldView;
