import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import withLoader from "../Load/withLoader ";
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
                            <Card.Img variant="top" src="https://i.ibb.co/qs6XMdg/administrador.jpg" alt="Registrar Admin" />
                            <Button style={{ color: "black", background: "#FDDD00" }} variant="warning" className="mt-3" as={Link} to="/registrar-administrador">Registrar Admin</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Img variant="top" src="https://i.ibb.co/N9hmWTG/empleado.jpg" alt="Registrar Empleado" />
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

export default withLoader(RegistrarUsuarios);

