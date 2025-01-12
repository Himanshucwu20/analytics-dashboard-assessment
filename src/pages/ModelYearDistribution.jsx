import React from 'react';
import ChartCard from '../components/ChartCard';
import { Line } from 'react-chartjs-2';

function ModelYearDistribution({ data }) {
  const modelYearCount = data.reduce((acc, row) => {
    const year = row['Model Year'];
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(modelYearCount),
    datasets: [
      {
        label: 'Number of EVs by Model Year',
        data: Object.values(modelYearCount),
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
    ],
  };

  return (
    <ChartCard title="Model Year Distribution">
      <Line data={chartData} />
    </ChartCard>
  );
}

export default ModelYearDistribution;
