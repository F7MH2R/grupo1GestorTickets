import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin";
import Empleado from "./Components/Empleado";
import Cliente from "./Components/Cliente";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Navbar from "./Components/Navbars/Navbar";
import Usuario from "./Components/Usuario/Usuario";
import Ticket from "./Components/Ticket/Ticket";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/usuario/:id" element={<Usuario />} />
        <Route path="/ticket/:id" element={<Ticket />} />
      </Routes>
    </Router>
  );
};

export default App;
