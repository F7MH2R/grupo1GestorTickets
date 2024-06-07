import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardGroup,
  Form,
  Modal,
} from "react-bootstrap";
import {
  FaFilePdf,
  FaFileAudio,
  FaCheckCircle,
  FaVideo,
  FaDatabase,
} from "react-icons/fa";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { toast, ToastContainer } from "react-toastify";
import WithLoader from "../../Load/withLoader ";

import "react-toastify/dist/ReactToastify.css";
import ReactToPrint from "react-to-print";
import "./DetalleTicket.css";

const Detallepro = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const componentRef = useRef();
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7289/api/ticket/details/${ticketId}`
        );
        console.log(response.data); // Log the response data
        setTicketDetails(response.data);
        if (response.data.state === "CERRADO") {
          setShowModal(true);
          playCelebrationSound();
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);
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

  if (!ticketDetails) {
    return (
      <div>
        <WithLoader />
      </div>
    );
  }

  const { ticket, user, state, assignedUser, comments, files, areas } =
    ticketDetails;

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
    } else if (file.tipo == ".mp4") {
      return <FaVideo size={50} />;
    } else if (file.tipo == ".sql") {
      return <FaDatabase size={50} />;
    } else {
      return <p>Preview not available</p>;
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    const commentData = {
      comentario: newComment,
      idUsuario: parsedUser?.id,
    };

    try {
      await axios.post(
        `https://localhost:7289/api/ticket/${ticketId}/comments`,
        [commentData],
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTicketDetails((prevDetails) => ({
        ...prevDetails,
        comments: [
          ...prevDetails.comments,
          {
            comentario1: newComment,
            fechaCreacion: new Date().toISOString(),
            user: {
              nombre: parsedUser?.nombre,
              correo: parsedUser?.correo,
            },
          },
        ],
      }));
      setNewComment("");
      toast.success("Mensaje enviado con éxito");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error al enviar el mensaje");
    }
  };

  const isTicketClosed = state === "CERRADO";

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
          onClick={() => navigate(-1)}
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
                        <strong>N° Ticket:</strong> {ticket?.id}
                      </p>
                      <p className="info-line-e">
                        <strong>Nombre:</strong> {ticket?.nombre}
                      </p>
                      <p className="info-line-e">
                        <strong>Fecha de Creación:</strong>{" "}
                        {ticket
                          ? new Date(ticket.fechaCreacion).toLocaleDateString()
                          : ""}
                      </p>
                      <p className="info-line-e">
                        <strong>Descripción:</strong> {ticket?.descripcion}
                      </p>
                      <p className="info-line-e">
                        <strong>Prioridad:</strong> {ticket?.prioridad}
                      </p>
                      <p className="info-line-e">
                        <strong>Estado:</strong> {state}
                      </p>
                      <p className="info-line-e">
                        <strong>Área:</strong> {areas}
                      </p>
                      <p className="info-line-e">
                        <strong>Asignado a:</strong>{" "}
                        {assignedUser ? assignedUser.nombre : "No asignado"}
                      </p>
                      <p className="info-line-e">
                        <strong>Correo del Asignado:</strong>{" "}
                        {assignedUser ? assignedUser.correo : "No asignado"}
                      </p>
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
                          <strong>Nombre:</strong> {user?.nombre}
                        </p>
                        <p className="info-line-e">
                          <strong>Correo:</strong> {user?.correo}
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
                        disabled={isTicketClosed}
                      />
                      <Button
                        variant="primary"
                        onClick={handleAddComment}
                        className="custom-comment-button mt-2"
                        disabled={isTicketClosed}
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
                        {files?.map((file) => (
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
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Regresar
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

export default WithLoader(Detallepro);
