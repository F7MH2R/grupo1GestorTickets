import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Welcome, {user.nombre}</h1>
            <p>Correo: {user.correo}</p>
            <p>Tipo de Usuario: {user.tipoUsuario}</p>
            {/* Otros datos del usuario */}
        </div>
    );
};

export default Dashboard;
