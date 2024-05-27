import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarAdmin = ({ onLogout }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/admin">Administrador</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/control-usuarios">Control de Usuarios</Nav.Link>
                        <Nav.Link as={Link} to="/registrar-usuarios">Registrar Usuarios</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button variant="outline-light" onClick={onLogout}>Cerrar Sesion</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarAdmin;




