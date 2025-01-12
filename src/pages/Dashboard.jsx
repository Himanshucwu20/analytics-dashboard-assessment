// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import GeneralOverview from './GeneralOverview';
import EVTypeDistribution from './EVTypeDistribution';
import ModelYearDistribution from './ModelYearDistribution';
import TopMakesModels from './TopMakesModels';
import { parseCSV } from '../utils/parseCSV';
import '../styles/Dashboard.css';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/dataset.csv');
      const text = await response.text();
      const parsedData = await parseCSV(text);
      setData(parsedData);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="general-overview">
        <GeneralOverview data={data} />
      </div>
      <div className="ev-type-distribution">
        <EVTypeDistribution data={data} />
      </div>
      <div className="model-year-distribution">
        <ModelYearDistribution data={data} />
      </div>
      <div className="top-makes-models">
        <TopMakesModels data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
