export const getCoordinatorsData = (data) => {
  const coordinator = [];

  for (let i of data) {
    for (let d of i.data) {
      if (d.coordinator === null) {
        continue;
      }
      if (coordinator.length === 0) {
        coordinator.push({
          name: d.coordinator,
          urlPic: d.coordinatorUriPic,
          shiftleader: [
            {
              name: d.shiftLeader,
              urlPic: d.shiftLeaderUriPic,
              teamleader: [
                {
                  name: d.teamLeader,
                  data: [
                    {
                      month: d.month,
                      week: d.week,
                      date: d.date,
                      actualDataExcel: d.actualDataExcel,
                      dataTargetExcel: d.dataTargetExcel,
                    },
                  ],
                },
              ],
            },
          ],
          dataByProject: [
            {
              name: d.project,
              data: [
                {
                  month: d.month,
                  week: d.week,
                  date: d.date,
                  actualDataExcel: d.actualDataExcel,
                  dataTargetExcel: d.dataTargetExcel,
                },
              ],
            },
          ],
        });
        continue;
      }
      const index = coordinator.findIndex((f) => f.name === d.coordinator);
      if (index === -1) {
        coordinator.push({
          name: d.coordinator,
          urlPic: d.coordinatorUriPic,
          shiftleader: [
            {
              name: d.shiftLeader,
              urlPic: d.shiftLeaderUriPic,
              teamleader: [
                {
                  name: d.teamLeader,
                  data: [
                    {
                      month: d.month,
                      week: d.week,
                      date: d.date,
                      actualDataExcel: d.actualDataExcel,
                      dataTargetExcel: d.dataTargetExcel,
                    },
                  ],
                },
              ],
            },
          ],
          dataByProject: [
            {
              name: d.project,
              data: [
                {
                  month: d.month,
                  week: d.week,
                  date: d.date,
                  actualDataExcel: d.actualDataExcel,
                  dataTargetExcel: d.dataTargetExcel,
                },
              ],
            },
          ],
        });
      } else {
        const indexsl = coordinator[index].shiftleader.findIndex(
          (f) => f.name === d.shiftLeader
        );
        if (indexsl === -1) {
          coordinator[index].shiftleader.push({
            name: d.shiftLeader,
            urlPic: d.shiftLeaderUriPic,
            teamleader: [
              {
                name: d.teamLeader,
                data: [
                  {
                    month: d.month,
                    week: d.week,
                    date: d.date,
                    actualDataExcel: d.actualDataExcel,
                    dataTargetExcel: d.dataTargetExcel,
                  },
                ],
              },
            ],
          });
        } else {
          const indextl = coordinator[index].shiftleader[
            indexsl
          ].teamleader.findIndex((f) => f.name === d.teamLeader);
          if (indextl === -1) {
            coordinator[index].shiftleader[indexsl].teamleader.push({
              name: d.teamLeader,
              data: [
                {
                  month: d.month,
                  week: d.week,
                  date: d.date,
                  actualDataExcel: d.actualDataExcel,
                  dataTargetExcel: d.dataTargetExcel,
                },
              ],
            });
          } else {
            coordinator[index].shiftleader[indexsl].teamleader[
              indextl
            ].data.push({
              month: d.month,
              week: d.week,
              date: d.date,
              actualDataExcel: d.actualDataExcel,
              dataTargetExcel: d.dataTargetExcel,
            });
          }
          //   coordinator[index].shiftleader[indexsl].data.push({
          //     month: d.month,
          //     week: d.week,
          //     date: d.date,
          //     actualDataExcel: d.actualDataExcel,
          //     dataTargetExcel: d.dataTargetExcel,
          //   });
        }

        const indexP = coordinator[index].dataByProject.findIndex(
          (f) => f.name === d.project
        );
        if (indexP === -1) {
          coordinator[index].dataByProject.push({
            name: d.project,
            data: [
              {
                month: d.month,
                week: d.week,
                date: d.date,
                actualDataExcel: d.actualDataExcel,
                dataTargetExcel: d.dataTargetExcel,
              },
            ],
          });
        } else {
          coordinator[index].dataByProject[indexP].data.push({
            month: d.month,
            week: d.week,
            date: d.date,
            actualDataExcel: d.actualDataExcel,
            dataTargetExcel: d.dataTargetExcel,
          });
        }
      }
    }
  }

  return coordinator;
};

export const gettoday = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
function getWeekNumber(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

export const getWeek = () => {
  const today = new Date();
  const currentWeek = getWeekNumber(today);
  if (currentWeek === 1) {
    return "WK 01";
  }
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - today.getDay() - 6);

  const weekNumber = Math.ceil(
    ((lastWeekStart - new Date(lastWeekStart.getFullYear(), 0, 1)) / 86400000 +
      1) /
      7
  );

  return `WK ${weekNumber}`;
};
export const lastMonth = () => {
  // const today = new Date("2023-08-26");
  const today = new Date();
  let lastMonthNumber = today.getMonth() - 1;

  if (lastMonthNumber === -1) {
    lastMonthNumber = 0;
  }
  const MONTH = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return MONTH[lastMonthNumber];
};

export const coordinatorEfficiency = (data, type, level) => {
  const returnedData = {
    totalProdH: 0,
    totalPaidH: 0,
    totalProdHT: 0,
    totalPaidHT: 0,
  };
  const sher =
    type === "week" ? getWeek() : type === "month" ? lastMonth() : gettoday();
  const filtredData = [];
  if (level === "teamleader" || level === "fa") {
    filtredData.push(...data.filter((f) => f[type] === sher));
  } else {
    data.forEach((element) => {
      filtredData.push(...element.data.filter((f) => f[type] === sher));
    });
  }
  console.log(filtredData);
  filtredData.forEach((e) => {
    returnedData.totalPaidH += e.actualDataExcel.paidH;
    returnedData.totalPaidHT += e.dataTargetExcel.payedTarget;
    returnedData.totalProdH += e.actualDataExcel.prodH;
    returnedData.totalProdHT += e.dataTargetExcel.prodTarget;
  });

  return returnedData;
};

export const getdatacal = (data, type, act, level) => {
  const sher =
    type === "week" ? getWeek() : type === "month" ? lastMonth() : gettoday();
  const filtredData = [];
  if (level === "teamleader" || level === "fa") {
    filtredData.push(...data.filter((f) => f[type] === sher));
  } else {
    data.forEach((element) => {
      filtredData.push(...element.data.filter((f) => f[type] === sher));
    });
  }
  const datare = {
    data: 0,
    workingDay: 0,
  };
  filtredData.forEach((e) => {
    datare.data += e.actualDataExcel[act];
    e.actualDataExcel[act] !== 0 && datare.workingDay++;
  });

  return datare.workingDay === 0
    ? 0
    : type === "date"
    ? datare.data
    : datare.data / datare.workingDay;
};

export const getScrap = (data, type, level) => {
  const sher =
    type === "week" ? getWeek() : type === "month" ? lastMonth() : gettoday();
  const filtredData = [];
  if (level === "teamleader" || level === "fa") {
    filtredData.push(...data.filter((f) => f[type] === sher));
  } else {
    data.forEach((element) => {
      filtredData.push(...element.data.filter((f) => f[type] === sher));
    });
  }
  let rdata = 0;

  filtredData.forEach((e) => {
    rdata += e.dataTargetExcel.scrap;
  });

  return rdata;
};

export const faData = (data) => {
  const datar = [];

  data.forEach((f) => {
    f.dataByProject.map((m) => datar.push(...m.data));
  });

  return datar;
};


export const getCoordinatorData=data=>{

  const datar=[];
data.forEach(f=>{
  const t=[];
  f.dataByProject.map(m=>t.push(...m.data))
  datar.push({
    name:f.name,
    data:t
  })
})

return datar;
}


export const getCoordinatorsAdmin=data=>{

  const returnedData=[];

  data.forEach(e=>{
    e.data.forEach(
      el=>{
        const index=returnedData.findIndex(
          (f) => f.name === el.coordinator
        );
        if(index===-1){
          returnedData.push({
            name:el.coordinator,
            urlPic:el.coordinatorUriPic
          })
        }
      }
    )
  })

  return returnedData;
}

export const getSlsAdmin=data=>{

  const returnedData=[];

  data.forEach(e=>{
    e.data.forEach(
      el=>{
        const index=returnedData.findIndex(
          (f) => f.name === el.shiftLeader
        );
        if(index===-1){
          returnedData.push({
            name:el.shiftLeader,
            urlPic:el.shiftLeaderUriPic
          })
        }
      }
    )
  })

  return returnedData;
}