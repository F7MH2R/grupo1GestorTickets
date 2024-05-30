// src/Components/PantallaCliente/InicioCliente/TicketsTable.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './InicioCliente.css'; 

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TicketsTableClient = () => {
    const [tickets, setTickets] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await axios.get('/api/ticket');
            const ticketsData = response.data;

            if (Array.isArray(ticketsData)) {
                setTickets(ticketsData);
                generateChartData(ticketsData);
            } else {
                console.error('Expected an array of tickets');
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const generateChartData = (tickets) => {
        const statuses = tickets.map(ticket => ticket.estado?.estado);
        const statusCounts = statuses.reduce((acc, status) => {
            if (status) {
                acc[status] = (acc[status] || 0) + 1;
            }
            return acc;
        }, {});

        setChartData({
            labels: Object.keys(statusCounts),
            datasets: [{
                label: 'Ticket Status',
                data: Object.values(statusCounts),
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        });
    };

    const handleAddTicket = () => {
        navigate('/create');
    };

    return (
        <div className="tickets-container">
            <Container className="chart-container">
                <Row className="mb-4">
                    <Col>
                        <label className="size-letra">&iquest;C&Oacute;MO PODEMOS AYUDARTE HOY?</label>
                    </Col>
                </Row>
            </Container>
            <Container className="table-container">
                <Row className="mb-4">
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead className="size-letra">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Fecha Creaci&oacute;n</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody className="size-letra-td">
                                {tickets.map(ticket => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.nombre}</td>
                                        <td>{ticket.fechaCreacion}</td>
                                        <td>{ticket.descripcion}</td>
                                        <td>{ticket.estado?.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button onClick={handleAddTicket} className="mb-3 add-button-cliente" type="submit">Agregar Nuevo Ticket</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TicketsTableClient;
