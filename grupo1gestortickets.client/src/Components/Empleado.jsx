import React from 'react';
import { useNavigate } from 'react-router-dom';
import TicketsTableClient from './PantallaEmpleado/InicioEmpleado/TicketsTable';

const Empleado = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <TicketsTableClient />
        </div>
    );
};

export default Empleado;