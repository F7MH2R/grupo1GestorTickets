import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ReCliente = () => {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="text-center mb-4">
                        <h1>REGISTRAR CLIENTE</h1>
                    </div>
                    <div className="p-4 bg-light rounded">
                        <Form>
                            <Form.Group controlId="formNombres">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control type="text" placeholder="Nombres" />
                            </Form.Group>
                            <Form.Group controlId="formApellidos">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control type="text" placeholder="Apellidos" />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formCompania">
                                <Form.Label>Nombre de la Compania</Form.Label>
                                <Form.Control type="text" placeholder="Nombre de la Compania" />
                            </Form.Group>
                            <div className="text-center mt-4">
                                <Button variant="warning" type="submit">
                                    Registrarse
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ReCliente;
