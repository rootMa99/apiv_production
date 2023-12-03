import c from "./EfficiencyData.module.css";

const EfficiencyData = (p) => {
  return (
    <div className={c.efficiencyData}>
      <h4>{p.title} </h4>
      <div className={c.data}>
        <div className={c.total}>
          <h5>total:</h5>
          <span>87</span>
        </div>
        <div className={c.addData}>
          <div className={c.gap}>
            <h5>gap:</h5>
            <span>67</span>
          </div>
          <div className={c.target}>
            <h5>target:</h5>
            <span>67</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyData;
