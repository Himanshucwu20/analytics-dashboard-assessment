import React from 'react';
import ChartCard from '../components/ChartCard';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';

function EVTypeDistribution({ data }) {
  const evTypeCount = data.reduce((acc, row) => {
    acc[row['Electric Vehicle Type']] = (acc[row['Electric Vehicle Type']] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(evTypeCount),
    datasets: [
      {
        label: 'Number of EVs by Type',
        data: Object.values(evTypeCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <ChartCard title="EV Type Distribution">
      <Bar data={chartData} />
    </ChartCard>
  );
}

export default EVTypeDistribution;
