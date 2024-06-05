import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withLoader from "../Load/withLoader ";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ReEmpleado = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [tipoUsuario] = useState(2); // Siempre Empleado
    const [telefono, setTelefono] = useState('');
    const [cargo, setCargo] = useState('');
    const [estadoCuenta, setEstadoCuenta] = useState(1); // Por defecto Activo
    const [nombreEmpresa, setNombreEmpresa] = useState('NULL');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const nuevoUsuario = {
            nombre: `${nombre} ${apellido}`,
            correo: correo,
            password: password,
            tipo_usuario: tipoUsuario,
            telefono: telefono ? parseInt(telefono) : null,
            cargo: cargo,
            estado_cuenta: estadoCuenta,
            fecha_creacion: new Date(),
            nombreEmpresa: nombreEmpresa
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
                navigate('/registrar-usuarios');

            } else {
                const errorMsg = await response.text();
                setError(errorMsg);
            }
        } catch (error) {
            setError('Failed to connect to the server. Please try again later.');
            console.error('Error:', error);
        }
    };

    const handleBack = () => {
        navigate(-1); // Navegar hacia atrás
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h1 className="text-center mb-4">REGISTRAR EMPLEADOS</h1>
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
                                as="select"
                                value={cargo}
                                onChange={(e) => setCargo(parseInt(e.target.value))}
                            >
                                <option value={1}>Base de Datos</option>
                                <option value={2}>Redes</option>
                                <option value={3}>Mantenimiento</option>
                                <option value={4}>Ciberseguridad</option>
                                <option value={5}>Desarrollo de Software</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Registrarse
                        </Button>
                        <Button variant="secondary" onClick={handleBack} className="ml-2">
                            Volver
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default withLoader(ReEmpleado);


