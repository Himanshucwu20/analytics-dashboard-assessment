import React, { useState, useEffect } from 'react';
import { parseCSV } from '../utils/parseCSV';
import '../styles/AvgMSRPByModelYear.css'; // Import the CSS file

const AvgMSRPByModelYear = () => {
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
        const parsedData = await parseCSV(csvText);

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

  if (!evData || evData.length === 0) {
    return <div>No data available.</div>;
  }

  const msrpByModelYear = evData.reduce((acc, ev) => {
    const modelYear = ev['Model Year'];
    const msrp = parseFloat(ev['Base MSRP']);

    if (modelYear && !isNaN(msrp)) {
      if (!acc[modelYear]) {
        acc[modelYear] = { totalMSRP: 0, count: 0 };
      }
      acc[modelYear].totalMSRP += msrp;
      acc[modelYear].count += 1;
    }
    return acc;
  }, {});

  const avgMSRPByModelYear = Object.keys(msrpByModelYear).map((modelYear) => {
    const { totalMSRP, count } = msrpByModelYear[modelYear];
    return {
      modelYear,
      avgMSRP: totalMSRP / count,
    };
  });

  return (
    <div className="container">
      <h3>Average MSRP by Model Year</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Model Year</th>
              <th>Average MSRP</th>
            </tr>
          </thead>
          <tbody>
            {avgMSRPByModelYear.map((data) => (
              <tr key={data.modelYear}>
                <td className="model-year">{data.modelYear}</td>
                <td className="avg-msrp">${data.avgMSRP.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvgMSRPByModelYear;
