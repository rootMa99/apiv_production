import c from "./Coordinators.module.css";
import hamzaKhartaoui from "../../assets/hamzaKhartaoui.png";
import Coordinator from "./Coordinator";
import { useDispatch, useSelector } from "react-redux";
import { getCoordinatorsData } from "../hooks/coordinatorDataFilters";
import { useEffect } from "react";
import { additionalDataAction } from "../../store/AdditionalData";

const CoordinatorList = (p) => {
  const data = useSelector((s) => s.datas);
  const dispatch= useDispatch();
const coordinators=getCoordinatorsData(data);
console.log(coordinators);


  useEffect(()=>{
    console.log("console log coordinator re run");
    dispatch(additionalDataAction.addCoordinator(coordinators));
  }, [dispatch, coordinators])



  return (
    <div className={`${c.wrapper} ${c.centerd}`}>
    <h1>cordinators</h1>
      <div className={c.Coordinator}>
      {
        coordinators.map((m, i)=><Coordinator pic={hamzaKhartaoui} name={m.name} key={i} level="coordinator" />)
      }
      </div>
    </div>
  );
};

export default CoordinatorList;
