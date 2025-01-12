import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Sidebar.css'; 

function Sidebar() {
  // State for toggling the sidebar



  return (
    <div className="sidebar">
  

      {/* Sidebar Links */}
      <ul className="sidebar-links">
        <li>
          <Link to="/" className="sidebar-item">Dashboard</Link>
        </li>
        <li>
          <Link to="/insights" className="sidebar-item">Insights</Link>
        </li>
      
        <li>
          <Link to="/msrpvsrange" className="sidebar-item">MSRP Vs Range</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
