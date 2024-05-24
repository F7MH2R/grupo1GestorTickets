import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={goToDashboard}>Ir a Dashboard</button>
        </div>
    );
};

export default Admin;
