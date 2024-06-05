import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import withLoader from "../Load/withLoader ";
import { Link, useNavigate } from 'react-router-dom';
import "./RegistrarUsuarios.css";

const RegistrarUsuarios = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navegar hacia atrás
    };

    return (
        <Container className="container-registrar mt-5 pt-5">
            <h1 className="text-center mb-4">Registrar</h1>
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Img variant="top" src="https://i.ibb.co/qs6XMdg/administrador.jpg" alt="Registrar Admin" />
                            <Button  variant="warning" className="btn-usuarios mt-3" as={Link} to="/registrar-administrador">Registrar Admin</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Img variant="top" src="https://i.ibb.co/N9hmWTG/empleado.jpg" alt="Registrar Empleado" />
                            <Button variant="warning" className="btn-usuarios mt-3" as={Link} to="/registrar-empleado">Registrar Empleado</Button>
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

export default withLoader(RegistrarUsuarios);

