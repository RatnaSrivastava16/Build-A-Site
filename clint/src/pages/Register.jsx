import React from "react";
import "./Register.css"
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    };
    return (
        <div className="login-main">
            <h3>Login or SignUp</h3>
            <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="button" onClick={handleLogin}>
                Login
            </button>
            </form>
        </div>
    );
}

export default Register