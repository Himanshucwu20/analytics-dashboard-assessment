import React from 'react';
import Sidebar from './components/Sidebar'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';  
import Insights from './pages/Insights';  
import './styles/App.css';
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
