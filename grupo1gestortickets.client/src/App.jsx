import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin";
import Empleado from "./Components/Empleado";
import Cliente from "./Components/Cliente";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Navbar from "./Components/Navbars/Navbar";
import Usuario from "./Components/Usuario/Usuario";
import Ticket from "./Components/Ticket/Ticket";
import InicioAdmin from "./Components/InicioAdmin/InicioAdmin";
import CreateTicket from "./Components/PantallaCliente/Agregar/CreateTicket";
import TicketsTableClient from "./Components/PantallaCliente/InicioCliente/TicketsTable";
import RegisAd from "./Components/AdminRegisUser/RegistrarUsuarios";
import RegisAdCli from "./Components/AdminRegisUser/ReCliente";
import RegisAdEmp from "./Components/AdminRegisUser/ReEmpleado";
import TicketDetails from "./Components/PantallaCliente/DetalleTicket/TicketDetails";
import Detallepro from "./Components/PantallaCliente/DetalleTicket/Detallepro";
import RegisAdAdmin from "./Components/AdminRegisUser/ReAdministrador";
import Loader from ".//Components/Load/Loading";
import TablaAdmin from "./Components/PantallaAdmin/tabla/TablaAdmin";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una operaci�n de carga
    setTimeout(() => {
      setLoading(false); // Cuando la carga est� completa, cambia loading a false
    }, 1000); // Simula una carga de 3 segundos
  }, []);
  return (
    <div>
      {loading ? (
        <Loader /> // Muestra el componente AudioLoader mientras loading es true
      ) : (
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/empleado" element={<Empleado />} />
              <Route path="/cliente" element={<Cliente />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/usuario/:id" element={<Usuario />} />
              <Route path="/ticket/:id" element={<Ticket />} />
              <Route path="/inicioAdmin" element={<InicioAdmin />} />
              <Route
                path="/ticketsTableClient"
                element={<TicketsTableClient />}
              />
              <Route path="/create" element={<CreateTicket />} />
              <Route path="registrar-usuarios" element={<RegisAd />} />
              <Route path="registrar-empleado" element={<RegisAdEmp />} />
              <Route path="registrar-cliente" element={<RegisAdCli />} />
              <Route
                path="/ticketDetail/:ticketId"
                element={<TicketDetails />}
              />
              <Route path="/detallepro/:ticketId" element={<Detallepro />} />
              <Route
                path="registrar-administrador"
                element={<RegisAdAdmin />}
              />
              <Route path="TAdmin" element={<TablaAdmin />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
