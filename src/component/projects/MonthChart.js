
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

const MonthChart=p=>{
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Line Dataset',
            type: 'line',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            fill: false,
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: 'Bar Dataset',
            type: 'bar',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [45, 88, 72, 65, 38, 70, 90],
          },
        ],
      };
    
      // Options for the chart
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    
      return (
        <div>
          <h2>Mixed Chart</h2>
          <div>
            <Line data={data} options={options} />
          </div>
        </div>
      );
}

export default MonthChart;