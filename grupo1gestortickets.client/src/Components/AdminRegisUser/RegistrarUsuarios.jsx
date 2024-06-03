import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const RegistrarUsuarios = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navegar hacia atrás
    };

    return (
        <Container className="mt-5 pt-5">
            <h1 className="text-center mb-4">Registrar</h1>
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Img variant="top" src="empleado.png" alt="Registrar Admin" />
                            <Button variant="warning" className="mt-3" as={Link} to="/registrar-administrador">Registrar Admin</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Img variant="top" src="cliente.png" alt="Registrar Empleado" />
                            <Button variant="warning" className="mt-3" as={Link} to="/registrar-empleado">Registrar Empleado</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Button variant="secondary" onClick={handleBack} className="ml-2">
                Volver
            </Button>
        </Container>
    );
};

export default RegistrarUsuarios;

