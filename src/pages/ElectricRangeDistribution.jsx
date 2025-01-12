import React, { useState, useEffect } from 'react';
import { parseCSV } from '../utils/parseCSV';
import '../styles/GeneralOverview.css'; // Reuse the same CSS file as General Overview
import ChartCard from '../components/ChartCard';

const ElectricRangeDistribution = () => {
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

  const electricRangeData = evData.map((ev) => ev['Electric Range']);
  const minRange = Math.min(...electricRangeData);
  const maxRange = Math.max(...electricRangeData);

  return (
    <ChartCard>
    <div className="general-overview-container">
      <h3 className="general-overview-title">Electric Range Distribution</h3>
      <div className="general-overview-content">
        <div className="field-box">
          <span className="field-label">Starting from : </span> 
          <span className="field-value">{minRange}  miles</span>
        </div>
        <div className="field-box">
          <span className="field-label">Goes up to : </span> 
          <span className="field-value">{maxRange}  miles</span>
        </div>
      </div>
      <div className="car-animation-container">
        <img src="/assets/car.png" alt="Car Animation" className="car-animation" />
      </div>
    </div>
    </ChartCard>
  );
};

export default ElectricRangeDistribution;
