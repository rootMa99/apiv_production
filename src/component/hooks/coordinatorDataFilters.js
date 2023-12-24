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
            },
          ],
          teamleader: [d.teamLeader],
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
            },
          ],
          teamleader: [d.teamLeader],
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
        if (
          coordinator[index].shiftleader.findIndex(
            (f) => f.name === d.shiftLeader
          ) === -1
        ) {
          coordinator[index].shiftleader.push({
            name: d.shiftLeader,
            urlPic: "",
          });
        }
        if (
          coordinator[index].teamleader.findIndex((f) => f === d.teamLeader) ===
          -1
        ) {
          coordinator[index].teamleader.push(d.teamLeader);
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
