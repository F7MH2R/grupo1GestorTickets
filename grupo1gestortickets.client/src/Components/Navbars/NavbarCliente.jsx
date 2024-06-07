import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const NavbarCliente = ({ onLogout }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Navbar className="navbar-container"  expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/cliente">
                    <img
                        src="https://i.postimg.cc/ydrSvHty/logo-Solucioness.png"
                        width="50"
                        height="50"
                        alt="Logo"
                        className="mr-2"
                    />
                    Cliente 
                </Navbar.Brand>
                <Nav className="mx-auto text-center">
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto text-center">
                    </Nav>
                    <Nav className="ml-lg-auto">
                        {user && user.imgurl && (
                            <img
                                src={user.imgurl}
                                alt="User"
                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                            />
                        )}
                        {user && user.nombre && (
                            <span style={{ color: 'white', marginRight: '15px', marginTop:"5px" }}>
                                {user.nombre}
                            </span>
                        )}
                        <Button className="btn-cerrar-sesion" variant="outline-light" onClick={onLogout}>Cerrar Sesi&oacute;n</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarCliente;



