import React from 'react';
import EVDistributionMap from './EVDistributionMap';
import TopCountiesPostalCodes from './TopCountiesPostalCodes';
import ElectricRangeDistribution from './ElectricRangeDistribution';
import AvgMSRPByModelYear from './AvgMSRPByModelYear';

import '../styles/Insights.css';

function Insights() {
  return (
    <div className="insights">
      <div className="ev-distribution-map">
        <EVDistributionMap />
      </div>
      <div className="top-counties-postal-codes">
        <TopCountiesPostalCodes />
      </div>
      <div className="electric-range-distribution">
        <ElectricRangeDistribution />
      </div>
      <div className="avg-msrp-by-model-year">
        <AvgMSRPByModelYear />
      </div>
      
    </div>
  );
}

export default Insights;
