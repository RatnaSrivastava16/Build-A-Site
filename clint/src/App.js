import './App.css';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard";

function App() {
  return(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timer" element={<Dashboard />} />
        <Route path="/manage" element={<Dashboard />} />
        <Route path="/progress" element={<Dashboard />} />
      </Routes>
  );
}

export default App;
