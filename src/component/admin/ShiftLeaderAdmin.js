import React from "react";
import { getCoordinatorsAdmin } from "../hooks/coordinatorDataFilters";
import Coordinator from "./Coordinator";

const ShiftLeaderAdmin = (p) => {
  const coord = getCoordinatorsAdmin(p.data).filter((f) => f.name !== null);

  return (
    <React.Fragment>
      {coord.map((m, i) => (
        
        <Coordinator name={m.name} pic={m.urlPic} key={i} level="coordinator"/>
      ))}
    </React.Fragment>
  );
};

export default ShiftLeaderAdmin;
