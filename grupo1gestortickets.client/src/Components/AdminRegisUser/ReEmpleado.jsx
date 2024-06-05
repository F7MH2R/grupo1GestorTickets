import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import withLoader from "../Load/withLoader ";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import "./RegistrarEmpleado.css";

const ReEmpleado = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario] = useState(2); // Siempre Empleado
  const [telefono, setTelefono] = useState("");
  const [cargo, setCargo] = useState("");
  const [estadoCuenta, setEstadoCuenta] = useState(1); // Por defecto Activo
  const [nombreEmpresa, setNombreEmpresa] = useState("NULL");
  const [imgurl, setImgurl] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createdUserName, setCreatedUserName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const nuevoUsuario = {
      nombre: `${nombre} ${apellido}`,
      correo: correo,
      password: password,
      tipo_usuario: tipoUsuario,
      telefono: telefono ? parseInt(telefono) : null,
      cargo: cargo,
      estado_cuenta: estadoCuenta,
      fecha_creacion: new Date(),
      nombreEmpresa: nombreEmpresa,
      imgurl: imgurl,
    };

    console.log("Datos del nuevo usuario:", nuevoUsuario);

    try {
      const response = await fetch(
        "https://localhost:7289/api/Auth/crear-usuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoUsuario),
        }
      );

      if (response.ok) {
        setCreatedUserName(`${nombre} ${apellido}`);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/registrar-usuarios");
        }, 3000); // 3 seconds delay
      } else {
        const errorMsg = await response.text();
        setError(errorMsg);
      }
    } catch (error) {
      setError("Failed to connect to the server. Please try again later.");
      console.error("Error:", error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  const handleImgurlChange = (e) => {
    setImgurl(e.target.value);
  };

  return (
    <div className="container-reempleado-fondo">
      <Container className="reempleado-container">
        <h1 className="reempleado-title mb-4">Registrar Empleado</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formNombre">
                <Form.Label className="reempleado-form-label">
                  Nombres
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nombres"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="reempleado-input"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formApellido">
                <Form.Label className="reempleado-form-label">
                  Apellidos
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese apellidos"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="reempleado-input"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formCorreo">
            <Form.Label className="reempleado-form-label">
              Correo electr&oacute;nico:
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="reempleado-input"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label className="reempleado-form-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="reempleado-input"
            />
          </Form.Group>

          <Form.Group controlId="formTipoUsuario">
            <Form.Label className="reempleado-form-label">
              Tipo de Usuario
            </Form.Label>
            <Form.Control as="select" value={tipoUsuario} readOnly>
              <option value={2}>Empleado</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label className="reempleado-form-label">Telefono</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCargo">
            <Form.Label className="reempleado-form-label">Cargo</Form.Label>
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

          <Form.Group controlId="formImgurl">
            <Form.Label className="reempleado-form-label">
              URL de la Imagen:
            </Form.Label>
            <Form.Control
              type="text"
              value={imgurl}
              onChange={handleImgurlChange}
              placeholder="URL de la Imagen"
              className="reempleado-input"
            />
          </Form.Group>
          {imgurl && (
            <div className="image-preview">
              <img
                src={imgurl}
                alt="Previsualización de la imagen"
                className="rounded-image"
              />
            </div>
          )}
          <div className="button-container-empleado">
            <Button
              variant="secondary"
              onClick={handleBack}
              className="reempleado-button ml-2"
            >
              Volver
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="reempleado-button"
            >
              Registrarse
            </Button>
          </div>
        </Form>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Usuario Creado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            El usuario <strong>{createdUserName}</strong> ha sido creado
            exitosamente.
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withLoader(ReEmpleado);
