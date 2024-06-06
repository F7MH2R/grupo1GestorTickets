import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const TicketsTableEmployee = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [statusChartData, setStatusChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [areaChartData, setAreaChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [priorityChartData, setPriorityChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIdUsuario(parsedUser.id);
    }
  }, []);

  useEffect(() => {
    if (idUsuario) {
      fetchTickets(idUsuario);
    }
  }, [idUsuario]);

  useEffect(() => {
    filterTicketsByName(searchTerm);
  }, [searchTerm, tickets]);

  const fetchTickets = async (userId) => {
    try {
      const response = await axios.get(
        `https://localhost:7289/api/ticket/empleado/${userId}`
      );
      const ticketsData = response.data;

      if (Array.isArray(ticketsData)) {
        setTickets(ticketsData);
        setFilteredTickets(ticketsData);
        generateChartData(ticketsData);
      } else {
        console.error("Expected an array of tickets");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateChartData = (tickets) => {
    const statuses = tickets.map((ticket) => ticket.estado);
    const statusCounts = statuses.reduce((acc, status) => {
      if (status) {
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    }, {});

    const statusBackgroundColors = Object.keys(statusCounts).map(() =>
      generateRandomColor()
    );

    setStatusChartData({
      labels: Object.keys(statusCounts),
      datasets: [
        {
          label: "Ticket Status",
          data: Object.values(statusCounts),
          backgroundColor: statusBackgroundColors,
        },
      ],
    });

    const areas = tickets.map((ticket) => ticket.area);
    const areaCounts = areas.reduce((acc, area) => {
      if (area) {
        acc[area] = (acc[area] || 0) + 1;
      }
      return acc;
    }, {});

    const areaBackgroundColors = Object.keys(areaCounts).map(() =>
      generateRandomColor()
    );

    setAreaChartData({
      labels: Object.keys(areaCounts),
      datasets: [
        {
          label: "Tickets by Area",
          data: Object.values(areaCounts),
          backgroundColor: areaBackgroundColors,
        },
      ],
    });

    const priorities = tickets.map((ticket) => ticket.prioridad);
    const priorityCounts = priorities.reduce((acc, priority) => {
      if (priority) {
        acc[priority] = (acc[priority] || 0) + 1;
      }
      return acc;
    }, {});

    const priorityBackgroundColors = Object.keys(priorityCounts).map(() =>
      generateRandomColor()
    );

    setPriorityChartData({
      labels: Object.keys(priorityCounts),
      datasets: [
        {
          label: "Ticket Priority",
          data: Object.values(priorityCounts),
          backgroundColor: priorityBackgroundColors,
        },
      ],
    });
  };

  const handleStatusChartClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const selectedStatus = statusChartData.labels[index];
      const filtered = tickets.filter(
        (ticket) => ticket.estado === selectedStatus
      );
      setFilteredTickets(filtered);
    }
  };

  const handleAreaChartClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const selectedArea = areaChartData.labels[index];
      const filtered = tickets.filter((ticket) => ticket.area === selectedArea);
      setFilteredTickets(filtered);
    }
  };

  const handlePriorityChartClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const selectedPriority = priorityChartData.labels[index];
      const filtered = tickets.filter(
        (ticket) => ticket.prioridad === selectedPriority
      );
      setFilteredTickets(filtered);
    }
  };

  const handleAddTicket = () => {
    navigate("/create");
  };

  const handleViewDetail = (id) => {
    navigate(`/detalleproe/${id}`);
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
      <Row className="mb-4">
        <Col md={4}>
          <Pie
            data={statusChartData}
            options={{
              plugins: {
                datalabels: {
                  color: "#fff",
                  display: true,
                  formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return label.length > 10
                      ? `${label.substring(0, 7)}...`
                      : label;
                  },
                  font: {
                    weight: "bold",
                    size: (context) => {
                      const width = context.chart.width;
                      const size = Math.round(width / 32);
                      return size > 12 ? 12 : size; // Ensures the text doesn't get too small
                    },
                  },
                  textAlign: "center",
                  clip: true,
                  clamp: true,
                },
              },
              onClick: handleStatusChartClick,
            }}
          />
        </Col>
        <Col md={4}>
          <Pie
            data={areaChartData}
            options={{
              plugins: {
                datalabels: {
                  color: "#fff",
                  display: true,
                  formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return label.length > 10
                      ? `${label.substring(0, 7)}...`
                      : label;
                  },
                  font: {
                    weight: "bold",
                    size: (context) => {
                      const width = context.chart.width;
                      const size = Math.round(width / 32);
                      return size > 12 ? 12 : size; // Ensures the text doesn't get too small
                    },
                  },
                  textAlign: "center",
                  clip: true,
                  clamp: true,
                },
              },
              onClick: handleAreaChartClick,
            }}
          />
        </Col>
        <Col md={4}>
          <Pie
            data={priorityChartData}
            options={{
              plugins: {
                datalabels: {
                  color: "#fff",
                  display: true,
                  formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return label.length > 10
                      ? `${label.substring(0, 7)}...`
                      : label;
                  },
                  font: {
                    weight: "bold",
                    size: (context) => {
                      const width = context.chart.width;
                      const size = Math.round(width / 32);
                      return size > 12 ? 12 : size; // Ensures the text doesn't get too small
                    },
                  },
                  textAlign: "center",
                  clip: true,
                  clamp: true,
                },
              },
              onClick: handlePriorityChartClick,
            }}
          />
        </Col>
      </Row>
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
          <Button onClick={handleAddTicket} className="mb-3">
            Agregar Nuevo Ticket
          </Button>
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
                      variant="primary"
                      onClick={() => handleViewDetail(ticket.id)}
                    >
                      Ver detalle
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

export default TicketsTableEmployee;