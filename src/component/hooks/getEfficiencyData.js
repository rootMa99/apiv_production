export const getEfficiencyDay = (dataArray, day) => {
  const filteredData = [];

  dataArray.forEach((element) => {
    filteredData.push(
      ...element.data.filter((f) => {
        return f.date === day;
      })
    );
  });
  return filteredData;
};

export const getEfficiencyMonth = (dataArray, month) => {
  const filteredData = [];

  dataArray.forEach((element) => {
    filteredData.push(
      ...element.data.filter((f) => {
        return f.month === month;
      })
    );
  });
  return filteredData;
};

export const getEfficiencyDatas = (dataArray) => {
  let prodH = 0;
  let paidH = 0;
  let prodT = 0;
  let paidT = 0;
  dataArray.forEach((e) => {
    prodH += e.actualDataExcel.prodH;
    paidH += e.actualDataExcel.paidH;
    prodT += e.dataTargetExcel.prodTarget;
    paidT += e.dataTargetExcel.payedTarget;
  });

  return { prodH, paidH, prodT, paidT };
};

export const getEfficiencyYear = (dataArray) => {
  let prodHY = 0;
  let paidHY = 0;
  let prodTY = 0;
  let paidTY = 0;
  dataArray.forEach((e) => {
    e.data.forEach((e) => {
      prodHY += e.actualDataExcel.prodH;
      paidHY += e.actualDataExcel.paidH;
      prodTY += e.dataTargetExcel.prodTarget;
      paidTY += e.dataTargetExcel.payedTarget;
    });
  });

  return { prodHY, paidHY, prodTY, paidTY };
};

export const getHC=(dataArray)=>{
    let hc = 0;
    let hcTarget = 0;
  
    dataArray.forEach((e) => {
      hc += e.actualDataExcel.hc;
      hcTarget += e.dataTargetExcel.hcTarget;
      
    });
    hcTarget=hcTarget.toFixed(2);
    return { hc, hcTarget };
}
