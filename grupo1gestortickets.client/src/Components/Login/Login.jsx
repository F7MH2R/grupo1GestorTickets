import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withLoader from "../Load/withLoader ";
import './Login.css';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('https://localhost:7289/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);

                // Almacenar datos del usuario en localStorage
                localStorage.setItem('user', JSON.stringify(data));
                console.log('Stored user data:', localStorage.getItem('user'));

                // Redirigir según el tipo de usuario
                if (data.tipo_usuario === 1) {
                    navigate('/admin');
                } else if (data.tipo_usuario === 2) {
                    navigate('/empleado');
                } else {
                    navigate('/cliente');
                }
            } else {
                const errorMsg = await response.text();
                setError(errorMsg);
            }
        } catch (error) {
            setError('Failed to connect to the server. Please try again later.');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2 className="titulologin">Inicia Sesi&oacute;n</h2>
            <div className="login-container">
                <div className="login-form-container">
                    {error && <p className="error-message">{error}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>Correo electr&oacute;nico:</label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                        <label>Contrase&ntilde;a:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Iniciar Sesi&oacute;n</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
};

export default withLoader(Login);
