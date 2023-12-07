
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
  BarElement,
  } from "chart.js";

const MonthChart=p=>{
    const data = {
        labels: [
          'January',
          'February',
          'March',
          'April'
        ],
        datasets: [{
          type: 'bar',
          label: 'Bar Dataset',
          data: [10, 20, 30, 40],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }, {
          type: 'line',
          label: 'Line Dataset',
          data: [5, 70, 80, 30],
          fill: false,
          borderColor: 'rgb(54, 162, 235)'
        }]
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
      ChartJS.register(
        LineElement,
        CategoryScale,
        LinearScale,
        PointElement,
        Tooltip,
        Legend,
        BarElement
      );
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