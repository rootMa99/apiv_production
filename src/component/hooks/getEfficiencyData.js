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

export const getHC = (dataArray) => {
  let hc = 0;
  let hcTarget = 0;

  dataArray.forEach((e) => {
    hc += e.actualDataExcel.hc;
    hcTarget += e.dataTargetExcel.hcTarget;
  });
  hcTarget = hcTarget.toFixed(0);
  return { hc, hcTarget };
};

export const getFiltredProject = (dataArray) => {
  const datafiltred = [];
  datafiltred.push(
    ...dataArray.filter((f) => {
      return (
        f.name !== "Sequencing" &&
        f.name !== "Qualité" &&
        f.name !== "App & Ch.Ing" &&
        f.name !== "OPS" &&
        f.name !== "SOS" &&
        f.name !== "AFM" &&
        f.name !== "CUTTING AREA" &&
        f.name !== "LEAD PREP AREA" &&
        f.name !== "B78/T9"
      );
    })
  );
  return datafiltred;
};

export const getEfficiencyDataByDay = (dataArray, day) => {
  const filtredData = dataArray.filter((f) => {
    return f.date === day;
  });
  const data = {
    prodH: 0,
    paidH: 0,
    prodHT: 0,
    paidHT: 0,
    hc: 0,
    ab: 0,
    tlo: 0,
    dt: 0,
  };
  filtredData.forEach((e) => {
    data.prodH += e.actualDataExcel.prodH;
    data.paidH += e.actualDataExcel.paidH;
    data.prodHT+=e.dataTargetExcel.prodTarget;
    data.paidHT+=e.dataTargetExcel.payedTarget;
    data.hc += e.actualDataExcel.hc;
    data.ab += e.actualDataExcel.ab;
    data.tlo += e.actualDataExcel.tlo;
    data.dt += e.actualDataExcel.dt;
  });

  return data;
};
export const getEfficiencyDataByMonth = (dataArray, month) => {
  const filtredData = dataArray.filter((f) => {
    return f.month === month;
  });
  const dataM = {
    prodH: 0,
    paidH: 0,
    prodHT: 0,
    paidHT: 0,
  };
  filtredData.forEach((e) => {
    dataM.prodH += e.actualDataExcel.prodH;
    dataM.paidH += e.actualDataExcel.paidH;
    dataM.prodHT+=e.dataTargetExcel.prodTarget;
    dataM.paidHT+=e.dataTargetExcel.payedTarget;
  });
  return dataM;
};

export const getEfficiencyDataByYear = (dataArray) => {
  console.log("this mrthod runing...");
  const dataY = {
    prodH: 0,
    paidH: 0,
    prodHT: 0,
    paidHT: 0,
    
  };
  dataArray.forEach((e) => {
    dataY.prodH += e.actualDataExcel.prodH;
    dataY.paidH += e.actualDataExcel.paidH;
    dataY.prodHT+=e.dataTargetExcel.prodTarget;
    dataY.paidHT+=e.dataTargetExcel.payedTarget;
  });
  return dataY;
};

export const getSortedData = (data) => {
  return data.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
};
