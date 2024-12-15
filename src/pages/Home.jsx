import React from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import hourGlass from "../assets/hour.jpg"
function Home() {
    const navigate = useNavigate();
    const handleStartClick = () => {
        navigate("/register");
    }
    return (
      <div className="all">
        <div className="nav">
            <h5>Track</h5>
        </div>
        <div className="maincontent">
        <div className="content">
            <div className="text">
                <h1>
                    BUILD A <span>PRODUCTIVE LIFE</span> WITH US
                </h1>
                <button className="start" onClick={handleStartClick}>START NOW</button>
            </div>
                <div className="image">
                    <img className="img" src={hourGlass} alt="Hourglass Timer Image" />
                </div>
            </div>
        </div>
      </div>
    );
}

export default Home