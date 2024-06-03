import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const TicketsTableClient = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [userId, setIdUsuario] = useState(null);

    useEffect(() => {
        // Obtener idUsuario del objeto user en local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setIdUsuario(parsedUser.id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchTickets(userId);
        }
    }, [userId]);

    useEffect(() => {
        filterTicketsByName(searchTerm);
    }, [searchTerm, tickets]);

    const fetchTickets = async (userId) => {
        try {
            const response = await axios.get(
                `https://localhost:7289/api/ticket`
            );
            const ticketsData = response.data;

            if (Array.isArray(ticketsData)) {
                setTickets(ticketsData);
                setFilteredTickets(ticketsData);
            } else {
                console.error("Expected an array of tickets");
            }
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };



    const handleViewTicket = (ticketId) => {
        navigate(`/detallepro/${ticketId}`);
    };

    const filterTicketsByName = (searchTerm) => {
        if (!searchTerm) {
            setFilteredTickets(tickets);
        } else {
            const filtered = tickets.filter((ticket) =>
                ticket.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTickets(filtered);
        }
    };

    return (
        <Container>
            <div style={{ marginTop: "15%" }}></div>
            <h2>Tickets</h2>
            <Row className="mb-4">
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por nombre"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Fecha Creación</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Área</th>
                                <th>Prioridad</th>
                                <th>Acciones</th> {/* New column for actions */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.nombre}</td>
                                    <td>{new Date(ticket.fechaCreacion).toLocaleDateString()}</td>
                                    <td>{ticket.descripcion}</td>
                                    <td>{ticket.estado}</td>
                                    <td>{ticket.area}</td>
                                    <td>{ticket.prioridad}</td>
                                    <td>
                                        <Button
                                            variant="info"
                                            size="sm"
                                            onClick={() => handleViewTicket(ticket.id)}
                                            className="mr-2"
                                        >
                                            Ver
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default TicketsTableClient;
