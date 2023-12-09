// {
//     month:"",
//     paidh:0,
//     prodh:0,
//     paidt:0,
//     prodt:0
// }

export const getDataYear = (data) => {
  const monthly = [];
  const returnedArray = [];
  for (let element of data) {
    if (monthly.length === 0) {
      const month = {
        month: element.month,
        paidh: element.actualDataExcel.paidH,
        prodh: element.actualDataExcel.prodH,
        paidt: element.dataTargetExcel.payedTarget,
        prodt: element.dataTargetExcel.prodTarget,
      };
      monthly.push(month);
      continue;
    }
    const index = monthly.findIndex((f) => f.month === element.month);
    if (index === -1) {
      const month = {
        month: element.month,
        paidh: element.actualDataExcel.paidH,
        prodh: element.actualDataExcel.prodH,
        paidt: element.dataTargetExcel.payedTarget,
        prodt: element.dataTargetExcel.prodTarget,
      };
      monthly.push(month);
    } else {
      monthly[index].paidh += element.actualDataExcel.paidH;
      monthly[index].prodh += element.actualDataExcel.prodH;
      monthly[index].paidt += element.dataTargetExcel.payedTarget;
      monthly[index].prodt += element.dataTargetExcel.prodTarget;
    }
  }
  monthly.forEach((e) => {
    const totalResult =e.paidh===0 ? 0 : (e.prodh / e.paidh) * 100;
    const totalResultTarget =e.paidt===0 ? 0 : (e.prodt / e.paidt) * 100;
    returnedArray.push({
      name: e.month,
      total: totalResult.toFixed(2),
      totalTarget: totalResultTarget.toFixed(2),
    });
  });

  return returnedArray;
};

export function getMonthData(data, month, lastMonth) {
  if (arguments.length === 3) {
    return data.filter((f) => f.month === month || f.month === lastMonth);
  }
  return data.filter((f) => f.month === month);
}

export const getWeekData = (data) => {
  const weekly = [];
  const returnedArray = [];
  for (let element of data) {
    if (weekly.length === 0) {
      const month = {
        week: element.week,
        paidh: element.actualDataExcel.paidH,
        prodh: element.actualDataExcel.prodH,
        paidt: element.dataTargetExcel.payedTarget,
        prodt: element.dataTargetExcel.prodTarget,
      };
      weekly.push(month);
      continue;
    }
    const index = weekly.findIndex((f) => f.week === element.week);
    if (index === -1) {
      const month = {
        week: element.week,
        paidh: element.actualDataExcel.paidH,
        prodh: element.actualDataExcel.prodH,
        paidt: element.dataTargetExcel.payedTarget,
        prodt: element.dataTargetExcel.prodTarget,
      };
      weekly.push(month);
    } else {
      weekly[index].paidh += element.actualDataExcel.paidH;
      weekly[index].prodh += element.actualDataExcel.prodH;
      weekly[index].paidt += element.dataTargetExcel.payedTarget;
      weekly[index].prodt += element.dataTargetExcel.prodTarget;
    }
  }
  weekly.forEach((e) => {
    const totalResult =e.paidh===0 ? 0 : (e.prodh / e.paidh) * 100;
    const totalResultTarget =e.paidt===0 ? 0 : (e.prodt / e.paidt) * 100;
    returnedArray.push({
      name: e.week,
      total: totalResult.toFixed(2),
      totalTarget: totalResultTarget.toFixed(2),
    });
  });

  return returnedArray;
};
export const getDataDays = (data) => {
  const daily = [];
  const returnedArray = [];
  for (let element of data) {
    if (daily.length === 0) {
      const month = {
        date: element.date,
        paidh: element.actualDataExcel.paidH,
        prodh: element.actualDataExcel.prodH,
        paidt: element.dataTargetExcel.payedTarget,
        prodt: element.dataTargetExcel.prodTarget,
      };
      daily.push(month);
      continue;
    }
    const index = daily.findIndex((f) => f.date === element.date);
    if (index === -1) {
      const month = {
        date: element.date,
        paidh: element.actualDataExcel.paidH,
        prodh: element.actualDataExcel.prodH,
        paidt: element.dataTargetExcel.payedTarget,
        prodt: element.dataTargetExcel.prodTarget,
      };
      daily.push(month);
    } else {
      daily[index].paidh += element.actualDataExcel.paidH;
      daily[index].prodh += element.actualDataExcel.prodH;
      daily[index].paidt += element.dataTargetExcel.payedTarget;
      daily[index].prodt += element.dataTargetExcel.prodTarget;
    }
  }
  daily.forEach((e) => {
    const totalResult =e.paidh===0 ? 0 : (e.prodh / e.paidh) * 100;
    const totalResultTarget =e.paidt===0 ? 0 : (e.prodt / e.paidt) * 100;
    returnedArray.push({
      name: e.date.split("-")[2],
      total: totalResult.toFixed(2),
      totalTarget: totalResultTarget.toFixed(2),
    });
  });

  return returnedArray;
};

export const getOutputDataYear =(data)=>{
  const months=[];
  const returnedArray = [];
  for(let d of data){
    if(months.length===0){
      months.push({
        month:d.month,
        output:d.actualDataExcel.output,
        workingDay:d.actualDataExcel.output===0 ? 0 : 1,
        outputTarget:d.dataTargetExcel.outputTarget,
        workingDayTarget: d.dataTargetExcel.outputTarget===0 ? 0 : 1, 
      });
      continue;
    }
    const index = months.findIndex((f) => f.month === d.month);
    if(index===-1){
      months.push({
        month:d.month,
        output:d.actualDataExcel.output,
        workingDay:d.actualDataExcel.output===0 ? 0 : 1,
        outputTarget:d.dataTargetExcel.outputTarget,
        workingDayTarget: d.dataTargetExcel.outputTarget===0 ? 0 : 1, 
      })
    }else{
      months[index].output+=d.actualDataExcel.output;
      d.actualDataExcel.output!==0 && months[index].workingDay++;
      months[index].outputTarget+=d.dataTargetExcel.outputTarget;
      d.dataTargetExcel.outputTarget!==0 && months[index].workingDayTarget++;
    }
  }
  months.forEach(e=>{
    returnedArray.push({
      name:e.month,
      total:e.workingDay===0 ? 0 : e.output/e.workingDay,
      totalTarget: e.workingDayTarget===0 ? 0 : e.outputTarget/e.workingDayTarget
    })
  });

  return returnedArray;
}