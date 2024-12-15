import React, { useState } from "react";
import "./Dashboard.css"
import Navbar from "../components/Navbar";
import HourGlass from "../assets/hourglass.jpg"
const Dashboard = () => {
    const [activeSection, setActiveSection] = useState(''); // Tracks which section is active
  
    // Function to handle navigation
    const handleNavClick = (section) => {
      setActiveSection(section);
    };
  
    return (
      <div>
        {/* Navbar */}
        <Navbar onNavClick={handleNavClick} />
  
        {/* Conditionally Render Sections Based on Active Menu */}
        <div style={{ padding: '2rem' }}>
          {activeSection === 'Manage' && <h2>Task</h2>}
          {activeSection === 'Timer' && <h2>Timer Functionality Here</h2>}
          {activeSection === 'Progress' && <h2>Progress Details Here</h2>}
          {activeSection === 'Home' && <div>
            <h1>BUILD A <span>PRODUCTIVE LIFE</span> WITH US </h1>
             <div className="div-image">
                            <img className="main-image" src={HourGlass} alt="Hourglass Timer Image" />
                            </div>
                        </div>}
        {activeSection === '' && <div>
            <h1>BUILD A <span>PRODUCTIVE LIFE</span> WITH US </h1>
             <div className="div-image">
                            <img className="main-image" src={HourGlass} alt="Hourglass Timer Image" />
                            </div>
                        </div>}
        </div>
      </div>
    );
  };
  
  export default Dashboard;