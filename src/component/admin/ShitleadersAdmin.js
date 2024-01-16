import React from "react";
import { getSlsAdmin } from "../hooks/coordinatorDataFilters";
import Coordinator from "./Coordinator";

const ShiftLeadersAdmin = (p) => {
  const data = getSlsAdmin(p.data).filter((f) => f.name !== null);
  console.log(data);

  return (
    <React.Fragment>
      {data.map((m, i) => (
        <Coordinator name={m.name} pic={m.urlPic} key={i}/>
      ))}
    </React.Fragment>
  );
};

export default ShiftLeadersAdmin;
