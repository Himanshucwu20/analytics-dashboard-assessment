import React, { useState, useEffect } from 'react';
import { parseCSV } from '../utils/parseCSV'; // Import parseCSV utility

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

        setEvData(parsedData); // Set the data to state
      } catch (error) {
        console.error('Error fetching CSV:', error);
        setError(error.message); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Ensure data is available and mapped before rendering
  if (!evData || evData.length === 0) {
    return <div>No data available.</div>;
  }

  // Map through the data and extract electric range info
  const electricRangeData = evData.map((ev) => ev['Electric Range']); // Make sure the column name matches
  const minRange = Math.min(...electricRangeData);
  const maxRange = Math.max(...electricRangeData);

  return (
    <div>
      <h3>Electric Range Distribution</h3>
      <p>Range Min: {minRange} miles, Range Max: {maxRange} miles</p>
      {/* You can display a chart or other content based on the data here */}
    </div>
  );
};

export default ElectricRangeDistribution;
