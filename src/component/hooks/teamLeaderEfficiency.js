


export const getTeamLeaders = (data) => {
    const teamLeader = [];
  
    for (let d of data) {
      if (teamLeader.length === 0) {
        teamLeader.push({
          name: d.teamLeader,
          data: [
            {
              actualDataExcel: d.actualDataExcel,
              dataTargetExcel: d.dataTargetExcel,
              week: d.week,
              date: d.date,
              month: d.month,
              family: d.family,
              crew: d.crew,
              coordinator: d.coordinator,
            },
          ],
        });
        continue;
      }
      const index = teamLeader.findIndex((f) => f.name === d.teamLeader);
      if (index === -1) {
        teamLeader.push({
          name: d.teamLeader,
          data: [
            {
              actualDataExcel: d.actualDataExcel,
              dataTargetExcel: d.dataTargetExcel,
              week: d.week,
              date: d.date,
              month: d.month,
              family: d.family,
              crew: d.crew,
              coordinator: d.coordinator,
            },
          ],
        });
      } else {
        teamLeader[index].data.push({
          actualDataExcel: d.actualDataExcel,
          dataTargetExcel: d.dataTargetExcel,
          week: d.week,
          date: d.date,
          month: d.month,
          family: d.family,
          crew: d.crew,
          coordinator: d.coordinator,
        });
      }
    }
    return teamLeader;
  };
  