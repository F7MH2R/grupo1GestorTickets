import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import withLoader from "../../Load/withLoader ";
// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TablaAdmin = () => {
  const [employees, setEmployees] = useState([]);
  const [ticketData, setTicketData] = useState({
    day: [],
    trend: [],
    month: [],
    completed: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
    fetchTicketData();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7289/api/usuario/empleados"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchTicketData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7289/api/ticket/tendencias"
      );
      console.log("Fetched ticket data:", response.data); // Log the fetched data
      setTicketData(response.data);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  const generateChartData = (label, data, useAreaName = true) => {
    if (!Array.isArray(data)) {
      console.warn(`Data for ${label} is not an array.`, data);
      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = [
      ...new Set(
        data.map((d) => {
          const date = new Date(d.date);
          if (label === "Tareas por mes") {
            return date.toLocaleString("es-ES", { month: "long" });
          } else {
            return `${date.getDate()} ${date.toLocaleString("es-ES", {
              month: "long",
            })}`;
          }
        })
      ),
    ];

    const aggregatedData = labels.map((labelText) => {
      return data
        .filter((d) => {
          const date = new Date(d.date);
          if (label === "Tareas por mes") {
            return (
              date.toLocaleString("es-ES", { month: "long" }) === labelText
            );
          } else {
            return (
              `${date.getDate()} ${date.toLocaleString("es-ES", {
                month: "long",
              })}` === labelText
            );
          }
        })
        .reduce((acc, d) => acc + d.value, 0);
    });

    const datasets = [
      {
        label: label,
        data: aggregatedData,
        backgroundColor: labels.map((_, index) => {
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          return `rgba(${r}, ${g}, ${b}, 0.6)`;
        }),
        borderColor: labels.map((_, index) => {
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          return `rgba(${r}, ${g}, ${b}, 1)`;
        }),
        borderWidth: 1,
      },
    ];

    return {
      labels: labels,
      datasets: datasets,
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <Container>
      <div style={{ marginTop: "15%" }}></div>
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tareas por día</Card.Title>
              <Pie
                data={generateChartData(
                  "Tareas por día",
                  ticketData.day,
                  false // Don't use area name
                )}
                options={chartOptions}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tendencia de tareas</Card.Title>
              <Pie
                data={generateChartData(
                  "Tendencia de tareas",
                  ticketData.trend
                )}
                options={chartOptions}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tareas por mes</Card.Title>
              <Pie
                data={generateChartData(
                  "Tareas por mes",
                  ticketData.month,
                  false // Don't use area name
                )}
                options={chartOptions}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tareas completadas</Card.Title>
              <Pie
                data={generateChartData(
                  "Tareas completadas",
                  ticketData.completed,
                  false // Don't use area name
                )}
                options={chartOptions}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="mb-4">
        <Card.Header>Miembros del Equipo</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cargo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.nombre}</td>
                  <td>{employee.cargo}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => navigate(`/edit/${employee.id}`)}
                    >
                      <FaEdit /> Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default withLoader(TablaAdmin);
