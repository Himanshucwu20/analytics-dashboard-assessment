import React, { useState, useEffect } from 'react';
import { parseCSV } from '../utils/parseCSV'; 
import '../styles/TopCountiesPostalCodes.css'; // Import the CSS file

const TopCountiesPostalCodes = () => {
  const [evData, setEvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/dataset.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch CSV data');
        }

        const csvText = await response.text();
        console.log('CSV Text:', csvText);

        const parsedData = await parseCSV(csvText);
        console.log('Parsed Data:', parsedData);

        setEvData(parsedData);
      } catch (error) {
        console.error('Error fetching CSV:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const topCounties = evData.reduce((acc, item) => {
    const county = item.County;
    if (county) {
      acc[county] = (acc[county] || 0) + 1;
    }
    return acc;
  }, {});

  const sortedCounties = Object.entries(topCounties)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div className="container">
      <h3>Top 10 Counties with EVs</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>County</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {sortedCounties.map(([county, count], index) => (
              <tr key={county}>
                <td className="rank">{index + 1}</td>
                <td className="county">{county}</td>
                <td className="count">{count} EVs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCountiesPostalCodes;
