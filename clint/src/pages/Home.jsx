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
            <h5>🕒 Prodify</h5>
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
        {/* About Us Section */}
      <div className="about-section">
        <h2>About Us</h2>
        <p>
          We aim to help you manage your time and productivity efficiently
          through innovative solutions.
        </p>
        <div className="vision-mission">
          <div className="vision">
            <h3>Our Vision</h3>
            <p>
              To empower individuals to achieve their goals and build a
              productive future.
            </p>
          </div>
          <div className="mission">
            <h3>Our Mission</h3>
            <p>
              Deliver user-friendly tools to track and improve time management
              for all.
            </p>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>What Our Users Say</h2>
        <div className="reviews">
          <div className="review">
            <p>"This tool has transformed my productivity!"</p>
            <span>- Sarah L.</span>
          </div>
          <div className="review">
            <p>"Simple, intuitive, and very effective."</p>
            <span>- John D.</span>
          </div>
          <div className="review">
            <p>"I can't imagine planning my day without it!"</p>
            <span>- Emily R.</span>
          </div>
        </div>
      </div>
      </div>
    );
}

export default Home