import React, { useState } from "react";
import "./Dashboard.css"
import Navbar from "../components/Navbar";
import TaskManager from "../components/TaskManager"
import Timer from "../components/Timer"
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
          {activeSection === 'Manage' && <TaskManager />}
          {activeSection === 'Timer' && <Timer />}
          {activeSection === 'Progress' && <h2>Progress Details Here</h2>}
          {activeSection === 'Home' && <div>
            <h1>BUILD A <span>PRODUCTIVE LIFE</span> WITH US </h1>
             <div className="div-image">
                            <img className="main-image" src={HourGlass} alt="Hourglass Timer" />
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