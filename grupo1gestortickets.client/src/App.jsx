import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Admin from './Components/Admin';
import Empleado from './Components/Empleado';
import Cliente from './Components/Cliente';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/empleado" element={<ProtectedRoute><Empleado /></ProtectedRoute>} />
                <Route path="/cliente" element={<ProtectedRoute><Cliente /></ProtectedRoute>} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
