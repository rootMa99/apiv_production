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
            urlPic: "",
            shiftleader: [
              {
                name: d.shiftLeader,
                urlPic: "",
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
          urlPic: "",
          shiftleader: [
            {
              name: d.shiftLeader,
              urlPic: "",
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
          coordinator[index].shiftleader.push( {
            name: d.shiftLeader,
            urlPic: "",
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
            const indextl = coordinator[index].shiftleader[indexsl].teamleader.findIndex(
              (f) => f.name === d.teamLeader
            );
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
                coordinator[index].shiftleader[indexsl].teamleader[indextl].data.push({
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
