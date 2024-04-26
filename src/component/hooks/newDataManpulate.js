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
    //   name: e.teamLeader + " * " + e.crew,
      name: e.crew,
      eff: eff * 100,
      effTar: effTar * 100,
      gap: eff - effTar,
      abs: e.actualDataExcel.ab,
      abst: e.dataTargetExcel.absTarget,
      absGap: e.actualDataExcel.ab - e.dataTargetExcel.absTarget,
      wsd: e.actualDataExcel.wsd,
      tlo: e.actualDataExcel.tlo,
      output: e.actualDataExcel.output,
      outputT: e.dataTargetExcel.outputTarget,
      outputGap: e.actualDataExcel.output - e.dataTargetExcel.outputTarget,
      hc: e.actualDataExcel.hc,
      hcTarget: e.dataTargetExcel.hcTarget,
      hcGap: e.dataTargetExcel.hcTarget - e.actualDataExcel.hc,
    });
  });
  return rd;
};

const getTlData = (d) => {
  const rd = [];

  d.forEach((e) => {
    if (rd.length === 0) {
      rd.push({
        name: e.teamLeader,
        paid: e.actualDataExcel.paidH,
        prod: e.actualDataExcel.prodH,
        paidt: e.dataTargetExcel.payedTarget,
        prodt: e.dataTargetExcel.prodTarget,
        abs: e.actualDataExcel.ab,
        abst: e.dataTargetExcel.absTarget,
        wsd: e.actualDataExcel.wsd,
        tlo: e.actualDataExcel.tlo,
        output: e.actualDataExcel.output,
        outputT: e.dataTargetExcel.outputTarget,
        hc: e.actualDataExcel.hc,
        hcTarget: e.dataTargetExcel.hcTarget,
      });
    } else {
      const i = rd.findIndex((f) => f.name === e.teamLeader);
      if (i === -1) {
        rd.push({
          name: e.teamLeader,
          paid: e.actualDataExcel.paidH,
          prod: e.actualDataExcel.prodH,
          paidt: e.dataTargetExcel.payedTarget,
          prodt: e.dataTargetExcel.prodTarget,
          abs: e.actualDataExcel.ab,
          abst: e.dataTargetExcel.absTarget,
          wsd: e.actualDataExcel.wsd,
          tlo: e.actualDataExcel.tlo,
          output: e.actualDataExcel.output,
          outputT: e.dataTargetExcel.outputTarget,
          hc: e.actualDataExcel.hc,
          hcTarget: e.dataTargetExcel.hcTarget,
        });
      } else {
        rd[i].paid += e.actualDataExcel.paidH;
        rd[i].prod += e.actualDataExcel.prodH;
        rd[i].paidt += e.dataTargetExcel.payedTarget;
        rd[i].prodt += e.dataTargetExcel.prodTarget;
        rd[i].abs += e.actualDataExcel.ab;
        rd[i].abst += e.dataTargetExcel.absTarget;
        rd[i].wsd += e.actualDataExcel.wsd;
        rd[i].tlo += e.actualDataExcel.tlo;
        rd[i].output += e.actualDataExcel.output;
        rd[i].outputT += e.dataTargetExcel.outputTarget;
        rd[i].hc += e.actualDataExcel.hc;
        rd[i].hcTarget += e.dataTargetExcel.hcTarget;
      }
    }
  });
  return rd;
};

export const getdataCTl=d=>{
    const pd=getTlData(d);
    const rd = [];
    pd.forEach((e) => {
      let eff;
      let effTar;
      eff =
        e.paid !== 0
          ? e.prod/ e.paid
          : 0;
      effTar =
        e.paidt !== 0
          ? e.prodt / e.paidt
          : 0;
  
      rd.push({
        name: e.name,
        eff: eff * 100,
        effTar: effTar * 100,
        gap: eff*100 - effTar*100,
        abs: e.abs,
        abst: e.abst,
        absGap:  e.abst-e.abs,
        wsd: e.wsd,
        tlo: e.tlo,
        output: e.output,
        outputT: e.outputT,
        outputGap: e.output - e.outputT,
        hc: e.hc,
        hcTarget: e.hcTarget,
        hcGap: e.hcTarget - e.hc,
      });
    });
    return rd;
}
export const getCrews=d=>{
  const rd=[];
  d.map(m=>rd.push(m.crew));
  return rd;
}