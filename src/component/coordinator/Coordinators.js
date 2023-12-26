import Coordinator from "./Coordinator";
import c from "./Coordinators.module.css";
import hamzaKhartaoui from "../../assets/hamzaKhartaoui.png";
//import profileP from "../../assets/unknownProfile.jpg";
import avatar from "../../assets/avatarunkown.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import { getCoordinatorsData } from "../hooks/coordinatorDataFilters";

const Coordinators = (p) => {
  const [teamLeader, setTeamLeader] = useState({ name: "", show: false });
  const { name } = useParams();
  const data = useSelector((s) => s.datas);
  const scrollToRef = useRef();
  const coordinatoor = getCoordinatorsData(data);
  console.log(coordinatoor);
  const dataCoordinator = coordinatoor.filter((f) => f.name === name)[0];
  console.log(dataCoordinator);
  const setShiftleader = (name) => {
    setTeamLeader({ name: name, show: true });
    setTimeout(() => {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }, 40);
  };
  const teamleaders = dataCoordinator.shiftleader.filter(
    (f) => f.name === teamLeader.name
  )[0];
  console.log(teamleaders);

  return (
    <div className={c.wrapper}>
      <div className={c.Coordinator}>
        <Coordinator pic={hamzaKhartaoui} name={name} />
      </div>
      <h1>shiftLeaders</h1>
      <div
        className={c.shiftLeader}
        style={!teamLeader.show ? { marginBottom: "1rem" } : {}}
      >
        {dataCoordinator.shiftleader.map(
          (m) =>
            m.name !== null && (
              <Coordinator
                pic={hamzaKhartaoui}
                name={m.name}
                level="shiftLeader"
                setShiftleader={setShiftleader}
              />
            )
        )}
      </div>
      {teamLeader.show && (
        <React.Fragment>
          <h1 ref={scrollToRef}>{teamLeader.name} Team's Leaders </h1>

          <div className={c.teamleader}>
            {teamleaders.teamleader.map((m) => (
              <Coordinator pic={avatar} name={m.name} />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Coordinators;
