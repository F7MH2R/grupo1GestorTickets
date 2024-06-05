import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import withLoader from "../Load/withLoader ";
import "./RegistrarAdministrador.css"

const ReAdministrador = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [tipoUsuario] = useState(1); // Siempre Administrador
    const [telefono, setTelefono] = useState('');
    const [cargo, setCargo] = useState(6); // Por defecto administrador
    const [estado_cuenta, setEstadoCuenta] = useState(1); // Siempre Activo
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
            estado_cuenta: estado_cuenta,
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
        navigate(-1); // Navegar hacia atr�s
    };

    return (
        <div className="container-administrador-fondo">
            <h2 className="administrador-title ">Registrar Administrador</h2>
            <Container className="administrador-container">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Row className="administrador-form-container">
                        <Col>
                            <Form.Group controlId="formNombre">
                                <Form.Label className="administrador-form-label">Nombres</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese nombres"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formApellido">
                                <Form.Label className="administrador-form-label">Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese apellidos"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formCorreo">
                        <Form.Label className="administrador-form-label">Correo electr&oacute;nico:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label className="administrador-form-label">Contrase&ntilde;a:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formTipoUsuario">
                        <Form.Label className="administrador-form-label">Tipo de Usuario</Form.Label>
                        <Form.Control
                            as="select"
                            value={tipoUsuario}
                            readOnly
                        >
                            <option value={1}>Administrador</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formTelefono">
                        <Form.Label className="administrador-form-label">Telefono</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese telefono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </Form.Group>
                    <div className="button-container">
                        <Button variant="secondary" onClick={handleBack} className="administrador-button ml-2">
                            Volver
                        </Button>
                        <Button variant="primary" type="submit" className="administrador-button">
                            Registrarse
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default withLoader(ReAdministrador);

