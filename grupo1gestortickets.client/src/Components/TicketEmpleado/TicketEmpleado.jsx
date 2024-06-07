import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { ejecutarGet } from "../Utilidades/requests";
import { Link } from "react-router-dom";

const TicketEmpleado = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const usuario = localStorage.getItem("user");
    if (usuario != undefined) {
      const user = JSON.parse(usuario);
      ejecutarGet(`/Ticket/tickets/${user.id}`)
        .then((response) => {
          if (response != undefined) {
            setTickets(response.data || []);
          }
        })
        .catch((error) => console.log("Ha ocurrido un error: ", error));
    }
  }, []);

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col>
            <h2>Ticket Empleado</h2>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-start">
            <h3>Mis tickets</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <tbody>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => {
                    return (
                      <tr key={ticket.idTicket}>
                        <td>
                          <Row>
                            <Col>
                              <Row className="justify-content-center">
                                <Col className="titulo">Ticket:</Col>
                                <Col className="texto">{ticket.idTicket}</Col>
                              </Row>
                              <Row>
                                <Col className="titulo">Creado por:</Col>
                                <Col>{ticket.creadoPor}</Col>
                              </Row>
                              <Row>
                                <Col className="titulo">T&iacute;tulo:</Col>
                                <Col>{ticket.accion}</Col>
                              </Row>
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Row>
                            <Col>
                              <Row>
                                <Col className="titulo">Prioridad:</Col>
                                <Col>{ticket.prioridad}</Col>
                              </Row>
                              <Row>
                                <Col className="titulo">Comentario:</Col>
                                <Col>
                                  {ticket.comentarios.length > 0
                                    ? ticket.comentarios[0].comentario1
                                    : "Sin comentarios"}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Row>
                            <Col>
                              <Row>
                                <Col className="titulo">
                                  Fecha Creaci&oacute;n:
                                </Col>
                                <Col>{ticket.fechaCreacion}</Col>
                              </Row>
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Row>
                            <Col>
                              <Row>
                                <Col className="titulo">Responsable:</Col>
                                <Col>
                                  {ticket.usuarioAsignado || `Sin Asingar`}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Row className="justify-content-center">
                            <Col>
                              <Row>
                                <Col>
                                  <Link
                                    className="btn btn-warning"
                                    to={`/ticket/${ticket.idTicket}`}
                                  >
                                    Ver Mas
                                  </Link>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7}> Sin datos que mostrar</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TicketEmpleado;
