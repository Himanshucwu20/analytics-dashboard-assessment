import React, { useState, useEffect } from 'react';
import { parseCSV } from '../utils/parseCSV'; 

const ElectricRangeDistribution = () => {
  const [evData, setEvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the CSV file from the public directory
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
        setLoading(false); //  loading state
      }
    };

    fetchData(); //  data on component mount
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

  // Map through the data and extract electric range info
  const electricRangeData = evData.map((ev) => ev['Electric Range']); 
  const minRange = Math.min(...electricRangeData);
  const maxRange = Math.max(...electricRangeData);

  return (
    <div>
      <h3>Electric Range Distribution</h3>
      <p>Range Min: {minRange} miles, Range Max: {maxRange} miles</p>
    </div>
  );
};

export default ElectricRangeDistribution;
