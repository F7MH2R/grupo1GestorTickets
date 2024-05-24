import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;


