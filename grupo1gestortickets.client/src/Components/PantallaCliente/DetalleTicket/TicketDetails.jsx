import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardGroup,
} from "react-bootstrap";
import { FaFilePdf, FaFileAudio } from "react-icons/fa";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticketDetails, setTicketDetails] = useState(null);

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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Comentario</th>
                <th>Nombre del Usuario</th>
                <th>Correo del Usuario</th>
              </tr>
            </thead>
            <tbody>
              {comments?.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.comentario1}</td>
                  <td>{comment.user.nombre}</td>
                  <td>{comment.user.correo}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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

export default TicketDetails;
