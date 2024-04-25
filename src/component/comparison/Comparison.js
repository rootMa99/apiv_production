import { useSelector } from "react-redux";
import { destractData} from "../hooks/newDataManpulate";
import TlAndCrew from "./TlAndCrew";


const Comparison = (p) => {
  let data = useSelector((s) => s.datas);
  const { date } = useSelector((s) => s.additionalData);
  const fd = destractData(data).filter((f) => f.date === date && f.teamLeader!==null);
 
  return (
    <div style={{ width: "100%"}}>
        <TlAndCrew fd={fd} />
    </div>
  )
};

export default Comparison;
