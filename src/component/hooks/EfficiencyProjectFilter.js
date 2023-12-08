// {
//     month:"",
//     paidh:0,
//     prodh:0,
//     paidt:0,
//     prodt:0
// }

export const getDataYear=data=>{
    const monthly=[];
    const returnedArray=[];
for(let element of data){
    if(monthly.length===0){
        const month= {
            month:element.month,
            paidh:element.actualDataExcel.paidH,
            prodh:element.actualDataExcel.prodH,
            paidt:element.dataTargetExcel.payedTarget,
            prodt:element.dataTargetExcel.prodTarget,
        };
        monthly.push(month);
        continue;
    };
    const index = monthly.findIndex(f=>f.month===element.month);
    if(index===-1){
        const month= {
            month:element.month,
            paidh:element.actualDataExcel.paidH,
            prodh:element.actualDataExcel.prodH,
            paidt:element.dataTargetExcel.payedTarget,
            prodt:element.dataTargetExcel.prodTarget,
        };
        monthly.push(month);
    }else{
        monthly[index].paidh+=element.actualDataExcel.paidH;
        monthly[index].prodh+=element.actualDataExcel.prodH;
        monthly[index].paidt+=element.dataTargetExcel.payedTarget;
        monthly[index].prodt+=element.dataTargetExcel.prodTarget;
    }
}
monthly.forEach(e=>{
    const totalResult=(e.prodh/e.paidh)*100;
    const totalResultTarget=(e.prodt/e.paidt)*100;
    returnedArray.push({
        name:e.month,
        total:totalResult.toFixed(2),
        totalTarget:totalResultTarget.toFixed(2)
    })
})

return returnedArray;
}