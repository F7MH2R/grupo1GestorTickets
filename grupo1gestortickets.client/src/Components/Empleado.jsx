import React from "react";
import { useNavigate } from "react-router-dom";
import TicketsTableEmployee from "./PantallaEmpleado/Tabla/TicketsTableEmployee";

const Empleado = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Empleado Dashboard</h2>
      <TicketsTableEmployee />
      <button onClick={goToDashboard}>Mi información</button>
    </div>
  );
};

export default Empleado;
