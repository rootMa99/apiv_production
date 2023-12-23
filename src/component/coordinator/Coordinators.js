import Coordinator from "./Coordinator";
import c from "./Coordinators.module.css";

const Coordinators = (p) => {
  return (
    <div className={c.wrapper}>
      <div className={c.Coordinator}>
        <Coordinator />
      </div>
      <h1>shiftLeaders</h1>
      <div className={c.shiftLeader}>
        <Coordinator />
        <Coordinator />
        <Coordinator />
        <Coordinator />
        <Coordinator />
        <Coordinator />
      </div>
      <h1>TeamLeaders</h1>
      <div className={c.teamleader}>
        <Coordinator />
        <Coordinator />
        <Coordinator />
        <Coordinator />
        <Coordinator />
        <Coordinator />
      </div>
    </div>
  );
};

export default Coordinators;
