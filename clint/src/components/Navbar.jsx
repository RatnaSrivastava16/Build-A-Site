import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onNavClick }) => {
  const [showLogout, setShowLogout] = useState(false); // State to toggle logout option visibility
  const [menuActive, setMenuActive] = useState(false); // State for hamburger menu
  const navigate = useNavigate(); // Hook to navigate the user

  const handleLogout = () => {
    // Remove auth token from localStorage
    localStorage.removeItem("authToken");
    setShowLogout(false); // Hide logout option
    navigate("/"); // Redirect to Home page
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive); // Toggle the menu visibility
  };

  const handleNavItemClick = (section) => {
    onNavClick(section); // Call the parent function to change active section
    setMenuActive(false); // Close the menu after a selection
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🕒 Prodify</h1>
      <ul className={`nav-items ${menuActive ? "active" : ""}`}>
        <li onClick={() => handleNavItemClick("Home")} className="nav-item">
          Home
        </li>
        <li onClick={() => handleNavItemClick("Timer")} className="nav-item">
          Timer
        </li>
        <li onClick={() => handleNavItemClick("Manage")} className="nav-item">
          Manage
        </li>
        <li onClick={() => handleNavItemClick("Progress")} className="nav-item">
          Progress
        </li>
        <li
          onClick={() => setShowLogout(!showLogout)} // Toggle logout menu visibility
          className="nav-item"
        >
          <span className="material-symbols-outlined">person</span>
        </li>
      </ul>

      {/* Hamburger Icon (Three Line Menu) */}
      <div className={`hamburger-menu ${menuActive ? "active" : ""}`} onClick={toggleMenu}>
        ☰
      </div>

      {/* Conditionally render Logout option */}
      {showLogout && (
        <div className="logout-menu">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
