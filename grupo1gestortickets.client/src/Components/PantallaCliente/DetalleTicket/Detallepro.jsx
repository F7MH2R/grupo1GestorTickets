import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardGroup,
  ListGroup,
  Form,
} from "react-bootstrap";
import { FaFilePdf, FaFileAudio } from "react-icons/fa";

const Detallepro = () => {
  const { ticketId } = useParams();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7289/api/ticket/details/${ticketId}`
        );
        console.log(response.data); // Log the response data
        setTicketDetails(response.data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  if (!ticketDetails) {
    return <p>Loading...</p>;
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
            user: {
              nombre: parsedUser?.nombre,
              correo: parsedUser?.correo,
            },
          },
        ],
      }));
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Container>
      <h1>Detalles del Ticket</h1>
      <Row className="mb-4">
        <Col>
          <h3>Información del Ticket</h3>
          <p>
            <strong>ID:</strong> {ticket?.id}
          </p>
          <p>
            <strong>Nombre:</strong> {ticket?.nombre}
          </p>
          <p>
            <strong>Fecha de Creación:</strong>{" "}
            {ticket ? new Date(ticket.fechaCreacion).toLocaleDateString() : ""}
          </p>
          <p>
            <strong>Descripción:</strong> {ticket?.descripcion}
          </p>
          <p>
            <strong>Prioridad:</strong> {ticket?.prioridad}
          </p>
          <p>
            <strong>Estado:</strong> {state}
          </p>
          <p>
            <strong>Área:</strong> {areas}
          </p>
          <p>
            <strong>Asignado a:</strong>{" "}
            {assignedUser ? assignedUser.nombre : "No asignado"}
          </p>
          <p>
            <strong>Correo del Asignado:</strong>{" "}
            {assignedUser ? assignedUser.correo : "No asignado"}
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h3>Información del Usuario</h3>
          <p>
            <strong>Nombre:</strong> {user?.nombre}
          </p>
          <p>
            <strong>Correo:</strong> {user?.correo}
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h3>Comentarios</h3>
          <ListGroup>
            {comments?.map((comment, index) => (
              <ListGroup.Item key={index}>
                <strong>
                  {comment.user.nombre} ({comment.user.correo}):
                </strong>
                <p>{comment.comentario1}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form className="mt-3">
            <Form.Group controlId="formNewComment">
              <Form.Control
                type="text"
                placeholder="Escribe un comentario"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddComment}>
              Añadir Comentario
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h3>Archivos</h3>
          <CardGroup>
            {files?.map((file) => (
              <Card key={file.id} style={{ margin: "10px", width: "18rem" }}>
                {renderFilePreview(file)}
                <Card.Body>
                  <Card.Title>{file.nombre}</Card.Title>
                  <Button
                    variant="primary"
                    href={`data:${file.tipo};base64,${file.contenido}`}
                    download={file.nombre}
                  >
                    Descargar
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Detallepro;
