import React from 'react';
import { useNavigate } from 'react-router-dom';
//import CreateTicket from './Components/PantallaCliente/Agregar/CreateTicket';
import TicketsTableClient from './PantallaCliente/InicioCliente/TicketsTable';
const Cliente = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <TicketsTableClient/>
            <button onClick={goToDashboard}>Ir a Dashboard</button>
        </div>
    );
};

export default Cliente;
