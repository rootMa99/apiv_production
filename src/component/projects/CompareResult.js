import c from "./CompareResult.module.css";
import ComparedResult from "./ComparedResult";

const CompareResult = (p) => {
    
    console.log(p.compareData)
  return (
    <div className={c.container}>
      <div className={c.result}>
        <h1>{p.compareData.selectedOptions.shiftleader1.value}</h1>
        {
          (p.compareData.selectedOptions.compareBy.map ( (m) => (
            <ComparedResult
              data={p.compareData.shiftLeaders}
              typeS={p.compareData.selectedOptions.type.value}
              name={p.compareData.selectedOptions.shiftleader1.value}
              actual={(m.value).split("/")[0]}
              target={(m.value).split("/")[1]}
            />
          )))
        }
      </div>
      <div className={c.result}>
        <h1>{p.compareData.selectedOptions.shiftleader2.value}</h1>
        {
          (p.compareData.selectedOptions.compareBy.map ( (m) => (
            <ComparedResult
              data={p.compareData.shiftLeaders}
              typeS={p.compareData.selectedOptions.type.value}
              name={p.compareData.selectedOptions.shiftleader2.value}
              actual={(m.value).split("/")[0]}
              target={(m.value).split("/")[1]}
            />
          )))
        }
      </div>
    </div>
  );
};
export default CompareResult;
