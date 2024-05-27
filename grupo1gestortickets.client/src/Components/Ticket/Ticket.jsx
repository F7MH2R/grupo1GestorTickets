import React from "react";
import "./Ticket.css";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Ticket = () => {
  const { id } = useParams();
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="titulo">
                    <Form.Label>Titulo del ticket</Form.Label>
                    <Form.Control
                      disabled
                      value={"Instalar windows 11"}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="descripcion">
                    <Form.Label>Descripci&oacute;n del problema</Form.Label>
                    <Form.Control
                      disabled
                      value={
                        "Debido a mis responsabilidades necessito instalar Office 365"
                      }
                      as="textarea"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="correo">
                    <Form.Label>Correo de contacto</Form.Label>
                    <Form.Control
                      disabled
                      value={"ivonne@server.com"}
                      type="email"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="telefono">
                    <Form.Label>Tel&eacute;fono de contacto</Form.Label>
                    <Form.Control
                      disabled
                      value={"75623212"}
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="fecha">
                    <Form.Label>Fecha de creaci&oacute;n</Form.Label>
                    <Form.Control
                      disabled
                      value={"06/05/2024"}
                      type="text"
                      className="text-center"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="estado">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select>
                      <option value={1}>Abierto</option>
                      <option value={2}>En proceso</option>
                      <option value={3}>Sin asignar</option>
                      <option value={4}>Cerrado</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="prioridad">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select>
                      <option value={1}>Baja</option>
                      <option value={2}>Media</option>
                      <option value={3}>Alta</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="archivos">
                    <Form.Label>Archivos adjuntos</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={"Archivo1.jpg"}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="responsable">
                    <Form.Label>Responsable</Form.Label>
                    <Form.Select>
                      <option value={0}></option>
                      <option value={1}>Empleado A</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="comentarios">
                    <Form.Label>Comentarios</Form.Label>
                    <Form.Control value={""} as="textarea"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="text-end">
                  <Button variant="warning">Guardar</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Ticket;
