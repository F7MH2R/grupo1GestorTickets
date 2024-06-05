import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarEmpleado = ({ onLogout }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/empleado">
                    <img
                        src="https://i.postimg.cc/ydrSvHty/logo-Solucioness.png"
                        width="50"
                        height="50"
                        alt="Logo"
                    />
                    Empleado Dashboard
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto align-items-center">
                        {user && user.imgurl && (
                            <img
                                src={user.imgurl}
                                alt="User"
                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                            />
                        )}
                        {user && user.nombre && (
                            <span style={{ color: 'white', marginRight: '10px' }}>
                                {user.nombre}
                            </span>
                        )}
                        <Button variant="outline-light" onClick={onLogout}>Cerrar Sesion</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarEmpleado;


