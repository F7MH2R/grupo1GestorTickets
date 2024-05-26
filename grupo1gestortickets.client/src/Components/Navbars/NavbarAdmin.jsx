import React from 'react';

const NavbarAdmin = ({ onLogout }) => {
    return (
        <nav>
            <ul>
                <li>Admin Dashboard</li>
                <li><button onClick={onLogout}>Cerrar Sesion</button></li>
            </ul>
        </nav>
    );
};

export default NavbarAdmin;

