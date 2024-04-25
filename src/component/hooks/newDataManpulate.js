export const destractData = (d) => {
  const rd = [];
  d.map((m) => rd.push(...m.data));
  return rd;
};
export const getEffByTlAndCrew = (d) => {
  const rd = [];
  d.forEach((e) => {
      let eff;
      let effTar;
      eff =
        e.actualDataExcel.paidH !== 0
          ? e.actualDataExcel.prodH / e.actualDataExcel.paidH
          : 0;
      effTar =
        e.dataTargetExcel.payedTarget !== 0
          ? e.dataTargetExcel.prodTarget / e.dataTargetExcel.payedTarget
          : 0;
      
      rd.push({
        name:e.teamLeader+ "/" +e.crew,
        eff:eff*100,
        effTar:effTar*100,
        gap:eff-effTar,
        abs:e.actualDataExcel.ab,
        abst: e.dataTargetExcel.absTarget,
        absGap:e.actualDataExcel.ab-e.dataTargetExcel.absTarget,
        wsd:e.actualDataExcel.wsd,
        tlo:e.actualDataExcel.tlo,
        output:e.actualDataExcel.output,
        outputT:e.dataTargetExcel.outputTarget,
        outputGap:e.actualDataExcel.output-e.dataTargetExcel.outputTarget,
        hc:e.actualDataExcel.hc,
        hcTarget:e.dataTargetExcel.hcTarget,
        hcGap:e.dataTargetExcel.hcTarget-e.actualDataExcel.hc
      })
  });
  return rd;
};
