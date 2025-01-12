import React from 'react';
import Sidebar from './components/Sidebar';  // Import Sidebar
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';  // Assuming Dashboard is a page component
import Insights from './pages/Insights';  // Assuming Insights is a page component
// import Geographic from './pages/Geographic';  // Geographic insights page
// import Range from './pages/Range';  // Range and cost analysis page
import './styles/App.css';
import TopCountiesPostalCodes from './pages/TopCountiesPostalCodes';
import ElectricRangeDistribution from './pages/ElectricRangeDistribution';
import MSRPvsRange from './pages/MSRPvsRange';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    
    <Router>
      <Navbar/>
      <div className="app-container">
      
        <Sidebar /> {/* Render the Sidebar */}
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/insights" element={<Insights/>} />
            <Route path="/msrpvsrange" element={<MSRPvsRange/>} />
            {/* Add more routes as necessary */}
          </Routes>
        </div>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
