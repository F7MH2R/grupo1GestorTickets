import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import withLoader from "../Load/withLoader ";
import "./RegistrarCliente.css"

const ReCliente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cargo, setCargo] = useState(7);// Cliente
    const [estadoCuenta, setEstadoCuenta] = useState(1);
    const [tipoUsuario] = useState(3); // Cliente
    const [nombreEmpresa, setNombreEmpresa] = useState('');
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
            cargo: cargo ? parseInt(cargo) : null,
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
                navigate('/login');
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
        navigate(-1);
    };

    return (
        <div className="container-cliente-fondo">
            <Container className="recliente-container">
                <h2 className="recliente-title">Registrar Cliente</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formNombre">
                                <Form.Label className="recliente-form-label">Nombres:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Nombres"
                                    required
                                    className="recliente-input"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formApellido">
                                <Form.Label className="recliente-form-label">Apellidos:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    placeholder="Apellidos"
                                    required
                                    className="recliente-input"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formCorreo">
                        <Form.Label className="recliente-form-label">Correo electr&oacute;nico:</Form.Label>
                        <Form.Control
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="Correo"
                            required
                            className="recliente-input"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label className="recliente-form-label">Contrase&ntilde;a:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contrase&ntilde;a:"
                            required
                            className="recliente-input"
                        />
                    </Form.Group>
                    <Row className="mb-4">
                        <Col>
                            <Form.Group controlId="formTipoUsuario">
                                <Form.Label className="recliente-form-label">Tipo de Usuario:</Form.Label>
                                <Form.Control as="select" value={tipoUsuario} readOnly>
                                    <option value="3">Cliente</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formTelefono">
                                <Form.Label className="recliente-form-label">Telefono:</Form.Label>
                                <Form.Control
                                    type="tel"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    placeholder="Telefono"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formNombreEmpresa">
                        <Form.Label className="recliente-form-label">Nombre de la Empresa:</Form.Label>
                        <Form.Control
                            type="text"
                            value={nombreEmpresa}
                            onChange={(e) => setNombreEmpresa(e.target.value)}
                            placeholder="Nombre de la Empresa"
                            className="recliente-input"
                        />
                    </Form.Group>
                    <div className="button-container">
                        <Button variant="secondary" onClick={handleBack} className="recliente-button ml-2">
                            Volver
                        </Button>
                        <Button variant="primary" type="submit" className="recliente-button">
                            Registrarse
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default withLoader(ReCliente);




