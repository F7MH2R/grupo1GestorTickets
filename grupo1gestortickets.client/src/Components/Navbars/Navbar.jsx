import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import NavbarEmpleado from './NavbarEmpleado';
import NavbarCliente from './NavbarCliente';
import { Link } from 'react-router-dom';


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
            <BootstrapNavbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Container>
                    <BootstrapNavbar.Brand href="/login"> 
                    <img
                        src="https://i.postimg.cc/ydrSvHty/logo-Solucioness.png"
                        width="50"
                        height="50"
                        alt="Logo"
                        />{' '}Bienvenido (Navbar generica)</BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle arial-controls="basic-navbar-nav" />
                    <BootstrapNavbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Button variant="outline-light" as={Link} to="/registrar-cliente">Crear Usuario</Button>
                        </Nav>
                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
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
