import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarEmpleado = ({ onLogout }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/empleado"><img
                    src="https://i.postimg.cc/ydrSvHty/logo-Solucioness.png"
                    width="50"
                    height="50"
                    alt="Logo"
                />Empleado Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Button variant="outline-light" onClick={onLogout}>Cerrar Sesion</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarEmpleado;

