export const destractData = (d) => {
  const rd = [];
  d.map((m) => rd.push(...m.data));
  return rd;
};
const getcrData = (d) => {
  const rd = [];

  d.forEach((e) => {
    if (rd.length === 0) {
      rd.push({
        name: e.crew,
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
        family: e.family,
        project: e.project,
        coordinator: e.coordinator,
        shiftLeader: e.shiftLeader,
        teamLeader: e.teamLeader,
        crew: e.crew,
        wd: e.actualDataExcel.output > 0 ? 1 : 0,
      });
    } else {
      const i = rd.findIndex((f) => f.name === e.crew);
      if (i === -1) {
        rd.push({
          name: e.crew,
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
          family: e.family,
          project: e.project,
          coordinator: e.coordinator,
          shiftLeader: e.shiftLeader,
          teamLeader: e.teamLeader,
          crew: e.crew,
          wd: e.actualDataExcel.output > 0 ? 1 : 0,
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
        rd[i].wd += e.actualDataExcel.output > 0 ? 1 : 0;
      }
    }
  });
  return rd;
};

export const getEffByTlAndCrew = (ds) => {
  const rd = [];
  const d = getcrData(ds);
  d.forEach((e) => {
    let eff;
    let effTar;
    eff = e.paid !== 0 ? e.prod / e.paid : 0;
    effTar = e.paidt !== 0 ? e.prodt / e.paidt : 0;

    rd.push({
      name: e.crew,
      eff: eff * 100,
      effTar: effTar * 100,
      gap: eff * 100 - effTar * 100,
      abs: e.wd === 0 ? e.abs : e.abs / e.wd,
      abst: e.wd === 0 ? e.abst : e.abst / e.wd,
      absGap: e.wd === 0 ? e.abs - e.abst : (e.abs - e.abst) / e.wd,
      wsd: e.wd === 0 ? e.wsd : e.wsd / e.wd,
      tlo: e.wd === 0 ? e.tlo : e.tlo / e.wd,
      output: e.wd === 0 ? e.output : e.output / e.wd,
      outputT: e.wd === 0 ? e.outputT : e.outputT / e.wd,
      outputGap:
        e.wd === 0 ? e.output - e.outputT : (e.output - e.outputT) / e.wd,
      hc: e.wd === 0 ? e.hc : e.hc / e.wd,
      hcTarget: e.wd === 0 ? e.hcTarget : e.hcTarget / e.wd,
      hcGap: e.wd === 0 ? e.hcTarget - e.hc : (e.hcTarget - e.hc) / e.wd,
      family: e.family,
      project: e.project,
      coordinator: e.coordinator,
      shiftLeader: e.shiftLeader,
      teamLeader: e.teamLeader,
      wd: e.wd,
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
        family: e.family,
        project: e.project,
        coordinator: e.coordinator,
        shiftLeader: e.shiftLeader,
        teamLeader: e.teamLeader,
        crew: e.crew,
        wd: e.actualDataExcel.output > 0 ? 1 : 0,
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
          family: e.family,
          project: e.project,
          coordinator: e.coordinator,
          shiftLeader: e.shiftLeader,
          teamLeader: e.teamLeader,
          crew: e.crew,
          wd: e.actualDataExcel.output > 0 ? 1 : 0,
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
        rd[i].wd += e.actualDataExcel.output > 0 ? 1 : 0;
      }
    }
  });
  return rd;
};

export const getdataCTl = (d) => {
  const pd = getTlData(d);
  const rd = [];
  pd.forEach((e) => {
    let eff;
    let effTar;
    eff = e.paid !== 0 ? e.prod / e.paid : 0;
    effTar = e.paidt !== 0 ? e.prodt / e.paidt : 0;

    rd.push({
      name: e.name,
      eff: eff * 100,
      effTar: effTar * 100,
      gap: eff * 100 - effTar * 100,
      abs: e.wd === 0 ? e.abs : e.abs / e.wd,
      abst: e.wd === 0 ? e.abst : e.abst / e.wd,
      absGap: e.wd === 0 ? e.abs - e.abst : (e.abs - e.abst) / e.wd,
      wsd: e.wd === 0 ? e.wsd : e.wsd / e.wd,
      tlo: e.wd === 0 ? e.tlo : e.tlo / e.wd,
      output: e.wd === 0 ? e.output : e.output / e.wd,
      outputT: e.wd === 0 ? e.outputT : e.outputT / e.wd,
      outputGap:
        e.wd === 0 ? e.output - e.outputT : (e.output - e.outputT) / e.wd,
      hc: e.wd === 0 ? e.hc : e.hc / e.wd,
      hcTarget: e.wd === 0 ? e.hcTarget : e.hcTarget / e.wd,
      hcGap: e.wd === 0 ? e.hcTarget - e.hc : (e.hcTarget - e.hc) / e.wd,
      family: e.family,
      project: e.project,
      coordinator: e.coordinator,
      shiftLeader: e.shiftLeader,
      teamLeader: e.teamLeader,
      crew: e.crew,
    });
  });
  return rd;
};
export const getCrews = (d) => {
  const rd = [];
  d.map((m) => rd.push(m.crew));
  return rd;
};

export const getAll = (d) => {
  const family = [];
  const sl = [];
  const coo = [];
  const project = [];
  const teamLeader = [];

  d.forEach((e) => {
    if (family.findIndex((fi) => fi === e.family) === -1) {
      family.push(e.family);
    }
    if (sl.findIndex((fi) => fi === e.shiftLeader) === -1) {
      sl.push(e.shiftLeader);
    }
    if (coo.findIndex((fi) => fi === e.coordinator) === -1) {
      coo.push(e.coordinator);
    }
    if (project.findIndex((fi) => fi === e.project) === -1) {
      project.push(e.project);
    }
    if (teamLeader.findIndex((fi) => fi === e.teamLeader) === -1) {
      teamLeader.push(e.teamLeader);
    }
  });
  return {
    family,
    sl,
    coo,
    project,
    teamLeader,
  };
};
