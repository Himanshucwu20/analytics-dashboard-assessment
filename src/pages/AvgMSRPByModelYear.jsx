import React, { useState, useEffect } from 'react';
import { parseCSV } from '../utils/parseCSV'; 

const AvgMSRPByModelYear = () => {
  const [evData, setEvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //the CSV file from the public directory
        const response = await fetch('/dataset.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch CSV data');
        }

        const csvText = await response.text();
        const parsedData = await parseCSV(csvText);

        setEvData(parsedData); //  the data to state
      } catch (error) {
        console.error('Error fetching CSV:', error);
        setError(error.message); //  error message if something goes wrong
      } finally {
        setLoading(false); //loading state
      }
    };

    fetchData(); // data on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Ensuring data is available and mapped before rendering
  if (!evData || evData.length === 0) {
    return <div>No data available.</div>;
  }

  // Group data by Model Year
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

  // Calculate the average MSRP for each model year
  const avgMSRPByModelYear = Object.keys(msrpByModelYear).map((modelYear) => {
    const { totalMSRP, count } = msrpByModelYear[modelYear];
    return {
      modelYear,
      avgMSRP: totalMSRP / count,
    };
  });

  return (
    <div>
      <h3>Average MSRP by Model Year</h3>
      <ul>
        {avgMSRPByModelYear.map((data) => (
          <li key={data.modelYear}>
            {data.modelYear}: ${data.avgMSRP.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvgMSRPByModelYear;
