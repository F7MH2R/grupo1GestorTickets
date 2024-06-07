import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivos, setArchivos] = useState([]);
  const [idEstado] = useState(1); // Estado inicial predeterminado
  const [idArea, setIdArea] = useState(null);
  const [prioridad, setPrioridad] = useState("");
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    // Obtener idUsuario del objeto user en local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIdUsuario(parsedUser.id);
    }
  }, []);

  const handleFileChange = (event) => {
    setArchivos(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!idUsuario) {
      alert("Error: Usuario no identificado");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("idEstado", idEstado);
    formData.append("idArea", idArea);
    formData.append("prioridad", prioridad);
    formData.append("idUsuario", idUsuario);

    for (let i = 0; i < archivos.length; i++) {
      formData.append("archivos", archivos[i]);
    }

    // Mostrar los datos que se envían en la consola
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      await axios.post("https://localhost:7289/api/Tickets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Ticket creado exitosamente");
      // Resetear el formulario
      setNombre("");
      setDescripcion("");
      setArchivos([]);
      setIdArea(null);
      setPrioridad("");
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Error al crear el ticket");
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="prioridad">Prioridad:</label>
          <input
            type="text"
            id="prioridad"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="area">Área:</label>
          <input
            type="number"
            id="area"
            value={idArea}
            onChange={(e) => setIdArea(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="archivos">Archivos:</label>
          <input
            type="file"
            id="archivos"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Crear Ticket</button>
      </form>
    </div>
  );
};

export default TicketForm;
