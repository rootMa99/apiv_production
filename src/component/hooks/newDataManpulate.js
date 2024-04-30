export const destractData = (d) => {
  const rd = [];
  d.map((m) => rd.push(...m.data));
  return rd;
};
const getcrData = (d) => {
  const rd = [];

  console.log(d);

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




export const getEffByTlAndCrew = (ds) => {
  const rd = [];
  const d=getcrData(ds)
  d.forEach((e) => {
    let eff;
    let effTar;
    eff =
      e.paid !== 0
        ? e.prod / e.paid
        : 0;
    effTar =
      e.paidt !== 0
        ? e.prodt / e.paidt
        : 0;

    rd.push({
      //   name: e.teamLeader + " * " + e.crew,
      name: e.crew,
      eff: eff * 100,
      effTar: effTar * 100,
      gap: eff - effTar,
      abs: e.abs,
      abst: e.abst,
      absGap: e.ab - e.abst,
      wsd: e.wsd,
      tlo: e.tlo,
      output: e.output,
      outputT: e.outputT,
      outputGap: e.output - e.outputT,
      hc: e.hc,
      hcTarget: e.hcTarget,
      hcGap: e.hcTarget - e.hc,
      family: e.family,
      project: e.project,
      coordinator: e.coordinator,
      shiftLeader: e.shiftLeader,
      teamLeader: e.teamLeader,
    });
  });
  return rd;
};

const getTlData = (d) => {
  const rd = [];

  console.log(d);

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
      abs: e.abs,
      abst: e.abst,
      absGap: e.abst - e.abs,
      wsd: e.wsd,
      tlo: e.tlo,
      output: e.output,
      outputT: e.outputT,
      outputGap: e.output - e.outputT,
      hc: e.hc,
      hcTarget: e.hcTarget,
      hcGap: e.hcTarget - e.hc,
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
