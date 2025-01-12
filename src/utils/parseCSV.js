import Papa from 'papaparse';

// A function to parse CSV data from the file
// export const parseCSV = (csvText) => {
//   return new Promise((resolve, reject) => {
//     Papa.parse(csvText, {
//       header: true, // Use the first row as header
//       skipEmptyLines: true,
//       dynamicTyping: true, // Automatically convert types
//       complete: (result) => {
//         if (result.errors.length > 0) {
//           reject(result.errors);
//         } else {
//           resolve(result.data);
//         }
//       },
//       error: (err) => reject(err),
//     });
//   });
// };
// export const parseCSV = (csvText) => {
//   try {
//     const rows = csvText.split('\n'); // Split into rows
//     const headers = rows[0].split(',').map((header) => header.trim()); // Trim headers

//     const data = rows.slice(1).map((row) => {
//       const values = row.split(',').map((value) => value.trim());
//       return headers.reduce((acc, header, index) => {
//         acc[header] = values[index] ; // Handle missing values
//         return acc;
//       }, {});
//     });

//     console.log('Parsed Data:', data); // Debug parsed data

//     return data.filter((item) => Object.keys(item).length > 0); // Remove empty rows
//   } catch (error) {
//     console.error('Error parsing CSV:', error);
//     return [];
//   }
// };
export const parseCSV = (csvText) => {
  try {
    const rows = csvText.split('\n'); // Split into rows
    const headers = rows[0].split(',').map((header) => header.trim()); // Trim headers

    const data = rows.slice(1).map((row) => {
      const values = row.split(',').map((value) => value.trim());
      return headers.reduce((acc, header, index) => {
        acc[header] = values[index] || null; // Handle missing values
        return acc;
      }, {});
    });

    console.log('Parsed Data:', data); // Debug parsed data

    // Filter out rows where 'Electric Vehicle Type' is null or empty
    return data.filter((item) => item['Electric Vehicle Type'] && item['Electric Vehicle Type'] !== 'null');
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
};
