// src/Components/PantallaCliente/InicioCliente/TicketsTable.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
        <Container>
            <Row className="mb-4">
                <Col>
                    <Bar data={chartData} />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Button onClick={handleAddTicket} className="mb-3">Agregar Nuevo Ticket</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Fecha Creación</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
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
                </Col>
            </Row>
        </Container>
    );
};

export default TicketsTableClient;
