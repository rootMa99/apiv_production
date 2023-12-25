import c from "./Coordinators.module.css";
import hamzaKhartaoui from "../../assets/hamzaKhartaoui.png";
import Coordinator from "./Coordinator";
import { useSelector } from "react-redux";
import { getCoordinatorsData } from "../hooks/coordinatorDataFilters";

const CoordinatorList = (p) => {
  const data = useSelector((s) => s.datas);
const coordinators=getCoordinatorsData(data);
console.log(coordinators);




  return (
    <div className={c.wrapper}>
      <div className={c.Coordinator}>
      {
        coordinators.map((m, i)=><Coordinator pic={hamzaKhartaoui} name={m.name} key={i} />)
      }
      </div>
    </div>
  );
};

export default CoordinatorList;
