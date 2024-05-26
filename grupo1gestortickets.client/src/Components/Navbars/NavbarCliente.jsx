import React from 'react';

const NavbarCliente = ({ onLogout }) => {
    return (
        <nav>
            <ul>
                <li>Cliente Dashboard</li>
                <li><button onClick={onLogout}>Cerrar Sesion</button></li>
            </ul>
        </nav>
    );
};

export default NavbarCliente;

