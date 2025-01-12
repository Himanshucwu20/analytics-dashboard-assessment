import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import './Sidebar.css'; // Make sure to import the CSS

function Sidebar() {
  // State for toggling the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      {/* Sidebar Toggle Button */}
      {/* <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button> */}

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
