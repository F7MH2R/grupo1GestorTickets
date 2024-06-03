import React from "react";
import "./Usuario.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Usuario = () => {
    const { id } = useParams();

    return (
        <>
            <Container fluid className="usuario-container">
                <Row>
                    <Col>
                        <Form>
                            <Row>
                                <div className="usuario-header">Control de usuarios {id}</div>
                                <Col>
                                    <Form.Group controlId="nombre" className="usuario-form-group">
                                        <Form.Label className="usuario-form-label">Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            value={"Juan Valdez"}
                                            className="usuario-form-control"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="cargo" className="usuario-form-group">
                                        <Form.Label className="usuario-form-label">Cargo:</Form.Label>
                                        <Form.Select className="usuario-form-select">
                                            <option>Seleccionar Cargo</option>
                                            <option value="1">Ingeniero</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="tipo" className="usuario-form-group">
                                        <Form.Label className="usuario-form-label">Tipo de usuario:</Form.Label>
                                        <Form.Select className="usuario-form-select">
                                            <option>Seleccionar Tipo</option>
                                            <option value="1">Empleado</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="usuario-form-group">
                                        <Form.Label className="usuario-form-label">Contrase&ntilde;a nueva:</Form.Label>
                                        <Form.Control type="password" className="usuario-form-control" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="text-end">
                                    <Button className="usuario-button">Guardar cambios</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Usuario;