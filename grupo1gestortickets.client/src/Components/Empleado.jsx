import React from 'react';
import { useNavigate } from 'react-router-dom';

const Empleado = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <h2>Empleado Dashboard</h2>
            <button onClick={goToDashboard}>Ir a Dashboard</button>
        </div>
    );
};

export default Empleado;