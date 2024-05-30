import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ReCliente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [tipoUsuario] = useState(2); // Siempre Cliente
    const [telefono, setTelefono] = useState('');
    const [cargo, setCargo] = useState('');
    const [estadoCuenta, setEstadoCuenta] = useState(1); // Por defecto Activo
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const nuevoUsuario = {
            nombre: `${nombre} ${apellido}`,
            correo: correo,
            password: password,
            tipo_usuario: tipoUsuario,
            telefono: telefono ? parseInt(telefono) : null,
            cargo: cargo ? parseInt(cargo) : null,
            estado_cuenta: estadoCuenta,
            fecha_creacion: new Date()
        };

        console.log("Datos del nuevo usuario:", nuevoUsuario);

        try {
            const response = await fetch('https://localhost:7289/api/Auth/crear-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoUsuario)
            });

            if (response.ok) {
                alert("Usuario registrado exitosamente.");
            } else {
                const errorMsg = await response.text();
                setError(errorMsg);
            }
        } catch (error) {
            setError('Failed to connect to the server. Please try again later.');
            console.error('Error:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h1 className="text-center mb-4">REGISTRAR EMPELADOS</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese nombres"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formApellido">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese apellidos"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCorreo">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTipoUsuario">
                            <Form.Label>Tipo de Usuario</Form.Label>
                            <Form.Control
                                as="select"
                                value={tipoUsuario}
                                readOnly
                            >
                                <option value={2}>Empleado</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formTelefono">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese telefono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCargo">
                            <Form.Label>Cargo</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese cargo"
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEstadoCuenta">
                            <Form.Label>Estado de Cuenta</Form.Label>
                            <Form.Control
                                as="select"
                                value={estadoCuenta}
                                onChange={(e) => setEstadoCuenta(parseInt(e.target.value))}
                            >
                                <option value={1}>Activo</option>
                                <option value={2}>Inactivo</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Registrarse
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ReCliente;


