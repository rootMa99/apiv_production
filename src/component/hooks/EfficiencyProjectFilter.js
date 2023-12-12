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
    const totalResult = e.paidh === 0 ? 0 : (e.prodh / e.paidh) * 100;
    const totalResultTarget = e.paidt === 0 ? 0 : (e.prodt / e.paidt) * 100;
    returnedArray.push({
      name: e.month,
      total: totalResult.toFixed(1),
      totalTarget: totalResultTarget.toFixed(1),
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
    const totalResult = e.paidh === 0 ? 0 : (e.prodh / e.paidh) * 100;
    const totalResultTarget = e.paidt === 0 ? 0 : (e.prodt / e.paidt) * 100;
    returnedArray.push({
      name: e.week,
      total: totalResult.toFixed(1),
      totalTarget: totalResultTarget.toFixed(1),
    });
  });

  return returnedArray;
};
export const getDataDays = (data, allDate) => {
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
    const totalResult = e.paidh === 0 ? 0 : (e.prodh / e.paidh) * 100;
    const totalResultTarget = e.paidt === 0 ? 0 : (e.prodt / e.paidt) * 100;
    returnedArray.push({
      name: allDate === "allDate" ? e.date : e.date.split("-")[2],
      total: totalResult.toFixed(1),
      totalTarget: totalResultTarget.toFixed(1),
    });
  });

  return returnedArray;
};

export const getOutputDataYear = (data, searcheType, actual, target) => {
  const months = [];
  const returnedArray = [];
  for (let d of data) {
    if (months.length === 0) {
      months.push({
        month: d[searcheType],
        output: d.actualDataExcel[actual],
        workingDay: d.actualDataExcel[actual] === 0 ? 0 : 1,
        outputTarget:
          actual === "ab"
            ? d.dataTargetExcel[target] * d.actualDataExcel.totalhc
            : d.dataTargetExcel[target],
        workingDayTarget: d.dataTargetExcel[target] === 0 ? 0 : 1,
      });
      continue;
    }
    const index = months.findIndex((f) => f.month === d[searcheType]);
    if (index === -1) {
      months.push({
        month: d[searcheType],
        output: d.actualDataExcel[actual],
        workingDay: d.actualDataExcel[actual] === 0 ? 0 : 1,
        outputTarget:
          actual === "ab"
            ? d.dataTargetExcel[target] * d.actualDataExcel.totalhc
            : d.dataTargetExcel[target],
        workingDayTarget: d.dataTargetExcel[target] === 0 ? 0 : 1,
      });
    } else {
      months[index].output += d.actualDataExcel[actual];
      d.actualDataExcel[actual] !== 0 && months[index].workingDay++;
      actual !== "ab"
        ? (months[index].outputTarget += d.dataTargetExcel[target])
        : (months[index].outputTarget +=
            d.dataTargetExcel[target] * d.actualDataExcel.totalhc);
      d.dataTargetExcel[target] !== 0 && months[index].workingDayTarget++;
    }
  }
  months.forEach((e) => {
    //console.log(actual, e.workingDay, e.output,e.month);
    returnedArray.push({
      name: e.month,
      total:
        e.workingDay === 0
          ? 0
          : (e.output / e.workingDay).toFixed(0), 
         
      totalTarget:
        e.workingDayTarget === 0
          ? 0 : (e.outputTarget / e.workingDayTarget).toFixed(0),
    });
  });

  return returnedArray;
};

export const getDataDaysOutput = (data, actual, target) => {
  const daily = [];
  for (let element of data) {
    if (daily.length === 0) {
      daily.push({
        date: element.date,
        total: element.actualDataExcel[actual],
        totalTarget:
          actual === "ab"
            ? element.dataTargetExcel[target] * element.actualDataExcel.totalhc
            : element.dataTargetExcel[target],
      });
      continue;
    }
    const index = daily.findIndex((f) => f.date === element.date);
    if (index === -1) {
      daily.push({
        date: element.date,
        total: element.actualDataExcel[actual],
        totalTarget:
          actual === "ab"
            ? element.dataTargetExcel[target] * element.actualDataExcel.totalhc
            : element.dataTargetExcel[target],
      });
    } else {
      daily[index].total += element.actualDataExcel[actual];
      actual !== "ab"
        ? (daily[index].totalTarget += element.dataTargetExcel[target])
        : (daily[index].totalTarget +=
            element.dataTargetExcel[target] * element.actualDataExcel.totalhc);
    }
  }

  const returnedArray = [];
  daily.forEach((e) => {
    returnedArray.push({
      name: e.date.split("-")[2],
      total:  e.total.toFixed(0),
      //totalTarget: (actual==="ot" || actual==="ab") ?  (e.totalTarget).toFixed(2) : e.totalTarget,
      totalTarget:
        e.totalTarget !== undefined
          ? e.totalTarget.toFixed(0)
          : 0,
    });
  });

  return returnedArray;
};

export const getDtEfficiency = (data, searcheType) => {
  const monthly = [];
  for (let m of data) {
    if (monthly.length === 0) {
      monthly.push({
        name: m[searcheType],
        dt: m.actualDataExcel.dt,
        paidH: m.actualDataExcel.paidH,
        dtTarget: m.dataTargetExcel.dtTarget,
        paidt: m.dataTargetExcel.payedTarget,
      });
      continue;
    }
    const index = monthly.findIndex((f) => f.name === m[searcheType]);
    if (index === -1) {
      monthly.push({
        name: m[searcheType],
        dt: m.actualDataExcel.dt,
        paidH: m.actualDataExcel.paidH,
        dtTarget: m.dataTargetExcel.dtTarget,
        paidt: m.dataTargetExcel.payedTarget,
      });
    } else {
      monthly[index].dt += m.actualDataExcel.dt;
      monthly[index].paidH += m.actualDataExcel.paidH;
      monthly[index].dtTarget += m.dataTargetExcel.dtTarget;
      monthly[index].paidt += m.dataTargetExcel.payedTarget;
    }
  }
  const returnedArray = [];
  monthly.forEach((e) => {
    returnedArray.push({
      name: searcheType !== "date" ? e.name : e.name.split("-")[2],
      total: e.paidH === 0 ? 0 : ((e.dt / e.paidH) * 100).toFixed(1),
      totalTarget:
        e.paidt === 0 ? 0 : ((e.dtTarget / e.paidt) * 100).toFixed(1),
    });
  });
  return returnedArray;
};


export const getShiftLeaders = data =>{

  const shiftLeader=[];

  for(let d of data){
    if(shiftLeader.length===0){
      shiftLeader.push({
        name:d.shiftLeader,
        data:[
          {
            actualDataExcel:d.actualDataExcel,
            dataTargetExcel:d.dataTargetExcel,
            week: d.week,
            date:d.date,
            month:d.month,
          }
        ]
      });
      continue;
    }
    const index = shiftLeader.findIndex((f) => f.name === d.shiftLeader);
    if(index===-1){
      shiftLeader.push({
        name:d.shiftLeader,
        data:[
          {
            actualDataExcel:d.actualDataExcel,
            dataTargetExcel:d.dataTargetExcel,
            week: d.week,
            date:d.date,
            month:d.month,
          }
        ]
      });
    }else{
      shiftLeader[index].data.push({
        actualDataExcel:d.actualDataExcel,
        dataTargetExcel:d.dataTargetExcel,
        week: d.week,
        date:d.date,
        month:d.month,
      })
    }
    
  }
  return shiftLeader;
} 