import React from 'react';
import '../styles/ChartCard.css';

function ChartCard({ title, children }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="chart-content">{children}</div>
    </div>
  );
}

export default ChartCard;
