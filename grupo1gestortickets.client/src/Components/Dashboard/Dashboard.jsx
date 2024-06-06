import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Asegúrate de importar Button si usas react-bootstrap

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            console.log('Retrieved user data:', storedUser);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    const handleBack = () => {
        navigate(-1); // Navegar hacia atrás
    };

    return (
        <div>
            <h1>Welcome, {user.nombre || 'Usuario'}</h1>
            <p>Correo: {user.correo || 'No disponible'}</p>
            <p>Tipo de Usuario: {user.tipo_usuario || 'No disponible'}</p>
            <p>Telefono: {user.telefono || 'No disponible'}</p>
            <p>Cargo: {user.cargo || 'No disponible'}</p>
            <p>Estado de la Cuenta: {user.estado_cuenta || 'No disponible'}</p>
            <p>Fecha de Creacion: {user.fechaCreacion ? new Date(user.fechaCreacion).toLocaleDateString() : 'No disponible'}</p>
            <Button variant="secondary" onClick={handleBack} className="ml-2">
                Volver
            </Button>
        </div>
    );
};

export default Dashboard;







