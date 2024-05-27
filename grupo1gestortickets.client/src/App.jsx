import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Admin from './Components/Admin';
import Empleado from './Components/Empleado';
import Cliente from './Components/Cliente';
import Dashboard from './Components/Dashboard/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Navbar from './Components/Navbars/Navbar';
import CreateTicket from './Components/PantallaCliente/Agregar/CreateTicket';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/empleado" element={<Empleado />} />
                <Route path="/cliente" element={<Cliente />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="CrearTicket" element={<CreateTicket />}/>
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
