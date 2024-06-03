import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EmployeesTable = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Obtener userId del objeto user en local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser.id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchEmployees();
        }
    }, [userId]);

    useEffect(() => {
        filterEmployeesByName(searchTerm);
    }, [searchTerm, employees]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(
                `https://localhost:7289/api/usuario`
            );
            const employeesData = response.data;

            if (Array.isArray(employeesData)) {
                setEmployees(employeesData);
                setFilteredEmployees(employeesData);
            } else {
                console.error("Expected an array of employees");
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const filterEmployeesByName = (searchTerm) => {
        if (!searchTerm) {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter((employee) =>
                employee.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEmployees(filtered);
        }
    };

    return (
        <Container>
            <div style={{ marginTop: "15%" }}></div>
            <h3>Empleados</h3>
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
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Fecha de Creación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.nombre}</td>
                                    <td>{employee.correo}</td>
                                    <td>{employee.telefono}</td>
                                    <td>{new Date(employee.creacion).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeesTable;
