import React, { useEffect, useState } from "react";
import "./InicioAdmin.css";
import { Col, Container, Form, Row, Table, Card } from "react-bootstrap";
import withLoader from "../Load/withLoader ";
import { Link } from "react-router-dom";
import { ejecutarGet } from "../Utilidades/requests";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InicioAdmin = () => {
  const [abierto, setAbierto] = useState(0);
  const [cerrado, setCerrado] = useState(0);
  const [enProceso, setEnProceso] = useState(0);
  const [sinAsignar, setSinAsignar] = useState(0);
  const [filtro, setFiltro] = useState("");
  const [idResponsable, setIdResponsable] = useState(-1);
  const [tickets, setTickets] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [listaTickets, setListaTickets] = useState([]);

  useEffect(() => {
    const obtenerResponsables = (tickets) => {
      return tickets.reduce((resultado, ticket) => {
        if (
          !resultado.some(
            (responsable) => responsable.id === ticket.idUsuarioAsignado
          )
        ) {
          resultado.push({
            id: ticket.idUsuarioAsignado,
            nombre: ticket.usuarioAsignado || "Sin asignar",
          });
        }
        return resultado;
      }, []);
    };
    ejecutarGet(`/InicioAdmin`)
      .then((response) => {
        const data = response.data;
        setAbierto(data.abiertos || 0);
        setCerrado(data.cerrados || 0);
        setEnProceso(data.enProceso || 0);
        setSinAsignar(data.sinAsignar || 0);
        setTickets(data.tickets || []);
        setListaTickets(data.tickets || []);
        setResponsables(obtenerResponsables(data.tickets));
      })
      .catch((exception) => console.log("Ocurrio un error: ", exception));
  }, []);

  useEffect(() => {
    filtrarPorNombre(filtro);
  }, [filtro]);

  useEffect(() => {
    filtrarPorResponsable(idResponsable);
  }, [idResponsable]);

  const filtrarPorNombre = (filtro) => {
    if (!filtro) {
      setListaTickets(tickets);
    } else {
      const filtrados = tickets.filter((ticket) =>
        ticket.accion.toLowerCase().includes(filtro.toLowerCase())
      );

      setListaTickets(filtrados);
    }
  };

  const filtrarPorResponsable = (id) => {
    if (id == -1) {
      setListaTickets(tickets);
    } else {
      const filtrados = tickets.filter(
        (ticket) => ticket.idUsuarioAsignado == id
      );
      setListaTickets(filtrados);
    }
  };

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  };

  const chartData = (label, count) => {
    return {
      labels: [label],
      datasets: [
        {
          label: label,
          data: [count],
          backgroundColor: generateRandomColor(),
          borderColor: generateRandomColor(),
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw; // Correctly show the count value
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Container className="container-ticket">
        <Row className="justify-content-end mt-5">
          <Col xs={3}>
            <Card>
              <Card.Body>
                <Card.Title>Abiertos</Card.Title>
                <Bar
                  data={chartData("Abiertos", abierto)}
                  options={chartOptions}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={3}>
            <Card>
              <Card.Body>
                <Card.Title>En Proceso</Card.Title>
                <Bar
                  data={chartData("En Proceso", enProceso)}
                  options={chartOptions}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={3}>
            <Card>
              <Card.Body>
                <Card.Title>Sin Asignar</Card.Title>
                <Bar
                  data={chartData("Sin Asignar", sinAsignar)}
                  options={chartOptions}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={3}>
            <Card>
              <Card.Body>
                <Card.Title>Cerrados</Card.Title>
                <Bar
                  data={chartData("Cerrados", cerrado)}
                  options={chartOptions}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="ticket-left ">
          <Col>
            <Form.Group controlId="ticket">
              <Form.Label>Filtar por t&iacute;tulo del ticket</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                value={filtro}
                onChange={(event) => setFiltro(event.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="responsable">
              <Form.Label>Filtrar por responsable</Form.Label>
              <Form.Control
                as={"select"}
                value={idResponsable}
                onChange={(evento) => setIdResponsable(evento.target.value)}
              >
                <option value={-1}>Seleccione un valor para filtar</option>
                {responsables.length > 0 ? (
                  responsables.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4 custom-row-width">
          <Col>
            <Table striped bordered hover>
              <tbody>
                {listaTickets.length > 0 ? (
                  listaTickets.map((ticket) => {
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

export default withLoader(InicioAdmin);
