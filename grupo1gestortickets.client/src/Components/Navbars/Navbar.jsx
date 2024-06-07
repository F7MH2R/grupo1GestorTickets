import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import NavbarEmpleado from './NavbarEmpleado';
import NavbarCliente from './NavbarCliente';
import { Link } from 'react-router-dom';
import "./Navbar.css";

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
            <BootstrapNavbar className="navbar-container" expand="lg" fixed="top">
                <Container>
                    <div className="d-flex align-items-center mr-auto">
                        <BootstrapNavbar.Brand href="/login">
                            <img
                                src="https://i.postimg.cc/ydrSvHty/logo-Solucioness.png"
                                width="50"
                                height="50"
                                alt="Logo"
                            />{' '}Bienvenido
                        </BootstrapNavbar.Brand>
                    </div>
                    <div className="ml-auto">
                        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                        <BootstrapNavbar.Collapse id="basic-navbar-nav">
                            <Nav>
                                <Button className="boton-derecha" variant="outline-light" as={Link} to="/registrar-cliente">Crear Usuario</Button>
                            </Nav>
                        </BootstrapNavbar.Collapse>
                    </div>
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
