import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import for React 18
import App from './App';
//import './index.css';

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component using the new method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
