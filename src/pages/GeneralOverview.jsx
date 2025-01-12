import React from 'react';
import ChartCard from '../components/ChartCard';

function GeneralOverview({ data }) {
  const totalEVs = data.length;
  const uniqueEVTypes = [...new Set(data.map(item => item['Electric Vehicle Type']))].length;

  return (
    <ChartCard title="General Overview">
      <div>Total EVs: {totalEVs}</div>
      <div>Unique EV Types: {uniqueEVTypes}</div>
    </ChartCard>
  );
}

export default GeneralOverview;
// import React, { useEffect, useState } from 'react';
// import ChartCard from '../components/ChartCard';
// import { parseCSV } from '../utils/parseCSV'; // Adjust the import path if necessary

// function GeneralOverview({ csvText }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Parse CSV on component mount
//   useEffect(() => {
//     if (csvText) {
//       const parsedData = parseCSV(csvText);
//       setData(parsedData);
//       setLoading(false);
//     }
//   }, [csvText]);

//   // Calculate statistics if data is available
//   const totalEVs = data.length;
//   const uniqueEVTypes = [...new Set(data.map(item => item['Electric Vehicle Type']))].length;

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (data.length === 0) {
//     return <div>No valid data available.</div>;
//   }

//   return (
//     <ChartCard title="General Overview">
//       <div>Total EVs: {totalEVs}</div>
//       <div>Unique EV Types: {uniqueEVTypes}</div>
//     </ChartCard>
//   );
// }

// export default GeneralOverview;
