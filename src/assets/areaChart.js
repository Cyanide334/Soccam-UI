import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Colors,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Colors,
  ChartDataLabels,
);

export default function AreaChart({data}) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart',
          },
          datalabels: {
            backgroundColor: function(context) {
              return context.dataset.borderColor;
            },
            borderRadius: 4,
            color: 'white',
            font: {
              weight: 'bold'
            },
            formatter: Math.round,
            padding: 6
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
        scales: {
          y: {
            display: true,
            suggestedMin: 0,
          }
        }
    };
    return <Line options={options} data={data} />;
}