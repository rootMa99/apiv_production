import Coordinator from "./Coordinator";
import c from "./Coordinators.module.css";
import hamzaKhartaoui from "../../assets/hamzaKhartaoui.png";
import profileP from "../../assets/unknownProfile.jpg";
import avatar from "../../assets/avatarunkown.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const Coordinators = (p) => {

  const {name}=useParams();
  const {coordinatoor}= useSelector(s=>s.additionalData);
  console.log(coordinatoor);
  const dataCoordinator=coordinatoor.filter(f=>f.name===name)[0];
console.log(dataCoordinator);

  return (
    <div className={c.wrapper}>
      <div className={c.Coordinator}>
        <Coordinator pic={hamzaKhartaoui} name={name} />
      </div>
      <h1>shiftLeaders</h1>
      <div className={c.shiftLeader}>
        {
          dataCoordinator.shiftleader.map(m=>m.name!==null&&<Coordinator pic={hamzaKhartaoui} name={m.name} />)
        }
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
