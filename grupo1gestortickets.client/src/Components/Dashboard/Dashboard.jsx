import React, { useEffect, useState } from 'react';
import { Container, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="dashboard-container-uno">
            <Container className="dashboard-container-dos">
                <Row className="dashboard-content">
                    <h1 className="dashboard-title">Bienvenido, {user.nombre || 'User'}</h1>
                    <div className="user-details">
                        <p className="user-detail">Correo electr&oacute;nico: {user.correo || 'Not available'}</p>
                        <p className="user-detail">Tipo de Usuario: {user.tipo_usuario || 'Not available'}</p>
                        <p className="user-detail">Tel&eacute;fono: {user.telefono || 'Not available'}</p>
                        <p className="user-detail">Cargo: {user.cargo || 'Not available'}</p>
                        <p className="user-detail">Estado de Cuenta: {user.estado_cuenta || 'Not available'}</p>
                        <p className="user-detail">Fecha de Creaci&oacute;n: {user.fechaCreacion ? new Date(user.fechaCreacion).toLocaleDateString() : 'Not available'}</p>
                    </div>
                    <Button variant="secondary" onClick={handleBack} className="back-btn">
                        Volver
                    </Button>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
