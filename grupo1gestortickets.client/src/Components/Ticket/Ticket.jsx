import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  Row,
  Modal,
} from "react-bootstrap";
import {
  ejecutarGet,
  ejecutarPatch,
  ejecutarPost,
} from "../Utilidades/requests";
import {
  FaFileAudio,
  FaFilePdf,
  FaCheckCircle,
  FaVideo,
  FaDatabase,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import "react-toastify/dist/ReactToastify.css";
import ReactToPrint from "react-to-print";
import "./Ticket.css";
import withLoader from "../Load/withLoader ";

const Ticket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [responsables, setResponsables] = useState([]);
  const [estados, setEstados] = useState([]);
  const [detalles, setDetalles] = useState({});
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [estadoId, setEstadoId] = useState(0);
  const [prioridad, setPrioridad] = useState("Baja");
  const [usuarioAsignadoId, setUsuarioAsignadoId] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const componentRef = useRef();
  const audioRef = useRef(null);

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
        setEstadoId(response.data?.ticket?.idEstado);
        setUsuarioAsignadoId(response.data?.ticket?.idUsuarioAsignado);
        setPrioridad(response.data?.ticket?.prioridad);
        setComments(response.data?.comments);
        setUser(response.data?.user);
        if (response.data.state === "CERRADO") {
          setShowModal(true);
          playCelebrationSound();
        }
      })
      .catch((error) =>
        console.log("Error al obtener los detalles del ticket: ", error)
      );

    ejecutarGet(`/Estado`)
      .then((response) => {
        setEstados(response.data);
      })
      .catch((error) =>
        console.log("Error al obtener los estados del ticket: ", error)
      );
  }, [id]);

  const audio = new Audio("../../../../public/Cliente.mp3");
  const playCelebrationSound = () => {
    audioRef.current = audio;
    audio.play();
  };

  const stopCelebrationSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    stopCelebrationSound();
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEstadoChange = (event) => {
    setEstadoId(event.target.value);
  };

  const handleResponsableChange = (event) => {
    setUsuarioAsignadoId(event.target.value);
  };

  const handlePrioridadChange = (event) => {
    setPrioridad(event.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    try {
      ejecutarPost(`/Ticket/${id}/comments`, [
        {
          comentario: newComment,
          idUsuario: parsedUser?.id,
          idTicket: Number.parseInt(id),
          fechaCreacion: new Date(),
        },
      ]).then((response) => {
        if (response.status == 200) {
          setNewComment("");
          toast.success("Comentario agregado con éxito");

          ejecutarGet(`/ticket/details/${id}`)
            .then((response) => {
              setDetalles(response.data);
              const fecha = response.data?.ticket?.fechaCreacion;
              const fechaFormato = obtenerFecha(fecha);
              setFechaCreacion(fechaFormato);
              setEstadoId(response.data?.ticket?.idEstado);
              setUsuarioAsignadoId(response.data?.ticket?.idUsuarioAsignado);
              setPrioridad(response.data?.ticket?.prioridad);
              setComments(response.data?.comments);
              setUser(response.data?.user);
            })
            .catch((error) =>
              console.log("Error al obtener los detalles del ticket: ", error)
            );
        }
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error al enviar el mensaje");
    }
  };

  const handleGuardar = () => {
    ejecutarPatch(`/Ticket/ticket/${id}`, {
      estado: estadoId,
      prioridad: prioridad,
      idResponsable: usuarioAsignadoId,
    })
      .then((response) => toast.success("Ticket actualizado con éxito"))
      .catch((error) => console.log("Error al actualizar: ", error));
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
    } else if (file.tipo === ".mp4") {
      return <FaVideo size={50} />;
    } else if (file.tipo === ".sql") {
      return <FaDatabase size={50} />;
    } else {
      return <p>Preview not available</p>;
    }
  };

  function obtenerFecha(cadena) {
    if (!cadena) return "Fecha no disponible"; // Manejar casos en los que la fecha no está disponible
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const fecha = new Date(cadena);
    if (isNaN(fecha.getTime())) {
      return "Fecha inválida"; // Manejar casos de fechas inválidas
    }
    return fecha.toLocaleDateString("es-ES", options);
  }

  if (!detalles) {
    return (
      <div>
        <withLoader />
      </div>
    );
  }

  return (
    <div className="container-detalle-primero">
      <Container className="custom-ticket-container mt-4">
        <h3 className="titulo-text-detalle text-center mb-4">
          Detalles Ticket
        </h3>
        <ReactToPrint
          trigger={() => (
            <Button variant="secondary" className="custom-print-button mb-4">
              Descargar PDF
            </Button>
          )}
          content={() => componentRef.current}
        />
        <Button
          variant="secondary"
          className="custom-button mb-4"
          onClick={handleBack}
        >
          Regresar
        </Button>
        <Row md={12}>
          <Col md={12}>
            <div ref={componentRef} className="ticket-info-container">
              <Row>
                <Col>
                  <Card className="ticket-card">
                    <Card.Header className="card-header-uno">
                      <h3 className="card-title">Detalles del Ticket</h3>
                    </Card.Header>
                    <Card.Body>
                      <p className="info-line-e">
                        <strong>N° Ticket:</strong> {detalles?.ticket?.id}
                      </p>
                      <p className="info-line-e">
                        <strong>Nombre:</strong> {detalles?.ticket?.nombre}
                      </p>
                      <p className="info-line-e">
                        <strong>Fecha de Creación:</strong>{" "}
                        {detalles?.ticket?.fechaCreacion
                          ? new Date(
                              detalles.ticket.fechaCreacion
                            ).toLocaleDateString()
                          : ""}
                      </p>
                      <p className="info-line-e">
                        <strong>Descripción:</strong>{" "}
                        {detalles?.ticket?.descripcion}
                      </p>
                      <p className="info-line-e">
                        <strong>Prioridad:</strong>{" "}
                        {detalles?.ticket?.prioridad}
                      </p>
                      <Form.Group controlId="estado">
                        <Form.Label className="info-line-e">
                          <strong>Estado:</strong>
                        </Form.Label>
                        <Form.Select
                          onChange={handleEstadoChange}
                          value={estadoId}
                        >
                          {estados.length > 0
                            ? estados.map((estado) => (
                                <option key={estado.id} value={estado.id}>
                                  {estado.estado1}
                                </option>
                              ))
                            : null}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group controlId="prioridad">
                        <Form.Label className="info-line-e">
                          <strong>Prioridad:</strong>
                        </Form.Label>
                        <Form.Select
                          onChange={handlePrioridadChange}
                          value={prioridad}
                        >
                          <option value={"Baja"}>Baja</option>
                          <option value={"Media"}>Media</option>
                          <option value={"Alta"}>Alta</option>
                        </Form.Select>
                      </Form.Group>
                      <Row>
                        <Col>
                          <Form.Group controlId="responsable">
                            <Form.Label className="info-line-e">
                              <strong>Responsable:</strong>
                            </Form.Label>
                            <Form.Select
                              value={usuarioAsignadoId}
                              onChange={handleResponsableChange}
                            >
                              <option value={0}>Seleccione</option>
                              {responsables.length > 0
                                ? responsables.map((responsable) => (
                                    <option
                                      key={responsable.id}
                                      value={responsable.id}
                                    >
                                      {responsable.nombre}
                                    </option>
                                  ))
                                : null}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Row>
                  <Col>
                    <Card className="user-info-card">
                      <Card.Header className="card-header-uno">
                        <h3 className="card-title">Detalles del Usuario</h3>
                      </Card.Header>
                      <Card.Body>
                        <p className="info-line-e">
                          <strong>Nombre:</strong> {detalles?.user?.nombre}
                        </p>
                        <p className="info-line-e">
                          <strong>Correo:</strong> {detalles?.user?.correo}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Row>
            </div>
          </Col>
        </Row>
        <Row md={12}>
          <Col md={12}>
            <div>
              <Col className="custom-no-print">
                <Card className="comments-style">
                  <Card.Header>
                    <h3 className="card-title-two">
                      ¡Comparte tus Comentarios!
                    </h3>
                  </Card.Header>
                  <Card.Body>
                    <div
                      className="custom-comments-box"
                      style={{ height: "295px", overflowY: "scroll" }}
                    >
                      {comments?.map((comment, index) => (
                        <MessageBox
                          key={index}
                          position={
                            comment.user.id === user?.id ? "right" : "left"
                          }
                          type={"text"}
                          text={comment.comentario1}
                          title={comment.user.nombre}
                          date={new Date(comment.fechaCreacion)}
                        />
                      ))}
                    </div>
                    <Form className="custom-comment-form mt-3">
                      <Form.Control
                        as="textarea"
                        placeholder="Escribe un comentario"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="custom-comment-input mr-2"
                      />
                      <Button
                        variant="primary"
                        onClick={handleAddComment}
                        className="custom-comment-button mt-2"
                      >
                        Añadir Comentario
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          </Col>
        </Row>
        <Row>
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
        <Row>
          <Col md={12} className="text-center">
            <Button variant="secondary" onClick={handleBack}>
              Regresar
            </Button>
            <Button variant="warning" onClick={handleGuardar} className="ms-2">
              Actualizar
            </Button>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>¡Felicitaciones!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <FaCheckCircle size={80} color="green" />
          <p>
            ¡Felicidades su ticket a sido completado con éxito! ¡Gracias por
            preferirnos!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withLoader(Ticket);
