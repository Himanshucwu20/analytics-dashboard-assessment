import React from 'react';
import ChartCard from '../components/ChartCard';

function TopMakesModels({ data }) {
  const makeModelCount = data.reduce((acc, row) => {
    const makeModel = `${row['Make']} - ${row['Model']}`;
    acc[makeModel] = (acc[makeModel] || 0) + 1;
    return acc;
  }, {});

  const sortedMakesModels = Object.entries(makeModelCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <ChartCard title="Top Makes and Models">
      <ul>
        {sortedMakesModels.map(([makeModel, count], index) => (
          <li key={index}>
            {makeModel}: {count} EVs
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}

export default TopMakesModels;
