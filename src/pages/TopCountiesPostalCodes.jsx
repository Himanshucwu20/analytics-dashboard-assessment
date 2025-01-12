import React, { useState, useEffect } from 'react';
import { parseCSV } from '../utils/parseCSV'; // Import the parseCSV function

const TopCountiesPostalCodes = () => {
  const [evData, setEvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the CSV file from public/ directory
        const response = await fetch('/dataset.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch CSV data');
        }
        
        // Read the CSV file as text
        const csvText = await response.text();
        console.log('CSV Text:', csvText); // Log the raw CSV for debugging

        // Parse the CSV data using the parseCSV function
        const parsedData = await parseCSV(csvText);
        console.log('Parsed Data:', parsedData); // Log parsed data

        setEvData(parsedData); // Set the parsed data to state
      } catch (error) {
        console.error('Error fetching CSV:', error);
        setError(error.message); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Call fetchData once component mounts
  }, []); // Empty dependency array ensures it runs only once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Process and display the top counties and postal codes
  const topCounties = evData.reduce((acc, item) => {
    const county = item.County;
    if (county) {
      acc[county] = (acc[county] || 0) + 1; // Count the number of EVs per county
    }
    return acc;
  }, {});

  const sortedCounties = Object.entries(topCounties)
    .sort((a, b) => b[1] - a[1]) // Sort by the number of EVs (descending)
    .slice(0, 10); // Get the top 10 counties

  return (
    <div>
      <h3>Top 10 Counties with EVs</h3>
      <ul>
        {sortedCounties.map(([county, count]) => (
          <li key={county}>
            {county}: {count} EVs
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCountiesPostalCodes;
