import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';

const CreateTicket = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [comentarios, setComentarios] = useState(['']);
    const [files, setFiles] = useState([]);

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
        <Container>
            <h1 className="my-4">Crear Ticket</h1>
            <Form>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formDescripcion">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formArea">
                    <Form.Label>Area</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                    >
                        <option value="">Seleccione un area</option>
                        {/* Aquí agregarías las opciones de áreas */}
                    </Form.Control>
                </Form.Group>
                {comentarios.map((comentario, index) => (
                    <Form.Group controlId={`formComentario${index}`} key={index}>
                        <Row>
                            <Col>
                                <Form.Label>Comentario {index + 1}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={`Comentario ${index + 1}`}
                                    value={comentario}
                                    onChange={(e) => handleCommentChange(index, e.target.value)}
                                />
                            </Col>
                            <Col xs="auto" className="d-flex align-items-end">
                                <Button variant="danger" onClick={() => handleCommentDelete(index)}>Eliminar</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                ))}
                <Button variant="secondary" className="mb-3" onClick={handleAddComment}>Agregar Comentario</Button>
                <Form.Group controlId="formFiles">
                    <Form.Label>Archivos</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileChange} />
                </Form.Group>
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
                <Button variant="primary">Guardar Ticket</Button>
            </Form>
        </Container>
    );
};

export default CreateTicket;



