import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Dashboard.css";
import withLoader from "../Load/withLoader ";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div>
        <withLoader />
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const getUserType = (type) => {
    switch (type) {
      case 1:
        return "Admin";
      case 2:
        return "Empleado";
      case 3:
        return "Cliente";
      default:
        return "Not available";
    }
  };

  const getAccountStatus = (status) => {
    return status === 1 ? "Activo" : "Inactivo";
  };

  const getCargoTitle = (cargo) => {
    switch (cargo) {
      case 1:
        return "Base de Datos";
      case 2:
        return "Redes";
      case 3:
        return "Mantenimiento";
      case 4:
        return "Ciberseguridad";
      case 5:
        return "Desarrollo de Software";
      default:
        return "Not available";
    }
  };

  return (
    <div className="dashboard-container-uno">
      <Container className="dashboard-container-dos">
        <Row className="dashboard-content">
          <h1 className="dashboard-title">
            Bienvenido, {user.nombre || "User"}
          </h1>
          <div className="user-details">
            <p className="user-detail">
              Correo electr&oacute;nico: {user.correo || "Not available"}
            </p>
            <p className="user-detail">
              Tipo de Usuario: {getUserType(user.tipo_usuario)}
            </p>
            <p className="user-detail">
              Tel&eacute;fono: {user.telefono || "Not available"}
            </p>
            {user.tipo_usuario === 2 && (
              <p className="user-detail">
                Cargo: {getCargoTitle(user.cargo) || "Not available"}
              </p>
            )}
            <p className="user-detail">
              Estado de Cuenta: {getAccountStatus(user.estado_cuenta)}
            </p>
            <p className="user-detail">
              Fecha de Creaci&oacute;n:{" "}
              {user.fechaCreacion
                ? new Date(user.fechaCreacion).toLocaleDateString()
                : "Not available"}
            </p>
          </div>
          <Button variant="secondary" onClick={handleBack} className="back-btn">
            Volver
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default withLoader(Dashboard);
