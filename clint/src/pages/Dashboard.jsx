import React from "react";
import "./Dashboard.css"
import Navbar from "../components/Navbar";
import HourGlass from "../assets/hourglass.jpg"
function Dashboard() {
    return (
        <div>
            <Navbar />
            <div className="dashboard-main">
                <h1>
                    BUILD A <span>PRODUCTIVE</span> LIFE WITH US
                </h1>
                <img src= { HourGlass } alt="Hourglass image" />
            </div>
        </div>
    );
}

export default Dashboard