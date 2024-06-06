import React, { useEffect, useState } from "react";
import "./Ticket.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { ejecutarGet } from "../Utilidades/requests";
import { FaFileAudio, FaFilePdf } from "react-icons/fa";

const Ticket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [responsables, setResponsables] = useState([]);
  const [detalles, setDetalles] = useState({});
  const [fechaCreacion, setFechaCreacion] = useState("");

  useEffect(() => {
    ejecutarGet(`/Auth/usuarios/tipo/2`)
      .then((response) => {
        setResponsables(response.data);
      })
      .catch((error) => console.log("Hubo un error: ", error));
    ejecutarGet(`/ticket/details/${id}`)
      .then((response) => {
        setDetalles(response.data);
        const fecha = response.data?.ticket?.fechaCreacion;
        const fechaFormato = obtenerFecha(fecha);
        setFechaCreacion(fechaFormato);
      })
      .catch((error) =>
        console.log("Error al obtener los detalles del ticket: ", error)
      );
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const renderFilePreview = (file) => {
    if (file.tipo === ".png" || file.tipo === ".jpg" || file.tipo === ".jpeg") {
      return (
        <Card.Img
          variant="top"
          src={`data:${file.tipo};base64,${file.contenido}`}
        />
      );
    } else if (file.tipo === ".pdf") {
      return <FaFilePdf size={50} />;
    } else if (file.tipo === ".mp3") {
      return <FaFileAudio size={50} />;
    } else {
      return <p>Preview not available</p>;
    }
  };

  function obtenerFecha(cadena) {
    if (!cadena) return "Fecha no disponible"; // Manejar casos en los que la fecha no está disponible
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const fecha = new Date(cadena);
    if (isNaN(fecha.getTime())) {
      console.error("Fecha inválida:", cadena);
      return "Fecha inválida"; // Manejar casos de fechas inválidas
    }
    return fecha.toLocaleDateString("es-ES", options);
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form>
              <Row>
                <Col>
                  <h2>Detalle Ticket</h2>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Form.Group controlId="titulo">
                    <Form.Label>Titulo del ticket</Form.Label>
                    <Form.Control
                      disabled
                      defaultValue={detalles?.ticket?.nombre}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="descripcion">
                    <Form.Label>Descripci&oacute;n del problema</Form.Label>
                    <Form.Control
                      disabled
                      defaultValue={detalles?.ticket?.descripcion}
                      as="textarea"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="correo">
                    <Form.Label>Correo de contacto</Form.Label>
                    <Form.Control
                      disabled
                      defaultValue={detalles?.user?.correo}
                      type="email"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="telefono">
                    <Form.Label>Tel&eacute;fono de contacto</Form.Label>
                    <Form.Control
                      disabled
                      defaultValue={detalles?.user?.telefono}
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="fecha">
                    <Form.Label>Fecha de creaci&oacute;n</Form.Label>
                    <Form.Control
                      disabled
                      defaultValue={fechaCreacion}
                      type="text"
                      className="text-center"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="estado">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select>
                      <option value={1}>Abierto</option>
                      <option value={2}>En proceso</option>
                      <option value={3}>Sin asignar</option>
                      <option value={4}>Cerrado</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="prioridad">
                    <Form.Label>Prioridad</Form.Label>
                    <Form.Select>
                      <option value={1}>Baja</option>
                      <option value={2}>Media</option>
                      <option value={3}>Alta</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="responsable">
                    <Form.Label>Responsable</Form.Label>
                    <Form.Select>
                      <option value={0}>Seleccione</option>
                      {responsables.length > 0
                        ? responsables.map((responsable) => (
                            <option key={responsable.id} value={responsable.id}>
                              {responsable.nombre}
                            </option>
                          ))
                        : null}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="comentarios">
                    <Form.Label>Comentarios</Form.Label>
                    <Form.Control
                      defaultValue={""}
                      disabled
                      as="textarea"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="text-end">
                  <Button variant="warning">Guardar</Button>
                </Col>
                <Col>
                  <Button variant="secondary" onClick={handleBack}>
                    Volver
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={8}>
            <div>
              <Col className="custom-no-print">
                <Card className="file-style mb-4">
                  <Card.Header>
                    <h3 className="card-title-two">Archivos</h3>
                  </Card.Header>
                  <Card.Body>
                    <div className="custom-scrollable-container">
                      <CardGroup className="custom-card-group">
                        {detalles?.files?.map((file) => (
                          <Card key={file.id} className="custom-file-card mb-4">
                            {renderFilePreview(file)}
                            <Card.Body className="custom-card-body">
                              <Card className="custom-card-title-pdf">
                                {file.nombre}
                              </Card>
                              <Button
                                variant="primary"
                                href={`data:${file.tipo};base64,${file.contenido}`}
                                download={file.nombre}
                                className="custom-download-button"
                              >
                                Descargar
                              </Button>
                            </Card.Body>
                          </Card>
                        ))}
                      </CardGroup>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Ticket;
