import { useSelector } from "react-redux";



const ShiftLeadersEfficiencyASide=p=>{
  const date = useSelector((s) => s.additionalData);
    console.log(date.shiftLeader);
    

    return(
        <div>
            <h3>shiftLeaders efficiency</h3>


        </div>
    )
}

export default ShiftLeadersEfficiencyASide;