import Coordinator from "./Coordinator";
import c from "./Coordinators.module.css";
import hamzaKhartaoui from "../../assets/hamzaKhartaoui.png";
import profileP from "../../assets/unknownProfile.jpg";
import avatar from "../../assets/avatarunkown.png";


const Coordinators = (p) => {
  return (
    <div className={c.wrapper}>
      <div className={c.Coordinator}>
        <Coordinator pic={hamzaKhartaoui} />
      </div>
      <h1>shiftLeaders</h1>
      <div className={c.shiftLeader}>
        <Coordinator pic={profileP} />
        <Coordinator pic={profileP}/>
        <Coordinator pic={profileP}/>
        <Coordinator pic={profileP}/>
        <Coordinator pic={profileP}/>
      </div>
      <h1>TeamLeaders</h1>
      <div className={c.teamleader}>
        <Coordinator pic={avatar}/>
        <Coordinator pic={avatar}/>
        <Coordinator pic={avatar}/>
        <Coordinator pic={avatar}/>
        <Coordinator pic={avatar}/>
        <Coordinator pic={avatar}/>
      </div>
    </div>
  );
};

export default Coordinators;
