import React from 'react';

const NavbarEmpleado = ({ onLogout }) => {
    return (
        <nav>
            <ul>
                <li>Empleado Dashboard</li>
                <li><button onClick={onLogout}>Cerrar Sesion</button></li>
            </ul>
        </nav>
    );
};

export default NavbarEmpleado;
