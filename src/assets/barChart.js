import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  ChartDataLabels,
);

export default function BarChart({data}) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            datalabels: {
              color: 'white',
              display: true,
              font: {
                weight: 'bold'
              },
              formatter: Math.round
            }
        },
        elements: {
          line: {
            fill: false
          },
          point: {
            hoverRadius: 7,
            radius: 5
          }
        },
    };
    return <Bar options={options} data={data} />;
}
