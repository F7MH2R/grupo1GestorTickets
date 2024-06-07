import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Image,
  Modal,
  CardGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaFileAudio, FaVideo, FaDatabase } from "react-icons/fa";

import withLoader from "../../Load/withLoader ";
import { TrashFill } from "react-bootstrap-icons";
import "./Agregar.css";

const CreateTicket = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("Media"); // Valor predeterminado
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [comentarios, setComentarios] = useState([""]);
  const [files, setFiles] = useState([]);
  const [ticketId, setTicketId] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener idUsuario del objeto user en local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIdUsuario(parsedUser.id);
    }
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await axios.get("https://localhost:7289/api/area/area", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (Array.isArray(response.data)) {
        setAreas(response.data);
      } else {
        console.error("Expected an array of areas");
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  const handleAddComment = () => {
    setComentarios([...comentarios, ""]);
  };

  const handleCommentChange = (index, value) => {
    const newComentarios = [...comentarios];
    newComentarios[index] = value;
    setComentarios(newComentarios);
  };

  const handleCommentDelete = (index) => {
    const newComentarios = [...comentarios];
    newComentarios.splice(index, 1);
    setComentarios(newComentarios);
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        file.preview = e.target.result;
        setFiles((prevFiles) => [...prevFiles, file]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  };

  const handleFileDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nombre) newErrors.nombre = "El campo nombre es obligatorio";
    if (!descripcion)
      newErrors.descripcion = "El campo descripción es obligatorio";
    if (!selectedArea) newErrors.selectedArea = "El campo área es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const ticketData = {
      titulo: nombre,
      descripcion,
      idArea: selectedArea,
      idUsuario: idUsuario, // Use the state variable
      idEstado: 3, // Adjust according to your business logic
      prioridad,
    };

    try {
      const response = await axios.post(
        "https://localhost:7289/api/ticket",
        ticketData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const createdTicketId = response.data.id;
      setTicketId(createdTicketId);

      // Add comments
      const commentData = comentarios
        .filter((comentario) => comentario !== "")
        .map((comentario) => ({
          comentario: comentario,
          idTicket: createdTicketId,
          idUsuario: idUsuario, // Include idUsuario
        }));
      await axios.post(
        `https://localhost:7289/api/ticket/${createdTicketId}/comments`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Upload files
      if (files.length > 0) {
        const formData = new FormData();
        for (let file of files) {
          formData.append("files", file);
        }
        await axios.post(
          `https://localhost:7289/api/ticket/${createdTicketId}/files`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/ticketsTableClient");
      }, 2000);
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Hubo un error al crear el ticket.");
    }
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image/")) {
      return <Image src={file.preview} thumbnail />;
    } else if (file.type === "application/pdf") {
      return <FaFilePdf size={50} />;
    } else if (file.type === "audio/mpeg") {
      return <FaFileAudio size={50} />;
    } else if (file.type.startsWith("text/")) {
      return (
        <iframe
          src={file.preview}
          title="file preview"
          style={{ width: "100%", height: "200px" }}
        />
      );
    } else if (file.type.startsWith("application/sql")) {
      return <FaDatabase size={50} />;
    } else if (file.type.startsWith("video/")) {
      return <FaVideo size={50} />;
    } else {
      return <span>{file.name}</span>;
    }
  };

  return (
    <>
      <div className="container-create-ticket min-vh-100 overflow-auto">
        <div className="titulo-text-create">Nuevo ticket</div>
        <Container className="custom-form min-vh-100">
          <Form>
            <Row className="align-items-start">
              <Col md={6} className="form-fondo">
                <Form.Group controlId="formNombre">
                  <Form.Label className="form-label-create-ticket">
                    Nombre
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    isInvalid={!!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formArea">
                  <Form.Label className="form-label-create-ticket">
                    Área
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    isInvalid={!!errors.selectedArea}
                  >
                    <option value="">Seleccione un área</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.selectedArea}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formDescripcion">
                  <Form.Label className="form-label-create-ticket">
                    Descripción
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    isInvalid={!!errors.descripcion}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descripcion}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPrioridad">
                  <Form.Label className="form-label-create-ticket">
                    Prioridad
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={prioridad}
                    onChange={(e) => setPrioridad(e.target.value)}
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formFiles">
                  <Form.Label className="form-label-create-ticket">
                    Archivos
                  </Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <div className="btn-add-container">
                  <Button
                    variant="secondary"
                    className="btn-add-comment"
                    onClick={handleAddComment}
                  >
                    + Comentar
                  </Button>
                </div>
                <div className="titulo-text-arch">Comentarios</div>
                <div className="custom-form-comments-container">
                  {comentarios.map((comentario, index) => (
                    <Form.Group
                      controlId={`formComentario${index}`}
                      key={index}
                    >
                      <Row>
                        <Col>
                          <Form.Label className="form-label-create-ticket">
                            Comentario {index + 1}
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder={`Comentario ${index + 1}`}
                            value={comentario}
                            onChange={(e) =>
                              handleCommentChange(index, e.target.value)
                            }
                          />
                        </Col>
                        <Col xs="auto">
                          <Button
                            variant="danger"
                            onClick={() => handleCommentDelete(index)}
                          >
                            <TrashFill />
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  ))}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="titulo-text-arch">Archivos cargados</div>
                <div className="custom-form-file-container">
                  <CardGroup style={{ display: "flex", flexWrap: "wrap" }}>
                    {files.map((file, index) => (
                      <Card
                        key={index}
                        className="mb-3"
                        style={{
                          width: "10rem",
                          flex: "0 0 auto",
                          marginRight: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        <Card.Body>
                          {renderFilePreview(file)}
                          <Card.Text>{file.name}</Card.Text>
                          <Button
                            variant="danger"
                            onClick={() => handleFileDelete(index)}
                          >
                            Eliminar
                          </Button>
                        </Card.Body>
                      </Card>
                    ))}
                  </CardGroup>
                </div>
              </Col>
            </Row>
          </Form>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Ticket Creado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              El ticket se ha creado con éxito. El ID de su ticket es {ticketId}
              .
            </Modal.Body>
          </Modal>
          <div className="align-items-start">
            <Button
              className="btnguardar"
              variant="primary"
              onClick={handleSubmit}
            >
              Guardar Ticket
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default withLoader(CreateTicket);
