import React from "react";
import "./Usuario.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Usuario = () => {
  const { id } = useParams();

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Form>
              <Row>
                <Col className="text-end">
                  <h2>Control de usuarios: {id}</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={"Juan Valdez"}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="cargo">
                    <Form.Label>Cargo:</Form.Label>
                    <Form.Select>
                      <option>Seleccionar Cargo</option>
                      <option value={1}>Usuario</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="tipo">
                    <Form.Label>Tipo de usuario:</Form.Label>
                    <Form.Select>
                      <option>Seleccionar Tipo</option>
                      <option value={1}>Admin</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Contrase&ntilde;a nueva:</Form.Label>
                    <Form.Control type="password"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="text-end">
                  <Button variant="warning">Actualizar</Button>
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
