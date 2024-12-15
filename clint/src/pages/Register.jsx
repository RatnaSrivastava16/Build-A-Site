import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState(""); // State to hold email
  const [password, setPassword] = useState(""); // State to hold password
  const [confirmPassword, setConfirmPassword] = useState(""); // State to hold confirm password for registration
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register forms
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate();

  // Handle form submission for login
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email, // Using email for login
        password: password,
      });

      if (response.data.token) {
        console.log(response.data.message); // "Login successful!"
        localStorage.setItem("authToken", response.data.token); // Save token to localStorage
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setErrorMessage("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  // Handle form submission for register
  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        email: email, // Using email for registration
        password: password,
      });

      if (response.status === 201) {
        console.log(response.data.message); // "User registered successfully!"
        setIsLogin(true); // Switch to login form after successful registration
        setErrorMessage(""); // Clear error message
        // Redirect to the dashboard after successful registration
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="login-main">
      <h3>{isLogin ? "Login" : "Register"}</h3>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state for registration
          />
        )}

        <button
          className="logbtn"
          type="button"
          onClick={isLogin ? handleLogin : handleRegister} // Determine action based on login/register state
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}

        <div className="toggle-form">
          <p>
            {isLogin
              ? "New user? "
              : "Already have an account? "}
            <span
              className="toggle-link"
              onClick={() => setIsLogin(!isLogin)} // Toggle between login and register
            >
              {isLogin ? "Register here" : "Login here"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
