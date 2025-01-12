// components/MSRPvsRange.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { parseCSV } from '../utils/parseCSV';
import '../styles/MSRPvsRange.css';

// Register the necessary components here
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend
);

const MSRPvsRange = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
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

        console.log('Parsed Data:', parsedData); // Debug the data structure

        // Look for the exact column name for the year
        const labels = parsedData.map((item) => {
          return item['Year']?.trim() || item['Model Year']?.trim() || 'Unknown Year';
        });

        const msrpData = parsedData.map((item) => parseFloat(item['Base MSRP']) || 0);
        const rangeData = parsedData.map((item) => parseFloat(item['Electric Range']) || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: 'MSRP',
              data: msrpData,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            },
            {
              label: 'Range',
              data: rangeData,
              borderColor: 'rgba(153,102,255,1)',
              backgroundColor: 'rgba(153,102,255,0.2)',
              fill: true,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="msrp-vs-range-container">
      <h2>MSRP vs Range</h2>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          }}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default MSRPvsRange;
