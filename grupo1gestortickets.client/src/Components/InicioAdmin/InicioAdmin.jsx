import React from "react";
import "./InicioAdmin.css";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const InicioAdmin = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-end">
          <Col className="tickets-abiertos" xs={2}>
            <Row>
              <Col>Abiertos</Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}>0</Link>
              </Col>
            </Row>
          </Col>
          <Col className="tickets-proceso" xs={2}>
            <Row>
              <Col>En Proceso</Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}>0</Link>
              </Col>
            </Row>
          </Col>
          <Col className="tickets-sin-asignar" xs={2}>
            <Row>
              <Col>Sin Asignar</Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}>0</Link>
              </Col>
            </Row>
          </Col>
          <Col className="tickets-cerrados" xs={2}>
            <Row>
              <Col>Cerrados</Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}>0</Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Form.Group controlId="ticket">
              <Form.Label>Ticket</Form.Label>
              <Form.Control type="text" size="sm"></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="responsable">
              <Form.Label>Responsable</Form.Label>
              <Form.Select>
                <option value={1}>Juan Perez</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>
                    <Row>
                      <Col>
                        <Row className="justify-content-center">
                          <Col className="titulo">Ticket:</Col>
                          <Col className="texto">12345</Col>
                        </Row>
                        <Row>
                          <Col className="titulo">Creado por:</Col>
                          <Col>Juan Perez</Col>
                        </Row>
                        <Row>
                          <Col className="titulo">Accion:</Col>
                          <Col>Reparar</Col>
                        </Row>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <Col>
                        <Row>
                          <Col className="titulo">Prioridad:</Col>
                          <Col>Baja</Col>
                        </Row>
                        <Row>
                          <Col className="titulo">Comentario:</Col>
                          <Col>Juan Perez</Col>
                        </Row>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <Col>
                        <Row>
                          <Col className="titulo">Fecha Creaci&oacute;n:</Col>
                          <Col>05/04/2024</Col>
                        </Row>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row>
                      <Col>
                        <Row>
                          <Col className="titulo">Responsable:</Col>
                          <Col>Juan Perez</Col>
                        </Row>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="justify-content-center">
                      <Col>
                        <Row>
                          <Col>
                            <Button variant="warning">Ver Mas</Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InicioAdmin;
