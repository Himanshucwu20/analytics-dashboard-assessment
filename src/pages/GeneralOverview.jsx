import React from 'react';
import ChartCard from '../components/ChartCard';
import '../styles/GeneralOverview.css'; // Import the CSS file

function GeneralOverview({ data }) {
  const totalEVs = data.length;
  const uniqueEVTypes = [...new Set(data.map(item => item['Electric Vehicle Type']))].length;

  return (
    <ChartCard title="General Overview">
      <div className="field-box">
        Total EVs: <span>{totalEVs}</span>
      </div>
      <div className="field-box">
        Unique EV Types: <span>{uniqueEVTypes}</span>
      </div>
      {/* Add car animation */}
      <div className="car-animation"></div>
    </ChartCard>
  );
}

export default GeneralOverview;
