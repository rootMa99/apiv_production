import * as XLSX from 'xlsx';

export function convertChartDataToWorksheet(data) {
  const rows = [];
  
  // Add header row
  rows.push(['Label', ...data.datasets.map(dataset => dataset.label)]);
  
  // Add data rows
  data.labels.forEach((label, index) => {
    const row = [label];
    data.datasets.forEach(dataset => {
      row.push(dataset.data[index]);
    });
    rows.push(row);
  });

  return XLSX.utils.aoa_to_sheet(rows);
}
export function createWorkbookWithChart(chartData) {
    const worksheet = convertChartDataToWorksheet(chartData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ChartData');
    return workbook;
  }

export function downloadExcelFile(workbook, fileName) {
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }