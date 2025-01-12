import React, { useState, useEffect } from 'react';
import MapVisualization from '../components/MapVisualization';
import { parseCSV } from '../utils/parseCSV';

function EVDistributionMap() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/dataset.csv'); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const csvText = await response.text();
        const parsedData = parseCSV(csvText);

        //  the parsed data to verify postal codes exist
        console.log('Parsed Data:', parsedData);

        // Filter data based on postal code (if available)
        const mapData = parsedData.filter(item => item['Postal Code']);
        setData(mapData);
      } catch (error) {
        setError(error);
        console.error('Error fetching or parsing data:', error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <MapVisualization title="EV Distribution Map" data={data} />;
}

export default EVDistributionMap;
