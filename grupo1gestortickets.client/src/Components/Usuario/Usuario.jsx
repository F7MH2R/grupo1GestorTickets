import React, { useEffect, useState } from "react";
import "./Usuario.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { cargos as cargosIniciales } from "../Utilidades/constantes";
import { ejecutarGet, ejecutarPatch } from "../Utilidades/requests";

const Usuario = () => {
  const { id } = useParams();
  const [cargos, setCargos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cargoId, setCargo] = useState(0);
  const [tipoId, setTipo] = useState(0);
  const [password, setPassword] = useState("");

  useEffect(() => setCargos(cargosIniciales), []);
  useEffect(() => {
    ejecutarGet(`/Auth/usuario/${id}`)
      .then((response) => {
        const data = response.data;
        setNombre(data.nombre);
        setCargo(data.cargo);
        setTipo(data.tipo_usuario);
        setPassword(data.password);
      })
      .catch((error) => console.log("Ha ocurrido un error: ", error));
  }, [id]);

  const handleClick = () => {
    if (tipoId != 0 && cargoId != 0 && password.length > 0) {
      ejecutarPatch(`/Auth/usuario/${id}`, {
        cargoId: cargoId,
        tipoUsuario: tipoId,
        nuevoPassword: password,
      })
        .then(window.alert("Usuario actualizado correctamente"))
        .catch((error) =>
          console.log("Ocurrio un error al actualizar: ", error)
        );
    } else {
      window.alert("Por favor valida los datos de entrada");
    }
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCargoChange = (event) => {
    setCargo(event.target.value);
  };

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };

  return (
    <>
          <Container fluid className="usuario-container">
        <Row>
          <Col>
            <Form>
              <Row>
                <Col className="text-end">
                                  <div className="usuario-header">Control de usuarios</div>
                </Col>
              </Row>
              <Row>
                <Col>
                                  <Form.Group controlId="nombre" className="usuario-form-group">
                                      <Form.Label className="usuario-form-label">Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                                          value={nombre}
                                          className="usuario-form-control"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                                  <Form.Group controlId="cargo" className="usuario-form-group">
                                      <Form.Label className="usuario-form-label">Cargo:</Form.Label>
                                      <Form.Select value={cargoId} onChange={handleCargoChange} className="usuario-form-select">
                      <option value={0}>Seleccionar Cargo</option>
                      {cargos.length > 0
                        ? cargos.map((cargo) => (
                            <option key={cargo.id} value={cargo.id}>
                              {cargo.nombre}
                            </option>
                          ))
                        : null}
                    </Form.Select>
                  </Form.Group>
                                  <Form.Group controlId="tipo" className="usuario-form-group">
                                      <Form.Label className="usuario-form-label">Tipo de usuario:</Form.Label>
                                      <Form.Select value={tipoId} onChange={handleTipoChange} className="usuario-form-select">
                      <option value={0}>Seleccionar Tipo</option>
                      <option value={1}>Administrador</option>
                      <option value={2}>Empleado</option>
                      <option value={3}>Cliente</option>
                    </Form.Select>
                  </Form.Group>
                                  <Form.Group className="usuario-form-group">
                                      <Form.Label className="usuario-form-label">Contrase&ntilde;a nueva:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                                          onChange={handleChange}
                                          className="usuario-form-control"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="text-end">
                  <Button variant="warning" onClick={handleClick}>
                    Actualizar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Usuario;