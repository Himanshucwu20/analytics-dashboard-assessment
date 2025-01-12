import React from 'react';
import ChartCard from '../components/ChartCard';
import '../styles/TopMakesModels.css'; // Import the CSS file

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
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Make & Model</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {sortedMakesModels.map(([makeModel, count], index) => (
              <tr key={index}>
                <td className="rank">{index + 1}</td>
                <td className="make-model">{makeModel}</td>
                <td className="count">{count} EVs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}

export default TopMakesModels;
