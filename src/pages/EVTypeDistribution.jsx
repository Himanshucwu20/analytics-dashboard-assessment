import React from 'react';
import ChartCard from '../components/ChartCard';
import { Bar } from 'react-chartjs-2';

function EVTypeDistribution({ data }) {
  const evTypeCount = data.reduce((acc, row) => {
    const vehicleType = row['Electric Vehicle Type'];
    acc[vehicleType] = (acc[vehicleType] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(evTypeCount).map((type) => {
    if (type === 'Battery Electric Vehicle (BEV)') {
      return 'BEV';
    } else if (type === 'Plug-in Hybrid Electric Vehicle (PHEV)') {
      return 'PHEV';
    }
    return type; 
  });

  const chartData = {
    labels: labels, // Use the trimmed labels
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
