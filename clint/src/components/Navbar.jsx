import React from "react";
import "./Navbar.css"
const Navbar = () => {
    return (
        <header>
            <h5>🕒 Track</h5>
            <div className="menu">
                <span>Timer</span>
                <span>Manage</span>
                <span>Progress</span>
                <span className="material-symbols-outlined">person</span>
            </div>
        </header>
    );
}

export default Navbar