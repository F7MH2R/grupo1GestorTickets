import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import NavbarEmpleado from './NavbarEmpleado';
import NavbarCliente from './NavbarCliente';

const Navbar = () => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return (
            <nav>
                <ul>
                    <li>Bienvenido (Navbar generica)</li>
                </ul>
            </nav>
        );
    }

    switch (user.tipo_usuario) {
        case 1:
            return <NavbarAdmin onLogout={handleLogout} />;
        case 2:
            return <NavbarEmpleado onLogout={handleLogout} />;
        case 3:
            return <NavbarCliente onLogout={handleLogout} />;
        default:
            return null;
    }
};

export default Navbar;
