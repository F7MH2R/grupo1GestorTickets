import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import "./Agregar.css"

const CreateTicket = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [prioridad, setPrioridad] = useState('Media'); // Valor predeterminado
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');
    const [comentarios, setComentarios] = useState(['']);
    const [files, setFiles] = useState([]);
    const [ticketId, setTicketId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAreas();
    }, []);

    const fetchAreas = async () => {
        try {
            const response = await axios.get('https://localhost:7289/api/area/area', {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            if (Array.isArray(response.data)) {
                setAreas(response.data);
            } else {
                console.error('Expected an array of areas');
            }
        } catch (error) {
            console.error('Error fetching areas:', error);
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!nombre.trim()) {
            newErrors.nombre = "El nombre es requerido";
            valid = false;
        }

        if (!descripcion.trim()) {
            newErrors.descripcion = "Campo requerido";
            valid = false;
        }

        if (!selectedArea) {
            newErrors.selectedArea = "Campo requerido";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleAddComment = () => {
        setComentarios([...comentarios, '']);
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
        const newFiles = Array.from(event.target.files).map(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                file.preview = e.target.result;
                setFiles(prevFiles => [...prevFiles, file]);
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

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const ticketData = {
            nombre,
            descripcion,
            idArea: selectedArea,
            idUsuario: localStorage.getItem('userId'),
            idEstado: 1,  // Ajusta esto según tu lógica de negocio
            prioridad,
            comentarios: comentarios.filter(comentario => comentario !== '').map(comentario => ({ texto: comentario }))
        };

        try {
            const response = await axios.post('https://localhost:7289/api/ticket', ticketData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const createdTicketId = response.data.id;
            setTicketId(createdTicketId);

            if (files.length > 0) {
                const formData = new FormData();
                for (let file of files) {
                    formData.append('files', file);
                }
                await axios.post(`https://localhost:7289/api/ticket/${createdTicketId}/files`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            alert("Ticket creado y archivos subidos correctamente.");
        } catch (error) {
            console.error('Error creating ticket:', error);
            alert("Hubo un error al crear el ticket.");
        }
    };

    const renderFilePreview = (file) => {
        if (file.type.startsWith('image/')) {
            return <Image src={file.preview} thumbnail />;
        } else if (file.type === 'application/pdf') {
            return <a href={file.preview} target="_blank" rel="noopener noreferrer">Ver PDF</a>;
        } else if (file.type.startsWith('text/')) {
            return <iframe src={file.preview} title="file preview" style={{ width: '100%', height: '200px' }} />;
        } else {
            return <span>{file.name}</span>;
        }
    };

    return (
        <>
            <div className="container-create-ticket min-vh-300">
                <div className="titulo-text">Nuevo Ticket</div>
                <Container className="custom-form">
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formNombre">
                                    <Form.Label className="form-label-create-ticket">Nombre</Form.Label>
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
                                <Form.Group controlId="formDescripcion">
                                    <Form.Label className="form-label-create-ticket">Descripci&oacute;n</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Descripci&oacute;n"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        isInvalid={!!errors.descripcion}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.descripcion}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formArea">
                                    <Form.Label className="form-label-create-ticket">&Aacute;rea</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedArea}
                                        onChange={(e) => setSelectedArea(e.target.value)}
                                        isInvalid={!!errors.selectedArea}
                                    >
                                        <option value="">Seleccione un &aacute;rea</option>
                                        {areas.map(area => (
                                            <option key={area.id} value={area.id}>
                                                {area.nombre}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.selectedArea}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPrioridad">
                                    <Form.Label className="form-label-create-ticket">Prioridad</Form.Label>
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
                                    <Form.Label className="form-label-create-ticket">Archivos</Form.Label>
                                    <Form.Control type="file" multiple onChange={handleFileChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Button variant="secondary" onClick={handleAddComment}>+ Agregar Comentario</Button>
                                <div className="custom-form-comments-container">
                                    {comentarios.map((comentario, index) => (
                                        <Form.Group controlId={`formComentario${index}`} key={index}>
                                            <Row>
                                                <Col>
                                                    <Form.Label className="form-label-create-ticket">Comentario {index + 1}</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        placeholder={`Comentario ${index + 1}`}
                                                        value={comentario}
                                                        onChange={(e) => handleCommentChange(index, e.target.value)}
                                                    />
                                                </Col>
                                                <Col xs="auto">
                                                    <Button variant="danger" onClick={() => handleCommentDelete(index)}>
                                                        <TrashFill />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    ))}
                                </div>
                                <Row>
                                    {files.map((file, index) => (
                                        <Col key={index} xs={12} md={4} lg={3}>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    {renderFilePreview(file)}
                                                    <Card.Text>{file.name}</Card.Text>
                                                    <Button variant="danger" onClick={() => handleFileDelete(index)}>Eliminar</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                        <Button className="btnguardar" variant="primary" onClick={handleSubmit}>Guardar Ticket</Button>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default CreateTicket;
