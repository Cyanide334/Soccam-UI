import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Colors, ChartDataLabels); 

export default function PieChart({data}) {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            datalabels: {
                backgroundColor: function(context) {
                  return context.dataset.backgroundColor;
                },
                borderColor: 'white',
                borderRadius: 25,
                borderWidth: 2,
                color: 'white',
                display: function(context) {
                  var dataset = context.dataset;
                  var count = dataset.data.length;
                  var value = dataset.data[context.dataIndex];
                  return value > count * 1.5;
                },
                font: {
                  weight: 'bold'
                },
                padding: 6,
                formatter: Math.round
              }
        },
    };
    return <Pie options={options} data={data} />;
}
